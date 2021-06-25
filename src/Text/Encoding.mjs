/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:c3182f3e-db2e-474b-976c-2ec2d972173d",
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

/**
 * 文字符号化方式の実装
 * @interface TextEncodingImpl
 */

/**
 * 文字符号化方式名（IANA登録名とすることを推奨）
 * @property {string} TextEncodingImpl#name
 */

/**
 * バイト列を文字列に復号し、文字列を返却
 * @method
 * @name TextEncodingImpl#decode
 * @param {Uint8Array} encoded - 符号化されたバイト列
 * @returns {string}
 */

/**
 * 文字列をバイト列に符号化し、バイト列を返却
 * @method
 * @name TextEncodingImpl#encode
 * @param {string} toEncode - 文字列
 * @returns {Uint8Array}
 */

/**
 * 文字符号化方式オプション
 * @typedef {Object} TextEncodingOptions
 */
//TODO fallbackChar,fallbackException,prependBom,removeBom,...

/**
 * 文字符号化方式
 */
class TextEncoding {
  /**
   * 文字符号化方式の実装登録簿
   * @readonly
   * @type {Map<string, TextEncodingImpl>}
   */
  static #registry = new Map();

  /**
   * @throws {_ixi.Exception} 必ずスロー
   */
  constructor () {
    throw new _ixi.Exception("_ixi.NotSupportedError");
  }

  /**
   * 名称からTextEncodingImplのインスタンスを生成し返却
   * @param {string} encodingName - 符号化方式の名称
   * @param {TextEncodingOptions} [options] - 符号化方式のオプション
   * @returns {TextEncodingImpl}
   * @throws {_ixi.Exception} 符号化方式が見つからなかった場合スロー
   */
  static for(encodingName, options) {
    _ixi.precondition(() => typeof encodingName === "string");
    _ixi.precondition(() => encodingName.length > 0);

    const normalizedName = encodingName.toLowerCase();

    const impl = TextEncoding.#registry.get(normalizedName);
    if (impl === undefined) {
      throw new _ixi.Exception("_ixi.NotFoundError", "non-registered encoding");
    }
    return new impl(options);
  }

  /**
   * 符号化方式の実装を実装登録簿に登録する
   * @param {string} encodingName - 符号化方式の名称
   * @param {Function} T - 符号化方式の実装のコンストラクター
   * @returns {void}
   */
  static register(encodingName, T) {
    _ixi.precondition(() => typeof encodingName === "string");
    _ixi.precondition(() => encodingName.length > 0);
    _ixi.precondition(() => typeof T === "function");

    TextEncoding.#registry.set(encodingName.toLowerCase(), T);
  }
}
Object.freeze(TextEncoding);

export { TextEncoding as Encoding };
