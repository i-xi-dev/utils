import assert from "assert";
import { Time } from "../../../index.mjs";
const Instant = Time.Instant;

describe("Time.Instant.prototype.isBefore", function() {

  const i0 = new Instant(0n);
  const i1 = new Instant(1n);
  const i1m = new Instant(-1n);

  it("isBefore()", () => {
    assert.throws(() => {
      i0.isBefore();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("isBefore(Time.Duration)", () => {
    assert.strictEqual(i0.isBefore(i1), true);
    assert.strictEqual(i0.isBefore(i1m), false);
    assert.strictEqual(i0.isBefore(i0), false);
    assert.strictEqual(i1.isBefore(i1), false);
    assert.strictEqual(i1.isBefore(i1m), false);
    assert.strictEqual(i1.isBefore(i0), false);
    assert.strictEqual(i1m.isBefore(i1), true);
    assert.strictEqual(i1m.isBefore(i1m), false);
    assert.strictEqual(i1m.isBefore(i0), true);

  });

  it("isBefore(その他)", () => {
    assert.throws(() => {
      i0.isBefore(0n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0.isBefore(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.isBefore = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
