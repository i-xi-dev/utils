import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.prototype.isShorterThan", function() {

  const i0 = new Duration(0n);
  const i1 = new Duration(1n);
  const i1m = new Duration(-1n);

  it("isShorterThan()", () => {
    assert.throws(() => {
      i0.isShorterThan();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("isShorterThan(Time.Duration)", () => {
    assert.strictEqual(i0.isShorterThan(i1), true);
    assert.strictEqual(i0.isShorterThan(i1m), false);
    assert.strictEqual(i0.isShorterThan(i0), false);
    assert.strictEqual(i1.isShorterThan(i1), false);
    assert.strictEqual(i1.isShorterThan(i1m), false);
    assert.strictEqual(i1.isShorterThan(i0), false);
    assert.strictEqual(i1m.isShorterThan(i1), true);
    assert.strictEqual(i1m.isShorterThan(i1m), false);
    assert.strictEqual(i1m.isShorterThan(i0), true);

  });

  it("isShorterThan(その他)", () => {
    assert.throws(() => {
      i0.isShorterThan(0n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0.isShorterThan(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.isShorterThan = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
