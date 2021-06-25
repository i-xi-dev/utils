import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.generateRandom", function() {

  it("generateRandom()", () => {
    assert.throws(() => {
      ByteSequence.generateRandom();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("generateRandom(number)", () => {
    const bs0 = ByteSequence.generateRandom(0);
    const bs1 = ByteSequence.generateRandom(65536);

    assert.strictEqual(bs0.buffer.byteLength, 0);
    assert.strictEqual(bs1.buffer.byteLength, 65536);

    const rds = [];
    for (let i = 0; i < 1024; i++) {
      rds.push(JSON.stringify(ByteSequence.generateRandom(256).toArray()));
    }
    assert.strictEqual(rds.length, new Set(rds).size);

    assert.throws(() => {
      ByteSequence.generateRandom(65537);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.generateRandom(-1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.generateRandom(1.5);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.generateRandom(Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("generateRandom(その他)", () => {
    assert.throws(() => {
      ByteSequence.generateRandom("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.generateRandom(BigInt("1"));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      ByteSequence.generateRandom = 500;
    }, {
      name: "TypeError",
      //message: "Cannot assign to read only property 'generateRandom' of function 'class ByteSequence { ...",
    });
  });

});
