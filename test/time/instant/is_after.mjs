import assert from "assert";
import { Time } from "../../../index.mjs";
const Instant = Time.Instant;

describe("Time.Instant.prototype.isAfter", function() {

  const i0 = new Instant(0n);
  const i1 = new Instant(1n);
  const i1m = new Instant(-1n);

  it("isAfter()", () => {
    assert.throws(() => {
      i0.isAfter();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("isAfter(Time.Duration)", () => {
    assert.strictEqual(i0.isAfter(i1), false);
    assert.strictEqual(i0.isAfter(i1m), true);
    assert.strictEqual(i0.isAfter(i0), false);
    assert.strictEqual(i1.isAfter(i1), false);
    assert.strictEqual(i1.isAfter(i1m), true);
    assert.strictEqual(i1.isAfter(i0), true);
    assert.strictEqual(i1m.isAfter(i1), false);
    assert.strictEqual(i1m.isAfter(i1m), false);
    assert.strictEqual(i1m.isAfter(i0), false);

  });

  it("isAfter(その他)", () => {
    assert.throws(() => {
      i0.isAfter(0n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0.isAfter(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.isAfter = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
