import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.startsWith", function() {

  const bs0 = ByteSequence.create(0);
  const bs0b = ByteSequence.create(0);

  const bs1 =  ByteSequence.from(Uint8Array.of(255, 0, 127, 1));
  const bs1b =  ByteSequence.of(255, 0, 127, 1);

  it("startsWith()", () => {
    assert.throws(() => {
      bs0.startsWith();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("startsWith(ByteSequence)", () => {
    assert.strictEqual(bs0.startsWith(bs0), true);
    assert.strictEqual(bs0.startsWith(bs0b), true);

    assert.strictEqual(bs1.startsWith(bs1), true);
    assert.strictEqual(bs1.startsWith(bs1b), true);
    assert.strictEqual(bs1.startsWith(bs0), true);
    assert.strictEqual(bs0.startsWith(bs1), false);

  });

  it("startsWith(Array)", () => {
    assert.strictEqual(bs0.startsWith([]), true);
    assert.strictEqual(bs1.startsWith(bs1.toArray()), true);
    assert.strictEqual(bs1.startsWith([255, 0, 127, 1]), true);

    assert.strictEqual(bs1.startsWith([255, 0, 127, 2]), false);
    assert.strictEqual(bs1.startsWith([255, 0, 127, 1, 2]), false);
    assert.strictEqual(bs1.startsWith([255, 0, 127]), true);
    assert.strictEqual(bs1.startsWith([255, 0]), true);
    assert.strictEqual(bs1.startsWith([255]), true);
    assert.strictEqual(bs1.startsWith([]), true);

  });

  it("startsWith(Uint8Array)", () => {
    assert.strictEqual(bs0.startsWith(new Uint8Array(0)), true);
    assert.strictEqual(bs1.startsWith(bs1.toUint8Array()), true);
    assert.strictEqual(bs1.startsWith(Uint8Array.of(255, 0, 127, 1)), true);

    assert.strictEqual(bs1.startsWith(Uint8Array.of(255, 0, 123, 1)), false);
    assert.strictEqual(bs1.startsWith(Uint8Array.of(255, 0, 127, 1, 5)), false);
    assert.strictEqual(bs1.startsWith(Uint8Array.of(255, 0, 127)), true);
    assert.strictEqual(bs1.startsWith(Uint8Array.of(255, 0)), true);
    assert.strictEqual(bs1.startsWith(Uint8Array.of(255)), true);
    assert.strictEqual(bs1.startsWith(Uint8Array.of()), true);
  });

  it("startsWith(その他)", () => {
    assert.throws(() => {
      bs0.startsWith(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs0.startsWith("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs0.startsWith(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      bs0.startsWith = 500;
    }, {
      name: "TypeError",
      //message: "Cannot add property startsWith, object is not extensible",
    });
  });

});
