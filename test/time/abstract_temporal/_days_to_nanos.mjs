import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal._daysToNanos", function() {

  it("_daysToNanos()", () => {
    assert.throws(() => {
      AbstractTemporal._daysToNanos();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("_daysToNanos(number)", () => {
    assert.strictEqual(AbstractTemporal._daysToNanos(0), 0n);
    assert.strictEqual(AbstractTemporal._daysToNanos(1), 86400000000000n);
    assert.strictEqual(AbstractTemporal._daysToNanos(-1), -86400000000000n);

    assert.throws(() => {
      AbstractTemporal._daysToNanos(1.5);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("_daysToNanos(その他)", () => {
    assert.throws(() => {
      AbstractTemporal._daysToNanos(1n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      AbstractTemporal._daysToNanos("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      AbstractTemporal._daysToNanos = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
