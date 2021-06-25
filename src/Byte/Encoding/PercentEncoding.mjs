/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:8c80cbe0-e1c5-4955-93b9-1803a83714a1",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-18"
    }
  ]
}
*/

import { _ixi } from "../../_ixi.mjs";
import { Type } from "../Type.mjs";
import { Format as ByteFormat } from "../Format.mjs";

/**
 * パーセント符号化方式
 *     0x20～0x7E(0x25を除く)は、オプションのinclusionsで指定されていなければ"%XX"に変換しないことに注意。
 *     すなわち、URLエンコードとして使用するにはURLコンポーネントに応じて変換対象を追加する必要がある。
 * @implements {ByteEncodingImpl}
 */
class PercentEncoding {
  /**
   * パーセント符号化方式オプション
   * @typedef {ByteEncodingOptions} PercentEncodingOptions
   * @property {Array<number>} inclusions - 追加で"%XX"への変換対象とするバイトの配列
   * @property {boolean} spaceAsPlus - inclusionsに0x20が含まれているときに、0x20を"+"に符号化するか否か
   *     inclusionsに0x20が含まれていなければ無視する
   *     trueにするときは、inclusionsに"+"(0x2B)を追加する必要がある
   * @property {boolean} strict - デコード時、パーセント符号化方式オプションに合致しない文字列が出現した場合エラーにするか否か
   *     ※エンコードには影響しない
   *     ※strict=falseでのデコード結果は、同じオプションで再エンコードしても元に戻らない可能性あり
   */

  /**
   * 0x20を"+"に符号化するか否かのデフォルト
   * @constant {boolean}
   */
  static #defaultSpaceAsPlus = false;

  /**
   * デコード時、パーセント符号化方式オプションに合致しない文字列が出現した場合エラーにするか否かのデフォルト
   * @type {boolean}
   */
  static #defaultStrict = true;

  /**
   * "%XX"のフォーマッター
   * @readonly
   * @type {ByteFormat}
   */
  static #byteFormatter = new ByteFormat({
    upperCase: true,
    prefix: "%",
  });

  /**
   * 追加で"%XX"への変換対象とするバイトの配列
   * @type {Array<number>}
   */
  #inclusions;

  /**
   * 0x20を"+"に符号化するか否か
   * @type {boolean}
   */
  #spaceAsPlus;

  /**
   * デコード時、パーセント符号化方式オプションに合致しない文字列が出現した場合エラーにするか否か
   * @type {boolean}
   */
  #strict;

  /**
   * @param {PercentEncodingOptions} [param0] - 符号化方式オプション
   */
  constructor ({
    inclusions = PercentEncoding.#defaultInclusions,
    spaceAsPlus = PercentEncoding.#defaultSpaceAsPlus,
    strict = PercentEncoding.#defaultStrict,
  } = {}) {

    _ixi.precondition(() => Array.isArray(inclusions));
    _ixi.precondition(() => inclusions.every((byte) => Type.isByte(byte)));
    _ixi.precondition(() => typeof spaceAsPlus === "boolean");
    if (spaceAsPlus === true) {
      _ixi.precondition(() => inclusions.includes(0x2B));
    }
    _ixi.precondition(() => typeof strict === "boolean");

    this.#inclusions = inclusions.slice(0);
    this.#spaceAsPlus = spaceAsPlus;
    this.#strict = strict;
    Object.freeze(this);
  }

  /**
   * 追加で"%XX"への変換対象とするバイトの配列のデフォルトを生成し返却
   * @type {Array<number>}
   */
  static get #defaultInclusions() {
    return [];
  }

  /**
   * "%XX"への変換対象バイトか否かを返却
   * @param {number} byte - 検査対象
   * @returns {boolean}
   */
  #isTarget(byte) {
    // byteがUS-ASCIIの制御文字のコードポイントの場合、または、
    // byteが0x25の場合、または、
    // byteがinclusionsに含まれる場合、
    // "%XX"への変換対象
    return ((byte < 0x20) || (byte > 0x7E) || (byte === 0x25) || this.#inclusions.includes(byte));
  }

  /**
   * パーセント符号化された文字列から、"%XX"の形にエンコードされているバイトの数を取得する正規表現を生成し返却
   * @returns {RegExp}
   */
  #encodedPattern() {
    const inclusionsStr = this.#inclusions.map(i => i.toString(16)).join("|");
    let pattern = "%([0189a-f][0-9a-f]|25|7f";
    if (inclusionsStr.length > 0) {
      pattern = pattern + "|" + inclusionsStr;
    }
    pattern = pattern + ")";
    return new RegExp(pattern, "gi");
  }

  /**
   * 文字列をバイト列に復号し、バイト列を返却
   * @param {string} encoded - パーセント符号化された文字列
   * @returns {Uint8Array}
   * @throws {_ixi.Exception} encodedがU+0020～U+007E範囲外の文字を含んでいる場合スロー
   * "%"に[0-9A-Fa-f]{2}が後続していない場合スロー
   */
  decode(encoded) {
    _ixi.precondition(() => typeof encoded === "string");

    if (/^[\u0020-\u007E]*$/.test(encoded) !== true) {
      throw new _ixi.Exception("_ixi.EncodingError", "decode error (1)");
    }

    const encodedCount = [ ...encoded.matchAll(this.#encodedPattern()) ].length;
    const decoded = new Uint8Array(encoded.length - (encodedCount * 3) + encodedCount);

    const spaceAsPlusEnabled = (this.#spaceAsPlus === true) && this.#inclusions.includes(0x20);

    let i = 0;
    let j = 0;
    while (i < encoded.length) {
      const c = encoded.charAt(i);

      let byte;
      if (c === "%") {
        const byteString = encoded.substring((i + 1), (i + 3));
        if (/^[0-9A-Fa-f]{2}$/.test(byteString) !== true) {
          throw new _ixi.Exception("_ixi.EncodingError", "decode error (2)");
        }
        byte = Number.parseInt(byteString, 16);

        if (this.#isTarget(byte)) {
          i = i + 3;
        }
        else {
          if (this.#strict === true) {
            throw new _ixi.Exception("_ixi.EncodingError", "decode error (3)");
          }
          byte = c.charCodeAt(0);
          i = i + 1;
        }
      }
      else if (c === "+") {
        if (spaceAsPlusEnabled === true) {
          byte = 0x20;
        }
        else {
          byte = c.charCodeAt(0);
        }
        i = i + 1;
      }
      else {
        byte = c.charCodeAt(0);
        i = i + 1;
      }

      decoded[j++] = byte;
    }
    return decoded;
  }

  /**
   * バイト列を文字列に符号化し、文字列を返却
   * @param {Uint8Array} toEncode - バイト列
   * @returns {string}
   */
  encode(toEncode) {
    _ixi.precondition(() => toEncode instanceof Uint8Array);

    let work = [];
    let encoded = "";
    for (const byte of toEncode) {
      if (this.#isTarget(byte)) {
        if (byte === 0x20) {
          if (this.#spaceAsPlus === true) {
            encoded = encoded + PercentEncoding.#byteFormatter.format(Uint8Array.from(work)) + "+";
            work = [];
          }
          else {
            work.push(byte);
          }
        }
        else {
          work.push(byte);
        }
      }
      else {
        // 上記以外はbinary stringと同じ
        encoded = encoded + PercentEncoding.#byteFormatter.format(Uint8Array.from(work)) + String.fromCharCode(byte);
        work = [];
      }
    }
    encoded = encoded + PercentEncoding.#byteFormatter.format(Uint8Array.from(work));
    return encoded;
  }
}
Object.freeze(PercentEncoding);

export { PercentEncoding };
