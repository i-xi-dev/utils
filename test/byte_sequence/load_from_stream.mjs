import assert from "assert";
import fs from "fs";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.loadFromStream", function() {

  const bs0 = ByteSequence.create(128);

  it("loadFromStream()", async () => {
    assert.rejects(async () => {
      await bs0.loadFromStream();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  const filePath = "./test/_testdata/128.txt";

  it("loadFromStream(NodeJS.ReadableStream)", async () => {
    const stream = fs.createReadStream(filePath, { highWaterMark: 64 });

    const bs1 = ByteSequence.create(128);
    await bs1.loadFromStream(stream);
    assert.strictEqual(bs1.format({}), [
      "30303030303030303030",
      "31313131313131313131",
      "32323232323232323232",
      "33333333333333333333",
      "34343434343434343434",
      "35353535353535353535",
      "36363636363636363636",
      "37373737373737373737",
      "38383838383838383838",
      "39393939393939393939",
      "30303030303030303030",
      "31313131313131313131",
      "3232323232323232",
    ].join(""));
  });

  it("loadFromStream(NodeJS.ReadableStream, number, number)", async () => {
    const size = fs.statSync(filePath).size;
    const stream = fs.createReadStream(filePath, { highWaterMark: 64 });

    const bs1 = ByteSequence.create(128);
    await bs1.loadFromStream(stream, 0, size);
    assert.strictEqual(bs1.format({}), [
      "30303030303030303030",
      "31313131313131313131",
      "32323232323232323232",
      "33333333333333333333",
      "34343434343434343434",
      "35353535353535353535",
      "36363636363636363636",
      "37373737373737373737",
      "38383838383838383838",
      "39393939393939393939",
      "30303030303030303030",
      "31313131313131313131",
      "3232323232323232",
    ].join(""));

    const sizeB = fs.statSync("./test/_testdata/32.txt").size;
    const streamB = fs.createReadStream("./test/_testdata/32.txt", { highWaterMark: 64 });

    const bs1B = ByteSequence.create(128);
    await bs1B.loadFromStream(streamB, 32, sizeB);
    assert.strictEqual(bs1B.format({}), [
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00003030303030303030",
      "30303131313131313131",
      "31313232323232323232",
      "32323333000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "0000000000000000",
    ].join(""));








    assert.rejects(async () => {
      const stream2 = fs.createReadStream("./test/_testdata/127.txt", { highWaterMark: 64 });

      const bs2 = ByteSequence.create(128);
      await bs2.loadFromStream(stream2, 0, 128);
    }, {
      name: "_ixi.DataError",
    });

    assert.rejects(async () => {
      const stream2 = fs.createReadStream("./test/_testdata/129.txt", { highWaterMark: 64 });

      const bs2 = ByteSequence.create(128);
      await bs2.loadFromStream(stream2, 0, 128);
    }, {
      name: "_ixi.DataError",
    });

    assert.rejects(async () => {
      const stream2 = fs.createReadStream(filePath, { highWaterMark: 64 });

      const bs2 = ByteSequence.create(128);
      await bs2.loadFromStream(stream2, 1, 128);
    }, {
      name: "_ixi.DataError",
    });

    assert.rejects(async () => {
      const stream2 = fs.createReadStream(filePath, { highWaterMark: 64 });

      const bs2 = ByteSequence.create(128);
      await bs2.loadFromStream(stream2, 128, 128);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.rejects(async () => {
      const stream2 = fs.createReadStream(filePath, { highWaterMark: 64 });

      const bs2 = ByteSequence.create(128);
      await bs2.loadFromStream(stream2, 0, 129);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("loadFromStream(NodeJS.ReadableStream, その他)", async () => {
    assert.rejects(async () => {
      const stream = fs.createReadStream(filePath, { highWaterMark: 64 });

      await bs0.loadFromStream(stream, null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.rejects(async () => {
      const stream = fs.createReadStream(filePath, { highWaterMark: 64 });

      await bs0.loadFromStream(stream, "0");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("loadFromStream(NodeJS.ReadableStream, number, その他)", async () => {
    assert.rejects(async () => {
      const stream = fs.createReadStream(filePath, { highWaterMark: 64 });

      await bs0.loadFromStream(stream, 0, null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.rejects(async () => {
      const stream = fs.createReadStream(filePath, { highWaterMark: 64 });

      await bs0.loadFromStream(stream, 0, "0");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("loadFromStream(その他)", async () => {
    assert.rejects(async () => {
      await bs0.loadFromStream(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      bs0.loadFromStream = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
