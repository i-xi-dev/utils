/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:f80645d6-8e18-43a8-9810-d68dc4509142",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-13"
    }
  ]
}
*/

const _ixi = {
  config: Object.seal({
    noAssert: false,
  }),

};

/**
 * 例外
 */
class Exception extends Error {
  /**
   * 元の例外の配列
   * @type {Array<*>}
   */
  #causes;

  /**
   * @param {string} [name] - 名称
   * @param {string} [message] - メッセージ
   * @param {Array<*>|*} [causes] - 元の例外の配列、または単一の例外
   */
  constructor (name, message, causes) {
    super(message);

    this.#causes;

    if (typeof name === "string") {
      this.name = name;
    }

    this.#causes = [];
    if (Array.isArray(causes)) {
      for (const cause of causes) {
        this.#causes.push(cause);
      }
    }
    else if (causes) {
      this.#causes.push(causes);
    }
    Object.freeze(this.#causes);
    Object.freeze(this);
  }

  /**
   * 元の例外の配列
   * @type {Array<*>}
   */
  get causes() {
    return this.#causes;
  }
}
_ixi.Exception = Object.freeze(Exception);

/**
 * 前提条件の表明
 * @static
 * @param {Function} condition - 条件
 * @returns {void}
 */
_ixi.precondition = function (condition) {
  if (_ixi.config.noAssert === true) {
    return;
  }

  if ((typeof condition === "function") && (condition() === true)) {
    return;
  }
  else {
    throw new TypeError("_ixi.PreconditionFailure");
  }
};

/**
 * 文字列の処理器
 * @static
 */
class StringProcessor {
  /**
   * 文字列を「文字」単位で処理するとき、「文字」が何を示しているか
   * @enum {symbol}
   */
  static Unit = Object.freeze({
    /** UTF-16コードユニット */
    CHAR: Symbol("_ixi.String.Unit.CHAR"),

    /** コードポイント（Runeの命名はGoや.Netから） */
    RUNE: Symbol("_ixi.String.Unit.RUNE"),

    /** 書記素クラスター */
    GRAPHEME: Symbol("_ixi.String.Unit.GRAPHEME"),
  });

  /**
   * devideメソッドの分割方法
   * @typedef {Object} StringDividingMethod
   * @property {StringProcessor.Unit} unit - 分割単位
   * @property {number} value - 分割単位数
   */

  /**
   * 書記素クラスター分割器
   * @readonly
   * @type {Intl.Segmenter}
   */
  static #graphemeSegmenter = new Intl.Segmenter("en", {
    granularity: "grapheme",
  });

  /**
   * @throws {_ixi.Exception} 必ずスロー
   */
  constructor () {
    throw new _ixi.Exception("_ixi.NotSupportedError");
  }

  /**
   * 文字列を指定した方法で分割し返却
   * @param {string} string - 分割する文字列
   * @param {StringDividingMethod} by - 分割方法
   * @param {string} [padding] - 分割結果の配列の最後の要素がby.valueに満たない場合、最後の要素の末尾を埋める文字列
   *     省略した場合埋めない
   *     省略しなかった場合padding.lengthがby.typeの1単位でなければエラーとする
   * @returns {Array<string>}
   */
  static devide(string, by, padding) {
    _ixi.precondition(() => typeof string === "string");
    _ixi.precondition(() => Boolean(by));
    _ixi.precondition(() => Object.values(StringProcessor.Unit).includes(by.unit));
    _ixi.precondition(() => Number.isSafeInteger(by.value));
    _ixi.precondition(() => by.value > 0);

    switch (by.unit) {
      case StringProcessor.Unit.CHAR:
        return StringProcessor.#devideByLength(string, by.value, padding);

      case StringProcessor.Unit.RUNE:
        return StringProcessor.#devideByRuneCount(string, by.value, padding);

      case StringProcessor.Unit.GRAPHEME:
        return StringProcessor.#devideByGraphemeCount(string, by.value, padding);

      default:
        // preconditionが有効な場合は到達しない
        throw new _ixi.Exception("_ixi.NotSupportedError");
      }
  }

  /**
   * 文字列を指定したUTF-16コードユニット数ごとに分割し返却
   *     ※サロゲートペア、合成文字が分割される可能性あり
   * @param {string} string - 分割する文字列
   * @param {number} length - UTF-16コードユニット数
   * @param {string} [padding] - 分割結果の配列の最後の要素がlengthに満たない場合、最後の要素の末尾を埋める文字列
   * @returns {Array<string>}
   */
  static #devideByLength(string, length, padding) {
    _ixi.precondition(() => (padding === undefined) || ((typeof padding === "string") && (padding.length <= 1)));

    const chars = string.split("");
    return StringProcessor.#unitsToUnitGroups(chars, length, padding);
  }

  /**
   * 文字列を指定したルーン数ごとに分割し返却
   *     ※合成文字が分割される可能性あり
   * @param {string} string - 分割する文字列
   * @param {number} runeCount - ルーン数
   * @param {string} [padding] - 分割結果の配列の最後の要素がruneCountに満たない場合、最後の要素の末尾を埋める文字列
   * @returns {Array<string>}
   */
  static #devideByRuneCount(string, runeCount, padding) {
    _ixi.precondition(() => (padding === undefined) || ((typeof padding === "string") && ([ ...padding ].length <= 1)));

    const runes = [ ...string ];
    return StringProcessor.#unitsToUnitGroups(runes, runeCount, padding);
  }

  /**
   * 文字列を指定した書記素クラスター数ごとに分割し返却
   * @param {string} string - 分割する文字列
   * @param {number} graphemeCount - 書記素クラスター数
   * @param {string} [padding] - 分割結果の配列の最後の要素がgraphemeCountに満たない場合、最後の要素の末尾を埋める文字列
   * @retruns {Array<string>}
   */
  static #devideByGraphemeCount(string, graphemeCount, padding) {
    _ixi.precondition(() => (padding === undefined) || ((typeof padding === "string") && (Array.from(StringProcessor.#graphemeSegmenter.segment(padding)).length <= 1)));

    const segments = StringProcessor.#graphemeSegmenter.segment(string);
    const graphemes = Array.from(segments).map((i) => i.segment);
    return StringProcessor.#unitsToUnitGroups(graphemes, graphemeCount, padding);
  }

  /**
   * 「文字」の配列を、指定した「文字」数の文字列の配列に変換し返却
   *     ※「文字」が何を意味するかには関知しない
   *     例）
   *     (["a","b","c","d","e"], 2, "-") → ["ab","cd","e-"]
   * @param {Array<string>} units - 「文字」の配列
   * @param {number} unitGroupSize - 「文字」単位数で表した分割サイズ
   * @param {string} padding - 結果配列の最後の要素のサイズがunitGroupSizeに満たない場合、最後の要素の末尾を埋める「文字」
   * @returns {Array<string>}
   */
  static #unitsToUnitGroups(units, unitGroupSize, padding) {
    const arrays = [];
    for (let i = 0; i < units.length; i = i + unitGroupSize) {
      arrays.push(units.slice(i, i + unitGroupSize));
    }
    if (arrays.length <= 0) {
      return [];
    }

    if ((typeof padding === "string") && (padding.length > 0)) {
      const lastItem = arrays[arrays.length - 1];
      while (lastItem.length < unitGroupSize) {
        arrays[arrays.length - 1].push(padding);
      }
    }
    return arrays.map(i => i.join(""));
  }
}
_ixi.String = Object.freeze(StringProcessor);

/**
 * Array<Array<*, *>>の形式のエントリー配列
 * @static
 */
class Entries {
  /**
   * 対象がArray<Array<*, *>>の形式のエントリー配列であるか否かを返却
   * @param {*} test - 検査対象
   * @param {Function} [keyValidator] - キーのバリデーター
   * @param {Function} [valueValidator] - 値のバリデーター
   * @returns {boolean}
   */
  static isEntries(test, keyValidator = () => true, valueValidator = () => true) {
    if (Array.isArray(test) !== true) {
      return false;
    }

    const result = test.every((entry) => {
      return Array.isArray(entry)
        && (entry.length === 2)
        && keyValidator(entry[0])
        && valueValidator(entry[1]);
    })
    if (result !== true) {
      return false;
    }

    return true;
  }
}
_ixi.Entries = Object.freeze(Entries);

/**
 * 
 * @static
 */
class Hx {
  /**
   * 文字列が {@link https://mimesniff.spec.whatwg.org/#http-token-code-point|HTTP token code point} のみからなる文字列
   * であるか否かを返却
   * @param {string} str - 文字列
   * @returns {boolean}
   */
  static matchHttpToken = function (str) {
    return /^[\u{21}\u{23}-\u{27}\u{2A}\u{2B}\u{2D}\u{2E}0-9A-Za-z\u{5E}\u{5F}\u{60}\u{7C}\u{7E}]*$/u.test(str);
  }

  /**
   * 文字列が {@link https://mimesniff.spec.whatwg.org/#http-quoted-string-token-code-point|HTTP quoted-string token code point} のみからなる文字列
   * であるか否かを返却
   * @param {string} str - 文字列
   * @returns {boolean}
   */
  static matchHttpQuotedStringToken = function (str) {
    return /^[\u{9}\u{20}-\u{7E}\u{80}-\u{FF}]*$/u.test(str);
  }

  // /**
  //  * 文字列から先頭の {@link https://fetch.spec.whatwg.org/#http-whitespace|HTTP whitespace} を削除した文字列を返却
  //  * @param {string} str - 文字列
  //  * @returns {string}
  //  */
  // static trimHttpSpaceStart(str) {
  //   return str.replace(/^[\u{9}\u{A}\u{D}\u{20}]+/u, "");
  // }

  /**
   * 文字列から先頭の {@link https://fetch.spec.whatwg.org/#http-whitespace|HTTP whitespace} の連続を取得し返却
   *     存在しない場合、空文字列を返却
   * @param {string} str - 文字列
   * @returns {string}
   */
  static collectHttpSpaceStart(str) {
    const regex = /[\u{9}\u{A}\u{D}\u{20}]/u;
    let httpSpace = "";
    for (const c of str) {
      if (regex.test(c) !== true) {
        break;
      }
      httpSpace = httpSpace + c;
    }
    return httpSpace;
  }

  /**
   * 文字列から末尾の {@link https://fetch.spec.whatwg.org/#http-whitespace|HTTP whitespace} を削除した文字列を返却
   * @param {string} str - 文字列
   * @returns {string}
   */
  static trimHttpSpaceEnd(str) {
    return str.replace(/[\u{9}\u{A}\u{D}\u{20}]+$/u, "");
  }

  /**
   * 文字列から先頭および末尾の {@link https://fetch.spec.whatwg.org/#http-whitespace|HTTP whitespace} を削除した文字列を返却
   * @param {string} str - 文字列
   * @returns {string}
   */
  static trimHttpSpace(str) {
    return str.replace(/^[\u{9}\u{A}\u{D}\u{20}]+/u, "").replace(/[\u{9}\u{A}\u{D}\u{20}]+$/u, "");
  }

  /**
   * 文字列の先頭からメディアタイプのタイプ名を抽出し返却
   * @param {string} str - 文字列
   * @returns {string}
   */
  static #parseMediaTypeName(str) {
    const u002FIndex = str.indexOf("/");
    if (u002FIndex >= 0) {
      return str.substring(0, u002FIndex);
    }
    return "";
  }

  /**
   * 文字列の先頭からメディアタイプのサブタイプ名を抽出し返却
   * @param {string} str - 文字列
   * @returns {string}
   */
  static #parseMediaSubtypeName(str, dataUri = false) {
    let subtypeName;
    let nextPosition;
    let noParameters = false;
    if (str.includes(";")) {
      // 「;」あり（パラメーターあり、または";base64,"あり）
      const u003BIndex = str.indexOf(";");
      subtypeName = str.substring(0, u003BIndex);
      nextPosition = u003BIndex;

      if ((dataUri === true) && str.substring(nextPosition).startsWith(";base64,")) {
        // パラメーター無し
        noParameters = true;
      }
    }
    else if ((dataUri === true) && str.includes(",")) {
      // パラメーター無し、「,」あり
      const u002CIndex = str.indexOf(",");
      subtypeName = str.substring(0, u002CIndex);
      nextPosition = u002CIndex;
      noParameters = true;
    }
    else {
      // パラメーター無し
      subtypeName = str;
      nextPosition = str.length;
      noParameters = true;
    }

    subtypeName = _ixi.Hx.trimHttpSpaceEnd(subtypeName);

    return {
      subtypeName,
      nextPosition,
      noParameters,
    }
  }

  /**
   * 文字列の先頭からメディアタイプ構成要素を抽出し返却
   * @param {string} str - 文字列
   * @param {boolean} [dataUri] - Data URI解析モード
   * @returns {Object}
   */
  static parseMediaType(str, dataUri = false) {
    let work = str;
    let i = 0;

    // [mimesniff 4.4.]-1,2 当メソッドを呼ぶ前に削除する

    // [mimesniff 4.4.]-3
    const typeName = _ixi.Hx.#parseMediaTypeName(work);
    if (typeName.length <= 0) {
      return {
        typeName,
        subtypeName: "",
        parameterEntries: [],
        length: i,
      };
    }

    // [mimesniff 4.4.]-4,5 はコンストラクターではじかれる

    // [mimesniff 4.4.]-6
    work = work.substring(typeName.length + 1);
    i = i + typeName.length + 1;

    // [mimesniff 4.4.]-7,8
    const { subtypeName, nextPosition: subtypeNameEnd, noParameters } = _ixi.Hx.#parseMediaSubtypeName(work, dataUri);
    work = (noParameters === true) ? "" : work.substring(subtypeNameEnd);
    i = i + subtypeNameEnd;

    // [mimesniff 4.4.]-9 はコンストラクターではじかれる

    // [mimesniff 4.4.]-10 はコンストラクターで行う

    if (work.length <= 0) {
      return {
        typeName,
        subtypeName,
        parameterEntries: [],
        length: i,
      };
    }

    const detectPrameterValueEnd = (str) => {
      let valueEndIndex = -1;
      let mediaTypeEnd = false;
      const u003BIndex = str.indexOf(";");
      if (u003BIndex >= 0) {
        valueEndIndex = u003BIndex;

        if (dataUri === true) {
          if (str.substring(valueEndIndex).startsWith(";base64,")) {
            mediaTypeEnd = true;
          }
        }
      }
      else if (dataUri === true) {
        const u002CIndex = work.indexOf(",");
        if (u002CIndex >= 0) {
          valueEndIndex = u002CIndex;
          mediaTypeEnd = true;
        }
      }

      if (valueEndIndex < 0) {
        valueEndIndex = str.length;
        mediaTypeEnd = true;
      }

      return {
        valueEndIndex,
        mediaTypeEnd,
      };
    };

    // [mimesniff 4.4.]-11
    const parameterEntries = [];
    while (work.length > 0) {
      // [mimesniff 4.4.]-11.1
      work = work.substring(1);
      i = i + 1;

      // [mimesniff 4.4.]-11.2
      const startHttpSpaces2 = _ixi.Hx.collectHttpSpaceStart(work);
      work = work.substring(startHttpSpaces2.length);
      i = i + startHttpSpaces2.length;

      // [mimesniff 4.4.]-11.3
      const u003BIndex = work.indexOf(";");
      const u003DIndex = work.indexOf("=");

      let delimIndex = -1;
      if ((u003BIndex >= 0) && (u003DIndex >= 0)) {
        delimIndex = Math.min(u003BIndex, u003DIndex);
      }
      else if (u003BIndex >= 0) {
        delimIndex = u003BIndex;
      }
      else if (u003DIndex >= 0) {
        delimIndex = u003DIndex;
      }

      let u002CFound = false;
      if (dataUri === true) {
        const u002CIndex = work.indexOf(",");
        if ((u002CIndex >= 0) && (u002CIndex < delimIndex)) {
          delimIndex = u002CIndex;
          u002CFound = true;
        }
      }

      let parameterName;
      if (delimIndex >= 0) {
        parameterName = work.substring(0, delimIndex);
      }
      else {
        parameterName = work;
      }
      work = work.substring(parameterName.length);
      i = i + parameterName.length;

      // [mimesniff 4.4.]-11.4 はコンストラクターで行う

      // [mimesniff 4.4.]-11.5.1
      if (work.startsWith(";")) {
        if ((dataUri === true) && work.startsWith(";base64,")) {
          break;
        }
        continue;
      }

      if (u002CFound === true) {
        break;
      }

      // [mimesniff 4.4.]-11.5.2
      if (work.startsWith("=")) {
        work = work.substring(1);
        i = i + 1;
      }

      // [mimesniff 4.4.]-11.6
      if (work.length <= 0) {
        break;
      }

      if ((dataUri === true) && (work.startsWith(";base64,") || work.startsWith(","))) {
        break;
      }

      // [mimesniff 4.4.]-11.7
      let parameterValue;

      if (work.startsWith('"')) {
        // [mimesniff 4.4.]-11.8.1
        const { value, length } = _ixi.Hx.#httpQuotedString(work);
        work = work.substring(length);
        i = i + length;
        parameterValue = value;

        // [mimesniff 4.4.]-11.8.2
        const { valueEndIndex, mediaTypeEnd } = detectPrameterValueEnd(work);
        work = (mediaTypeEnd === true) ? "" : work.substring(valueEndIndex);
        i = i + valueEndIndex;
      }
      else {
        // [mimesniff 4.4.]-11.9.1
        const { valueEndIndex, mediaTypeEnd } = detectPrameterValueEnd(work);
        parameterValue = work.substring(0, valueEndIndex);
        work = (mediaTypeEnd === true) ? "" : work.substring(valueEndIndex);
        i = i + valueEndIndex;

        // [mimesniff 4.4.]-11.9.2
        parameterValue = _ixi.Hx.trimHttpSpaceEnd(parameterValue);

        // [mimesniff 4.4.]-11.9.3
        if (parameterValue.length <= 0) {
          continue;
        }
      }

      // [mimesniff 4.4.]-11.10
      if (parameterName.length <= 0) {
        continue;
      }
      if (_ixi.Hx.matchHttpToken(parameterName) !== true) {
        continue;
      }
      if (_ixi.Hx.matchHttpQuotedStringToken(parameterValue) !== true) {
        continue;
      }
      if (parameterEntries.some(param => param[0] === parameterName)) {
        continue;
      }
      parameterEntries.push([
        parameterName,
        parameterValue,
      ]);
    }

    return {
      typeName,
      subtypeName,
      parameterEntries,
      length: i,
    };
  }

  /**
   * 文字列の先頭のHTTP quoted stringを取得し返却
   *     仕様は https://fetch.spec.whatwg.org/#collect-an-http-quoted-string
   * @param {string} str - 先頭がU+0022の文字列
   * @returns {Object}
   */
  static #httpQuotedString(str) {
    let work = "";
    let escaped = false;

    let text2 = str.substring(1);
    let i = 0;
    for (i = 0; i < text2.length; i++) {
      const c = text2[i];

      if (escaped === true) {
        work = work + c;
        escaped = false;
        continue;
      }
      else {
        if (c === '"') {
          break;
        }
        else if (c === "\\") {
          escaped = true;
          continue;
        }
        else {
          work = work + c;
          continue;
        }
      }
    }

    if (escaped === true) {
      work = work + "\\";
    }

    return {
      value: work,
      length: (i + 1),
    };
  }
}
_ixi.Hx = Object.freeze(Hx);

/**
 * DOMのProgressEventと同じインターフェースのイベント
 */
class ProgressEvent extends Event {
  /**
   * 進捗状況を計測可能か否か
   */
  #lengthComputable;

  /**
   * 実行済の実行量
   * @type {number}
   */
  #loaded;

  /**
   * 合計の実行量
   * @type {number}
   */
  #total;

  /**
   * @param {string} type - イベント型名
   * @param {ProgressEventInit} [init] - EventInit
   */
  constructor (type, init) {
    super(type, init);

    this.#lengthComputable = (init && (typeof init.lengthComputable === "boolean")) ? init.lengthComputable : false;
    this.#loaded = (init && Number.isSafeInteger(init.loaded) && (init.loaded >= 0)) ? init.loaded : 0;
    this.#total = (init && Number.isSafeInteger(init.total) && (init.total >= 0)) ? init.total : 0;
  }

  /**
   * 進捗状況を計測可能か否か
   */
  get lengthComputable() {
    return this.#lengthComputable;
  }

  /**
   * 実行済の実行量
   * @type {number}
   */
  get loaded() {
    return this.#loaded;
  }

  /**
   * 合計の実行量
   * @type {number}
   */
  get total() {
    return this.#total;
  }
}
_ixi.ProgressEvent = Object.freeze(ProgressEvent);

Object.freeze(_ixi);
export { _ixi };
