import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.prototype.plus", function() {

  const i0 = new Duration(0n);
  const i1 = new Duration(1n);
  const i1m = new Duration(-1n);

  it("plus()", () => {
    assert.throws(() => {
      i0.plus();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("plus(Time.Duration)", () => {
    assert.strictEqual(i0.plus(i0).value, 0n);
    assert.strictEqual(i0.plus(i1).value, 1n);
    assert.strictEqual(i0.plus(i1m).value, -1n);
    assert.strictEqual(i1.plus(i1).value, 2n);
    assert.strictEqual(i1.plus(i0).value, 1n);
    assert.strictEqual(i1.plus(i1m).value, 0n);

  });

  it("plus(その他)", () => {
    assert.throws(() => {
      i0.plus(0n);
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
