/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:57664165-e0b6-47a3-9519-6b6f0b3fc377",
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
 * ハッシュアルゴリズム実装
 * @interface DigestAlgorithmImpl
 */

/**
 * バイト列のハッシュを算出し、算出したバイト列を返却
 * @method
 * @name DigestAlgorithmImpl#compute
 * @param {Uint8Array} toDigest - バイト列
 * @returns {Promise<Uint8Array>}
 */

/**
 * ハッシュアルゴリズム
 * @static
 */
class DigestAlgorithm {
  /**
   * ハッシュアルゴリズムの実装登録簿
   * @readonly
   * @type {Map<string, DigestAlgorithmImpl>}
   */
  static #registry = new Map();

  /**
   * @throws {_ixi.Exception} 必ずスロー
   */
  constructor () {
    throw new _ixi.Exception("_ixi.NotSupportedError");
  }

  /**
   * 名称からDigestAlgorithmImplのインスタンスを生成し返却
   * @param {string} algorithmName - アルゴリズム名称
   * @returns {DigestAlgorithmImpl}
   * @throws {_ixi.Exception} アルゴリズムが見つからなかった場合スロー
   */
  static for(algorithmName) {
    _ixi.precondition(() => typeof algorithmName === "string");
    _ixi.precondition(() => algorithmName.length > 0);

    const normalizedName = algorithmName.toLowerCase();

    const impl = DigestAlgorithm.#registry.get(normalizedName);
    if (impl === undefined) {
      throw new _ixi.Exception("_ixi.NotFoundError", "non-registered algorithm");
    }
    return new impl();
  }

  /**
   * ハッシュアルゴリズムの実装を実装登録簿に登録する
   * @param {string} algorithmName - ハッシュアルゴリズムの名称
   * @param {Function} T - ハッシュアルゴリズムの実装のコンストラクター
   * @returns {void}
   */
  static register(algorithmName, T) {
    _ixi.precondition(() => typeof algorithmName === "string");
    _ixi.precondition(() => algorithmName.length > 0);
    _ixi.precondition(() => typeof T === "function");

    DigestAlgorithm.#registry.set(algorithmName.toLowerCase(), T);
  }
};
Object.freeze(DigestAlgorithm);

export { DigestAlgorithm };
