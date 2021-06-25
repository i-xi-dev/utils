import assert from "assert";
import fs from "fs";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.fromStream", function() {

  it("fromStream()", async () => {
    await assert.rejects(async () => {
      await ByteSequence.fromStream();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("fromStream(NodeJS.ReadableStream)", async () => {
    const stream = fs.createReadStream("./test/_testdata/128.txt", { highWaterMark: 64 });
    const b0 = await ByteSequence.fromStream(stream);
    assert.strictEqual(b0.count, 128);

  });

  it("fromStream(NodeJS.ReadableStream, number)", async () => {
    const stream = fs.createReadStream("./test/_testdata/128.txt", { highWaterMark: 64 });
    const b0 = await ByteSequence.fromStream(stream, 128);
    assert.strictEqual(b0.count, 128);

    const stream2 = fs.createReadStream("./test/_testdata/128.txt", { highWaterMark: 64 });
    const b02 = await ByteSequence.fromStream(stream2, 256);
    assert.strictEqual(b02.count, 128);

  });

  it("fromStream(NodeJS.ReadableStream, number, boolean)", async () => {
    const stream = fs.createReadStream("./test/_testdata/128.txt", { highWaterMark: 64 });
    const b0 = await ByteSequence.fromStream(stream, 256, true);
    assert.strictEqual(b0.count, 128);

    const stream2 = fs.createReadStream("./test/_testdata/128.txt", { highWaterMark: 64 });
    await assert.rejects(async () => {
      await ByteSequence.fromStream(stream2, 256, false);
    }, {
      name: "_ixi.DataError",
    });

  });

  it("fromStream(その他)", async () => {
    await assert.rejects(async () => {
      await ByteSequence.fromStream(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      ByteSequence.fromStream = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
