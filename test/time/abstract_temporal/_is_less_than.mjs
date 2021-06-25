import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal.prototype._isLessThan", function() {

  const i0 = new AbstractTemporal(0n);
  const i1 = new AbstractTemporal(1n);
  const i1m = new AbstractTemporal(-1n);

  it("_isLessThan()", () => {
    assert.throws(() => {
      i0._isLessThan();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("_isLessThan(Time.AbstractTemporal)", () => {
    assert.strictEqual(i0._isLessThan(i0), false);
    assert.strictEqual(i1._isLessThan(i0), false);
    assert.strictEqual(i1m._isLessThan(i0), true);

  });

  it("_isLessThan(その他)", () => {
    assert.throws(() => {
      i0._isLessThan(0n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0._isLessThan(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0._isLessThan(false);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0._isLessThan(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入可", () => {
    i0._isLessThan = 500;
    assert.strictEqual(i0._isLessThan, 500);
  });

});
