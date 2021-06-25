import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal._secondsToNanos", function() {

  it("_secondsToNanos()", () => {
    assert.throws(() => {
      AbstractTemporal._secondsToNanos();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("_secondsToNanos(number)", () => {
    assert.strictEqual(AbstractTemporal._secondsToNanos(0), 0n);
    assert.strictEqual(AbstractTemporal._secondsToNanos(1), 1000000000n);
    assert.strictEqual(AbstractTemporal._secondsToNanos(-1), -1000000000n);

    assert.throws(() => {
      AbstractTemporal._secondsToNanos(1.5);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("_secondsToNanos(その他)", () => {
    assert.throws(() => {
      AbstractTemporal._secondsToNanos(1n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      AbstractTemporal._secondsToNanos("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      AbstractTemporal._secondsToNanos = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
