import assert from "assert";
import fs from "fs";
import { Readable } from "stream";
import { Byte } from "../../../index.mjs";

describe("Byte.StreamReader.prototype.read", function() {
  const r0 = new Byte.StreamReader();

  it("read()", async () => {
    await assert.rejects(async () => {
      await r0.read();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("read(NodeJS.ReadableStream)", async () => {
    const stream = fs.createReadStream("./test/_testdata/128.txt", { highWaterMark: 64 });
    //const ac = new AbortController();
    //const pn = new EventTarget();

    const bytes = await r0.read(stream);
    assert.strictEqual(bytes.byteLength, 128);
    //assert.strictEqual(bytes.buffer.byteLength, 1048576);

    // 読み取り中に読取
    const r0b = new Byte.StreamReader();
    const stream3a = new Readable({
      read() {}
    });
    const stream3b = new Readable({
      read() {}
    });
    let i = 0;
    const t = setInterval(() => {
      i++;
      if (i > 10) {
        stream3a.push(null);
        stream3b.push(null);
        clearInterval(t);
      }
      else {
        stream3a.push(new Uint8Array(64));
        stream3b.push(new Uint8Array(64));
      }
    }, 2);
    await assert.rejects(async () => {
      await Promise.all([
        r0b.read(stream3a),
        r0b.read(stream3b)
      ]);
    }, {
      name: "_ini.InvalidStateError",
    });
  });

  it("read(NodeJS.ReadableStream, number)", async () => {
    const stream = fs.createReadStream("./test/_testdata/128.txt", { highWaterMark: 64 });
    const bytes = await r0.read(stream, 128);
    assert.strictEqual(bytes.byteLength, 128);
    assert.strictEqual(bytes.buffer.byteLength, 128);

    const stream2 = fs.createReadStream("./test/_testdata/128.txt", { highWaterMark: 64 });
    const bytes2 = await r0.read(stream2, 256);
    assert.strictEqual(bytes2.byteLength, 128);
    assert.strictEqual(bytes2.buffer.byteLength, 256);

    const stream3 = fs.createReadStream("./test/_testdata/128.txt", { highWaterMark: 64 });
    const bytes3 = await r0.read(stream3, 64);
    assert.strictEqual(bytes3.byteLength, 128);
    //assert.strictEqual(bytes3.buffer.byteLength, 10485824);

  });

  it("read(NodeJS.ReadableStream, number, StreamReadingOptions)", async () => {
    // abortSignal
    const stream = fs.createReadStream("./test/_testdata/128.txt", { highWaterMark: 64 });
    const ac = new AbortController();
    const bytes = await r0.read(stream, 128, {abortSignal: ac.signal});
    assert.strictEqual(bytes.byteLength, 128);

    const stream2 = fs.createReadStream("./test/_testdata/128.txt", { highWaterMark: 64 });
    const ac2 = new AbortController();
    ac2.abort();
    await assert.rejects(async () => {
      await r0.read(stream2, 128, {abortSignal: ac2.signal});
    }, {
      name: "AbortError",
    });

    const stream3 = new Readable({
      read() {}
    });
    const ac3 = new AbortController();
    let i = 0;
    const t = setInterval(() => {
      i++;
      if (i > 10) {
        stream3.push(null);
        clearInterval(t);
      }
      else {
        stream3.push(new Uint8Array(64));
      }
    }, 2);
    const bytes3 = await r0.read(stream3, undefined, {abortSignal: ac3.signal});
    assert.strictEqual(bytes3.byteLength, 640);

    const stream4 = new Readable({
      read() {}
    });
    const ac4 = new AbortController();
    let i2 = 0;
    const t2 = setInterval(() => {
      i2++;
      if (i2 > 10) {
        ac4.abort();
        clearInterval(t2);
      }
      else {
        stream4.push(new Uint8Array(64));
      }
    }, 2);
    await assert.rejects(async () => {
      await r0.read(stream4, undefined, {abortSignal: ac4.signal});
    }, {
      name: "AbortError",
    });

  });

  it("read(その他)", async () => {
    await assert.rejects(async () => {
      await r0.read(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      r0.read = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
