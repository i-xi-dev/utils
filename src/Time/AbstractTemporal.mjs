/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:3de3d7c9-2944-4c6f-a0b7-0578f14b1ea3",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-17"
    }
  ]
}
*/

import { _ixi } from "../_ixi.mjs";

/**
 * 時間的オブジェクト
 * @abstract
 */
class AbstractTemporal {
  /**
   * 1ナノ秒を表すナノ秒
   * @constant {bigint}
   */
  static NANOS = 1n;

  /**
   * 1マイクロ秒を表すナノ秒
   * @constant {bigint}
   */
  static MICROS = 1000n;

  /**
   * 1ミリ秒を表すナノ秒
   * @constant {bigint}
   */
  static MILLIS = 1000000n;

  /**
   * 1秒を表すナノ秒
   * @constant {bigint}
   */
  static SECOND = 1000000000n;

  /**
   * 1分を表すナノ秒
   * @constant {bigint}
   */
  static MINUTE = 60000000000n;

  /**
   * 1時間を表すナノ秒
   * @constant {bigint}
   */
  static HOUR = 3600000000000n;

  /**
   * 1日を表すナノ秒
   * @constant {bigint}
   */
  static DAY = 86400000000000n;

  /**
   * ナノ秒で表した時間
   * @type {bigint}
   */
  #value = 0n;

  /**
   * @param {bigint} value - ナノ秒で表した時間
   */
  constructor (value) {
    _ixi.precondition(() => typeof value === "bigint");

    this.#value = value;
  }

  /**
   * ナノ秒で表した時間
   * @type {bigint}
   */
  get value() {
    return this.#value;
  }

  /**
   * ミリ秒をナノ秒に換算し返却
   * @protected
   * @param {number} milliseconds - ミリ秒
   * @returns {bigint}
   */
  static _millisToNanos(milliseconds) {
    _ixi.precondition(() => Number.isSafeInteger(milliseconds));

    return (BigInt(milliseconds) * AbstractTemporal.MILLIS);
  }

  /**
   * ナノ秒を指定した単位に換算し返却
   * @param {bigint} nanos - ナノ秒
   * @param {number} to - ナノ秒の何倍であるかで表した単位
   *     10の正の冪のみ有効
   * @returns {number}
   */
  static #convertNanos(nanos, to) {
    const isNegative = (nanos < 0);

    let move = 0;
    switch (to) {
      case AbstractTemporal.MILLIS:
        move = 6;
        break;
      case AbstractTemporal.SECOND:
        move = 9;
        break;
    }

    const nanosStr = nanos.toString(10).replace("-", "").padStart(move, "0");
    const toStr = ((isNegative === true) ? "-" : "") + nanosStr.substring(0, (nanosStr.length - move)) + "." + nanosStr.slice(-move);
    return Number.parseFloat(toStr);
  }

  /**
   * ナノ秒をミリ秒に換算し返却
   * @protected
   * @param {bigint} nanoseconds - ナノ秒
   * @returns {number}
   */
  static _nanosToMillis(nanoseconds) {
    _ixi.precondition(() => typeof nanoseconds === "bigint");

    return AbstractTemporal.#convertNanos(nanoseconds, AbstractTemporal.MILLIS);
  }

  /**
   * 秒をナノ秒に換算し返却
   * @protected
   * @param {number} seconds - 秒
   * @returns {bigint}
   */
  static _secondsToNanos(seconds) {
    _ixi.precondition(() => Number.isSafeInteger(seconds));

    return (BigInt(seconds) * AbstractTemporal.SECOND);
  }

  /**
   * ナノ秒を秒に換算し返却
   * @protected
   * @param {bigint} nanoseconds - ナノ秒
   * @returns {number}
   */
  static _nanosToSeconds(nanoseconds) {
    _ixi.precondition(() => typeof nanoseconds === "bigint");

    return AbstractTemporal.#convertNanos(nanoseconds, AbstractTemporal.SECOND);
  }

  /**
   * 分をナノ秒に換算し返却
   * @protected
   * @param {number} minutes - 分
   * @returns {bigint}
   */
  static _minutesToNanos(minutes) {
    _ixi.precondition(() => Number.isSafeInteger(minutes));

    return (BigInt(minutes) * AbstractTemporal.MINUTE);
  }

  /**
   * ナノ秒を分に換算し返却
   * @protected
   * @param {bigint} nanoseconds - ナノ秒
   * @returns {number}
   */
  static _nanosToMinutes(nanoseconds) {
    _ixi.precondition(() => typeof nanoseconds === "bigint");

    const milliseconds = AbstractTemporal._nanosToMillis(nanoseconds);
    return (milliseconds / 60000);
  }

  /**
   * 時をナノ秒に換算し返却
   * @protected
   * @param {number} hours - 時
   * @returns {bigint}
   */
  static _hoursToNanos(hours) {
    _ixi.precondition(() => Number.isSafeInteger(hours));

    return (BigInt(hours) * AbstractTemporal.HOUR);
  }

  /**
   * ナノ秒を時に換算し返却
   * @protected
   * @param {bigint} nanoseconds - ナノ秒
   * @returns {number}
   */
  static _nanosToHours(nanoseconds) {
    _ixi.precondition(() => typeof nanoseconds === "bigint");

    const milliseconds = AbstractTemporal._nanosToMillis(nanoseconds);
    return (milliseconds / 3600000);
  }

  /**
   * 日をナノ秒に換算し返却
   * @protected
   * @param {number} days - 日
   * @returns {bigint}
   */
  static _daysToNanos(days) {
    _ixi.precondition(() => Number.isSafeInteger(days));

    return (BigInt(days) * AbstractTemporal.DAY);
  }

  /**
   * ナノ秒を日に換算し返却
   * @protected
   * @param {bigint} nanoseconds - ナノ秒
   * @returns {number}
   */
  static _nanosToDays(nanoseconds) {
    _ixi.precondition(() => typeof nanoseconds === "bigint");

    const milliseconds = AbstractTemporal._nanosToMillis(nanoseconds);
    return (milliseconds / 86400000);
  }

  /**
   * 日時のフィールド
   * @typedef {Object} TemporalFields
   * @property {number} year - 年
   * @property {number} month - 1から12の月
   * @property {number} day - 1から31の日（day of month）
   * @property {number} dayOfYear - 未実装 //XXX
   * @property {number} dayOfWeek - 1から7の曜日（ISO 8601: 月曜日が1～日曜日が7）
   * @property {number} weekOfYear - 未実装 //XXX
   * @property {number} weekOfMonth - 未実装 //XXX
   * @property {number} hour - 0から23の時
   * @property {number} minute - 0から59の分
   * @property {number} second - 0から59の秒の整数部（JavaScriptのDateに閏秒は存在しないので最大値59）
   * @property {number} millisecond - 0から999の秒の小数部
   * @property {number} microsecond - 0から999999の秒の小数部
   * @property {number} nanosecond - 0から999999999の秒の小数部
   */

  /**
   * ナノ秒で表した時間から日時のフィールドを取得し返却
   * @protected
   * @param {bigint} temporalValue - ナノ秒で表した時間
   * @returns {TemporalFields}
   */
  static _fieldsOf(temporalValue) {
    _ixi.precondition(() => typeof temporalValue === "bigint");

    const str = temporalValue.toString(10).replace("-", "");
    let nanosecondStr = str.padStart(9, "0").slice(-9);
    let nanosecond = Number.parseInt(nanosecondStr, 10);
    let microsecond = Number.parseInt(nanosecondStr.substring(0, 6), 10);
    let millisecond = Number.parseInt(nanosecondStr.substring(0, 3), 10);
    if (temporalValue < 0) {
      const mn = (1000000000 - nanosecond).toString(10).slice(-9);
      nanosecond = Number.parseInt(mn, 10);
      microsecond = Number.parseInt(mn.substring(0, 6), 10);
      millisecond = Number.parseInt(mn.substring(0, 3), 10);
    }

    let fields;
    if ((temporalValue < 0) && (temporalValue > -AbstractTemporal.MILLIS)) {
      fields = new Date(AbstractTemporal._nanosToMillis(temporalValue) - 1);
    }
    else {
      fields = new Date(AbstractTemporal._nanosToMillis(temporalValue));
    }

    let dayOfWeek = fields.getUTCDay();
    if (dayOfWeek === 0) {
      dayOfWeek = 7;
    }

    return Object.freeze({
      year: fields.getUTCFullYear(),
      month: (fields.getUTCMonth() + 1),
      day: fields.getUTCDate(),
      dayOfWeek,
      hour: fields.getUTCHours(),
      minute: fields.getUTCMinutes(),
      second: fields.getUTCSeconds(),
      millisecond,
      microsecond,
      nanosecond,
    });
  }

  /**
   * ミリ秒で表した時間を返却
   * @override
   * @returns {number}
   */
  valueOf() {
    return AbstractTemporal._nanosToMillis(this.value);
  }

  /**
   * 自身の表す時間が、他のAbstractTemporalインスタンスの表す時間より
   *     大きいか否かを返却
   * @protected
   * @param {AbstractTemporal} other - 他のAbstractTemporalインスタンス
   * @returns {boolean}
   */
  _isGreaterThan(other) {
    _ixi.precondition(() => other instanceof AbstractTemporal);

    return (this.value > other.value);
  }

  /**
   * 自身の表す時間が、他のAbstractTemporalインスタンスの表す時間より
   *     小さいか否かを返却
   * @protected
   * @param {AbstractTemporal} other - 他のAbstractTemporalインスタンス
   * @returns {boolean}
   */
  _isLessThan(other) {
    _ixi.precondition(() => other instanceof AbstractTemporal);

    return (this.value < other.value);
  }
}
Object.freeze(AbstractTemporal);

export { AbstractTemporal };
