/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:81fa82b5-6c1d-4f89-8f6b-717366d9dd08",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-09"
    }
  ]
}
*/

import { _ixi } from "../_ixi.mjs";
import { AbstractTemporal } from "./AbstractTemporal.mjs";
import { Duration } from "./Duration.mjs";

/**
 * 時刻
 * 不変オブジェクト
 */
class Instant extends AbstractTemporal {
  /**
   * @param {bigint} value - 1970-01-01T00:00:00Zからの経過時間（ナノ秒）で表した時刻
   */
  constructor (value) {
    super(value);
    Object.freeze(this);
  }

  /**
   * 現在時刻を表すインスタンスを生成し返却
   * @returns {Instant}
   */
  static now() {
    const hires = performance.timeOrigin + performance.now();
    return new Instant(BigInt(hires.toFixed(6).replace(".", "")));
  }

  /**
   * Unix時間のミリ秒からインスタンスを生成し返却
   * @param {number} unixTimeMillis - Unix時間（ミリ秒）
   * @returns {Instant}
   */
  static fromUnixTimeMilliseconds(unixTimeMillis) {
    _ixi.precondition(() => Number.isSafeInteger(unixTimeMillis));

    return new Instant(AbstractTemporal._millisToNanos(unixTimeMillis));
  }

  /**
   * Unix時間をミリ秒で返却
   * @returns {number}
   */
  toUnixTimeMilliseconds() {
    return Math.trunc(AbstractTemporal._nanosToMillis(this.value));
  }

  /**
   * Unix時間の秒からインスタンスを生成し返却
   * @param {number} unixTimeSeconds - Unix時間（秒）
   * @returns {Instant}
   */
  static fromUnixTimeSeconds(unixTimeSeconds) {
    _ixi.precondition(() => Number.isSafeInteger(unixTimeSeconds));

    return new Instant(AbstractTemporal._secondsToNanos(unixTimeSeconds));
  }

  /**
   * Unix時間を秒で返却
   * @returns {number}
   */
  toUnixTimeSeconds() {
    return Math.trunc(AbstractTemporal._nanosToSeconds(this.value));
  }

  /**
   * Date型オブジェクトからインスタンスを生成し返却
   * @param {Date} datetime - Date型オブジェクト
   * @returns {Instant}
   */
  static fromDate(datetime) {
    _ixi.precondition(() => datetime instanceof Date);

    return Instant.fromUnixTimeMilliseconds(datetime.getTime());
  }

  /**
   * 自身と同じ時刻を表すDate型オブジェクトを生成し返却
   * ※ただし精度はミリ秒に落ちる
   * @returns {Date}
   */
  toDate() {
    return new Date(this.toUnixTimeMilliseconds());
  }

  /**
   * シリアライズオプション
   * @typedef {Object} InstantSerializeOptions
   * @property {number} fractionDigits - 秒の小数部の桁数
   */

  /**
   * 時刻を表すISO 8601形式の文字列からインスタンスを生成し返却
   * @param {string} str - 時刻を表すISO 8601形式の文字列
   * @param {InstantSerializeOptions} [param1] - シリアライズオプション
   * @returns {Instant}
   * @throws {_ixi.Exception} iso8601が時刻を表すISO 8601形式の文字列ではない場合スロー
   */
  static fromString(str, { fractionDigits = 9 } = {}) {
    _ixi.precondition(() => typeof str === "string");
    _ixi.precondition(() => Number.isSafeInteger(fractionDigits));
    _ixi.precondition(() => fractionDigits >= 0);
    _ixi.precondition(() => fractionDigits <= 9);

    if (/^([\+\-][0-9]{6}|[0-9]{4})-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9](:[0-5][0-9](\.[0-9]+)?)?(Z|[\+\-][0-1][0-9]:[0-5][0-9])$/.test(str) !== true) {
      //XXX Z以外のオフセットは受け付けないようにする？
      throw new _ixi.Exception("_ixi.DataError", "parse error");
    }

    const msI = Date.parse(str);
    if (Number.isNaN(msI)) {
      throw new _ixi.Exception("_ixi.DataError", "parse error (2)");
    }
    const msINanos = AbstractTemporal._millisToNanos(msI);

    if (fractionDigits > 0) {
      if (str.includes(".") !== true) {
        throw new _ixi.Exception("_ixi.DataError", "parse error (3)");
      }

      let work = str.split(".")[1];
      if (work.includes("Z")) {
        work = work.substring(0, work.length - 1);
      }
      else {
        work = work.substring(0, work.length - 6);
      }

      if ((work.length !== fractionDigits) || (/^[0-9]+$/.test(work) !== true)) {
        throw new _ixi.Exception("_ixi.DataError", "parse error (4)");
      }

      if (fractionDigits > 3) {
        const msFStr = work.substring(3);
        const msFNanos = BigInt(msFStr.padEnd(6, "0"));
        let nanoseconds;
        nanoseconds = msINanos + msFNanos;
        return new Instant(nanoseconds);
      }
      else {
        return new Instant(msINanos);
      }
    }
    else {
      if (str.includes(".")) {
        throw new _ixi.Exception("_ixi.DataError", "parse error (5)");
      }

      return new Instant(msINanos);
    }
  }

  /**
   * 時刻を、ISO 8601形式の文字列に変換し返却
   *     オフセットは+00:00(UTC)固定
   * @param {InstantSerializeOptions} [param0] - シリアライズオプション
   * @returns {string}
   */
  toString({ fractionDigits = 9 } = {}) {
    _ixi.precondition(() => Number.isSafeInteger(fractionDigits));
    _ixi.precondition(() => fractionDigits >= 0);
    _ixi.precondition(() => fractionDigits <= 9);

    const fields = AbstractTemporal._fieldsOf(this.value);

    const work = [];

    if ((fields.year < 0) || (fields.year > 9999)) {
      work.push((fields.year < 0) ? "-" : "+");
      work.push(Math.abs(fields.year).toString(10).padStart(6, "0"));
    }
    else {
      work.push(fields.year.toString(10).padStart(4, "0"));
    }
    work.push("-");

    work.push(fields.month.toString(10).padStart(2, "0"));
    work.push("-");
    work.push(fields.day.toString(10).padStart(2, "0"));
    work.push("T");
    work.push(fields.hour.toString(10).padStart(2, "0"));
    work.push(":");
    work.push(fields.minute.toString(10).padStart(2, "0"));
    work.push(":");
    work.push(fields.second.toString(10).padStart(2, "0"));

    if (fractionDigits > 0) {
      work.push(".");
      let secondFraction = fields.nanosecond.toString(10).padStart(9, "0");
      secondFraction = secondFraction.substring(0, fractionDigits);
      work.push(secondFraction);
    }
    work.push("Z");

    return work.join("");
  }

  /**
   * 時刻を、ISO 8601形式の文字列に変換し返却
   *     オフセットは+00:00(UTC)固定
   * @returns {string}
   */
  toJSON() {
    return this.toString();
  }

  /**
   * 自身の表す時刻と、他のInstantインスタンスの表す時刻が
   *     等しいか否かを返却
   * @param {Instant} other - 他のInstantインスタンス
   * @returns {boolean}
   */
  equals(other) {
    if (other instanceof Instant) {
      return (this.value === other.value);
    }
    return false;
  }

  /**
   * 自身の表す時刻に指定した時間量を加算した新たな時刻を表すインスタンスを生成し返却
   * @param {Duration} duration - 加算する時間量
   * @returns {Instant}
   */
  plus(duration) {
    _ixi.precondition(() => duration instanceof Duration);

    return new Instant(this.value + duration.value);
  }

  /**
   * 自身の表す時刻から指定した時間量を減算した新たな時刻を表すインスタンスを生成し返却
   * @param {Duration} duration - 減算する時間量
   * @returns {Instant}
   */
  minus(duration) {
    _ixi.precondition(() => duration instanceof Duration);

    return new Instant(this.value - duration.value);
  }

  /**
   * 自身の表す時刻が、他のInstantインスタンスの表す時刻より
   *     後か否かを返却
   * @param {Instant} other - 他のInstantインスタンス
   * @returns {boolean}
   */
  isAfter(other) {
    _ixi.precondition(() => other instanceof Instant);

    return this._isGreaterThan(other);
  }

  /**
   * 自身の表す時刻が、他のInstantインスタンスの表す時刻より
   *     前か否かを返却
   * @param {Instant} other - 他のInstantインスタンス
   * @returns {boolean}
   */
  isBefore(other) {
    _ixi.precondition(() => other instanceof Instant);

    return this._isLessThan(other);
  }
}
Object.freeze(Instant);

export { Instant };
