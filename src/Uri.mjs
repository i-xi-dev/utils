/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:d97d23a0-6925-4ef0-9065-acd6fe4063e9",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-13"
    }
  ]
}
*/

import { _ixi } from "./_ixi.mjs";
import { ByteSequence } from "./ByteSequence.mjs";
import { Text } from "./Text.mjs";

/**
 * URI
 *     不変オブジェクト
 *     ※クエリの型はapplication/x-www-form-urlencodedのみ対応
 *     "="を含まない形のクエリは
 *     ・コンストラクターには渡せる
 *       ・が、queryで取り出すときはパラメーター名"x",パラメーター値""となる
 *       ・toString()の結果は"="を含まない（例:"?x"）
 *     ・withQueryにはパラメーター名"x",パラメーター値""の形であれば渡せる（toString()で"?x"にすることはできない）
 *       ・toString()の結果は"="を含む（例:"?x="）
 */
class Uri {
  /**
   * 特別スキーム
   * @enum {string}
   */
  static #SpecialScheme = {
    FILE: "file",
    FTP: "ftp",
    HTTP: "http",
    HTTPS: "https",
    WS: "ws",
    WSS: "wss",
  };

  /**
   * 既定ポート
   * @readonly
   * @type {Map<string, number>}
   */
  static #defaultPortMap = new Map([
    [ Uri.#SpecialScheme.FILE, null ],
    [ Uri.#SpecialScheme.FTP, 21 ],
    [ Uri.#SpecialScheme.HTTP, 80 ],
    [ Uri.#SpecialScheme.HTTPS, 443 ],
    [ Uri.#SpecialScheme.WS, 80 ],
    [ Uri.#SpecialScheme.WSS, 443 ],
  ]);

  /**
   * 素片用のパーセント符号化方式オプション
   *     ※除外でないのは、U+0000～U+001F, U+0020, U+0022, U+003C, U+003E, U+0060, U+007F～U+10FFFF
   * @readonly
   * @type {PercentEncodingOptions}
   */
  static #fragmentEncodingOptions = Object.freeze({
    inclusions: [ 0x20, 0x22, 0x3C, 0x3E, 0x60 ],
    strict: false,
  });

  /**
   * 内部表現
   * @type {URL}
   */
  #uri;

  /**
   * @param {string|URL} uri - 絶対URIを表す文字列またはURLオブジェクト
   * @throws {_ixi.Exception} uriが絶対URLではない場合スロー
   */
  constructor (uri) {
    _ixi.precondition(() => (uri instanceof URL) || ((typeof uri === "string") && (uri.length > 0)));

    let uriString;
    if (uri instanceof URL) {
      uriString = uri.toString();
    }
    else {
      uriString = uri;
    }

    try {
      this.#uri = new URL(uriString);
    }
    catch (exception) {
      throw new _ixi.Exception("_ixi.DataError", "uri form invalid", exception);
    }

    if (Uri.#isAbsolute(uriString, this.scheme) !== true) {
      throw new _ixi.Exception("_ixi.DataError", "uri must be absolute");
    }

    Object.freeze(this);
  }

  /**
   * オリジン
   * @type {string}
   */
  get origin() {
    const originString = this.#uri.origin;
    if (originString === "null") {
      return null;
    }
    return originString;
  }

  /**
   * スキーム
   *     ※末尾の":"は含めない
   * @type {number}
   */
  get scheme() {
    return this.#uri.protocol.replace(/:$/, "");
  }

  // get host() {
  //   const host = this.#uri.hostname;
  //   if (host.length <= 0) {
  //     return null;
  //   }
  //   return host;
  // }

  /**
   * ポート
   *     ※規定値であっても返す
   * @type {number}
   */
  get port() {
    const port = this.#uri.port;
    if (port.length > 0) {
      return Number.parseInt(port, 10);
    }

    if (Uri.#defaultPortMap.has(this.scheme)) {
      return Uri.#defaultPortMap.get(this.scheme);
    }
    return null;
  }

  //XXX get path()

  /**
   * クエリのエントリーの配列
   * @type {Array<Array<string, string>>}
   */
  get query() {
    if (this.#uri.search.length <= 0) {
      const work = new URL(this.#uri.toString());
      work.hash = "";
      if (work.toString().endsWith("?")) {
        return [];
      }
      return null;
    }

    const entries = [];
    for (const entry of this.#uri.searchParams.entries()) {
      entries.push([
        entry[0],
        entry[1],
      ]);
    }
    return entries;
  }

  /**
   * 素片
   * @type {string}
   */
  get fragment() {
    if (this.#uri.hash.length <= 0) {
      const work = new URL(this.#uri.toString());
      if (work.toString().endsWith("#")) {
        return "";
      }
      return null;
    }

    const fragment = this.#uri.hash.replace(/^#/, "");
    const buffer = ByteSequence.fromEncoded(fragment, "percent", Uri.#fragmentEncodingOptions);
    return Text.Encoding.for("UTF-8").decode(buffer.view());
  }

  /**
   * URI文字列が絶対URIを表しているか否かを返却
   * @param {string} uriString - URI文字列 
   * @param {Uri.#SpecialScheme} scheme - スキーム 
   * @returns {boolean}
   */
  static #isAbsolute(uriString, scheme) {
    let separator = ":";
    if (Object.values(Uri.#SpecialScheme).includes(scheme)) {
      separator = "://";
    }
    return uriString.toLowerCase().startsWith(scheme + separator);
  }

  /**
   * URLを表す文字列を生成し返却
   * @override
   * @returns {string}
   */
  toString() {
    return this.#uri.toString();
  }

  /**
   * URLを表す文字列を生成し返却
   * @returns {string}
   */
  toJSON() {
    return this.toString();
  }

  /**
   * 自身を基底URIとして相対URIから絶対URIを生成
   * @param {string} relativeUriString - 相対URIを表す文字列
   * @returns {Uri}
   * @throws {_ixi.Exception} 相対URIを解決できない場合スロー
   */
  resolveRelativeUri(relativeUriString) {
    _ixi.precondition(() => typeof relativeUriString === "string");

    if (Uri.#isAbsolute(relativeUriString, this.scheme)) {
      throw new _ixi.Exception("_ixi.DataError", "relativeUriString is absolute URI");
    }

    let uri;
    try {
      uri = new URL(relativeUriString, this.toString());
    }
    catch (exception) {
      throw new _ixi.Exception("_ixi.DataError", "Relative URI not resolved", exception);
    }

    if (uri.toString().startsWith(this.scheme + ":") !== true) {
      throw new _ixi.Exception("_ixi.DataError", "relativeUriString is absolute URI (2)");
    }

    return new Uri(uri.toString());
  }

  /**
   * 自身のURIと指定したクエリで新たなインスタンスを生成し返却
   * @param {Array<Array<string>>} [query] - クエリパラメーターのエントリー配列
   * @returns {Uri}
   */
  withQuery(query = null) {
    if (query === null) {
      return this.withoutQuery();
    }

    _ixi.precondition(() => _ixi.Entries.isEntries(query, (key) => {
      return (typeof key === "string") && (key.length >= 0);
    }, (value) => {
      return (typeof value === "string") && (value.length >= 0);
    }));

    const queryParams = new URLSearchParams(query);
    const clone = new URL(this.#uri.toString());
    clone.search = "?" + queryParams.toString();
    return new Uri(clone.toString());
  }

  /**
   * クエリを除いた新たなインスタンスを生成し返却
   * @returns {Uri}
   */
  withoutQuery() {
    const clone = new URL(this.#uri.toString());
    clone.search = "";
    return new Uri(clone.toString());
  }

  /**
   * 自身のURIと指定した素片で新たなインスタンスを生成し返却
   *     ※素片の先頭に"#"は不要
   *     ※空文字列も受け入れる
   * @param {string} [fragment] - 素片
   * @returns {Uri}
   */
  withFragment(fragment = null) {
    if (fragment === null) {
      return this.withoutFragment();
    }

    _ixi.precondition(() => typeof fragment === "string");

    const clone = new URL(this.#uri.toString());
    clone.hash = "#" + fragment;
    return new Uri(clone.toString());
  }

  /**
   * 素片を除いた新たなインスタンスを生成し返却
   * @returns {Uri}
   */
  withoutFragment() {
    const clone = new URL(this.#uri.toString());
    clone.hash = "";
    return new Uri(clone.toString());
  }
}
Object.freeze(Uri);

export { Uri };
