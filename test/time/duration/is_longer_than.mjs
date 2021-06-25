import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.prototype.isLongerThan", function() {

  const i0 = new Duration(0n);
  const i1 = new Duration(1n);
  const i1m = new Duration(-1n);

  it("isLongerThan()", () => {
    assert.throws(() => {
      i0.isLongerThan();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("isLongerThan(Time.Duration)", () => {
    assert.strictEqual(i0.isLongerThan(i1), false);
    assert.strictEqual(i0.isLongerThan(i1m), true);
    assert.strictEqual(i0.isLongerThan(i0), false);
    assert.strictEqual(i1.isLongerThan(i1), false);
    assert.strictEqual(i1.isLongerThan(i1m), true);
    assert.strictEqual(i1.isLongerThan(i0), true);
    assert.strictEqual(i1m.isLongerThan(i1), false);
    assert.strictEqual(i1m.isLongerThan(i1m), false);
    assert.strictEqual(i1m.isLongerThan(i0), false);

  });

  it("isLongerThan(その他)", () => {
    assert.throws(() => {
      i0.isLongerThan(0n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0.isLongerThan(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.isLongerThan = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
