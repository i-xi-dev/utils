import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.equals", function() {

  const bs0 = ByteSequence.create(0);
  const bs0b = ByteSequence.create(0);

  const bs1 =  ByteSequence.from(Uint8Array.of(255, 0, 127, 1));
  const bs1b =  ByteSequence.of(255, 0, 127, 1);

  it("equals()", () => {
    assert.throws(() => {
      bs0.equals();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("equals(ByteSequence)", () => {
    assert.strictEqual(bs0.equals(bs0), true);
    assert.strictEqual(bs0.equals(bs0b), true);

    assert.strictEqual(bs1.equals(bs1), true);
    assert.strictEqual(bs1.equals(bs1b), true);
    assert.strictEqual(bs1.equals(bs0), false);
    assert.strictEqual(bs0.equals(bs1), false);

  });

  it("equals(Array)", () => {
    assert.strictEqual(bs0.equals([]), true);
    assert.strictEqual(bs1.equals(bs1.toArray()), true);
    assert.strictEqual(bs1.equals([255, 0, 127, 1]), true);

    assert.strictEqual(bs1.equals([255, 0, 127, 2]), false);
    assert.strictEqual(bs1.equals([255, 0, 127, 1, 2]), false);
    assert.strictEqual(bs1.equals([255, 0, 127]), false);

  });

  it("equals(Uint8Array)", () => {
    assert.strictEqual(bs0.equals(new Uint8Array(0)), true);
    assert.strictEqual(bs1.equals(bs1.toUint8Array()), true);
    assert.strictEqual(bs1.equals(Uint8Array.of(255, 0, 127, 1)), true);

    assert.strictEqual(bs1.equals(Uint8Array.of(255, 0, 123, 1)), false);
    assert.strictEqual(bs1.equals(Uint8Array.of(255, 0, 127, 1, 5)), false);
    assert.strictEqual(bs1.equals(Uint8Array.of(255, 0, 127)), false);
  });

  it("equals(その他)", () => {
    assert.throws(() => {
      bs0.equals(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs0.equals("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs0.equals(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      bs0.equals = 500;
    }, {
      name: "TypeError",
      //message: "Cannot add property equals, object is not extensible",
    });
  });

});
