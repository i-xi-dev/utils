import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.create", function() {

  it("create()", () => {
    assert.throws(() => {
      ByteSequence.create();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("create(number)", () => {
    const bs0 = ByteSequence.create(0);
    const bs1 = ByteSequence.create(1024 * 1024 * 1);

    assert.strictEqual(bs0.buffer.byteLength, 0);
    assert.strictEqual(bs1.buffer.byteLength, 1024 * 1024 * 1);

    assert.throws(() => {
      ByteSequence.create(-1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.create(1.5);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.create(Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("create(その他)", () => {
    assert.throws(() => {
      ByteSequence.create("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.create(BigInt("1"));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      ByteSequence.create = 500;
    }, {
      name: "TypeError",
      //message: "Cannot assign to read only property 'create' of function 'class ByteSequence { ...",
    });
  });

});
