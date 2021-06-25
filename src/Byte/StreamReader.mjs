/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:e2469258-049b-4376-8f82-042c51b5c26f",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-24"
    }
  ]
}
*/

import { _ixi } from "../_ixi.mjs";

/**
 * バイトのストリーム読取器
 */
class StreamReader extends EventTarget {
  /**
   * 状態
   * @enum {symbol}
   */
  static #State = Object.freeze({
    /** 初期状態 */
    EMPTY: Symbol("StreamReader.#State.EMPTY"),
    /** 読取中 */
    LOADING: Symbol("StreamReader.#State.LOADING"),
    /** 読取終了後 */
    DONE: Symbol("StreamReader.#State.DONE"),
  });

  /**
   * 読み取るストリームのサイズを明示しなかった場合のバッファーサイズ
   * @constant {number}
   */
  static #DEFAULT_BUFFER_SIZE = 1048576;

  /**
   * 状態
   * @type {StreamReader.#State}
   */
  #state;

  /**
   * 
   */
  constructor () {
    super();
    this.#state = StreamReader.#State.EMPTY;
    Object.seal(this);
  }

  /**
   * 可読ストリームを読み取り、Uint8Arrayのチャンクを返却する非同期ジェネレーターを返却
   * @param {ReadableStreamDefaultReader<Uint8Array>} reader - 可読ストリームのリーダー //XXX ReadableStreamBYOBReaderにする？Chrome/Edgeでしか使えない2021-06
   * @returns {AsyncIterableIterator<Uint8Array>}
   * //XXX ReadableStream自体が[Symbol.asyncIterator]を持つ仕様になる。実装はまだ無い？2021-06
   */
  static async *#createChunkGeneratorW(reader) {
    for (let i = await reader.read(); (i.done !== true); i = await reader.read()) {
      yield i.value;
    }
  }

  /**
   * 可読ストリームを読み取り、Uint8Arrayのチャンクを返却する非同期ジェネレーターを返却
   * @param {NodeJS.ReadableStream} stream - 可読ストリーム
   *     ※チャンクがArrayBufferのストリーム
   * @returns {AsyncIterableIterator<Uint8Array>}
   */
  static async *#createChunkGeneratorN(stream) {
    for await (const { buffer } of stream) {
      yield new Uint8Array(buffer);
    }
  }

  /**
   * プログレスイベントを発火する
   * @param {string} eventName - イベント名
   * @returns {void}
   */
  #notify(eventName, loadedByteCount, totalByteCount) {
    this.dispatchEvent(new _ixi.ProgressEvent(eventName, {
      lengthComputable: (totalByteCount !== undefined),
      loaded: loadedByteCount,
      total: (totalByteCount !== undefined) ? totalByteCount : 0,
    }));
  }

  /**
   * 読取オプション
   * @typedef {Object} StreamReadingOptions
   * @property {AbortSignal} [abortSignal] - 中断シグナル（絶え間なく読めるストリームの場合、すべて読み取るまで中断されない）
   * @property {number} [timeout] - TODO 未実装（絶え間なく読めるストリームの場合、すべて読み取るまでタイムアウトされない）
   */

  /**
   * 可読ストリームをすべて読み取り、ArrayBufferを返却する
   * @param {ReadableStream<Uint8Array>|NodeJS.ReadableStream} stream - 可読ストリーム
   * @param {number} [totalByteCount] - ストリームのバイト数
   *     不明な場合は省略（undefined）可
   * @param {StreamReadingOptions} [param2] - 読取オプション
   * @returns {Promise<Uint8Array>}
   * @throws {_ixi.Exception} #stateが読み取り中のときに実行した場合スロー
   */
  async read(stream, totalByteCount, { abortSignal, timeout } = {}) {
    _ixi.precondition(() => Boolean(stream));
    _ixi.precondition(() => (Number.isSafeInteger(totalByteCount) && (totalByteCount >= 0) || (totalByteCount === undefined)));
    _ixi.precondition(() => ((abortSignal instanceof AbortSignal) || (abortSignal === undefined)));

    if (this.#state === StreamReader.#State.LOADING) {
      throw new _ixi.Exception("_ini.InvalidStateError", "invalid state");
    }
    this.#state = StreamReader.#State.LOADING;

    let reader;
    let chunkGenerator;
    if (globalThis.ReadableStream && (stream instanceof ReadableStream)) {
      reader = stream.getReader();
      chunkGenerator = StreamReader.#createChunkGeneratorW(reader);
    }
    else {
      _ixi.precondition(() => Reflect.has(stream, "readableObjectMode"));
      _ixi.precondition(() => stream.readableObjectMode === false);
      _ixi.precondition(() => Reflect.has(stream, "readableEncoding"));
      _ixi.precondition(() => stream.readableEncoding === null);

      chunkGenerator = StreamReader.#createChunkGeneratorN(stream);
    }

    if (abortSignal) {
      if (abortSignal.aborted === true) {
        this.#state = StreamReader.#State.DONE;
        throw new _ixi.Exception("AbortError", "already aborted");
      }

      if (globalThis.ReadableStream && (stream instanceof ReadableStream)) {
        abortSignal.addEventListener("abort", () => {
          // stream.cancel()しても読取終了まで待ちになるので、reader.cancel()する
          reader.cancel(); //TODO closeで良い？
        }, {
          once: true,
        });
      }
      else {
        abortSignal.addEventListener("abort", () => {
          stream.destroy();
        }, {
          once: true,
        });
      }
    }

    let buffer;
    if (totalByteCount === undefined) {
      buffer = new Uint8Array(StreamReader.#DEFAULT_BUFFER_SIZE);
    }
    else {
      buffer = new Uint8Array(totalByteCount);
    }
    let loadedByteCount = 0;
    for await (const chunkBytes of chunkGenerator) {
      buffer = StreamReader.#addToBuffer(buffer, loadedByteCount, chunkBytes);
      loadedByteCount = loadedByteCount + chunkBytes.byteLength;

      this.#notify("progress", loadedByteCount, totalByteCount);
    }
    if (abortSignal?.aborted === true) {
      this.#state = StreamReader.#State.DONE;
      throw new _ixi.Exception("AbortError", "aborted");
    }

    let returnValue;
    if ((totalByteCount === undefined) || (buffer.byteLength > loadedByteCount)) {
      returnValue = buffer.subarray(0, loadedByteCount);//XXX こっちが良い？ return buffer.buffer.slice(0, loadedByteCount);
    }
    else {
      returnValue = buffer;
    }

    this.#state = StreamReader.#State.DONE;
    return returnValue;
  }

  /**
   * bufferのloadedByteCountの位置にchunkBytesをセットする
   * bufferのサイズが不足する場合は新たにサイズ拡張したUint8Arrayを生成しbufferの内容をコピーする
   * サイズ拡張したUint8Arrayを生成した場合は生成したUint8Arrayを返却し、それ以外の場合は引数bufferをそのまま返却する
   * @param {Uint8Array} buffer - chunkBytesをセットする先のUint8Array
   * @param {number} loadedByteCount - bufferのchunkBytesをセットする開始位置
   * @param {Uint8Array} chunkBytes - bufferの指定位置にセットするUint8Array
   * @returns {Uint8Array}
   */
  static #addToBuffer(buffer, loadedByteCount, chunkBytes) {
    let work = buffer;
    //console.log(chunkBytes.byteLength);
    if ((loadedByteCount + chunkBytes.byteLength) > buffer.byteLength) {
      const extent = Math.max(chunkBytes.byteLength, StreamReader.#DEFAULT_BUFFER_SIZE);
      const extendedBuffer = new Uint8Array(loadedByteCount + (extent * 10)); //XXX どのくらいが適正？
      extendedBuffer.set(buffer, 0);
      work = extendedBuffer;
    }
    work.set(chunkBytes, loadedByteCount);
    return work;
  }
}
Object.freeze(StreamReader);

export { StreamReader };
