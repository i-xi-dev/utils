/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:82d61fe9-d6f6-4069-b47a-f90b57691c63",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-18"
    }
  ]
}
*/

import { _ixi } from "../_ixi.mjs";
import { Type } from "./Type.mjs";

/**
 * バイトのフォーマッター
 *     不変オブジェクト
 */
class ByteFormat {
  /**
   * 基数
   * @type {number}
   */
  #radix;

  /**
   * 前方0埋め桁数
   * @type {number}
   */
  #zeroPaddedLength;

  /**
   * 大文字で文字列表現するか否か
   * @type {number}
   */
  #upperCase;

  /**
   * プレフィックス
   * @type {string}
   */
  #prefix;

  /**
   * サフィックス
   * @type {string}
   */
  #suffix;

  /**
   * サポートする基数
   * @readonly
   * @type {Array<number>}
   */
  static #SUPPORTED_RADIXES = Object.freeze([
    2,
    8,
    10,
    16,
  ]);

  /**
   * 文字列表現の最小の長さ定義
   * キーが基数、値が長さのマップ
   * @readonly
   * @type {Map<number, number>}
   */
  static #MIN_LENGTH_DEFS = new Map([
    [ 2, 8 ],
    [ 8, 3 ],
    [ 10, 3 ],
    [ 16, 2 ],
  ]);

  /**
   * フォーマットオプション
   * @typedef {Object} ByteFormatOptions
   * @property {number} radix - 文字列表現した時の基数
   * @property {number} zeroPaddedLength - 文字列表現の長さ（UTF-16ユニット数）
   *     radixに応じた長さを確保すること（基数が2なら8以上など）
   *     ※パースもフォーマットも文字列は固定長しか扱わない
   * @property {boolean} upperCase - 大文字で文字列表現するか否か（falseなら小文字）
   * @property {string} prefix - プレフィックス
   * @property {string} suffix - サフィックス
   */

  /**
   * フォーマットオプションのデフォルト
   * @readonly
   * @type {ByteFormatOptions}
   */
  static #DEFAULT_OPTIONS = {
    radix: 16,
    zeroPaddedLength: 2,
    upperCase: false,
    prefix: "",
    suffix: "",
  };

  /**
   * @param {ByteFormatOptions} [param0] - フォーマットオプション
   */
  constructor ({
    radix = ByteFormat.#DEFAULT_OPTIONS.radix,
    zeroPaddedLength = ByteFormat.#DEFAULT_OPTIONS.zeroPaddedLength,
    upperCase = ByteFormat.#DEFAULT_OPTIONS.upperCase,
    prefix = ByteFormat.#DEFAULT_OPTIONS.prefix,
    suffix = ByteFormat.#DEFAULT_OPTIONS.suffix,
  } = {}) {

    _ixi.precondition(() => ByteFormat.#SUPPORTED_RADIXES.includes(radix));
    _ixi.precondition(() => Number.isSafeInteger(zeroPaddedLength));
    _ixi.precondition(() => zeroPaddedLength >= ByteFormat.#MIN_LENGTH_DEFS.get(radix));
    _ixi.precondition(() => typeof upperCase === "boolean");
    _ixi.precondition(() => typeof prefix === "string");
    _ixi.precondition(() => typeof suffix === "string");

    this.#radix = radix;
    this.#zeroPaddedLength = zeroPaddedLength;
    this.#upperCase = upperCase;
    this.#prefix = prefix;
    this.#suffix = suffix;

    Object.freeze(this);
  }

  /**
   * 文字列を8-bit符号なし整数にパースし返却
   * @param {string} formatted - 文字列
   * @returns {number}
   * @throws {_ixi.Exception} formattedの先頭がフォーマットオプションprefixと合致しない場合スロー
   *     formattedの末尾がフォーマットオプションsuffixと合致しない場合スロー
   *     parseIntしてNaNや無限大になった場合スロー
   */
  #parse(formatted) {
    let work = formatted;
    if (this.#prefix.length > 0) {
      if (formatted.startsWith(this.#prefix) !== true) {
        throw new _ixi.Exception("_ixi.InvalidCharacterError", "unprefixed");
      }
      work = work.substring(this.#prefix.length);
    }
    if (this.#suffix.length > 0) {
      if (formatted.endsWith(this.#suffix) !== true) {
        throw new _ixi.Exception("_ixi.InvalidCharacterError", "unsuffixed");
      }
      work = work.substring(0, (work.length - this.#suffix.length));
    }

    const integer = Number.parseInt(work, this.#radix);
    if (Type.isByte(integer) !== true) {
      throw new _ixi.Exception("_ixi.InvalidCharacterError", "parse error");
    }

    return integer;
  }

  /**
   * 文字列が、フォーマットオプションで指定したとおりにフォーマットされた文字列であるか否かを返却
   *     ただし
   *     ・radix=8,10の場合の範囲はチェックしていない（例えばradix=10の場合999でもokになる）
   *     ・prefix,suffixの一致まではチェックしていない（prefix,suffixのlengthのみチェック）
   * @param {string} formatted - フォーマットされた文字列
   * @returns {boolean}
   */
  #test(formatted) {
    let charsPattern;
    switch (this.#radix) {
      case 2:
        charsPattern = "[01]";
        break;
      case 8:
        charsPattern = "[0-7]";
        break;
      case 10:
        charsPattern = "[0-9]";
        break;
      case 16:
        if (this.#upperCase === true) {
          charsPattern = "[0-9A-F]";
        }
        else {
          charsPattern = "[0-9a-f]";
        }
        break;
    }
    const prefixPattern = (this.#prefix.length > 0) ? `.{${ this.#prefix.length }}` : "";
    const suffixPattern = (this.#suffix.length > 0) ? `.{${ this.#suffix.length }}` : "";
    const bodyLength = ByteFormat.#MIN_LENGTH_DEFS.get(this.#radix);
    const paddingLength = this.#zeroPaddedLength - bodyLength;
    const paddingPattern = (paddingLength > 0) ? `[0]{${ paddingLength }}` : "";
    const regex = new RegExp(`^(${ prefixPattern }${ paddingPattern }${ charsPattern }{${ bodyLength }}${ suffixPattern })*$`, "s");

    return regex.test(formatted);
  }

  /**
   * 文字列をバイト列にパースし返却
   * @param {string} formatted - 文字列
   * @returns {Uint8Array}
   */
  parse(toParse) {
    _ixi.precondition(() => typeof toParse === "string");

    if (this.#test(toParse) !== true) {
      throw new _ixi.Exception("_ixi.DataError", "parse error");
    }

    const elementLength = this.#zeroPaddedLength + this.#prefix.length + this.#suffix.length;
    const byteStringArray = _ixi.String.devide(toParse, {
      unit: _ixi.String.Unit.CHAR,
      value: elementLength,
    });

    return Uint8Array.from(byteStringArray, (byteString) => {
      return this.#parse(byteString);
    });
  }

  /**
   * 8-bit符号なし整数を文字列にフォーマットし返却
   * @param {number} uint8 - 8-bit符号なし整数
   * @returns {string}
   */
  #format(uint8) {
    let string = Math.abs(uint8).toString(this.#radix);
    if (this.#zeroPaddedLength > string.length) {
      string = string.padStart(this.#zeroPaddedLength, "0");
    }
    if (this.#upperCase === true) {
      string = string.toUpperCase();
    }
    return this.#prefix + string + this.#suffix;
  }

  /**
   * バイト列を文字列にフォーマットし返却
   * @param {Uint8Array} bytes - バイト列
   * @return {string}
   */
  format(bytes) {
    _ixi.precondition(() => bytes instanceof Uint8Array);

    const byteStringArray = [ ...bytes ].map((byte) => {
      return this.#format(byte);
    });
    return byteStringArray.join("");
  }
}
Object.freeze(ByteFormat);

export { ByteFormat as Format };
