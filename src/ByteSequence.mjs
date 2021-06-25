/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:f4287ac5-c8fa-471f-83cc-ab06e38a1999",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-23"
    }
  ]
}
*/

import { _ixi } from "./_ixi.mjs";
import { Byte } from "./Byte.mjs";

/**
 * バイト列
 */
class ByteSequence {
  /**
   * 内部表現
   * @type {Uint8Array}
   */
  #bytes;

  /**
   * ArrayBufferをラップするインスタンスを生成
   *     ※外部からのArrayBufferの変更は当インスタンスに影響する
   * @param {ArrayBuffer} buffer - ArrayBuffer
   */
  constructor (buffer) {
    _ixi.precondition(() => buffer instanceof ArrayBuffer);

    this.#bytes = new Uint8Array(buffer);
    Object.freeze(this);
  }

  /**
   * バイト数
   * @type {number}
   */
  get count() {
    return this.#bytes.byteLength;
  }

  /**
   * 自身が参照しているArrayBufferへの参照を返却
   *     ※返却値に変更をくわえた場合、当インスタンスに影響する
   * @type {ArrayBuffer}
   */
  get buffer() {
    return this.#bytes.buffer;
  }

  /**
   * 自身のArrayBufferのビューを返却
   * @param {number} [byteOffset] - ビューのオフセット
   * @param {number} [elementCount] - ビューの要素数 ※バイト数ではなく
   *     TがTypedArrayの場合、バイト数× T.BYTES_PER_ELEMENT
   *     TがDataViewの場合はバイト数× 1
   * @param {Function} [T] - ArrayBufferView具象型のコンストラクター
   *     省略した場合Uint8Array
   * @returns {ArrayBufferView}
   */
  view(byteOffset, elementCount, T = Uint8Array) {
    _ixi.precondition(() => (byteOffset === undefined) || (Number.isSafeInteger(byteOffset) && (byteOffset >= 0) && (byteOffset < this.count)));
    _ixi.precondition(() => (T === DataView) || ((typeof T === "function") && Number.isSafeInteger(T.BYTES_PER_ELEMENT)));
    const bpe = T.BYTES_PER_ELEMENT ? T.BYTES_PER_ELEMENT : 1;
    _ixi.precondition(() => (elementCount === undefined) || (Number.isSafeInteger(elementCount) && (elementCount > 0) && ((elementCount * bpe) <= (this.count - byteOffset))));

    const bufferView = new T(this.#bytes.buffer, byteOffset, elementCount);
    _ixi.precondition(() => ArrayBuffer.isView(bufferView));

    return bufferView;
  }

  // /**
  // * 指定した位置のバイトを返却
  // * @param {number} index - 位置
  // * @returns {number}
  // */
  // at(index) {
  //  return this.#bytes.at(index);
  // }

  /**
   * 1バイト単位のジェネレーター
   * @returns {IterableIterator<number>}
   */
  [Symbol.iterator]() {
    return this.#bytes[Symbol.iterator]();
  }

  // async *[Symbol.asyncIterator]() {
  //  yield* this[Symbol.iterator]();
  // }

  /**
   * 指定した範囲のバイト列を返却
   *     ※ArrayBufferは新たに生成する
   * @param {number} byteOffset - 取得開始位置
   * @param {number} [byteCount] - 取得するバイト数
   * @returns {Uint8Array}
   */
  get(byteOffset, byteCount = 1) {
    _ixi.precondition(() => Number.isSafeInteger(byteOffset));
    _ixi.precondition(() => byteOffset >= 0);
    _ixi.precondition(() => byteOffset < this.count);
    _ixi.precondition(() => Number.isSafeInteger(byteCount));
    _ixi.precondition(() => byteCount > 0); //XXX byteCount >= 0 にすべき？
    _ixi.precondition(() => byteCount <= (this.count - byteOffset)); //XXX byteCount上限は無しにすべき？

    return Uint8Array.from(this.#bytes.subarray(byteOffset, (byteOffset + byteCount)));
  }

  /**
   * 指定した範囲のバイトを書き換え
   * @param {number} byteOffset - 書き換え開始位置
   * @param {ByteSequence|Array<number>|Uint8Array|Uint8ClampedArray} bytes - バイト列
   * @returns {void}
   */
  set(byteOffset, bytes) {
    _ixi.precondition(() => Number.isSafeInteger(byteOffset));
    _ixi.precondition(() => byteOffset >= 0);
    _ixi.precondition(() => byteOffset < this.count);
    _ixi.precondition(() => (bytes instanceof ByteSequence) || Array.isArray(bytes) || (bytes instanceof Uint8Array) || (bytes instanceof Uint8ClampedArray));
    if (Array.isArray(bytes)) {
      _ixi.precondition(() => bytes.every(byte => Byte.isByte(byte)));
    }

    let source;
    if (bytes instanceof ByteSequence) {
      source = bytes.#bytes;
    }
    else {
      source = bytes;
    }
    _ixi.precondition(() => source.length > 0);
    _ixi.precondition(() => source.length <= (this.count - byteOffset)); //XXX source.length >= 0 にすべき？

    this.#bytes.set(source, byteOffset);
  }

  // *segments(segmentByteCount) {
  //   _ixi.precondition(() => Number.isSafeInteger(segmentByteCount) && (segmentByteCount > 0));

  //   let i = 0;
  //   let itemLength = segmentByteCount;
  //   while (i < this.count) {
  //     if ((i + segmentByteCount) > this.count) {
  //       itemLength = this.count - i;
  //     }
  //     yield this.get(i, itemLength); //XXX 現状get第2引数に上限制約があるので、segmentByteCountはthis.countを割り切れる値に制約される
  //     i = i + segmentByteCount;
  //   }
  // }

  /**
   * 指定したバイト数でインスタンスを生成し返却
   *     ※ArrayBufferは新たに生成する
   *     ※各バイトは0
   * @param {number} byteCount - 生成するバイト列のバイト数
   * @returns {ByteSequence}
   */
  static create(byteCount) {
    _ixi.precondition(() => Number.isSafeInteger(byteCount));
    _ixi.precondition(() => byteCount >= 0);

    return new ByteSequence(new ArrayBuffer(byteCount));
  }

  /**
   * ランダムなバイトからなるインスタンスを生成し返却
   *     ※ArrayBufferは新たに生成する
   * @param {number} byteCount - 生成するバイト列のバイト数
   *     RandomSource.getRandomValuesの制約により、最大値は65536
   * @returns {ByteSequence}
   */
  static generateRandom(byteCount) {
    _ixi.precondition(() => Number.isSafeInteger(byteCount));
    _ixi.precondition(() => byteCount >= 0);
    _ixi.precondition(() => byteCount <= 65536);

    const randomBytes = globalThis.crypto.getRandomValues(new Uint8Array(byteCount));
    return new ByteSequence(randomBytes.buffer);
  }

  /**
   * バイト列を表す整数の配列をもとにインスタンスを生成し返却
   *     ※ArrayBufferは新たに生成する
   *     ※bytesがArrayBufferViewの場合、ビューの範囲外は無視する
   * @param {ByteSequence|Array<number>|Uint8Array|Uint8ClampedArray} bytes - バイト列
   * @returns {ByteSequence}
   */
  static from(bytes) {
    if (bytes instanceof ByteSequence) {
      return bytes.clone();
    }

    if (Array.isArray(bytes)) {
      _ixi.precondition(() => Array.isArray(bytes));
      _ixi.precondition(() => bytes.every(byte => Byte.isByte(byte)));
    }
    else {
      _ixi.precondition(() => (bytes instanceof Uint8Array) || (bytes instanceof Uint8ClampedArray));
    }

    return new ByteSequence(Uint8Array.from(bytes).buffer);
  }

  /**
   * バイト列を表す整数の配列をもとにインスタンスを生成し返却
   *     ※ArrayBufferは新たに生成する
   * @param {Array<number>} bytes - バイト列を表す整数の配列
   * @returns {ByteSequence}
   */
  static of(...bytes) {
    return ByteSequence.from(bytes);
  }

  /**
   * 自身のバイト列を表す整数の配列を生成し返却
   * @returns {Array<number>}
   */
  toArray() {
    return Array.from(this.#bytes);
  }

  /**
   * 自身のバイト列を表す整数の配列を生成し返却
   *     ※ArrayBufferは新たに生成する
   * @returns {Uint8Array}
   */
  toUint8Array() {
    return new Uint8Array(this.#bytes.buffer.slice(0));
  }

  /**
   * バイト列を表すBinary stringをもとにインスタンスを生成し返却
   *     ※ArrayBufferは新たに生成する
   * @deprecated
   * @param {string} binaryString - バイト列を表すBinary string
   * @returns {ByteSequence}
   */
  static fromBinaryString(binaryString) {
    _ixi.precondition(() => typeof binaryString === "string");
    _ixi.precondition(() => /^[\u{0}-\u{FF}]*$/u.test(binaryString));

    const bytes = [ ...binaryString ].map((char) => {
      return char.charCodeAt(0);
    });
    return ByteSequence.from(bytes);
  }

  /**
   * 自身のバイト列を表すBinary stringを生成し返却
   * @deprecated
   * @returns {string}
   */
  toBinaryString() {
    const chars = Array.from(this.#bytes, (byte) => {
      return String.fromCharCode(byte);
    });
    return chars.join("");
  }

  /**
   * 符号化文字列をバイト列に復号し、バイト列からインスタンスを生成し返却
   * @param {string} encoded - 符号化文字列
   * @param {string} encodingName - バイト符号化方式名
   * @param {ByteEncodingOptions} [options] - 符号化方式のオプション
   * @returns {ByteSequence}
   */
  static fromEncoded(encoded, encodingName, options = {}) {
    _ixi.precondition(() => typeof encoded === "string");
    _ixi.precondition(() => typeof options === "object");
    _ixi.precondition(() => options !== null);

    const encoding = Byte.Encoding.for(encodingName, options);
    return new ByteSequence(encoding.decode(encoded).buffer);
  }

  /**
   * 自身のバイト列を符号化した文字列を返却
   * @param {string} encodingName - バイト符号化方式名
   * @param {ByteEncodingOptions} [options] - 符号化方式のオプション
   * @returns {string}
   */
  toEncoded(encodingName, options = {}) {
    _ixi.precondition(() => typeof options === "object");
    _ixi.precondition(() => options !== null);

    const encoding = Byte.Encoding.for(encodingName, options);
    return encoding.encode(this.view());
  }

  /**
   * 自身のバイト列のハッシュを生成し返却
   *     ※非可逆変換
   * @async
   * @param {string} algorithmName - ハッシュアルゴリズム名
   * @returns {Promise<ByteSequence>}
   */
  async toDigest(algorithmName) {
    const algorithm = Byte.DigestAlgorithm.for(algorithmName);
    const digestBytes = await algorithm.compute(this.#bytes);
    return new ByteSequence(digestBytes.buffer);
  }

  /**
   * バイト列をフォーマットした文字列からインスタンスを生成し返却
   *     ※ArrayBufferは新たに生成する
   * @param {string} toParse - バイト列をフォーマットした文字列
   * @param {ByteFormatOptions} [options] - フォーマッターオプション
   * @returns {ByteSequence}
   */
  static parse(toParse, options = {}) {
    _ixi.precondition(() => typeof toParse === "string");
    _ixi.precondition(() => typeof options === "object");
    _ixi.precondition(() => options !== null);

    const formatter = new Byte.Format(options);
    const bytes = formatter.parse(toParse);
    return new ByteSequence(bytes.buffer);
  }

  /**
   * 自身のバイト列の各バイトを表す文字列を連結した文字列を生成し返却
   * @param {ByteFormatOptions} [options] - フォーマッターオプション
   * @returns {string}
   */
  format(options = {}) {
    _ixi.precondition(() => typeof options === "object");
    _ixi.precondition(() => options !== null);

    const formatter = new Byte.Format(options);
    return formatter.format(this.#bytes);
  }

  /**
   * 自身のバイト列の各バイトを表す文字列を連結した文字列を生成し返却
   * @override
   * @returns {string}
   */
  toString() {
    return this.format();
  }

  /**
   * 自身のバイト列を整数の配列に変換し返却
   * @returns {Array<number>}
   */
  toJSON() {
    return this.toArray();
  }

  /**
   * 自身のバイト列が、指定したバイト列と同じ並びで始まっているか否かを返却
   * @param {Array<number>|Uint8Array|Uint8ClampedArray} otherBytes - バイト列
   * @returns {boolean}
   */
  #startsWith(otherBytes) {
    for (let i = 0; i < otherBytes.length; i++) {
      if (otherBytes[i] !== this.#bytes[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * 自身のバイト列と、他のオブジェクトの表すバイト列が等しいか否かを返却
   * @param {ByteSequence|Array<number>|Uint8Array|Uint8ClampedArray} bytes - バイト列
   * @returns {boolean}
   */
  equals(bytes) {
    _ixi.precondition(() => (bytes instanceof ByteSequence) || Array.isArray(bytes) || (bytes instanceof Uint8Array) || (bytes instanceof Uint8ClampedArray));

    let otherBytes;
    if (bytes instanceof ByteSequence) {
      otherBytes = bytes.#bytes;
    }
    else {
      otherBytes = bytes;
    }

    if (otherBytes.length !== this.count) {
      return false;
    }

    return this.#startsWith(otherBytes);
  }

  /**
   * 自身のバイト列が、指定したバイト列と同じ並びで始まっているか否かを返却
   * @param {ByteSequence|Array<number>|Uint8Array|Uint8ClampedArray} bytes - バイト列
   * @returns {boolean}
   */
  startsWith(bytes) {
    _ixi.precondition(() => (bytes instanceof ByteSequence) || Array.isArray(bytes) || (bytes instanceof Uint8Array) || (bytes instanceof Uint8ClampedArray));

    let otherBytes;
    if (bytes instanceof ByteSequence) {
      otherBytes = bytes.#bytes;
    }
    else {
      otherBytes = bytes;
    }

    if (otherBytes.length > this.count) {
      return false;
    }

    return this.#startsWith(otherBytes);
  }

  /**
   * 自身のバイト列の複製を生成し返却
   *     ※参照するArrayBufferも複製する
   * @returns {ByteSequence}
   */
  clone() {
    const clonedBuffer = this.#bytes.buffer.slice(0);
    return new ByteSequence(clonedBuffer);
  }

  /**
   * 自身のバイト列の部分複製を生成し返却
   *     ※参照するArrayBufferも複製する
   *     ※コピーではなくビューが欲しい場合は、bufferプロパティでArrayBufferを取得してビューを作ればよい（new Uint8Array(xf0ByteSequence.buffer, 24, 128)など）
   * @param {number} start - 開始インデックス
   * @param {number} [end] - 終了インデックス
   * @returns {ByteSequence}
   */
  subsequence(start, end) {
    _ixi.precondition(() => Number.isSafeInteger(start));
    _ixi.precondition(() => start >= 0);
    _ixi.precondition(() => start <= this.count);
    _ixi.precondition(() => (end === undefined) || (Number.isSafeInteger(end) && (end >= start) && (end <= this.count)));

    const slicedBuffer = this.#bytes.buffer.slice(start, end);
    return new ByteSequence(slicedBuffer);
  }

  /**
   * 可読ストリームを読み取り、自身にロードする
   * ストリームを終端まで読んだら終了
   * @param {ReadableStream<Uint8Array>|NodeJS.ReadableStream} stream - 可読ストリーム
   *     ※NodeJS.ReadableStreamの場合、チャンクがArrayBufferのストリーム
   * @param {number} [byteOffset] - 自身へのセット開始位置
   *     省略した場合0
   * @param {number} [byteCount] - ストリームから読み取るバイト数
   *     省略した場合、自身のcount
   * @returns {Promise<void>}
   * @throws {_ixi.Exception} streamから読み取ったバイト数とbyteCountが不一致の場合スロー
   */
  async loadFromStream(stream, byteOffset = 0, byteCount = this.count) {
    _ixi.precondition(() => Number.isSafeInteger(byteOffset));
    _ixi.precondition(() => byteOffset >= 0);
    _ixi.precondition(() => byteOffset < this.count);
    _ixi.precondition(() => Number.isSafeInteger(byteCount));
    _ixi.precondition(() => byteCount >= 0);
    _ixi.precondition(() => (byteOffset + byteCount) <= this.count);
    _ixi.precondition(() => Boolean(stream));

    const reader = new Byte.StreamReader();
    const bytes = await reader.read(stream, byteCount);
    if (bytes.byteLength !== byteCount) {
      throw new _ixi.Exception("_ixi.DataError", "stream size mismatch");
    }
    this.set(byteOffset, bytes);
  }

  /**
   * 可読ストリームを読み取り、読み取ったバイト列からインスタンスを生成し返却
   * @param {ReadableStream<Uint8Array>|NodeJS.ReadableStream} stream - 可読ストリーム
   *     ※NodeJS.ReadableStreamの場合、チャンクがArrayBufferのストリーム
   * @param {number} [totalByteCount] - ストリームから読み取るバイト数
   * @param {boolean} [ignoreSizeMismatch] - totalByteCountを指定した場合に、streamから読み取ったバイト数とtotalByteCountの不一致を無視するか否か
   * @returns {ByteSequence}
   * @throws {_ixi.Exception} ignoreSizeMismatchがfalseかつ、streamから読み取ったバイト数とtotalByteCountが不一致の場合スロー
   */
  static async fromStream(stream, totalByteCount, ignoreSizeMismatch = true) {
    _ixi.precondition(() => typeof ignoreSizeMismatch === "boolean");

    const reader = new Byte.StreamReader();
    const bytes = await reader.read(stream, totalByteCount);
    if ((ignoreSizeMismatch === false) && Number.isSafeInteger(totalByteCount) && (bytes.byteLength !== totalByteCount)) {
      throw new _ixi.Exception("_ixi.DataError", "stream size mismatch");
    }
    return ByteSequence.from(bytes);
  }
}
Object.freeze(ByteSequence);

export { ByteSequence };
