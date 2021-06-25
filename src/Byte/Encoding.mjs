/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:32c384f5-1f58-4e29-a73f-035279516c17",
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
 * バイト符号化方式実装
 * @interface ByteEncodingImpl
 */

/**
 * 文字列をバイト列に復号し、バイト列を返却
 * @method
 * @name ByteEncodingImpl#decode
 * @param {string} encoded - 符号化された文字列
 * @returns {Uint8Array}
 */

/**
 * バイト列を文字列に符号化し、文字列を返却
 * @method
 * @name ByteEncodingImpl#encode
 * @param {Uint8Array} toEncode - バイト列
 * @returns {string}
 */

/**
 * バイト符号化方式オプション
 * @typedef {Object} ByteEncodingOptions
 */

/**
 * バイト符号化方式
 * @static
 */
class ByteEncoding {
  /**
   * バイト符号化方式の実装登録簿
   * @readonly
   * @type {Map<string, ByteEncodingImpl>}
   */
  static #registry = new Map();

  /**
   * @throws {_ixi.Exception} 必ずスロー
   */
  constructor () {
    throw new _ixi.Exception("_ixi.NotSupportedError");
  }

  /**
   * 名称からByteEncodingImplのインスタンスを生成し返却
   * @param {string} encodingName - 符号化方式の名称
   * @param {ByteEncodingOptions} [options] - 符号化方式のオプション
   * @returns {ByteEncodingImpl}
   * @throws {_ixi.Exception} 符号化方式が見つからなかった場合スロー
   */
  static for(encodingName, options) {
    _ixi.precondition(() => typeof encodingName === "string");
    _ixi.precondition(() => encodingName.length > 0);

    const normalizedName = encodingName.toLowerCase();

    const impl = ByteEncoding.#registry.get(normalizedName);
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

    ByteEncoding.#registry.set(encodingName.toLowerCase(), T);
  }
};
Object.freeze(ByteEncoding);

export { ByteEncoding as Encoding };
