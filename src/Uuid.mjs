/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:d071cf39-f061-4e34-a462-bc65a425cafb",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-05-30"
    }
  ]
}
*/

import { _ixi } from "./_ixi.mjs";
import { ByteSequence } from "./ByteSequence.mjs";
import { Uri } from "./Uri.mjs";

/**
 * @type {symbol}
 */
const _I = Symbol();

/**
 * UUID（RFC 4122）
 *     不変オブジェクト
 *     ※Nil UUIDと乱数形式（v4）のみ実装
 */
class Uuid {
  /**
   * フィールド配列
   *     フィールド1は32ビット
   *     フィールド2～4は各16ビット
   *     フィールド5は48ビット
   *     合計128ビット
   * @type {Array<ByteSequence>}
   */
  #fields;

  /**
   * @param {symbol} i - publicに呼べないように小細工
   * @param {Array<ByteSequence>} fields - フィールド配列
   */
  constructor (i, fields) {
    _ixi.precondition(() => i === _I);
    _ixi.precondition(() => Array.isArray(fields));
    _ixi.precondition(() => fields.length === 5);
    _ixi.precondition(() => fields.every(field => field instanceof ByteSequence));
    _ixi.precondition(() => fields[0].count === 4);
    _ixi.precondition(() => fields[1].count === 2);
    _ixi.precondition(() => fields[2].count === 2);
    _ixi.precondition(() => fields[3].count === 2);
    _ixi.precondition(() => fields[4].count === 6);

    this.#fields = fields.map(field => field.clone());
    Object.freeze(this.#fields);

    Object.freeze(this);
  }

  /**
   * 乱数形式のUUIDを生成し返却
   * @returns {Uuid}
   */
  static generateRandom() {
    const randomBytes = ByteSequence.generateRandom(16).view();
    const field1 = ByteSequence.from(randomBytes.slice(0, 4));
    const field2 = ByteSequence.from(randomBytes.slice(4, 6));
    const field3 = ByteSequence.from(randomBytes.slice(6, 8));
    const field4 = ByteSequence.from(randomBytes.slice(8, 10));
    const field5 = ByteSequence.from(randomBytes.slice(10, 16));

    // フィールド3の先頭4ビット（7バイト目の上位4ビット）は0100₂固定（13桁目の文字列表現は"4"固定）
    const field3Bytes = new Uint8Array(field3.buffer);
    field3Bytes[0] = field3Bytes[0] & 0x0F | 0x40;

    // フィールド4の先頭2ビット（9バイト目の上位2ビット）は10₂固定（17桁目の文字列表現は"8","9","A","B"のどれか）
    const field4Bytes = new Uint8Array(field4.buffer);
    field4Bytes[0] = field4Bytes[0] & 0x3F | 0x80;

    return new Uuid(_I, [
      field1,
      field2,
      field3,
      field4,
      field5,
    ]);
  }

  /**
   * Nil UUID（全ビットが0のUUID）を生成し返却
   * @returns {Uuid}
   */
  static nil() {
    return new Uuid(_I, [
      ByteSequence.from(new Uint8Array(4)),
      ByteSequence.from(new Uint8Array(2)),
      ByteSequence.from(new Uint8Array(2)),
      ByteSequence.from(new Uint8Array(2)),
      ByteSequence.from(new Uint8Array(6)),
    ]);
  }

  /**
   * 自身のUUIDと、他のオブジェクトの表すUUIDが等しいか否かを返却
   * @param {Uuid|string} uuid - UUID
   * @returns {boolean}
   */
  equals(uuid) {
    _ixi.precondition(() => (uuid instanceof Uuid) || (typeof uuid === "string"));

    let uuidString;
    if (uuid instanceof Uuid) {
      uuidString = uuid.toString();
    }
    else {
      uuidString = uuid.toLowerCase();
    }
    return (this.toString() === uuidString);
  }

  /**
   * 文字列表現を返却
   * @override
   * @returns {string}
   */
  toString() {
    const fieldStringArray = this.#fields.map((field) => {
      return field.format();
    });

    return fieldStringArray.join("-");
  }

  /**
   * 文字列表現を返却
   * @returns {string}
   */
  toJSON() {
    return this.toString();
  }

  /**
   * URNを生成し返却
   * @returns {Uri}
   */
  toUrn() {
    return new Uri("urn:uuid:" + this.toString());
  }
}
Object.freeze(Uuid);

export { Uuid };
