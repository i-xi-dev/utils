import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;
const Instant = Time.Instant;

describe("Time.Instant.prototype.plus", function() {

  const i0 = new Instant(0n);
  const i1 = new Instant(1n);
  const i1m = new Instant(-1n);

  it("plus()", () => {
    assert.throws(() => {
      i0.plus();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("plus(Time.Duration)", () => {
    const j0 = new Duration(0n);
    const j1 = new Duration(1n);
    const j1m = new Duration(-1n);

    assert.strictEqual(i0.plus(j0).value, 0n);
    assert.strictEqual(i0.plus(j1).value, 1n);
    assert.strictEqual(i0.plus(j1m).value, -1n);
    assert.strictEqual(i1.plus(j1).value, 2n);
    assert.strictEqual(i1.plus(j0).value, 1n);
    assert.strictEqual(i1.plus(j1m).value, 0n);

  });

  it("plus(その他)", () => {
    assert.throws(() => {
      i0.plus(0n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0.plus(i0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0.plus(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.plus = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
