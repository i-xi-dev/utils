import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal._millisToNanos", function() {

  it("_millisToNanos()", () => {
    assert.throws(() => {
      AbstractTemporal._millisToNanos();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("_millisToNanos(number)", () => {
    assert.strictEqual(AbstractTemporal._millisToNanos(0), 0n);
    assert.strictEqual(AbstractTemporal._millisToNanos(1), 1000000n);
    assert.strictEqual(AbstractTemporal._millisToNanos(-1), -1000000n);
  });

  it("_millisToNanos(その他)", () => {
    assert.throws(() => {
      AbstractTemporal._millisToNanos(1n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      AbstractTemporal._millisToNanos("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      AbstractTemporal._millisToNanos = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
