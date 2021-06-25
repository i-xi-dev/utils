import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.of", function() {

  it("of()", () => {
    const bs0 = ByteSequence.of();
    assert.strictEqual(bs0.buffer.byteLength, 0);
  });

  it("of(...number)", () => {
    const bs0 = ByteSequence.of(1,2,3,4,5);
    assert.strictEqual(bs0.buffer.byteLength, 5);

    const a1 = [1,2,3,4,5,6];
    const bs1 = ByteSequence.of(...a1);
    assert.strictEqual(bs1.buffer.byteLength, 6);

    assert.strictEqual([...bs1][2], 3);

    assert.throws(() => {
      ByteSequence.of(256);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.of(-1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.of(Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("of(その他)", () => {
    assert.throws(() => {
      ByteSequence.of(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.of("0");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.of([1,2,3]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      ByteSequence.of = 500;
    }, {
      name: "TypeError",
      //message: "Cannot assign to read only property 'of' of function 'class ByteSequence { ...",
    });
  });

});
