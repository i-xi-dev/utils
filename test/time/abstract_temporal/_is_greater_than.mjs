import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal.prototype._isGreaterThan", function() {

  const i0 = new AbstractTemporal(0n);
  const i1 = new AbstractTemporal(1n);
  const i1m = new AbstractTemporal(-1n);

  it("_isGreaterThan()", () => {
    assert.throws(() => {
      i0._isGreaterThan();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("_isGreaterThan(Time.AbstractTemporal)", () => {
    assert.strictEqual(i0._isGreaterThan(i0), false);
    assert.strictEqual(i1._isGreaterThan(i0), true);
    assert.strictEqual(i1m._isGreaterThan(i0), false);

  });

  it("_isGreaterThan(その他)", () => {
    assert.throws(() => {
      i0._isGreaterThan(0n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0._isGreaterThan(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0._isGreaterThan(false);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      i0._isGreaterThan(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入可", () => {
    i0._isGreaterThan = 500;
    assert.strictEqual(i0._isGreaterThan, 500);
  });

});
