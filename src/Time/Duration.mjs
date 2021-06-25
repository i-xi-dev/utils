/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:08431b33-5116-480f-b7ed-f447a721cb25",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-08"
    }
  ]
}
*/

import { _ixi } from "../_ixi.mjs";
import { AbstractTemporal } from "./AbstractTemporal.mjs";

/**
 * 時間量
 * 不変オブジェクト
 */
class Duration extends AbstractTemporal {
  /**
   * @param {bigint} value - ナノ秒で表した時間
   */
  constructor (value) {
    super(value);
    Object.freeze(this);
  }

  /**
   * ミリ秒で表した時間量
   * @type {number}
   */
  get milliseconds() {
    return AbstractTemporal._nanosToMillis(this.value);
  }

  /**
   * 秒で表した時間量
   * @type {number}
   */
  get seconds() {
    return AbstractTemporal._nanosToSeconds(this.value);
  }

  /**
   * 分で表した時間量
   * @type {number}
   */
  get minutes() {
    return AbstractTemporal._nanosToMinutes(this.value);
  }

  /**
   * 時で表した時間量
   * @type {number}
   */
  get hours() {
    return AbstractTemporal._nanosToHours(this.value);
  }

  /**
   * 日で表した時間量
   * @type {number}
   */
  get days() {
    return AbstractTemporal._nanosToDays(this.value);
  }

  /**
   * 時間量が負であるか否か
   * @type {boolean}
   */
  get isNegative() {
    return (this.value < 0n);
  }

  /**
   * シリアライズオプション
   * @typedef {Object} DurationSerializeOptions
   * @property {number} fractionDigits - 秒の小数部の桁数
   */

  /**
   * 時間量を表すISO 8601形式の文字列からインスタンスを生成し返却
   * @param {string} str - 時間量を表すISO 8601形式の文字列
   *     同じオプションでtoStringで出力される形式のみパース可能
   *     ※時間量が負の場合は先頭に"-"を付ける（ISO 8601としては仕様違反）
   * @param {DurationSerializeOptions} param1 - シリアライズオプション
   * @returns {Duration}
   */
  static fromString(str, { fractionDigits = 9 } = {}) {
    _ixi.precondition(() => typeof str === "string");
    _ixi.precondition(() => Number.isSafeInteger(fractionDigits));
    _ixi.precondition(() => fractionDigits >= 0);
    _ixi.precondition(() => fractionDigits <= 9);

    if (/^-?PT([1-9][0-9]+|0[0-9]+)H[0-9]{2}M[0-9]{2}(\.[0-9]+)?S$/.test(str) !== true) {
      throw new _ixi.Exception("_ixi.DataError", "parse error");
    }

    const isNegative = str.startsWith("-");
    const result = str.matchAll(/[0-9]+/g);
    const fields = [ ...result ];
    const hStr = fields[0][0];
    const mStr = fields[1][0];
    const sIStr = fields[2][0];
    let sFStr;
    if (fields.length >= 4) {
      sFStr = fields[3][0];
    }
    else {
      sFStr = "";
    }
    if (sFStr.length !== fractionDigits) {
      throw new _ixi.Exception("_ixi.DataError", "parse error (2)");
    }

    const hNanos = AbstractTemporal._hoursToNanos(Number.parseInt(hStr, 10));
    const mNanos = AbstractTemporal._minutesToNanos(Number.parseInt(mStr, 10));
    const sINanos = AbstractTemporal._secondsToNanos(Number.parseInt(sIStr, 10));
    const sFNanos = BigInt(sFStr.padEnd(9, "0"));

    let nanoseconds = hNanos + mNanos + sINanos + sFNanos;
    nanoseconds = isNegative ? (nanoseconds * -1n) : nanoseconds;

    return new Duration(nanoseconds);
  }

  /**
   * 時間量を、ISO 8601形式の文字列に変換し返却
   *     ※"PTnHnMnS"の形式で固定
   *       Y,M,Dは使用しない（場合によっては1D≠24Hとなる為）
   *       Hは24以上になりうる
   *     ※時間量が負の場合は先頭に"-"を付けて返却する（ISO 8601としては仕様違反）
   * @override
   * @param {DurationSerializeOptions} param0 - シリアライズオプション
   * @returns {string}
   */
  toString({ fractionDigits = 9 } = {}) {
    _ixi.precondition(() => Number.isSafeInteger(fractionDigits));
    _ixi.precondition(() => fractionDigits >= 0);
    _ixi.precondition(() => fractionDigits <= 9);

    const absTotalNanoseconds = (this.value < 0n) ? (this.value * -1n) : this.value;
    const fields = AbstractTemporal._fieldsOf(absTotalNanoseconds);

    const work = [];
    if (this.isNegative === true) {
      work.push("-");
    }
    work.push("PT");

    if (absTotalNanoseconds >= AbstractTemporal.HOUR) {
      work.push(Math.trunc(Math.abs(this.hours)).toString(10).padStart(2, "0"));
      work.push("H");
      work.push(fields.minute.toString(10).padStart(2, "0"));
      work.push("M");
      work.push(fields.second.toString(10).padStart(2, "0"));
    }
    else if (absTotalNanoseconds >= AbstractTemporal.MINUTE) {
      work.push("00H");
      work.push(Math.trunc(Math.abs(this.minutes)).toString(10).padStart(2, "0"));
      work.push("M");
      work.push(fields.second.toString(10).padStart(2, "0"));
    }
    else {
      work.push("00H00M");
      work.push(Math.trunc(Math.abs(this.seconds)).toString(10).padStart(2, "0"));
    }

    if (fractionDigits > 0) {
      work.push(".");
      let secondFraction = fields.nanosecond.toString(10).padStart(9, "0");
      secondFraction = secondFraction + "0".repeat(fractionDigits);
      secondFraction = secondFraction.substring(0, fractionDigits);
      work.push(secondFraction);
    }
    work.push("S");

    return work.join("");
  }

  /**
   * 時間量を、ISO 8601形式の文字列に変換し返却
   * @returns {string}
   */
  toJSON() {
    return this.toString();
  }

  /**
   * ミリ秒で表した時間量からインスタンスを生成し返却
   * @param {number} milliseconds - ミリ秒
   * @returns {Duration}
   */
  static ofMilliseconds(milliseconds) {
    _ixi.precondition(() => Number.isSafeInteger(milliseconds));

    return new Duration(AbstractTemporal._millisToNanos(milliseconds));
  }

  /**
   * 秒で表した時間量からインスタンスを生成し返却
   * @param {number} seconds - 秒
   * @returns {Duration}
   */
  static ofSeconds(seconds) {
    _ixi.precondition(() => Number.isSafeInteger(seconds));

    return new Duration(AbstractTemporal._secondsToNanos(seconds));
  }

  /**
   * 分で表した時間量からインスタンスを生成し返却
   * @param {number} minutes - 分
   * @returns {Duration}
   */
  static ofMinutes(minutes) {
    _ixi.precondition(() => Number.isSafeInteger(minutes));

    return new Duration(AbstractTemporal._minutesToNanos(minutes));
  }

  /**
   * 時で表した時間量からインスタンスを生成し返却
   * @param {number} hours - 時
   * @returns {Duration}
   */
  static ofHours(hours) {
    _ixi.precondition(() => Number.isSafeInteger(hours));

    return new Duration(AbstractTemporal._hoursToNanos(hours));
  }

  /**
   * 日で表した時間量からインスタンスを生成し返却
   * @param {number} days - 日
   * @returns {Duration}
   */
  static ofDays(days) {
    _ixi.precondition(() => Number.isSafeInteger(days));

    return new Duration(AbstractTemporal._daysToNanos(days));
  }

  /**
   * 自身の表す時間量と、他のDurationインスタンスの表す時間量が
   *     等しいか否かを返却
   * @param {Duration} other - 他のDurationインスタンス
   * @returns {boolean}
   */
  equals(other) {
    if (other instanceof Duration) {
      return (this.value === other.value);
    }
    return false;
  }

  /**
   * 自身の表す時間量に、他のDurationインスタンスの表す時間量を
   *     加算した新たなインスタンスを生成し返却
   * @param {Duration} other - 他のDurationインスタンス
   * @returns {Duration}
   */
  plus(other) {
    _ixi.precondition(() => other instanceof Duration);

    return new Duration(this.value + other.value);
  }

  /**
   * 自身の表す時間量から、他のDurationインスタンスの表す時間量を
   *     減算した新たなインスタンスを生成し返却
   * @param {Duration} other - 他のDurationインスタンス
   * @returns {Duration}
   */
  minus(other) {
    _ixi.precondition(() => other instanceof Duration);

    return new Duration(this.value - other.value);
  }

  /**
   * 自身の表す時間量が、他のDurationインスタンスの表す時間量より
   *     長いか否かを返却
   * @param {Duration} other - 他のDurationインスタンス
   * @returns {boolean}
   */
  isLongerThan(other) {
    _ixi.precondition(() => other instanceof Duration);

    return this._isGreaterThan(other);
  }

  /**
   * 自身の表す時間量が、他のDurationインスタンスの表す時間量より
   *     短いか否かを返却
   * @param {Duration} other - 他のDurationインスタンス
   * @returns {boolean}
   */
  isShorterThan(other) {
    _ixi.precondition(() => other instanceof Duration);

    return this._isLessThan(other);
  }
}
Object.freeze(Duration);

export { Duration };
