/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:55be99a3-66d9-41ff-8953-3f3b34404d52",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-15"
    }
  ]
}
*/

import { _ixi } from "../_ixi.mjs";

/**
 * 文字体系情報
 * @typedef {Object} ScriptInfo
 * @property {string} code - ISO 15924の4文字コード
 * @property {string} number - ISO 15924の3文字コード
 * @property {string} name - PVA（ISO 15924のEnglish nameではなくPVAの方。空の場合や重複あり）
 * @property {ScriptRegexInfo} impl - 正規表現への変換情報
 *     null: 現時点でUnicodeに無い
 *       →いかなる文字にもマッチしない正規表現とする
 *     {typographicVariantOf:X}: Unicode仕様的にXと区別されない
 *       →未実装とする
 *     {equals:X}: Unicode仕様的にXと区別されない
 *       →Xにマッチする正規表現とする
 *     {unionOf:...XX}: XXのセット
 *       →XXのいずれかにマッチする正規表現とする
 *     {containedIn:X} Unicode仕様的にXと区別されない
 *       →未実装とする
 */

/**
 * 文字体系情報の配列
 * @type {Array<ScriptInfo>}
 */
import _scriptInfoDictionary from "../_data/text_script.mjs";

/**
 * 文字体系のセット
 */
class TextScriptSet {
  /**
   * ISO 15924の4文字コードの配列
   * @type {Array<string>}
   */
  #set;

  /**
   * 正規表現パターン
   * @type {string}
   */
  #pattern;

  /**
   * @param {Array<string>} scriptCodes - ISO 15924の4文字コードの配列
   */
  constructor (scriptCodes) {
    _ixi.precondition(() => Array.isArray(scriptCodes));

    this.#set = [];
    const subcodes = [];
    for (const scriptCode of scriptCodes) {
      const scriptInfo = _scriptInfoDictionary.find((item) => item.code === scriptCode);
      if (scriptInfo === undefined) {
        throw new _ixi.Exception("_ixi.NotFoundError", "unknown script");
      }
      if (this.#set.includes(scriptCode) !== true) {
        this.#set.push(scriptCode);

        if (scriptInfo.impl !== null) {
          if (scriptInfo.impl.exact === true) {
            subcodes.push(scriptCode);
          }
          else if (typeof scriptInfo.impl.equals === "string") {
            subcodes.push(scriptInfo.impl.equals);
          }
          else if (Array.isArray(scriptInfo.impl.unionOf)) {
            scriptInfo.impl.unionOf.forEach((subcode) => subcodes.push(subcode));
          }
          else {
            // typographicVariantOf, containedIn 
            console.assert(false, "not implemented");
          }
        }
      }
    }
    this.#set.sort();
    Object.freeze(this.#set);

    this.#pattern = subcodes.map((code) => `\\p{scx=${ code }}`).join(""); //XXX scのユースケースはある？

    Object.freeze(this);
  }

  /**
   * 指定した文字体系を含んでいるか否かを返却
   * @param {string} scriptCode - ISO 15924の4文字コード
   * @returns {boolean}
   */
  has(scriptCode) {
    return this.#set.includes(scriptCode);
  }

  /**
   * 自身が持つ言語体系のISO 15924の4文字コードのイテレーターを返却
   * @returns {IterableIterator<string>}
   */
  values() {
    return this.#set[Symbol.iterator]();
  }

  /**
   * ISO 15924の4文字コードの配列を返却
   * @returns {Array<string>}
   */
  toJSON() {
    return [ ...this.values() ];
  }

  /**
   * 文字列に自身が持つ言語体系の含まれているか否かを返却
   * @param {string} str - 検査対象
   * @returns {boolean}
   */
  containedIn(str) {
    _ixi.precondition(() => typeof str === "string");

    if (this.#pattern.length <= 0) {
      return false;
    }
    const regex = new RegExp(`[${ this.#pattern }]+`, "u");
    return regex.test(str);
  }

  /**
   * @typedef {Object} MatchResult
   * @property {string} char - 1文字（1コードポイントで表される文字）を表す文字列
   *     ※合成文字は分解することに注意
   * @property {number} index - 元の文字列におけるインデックス（UTF-16符号単位のインデックス）
   *     ※charがU+10000以上の場合1文字で2になることに注意
   */

  /**
   * 文字列から自身が持つ言語体系の文字を抽出し返却
   * コードポイント単位の文字の配列で返却
   * @param {string} str - 検査対象
   * @returns {Array<MatchResult>}
   */
  matchAll(str) {
    _ixi.precondition(() => typeof str === "string");

    if (this.#pattern.length <= 0) {
      return [];
    }
    const regex = new RegExp(`[${ this.#pattern }]`, "gu");
    return [ ...str.matchAll(regex) ].map((result) => {
      return {
        char: result[0],
        index: result.index,
      };
    });
  }
}
Object.freeze(TextScriptSet);

export { TextScriptSet as ScriptSet };
