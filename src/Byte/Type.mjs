/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:bb4d615f-c9c7-4eba-860f-60b903de157d",
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
 * バイト（オクテット）
 * @static
 */
class ByteType {
  /**
   * バイトの最小値
   * @constant {number}
   */
  static MIN_VALUE = 0x0;

  /**
   * バイトの最大値
   * @constant {number}
   */
  static MAX_VALUE = 0xFF;

  /**
   * @throws {_ixi.Exception} 必ずスロー
   */
  constructor () {
    throw new _ixi.Exception("_ixi.NotSupportedError");
  }

  /**
   * 対象がnumber型の8-bit符号なし整数の範囲内の値であるか否かを返却
   * @param {*} value - 検査対象
   * @returns {boolean}
   */
  static isByte(value) {
    return (Number.isSafeInteger(value) && (value >= ByteType.MIN_VALUE) && (value <= ByteType.MAX_VALUE));
  }
}
Object.freeze(ByteType);

export { ByteType as Type };
