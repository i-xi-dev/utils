import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;
const Instant = Time.Instant;

describe("Time.Instant.prototype.minus", function() {

  const i0 = new Instant(0n);
  const i1 = new Instant(1n);
  const i1m = new Instant(-1n);

  it("minus()", () => {
    assert.throws(() => {
      i0.minus();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("minus(Time.Duration)", () => {
    const j0 = new Duration(0n);
    const j1 = new Duration(1n);
    const j1m = new Duration(-1n);

    assert.strictEqual(i0.minus(j0).value, 0n);
    assert.strictEqual(i0.minus(j1).value, -1n);
    assert.strictEqual(i0.minus(j1m).value, 1n);
    assert.strictEqual(i1.minus(j1).value, 0n);
    assert.strictEqual(i1.minus(j0).value, 1n);
    assert.strictEqual(i1.minus(j1m).value, 2n);

  });

  it("minus(その他)", () => {
    assert.throws(() => {
      i0.minus(0n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0.minus(i0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0.minus(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.minus = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
