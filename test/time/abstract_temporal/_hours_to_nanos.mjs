import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal._hoursToNanos", function() {

  it("_hoursToNanos()", () => {
    assert.throws(() => {
      AbstractTemporal._hoursToNanos();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("_hoursToNanos(number)", () => {
    assert.strictEqual(AbstractTemporal._hoursToNanos(0), 0n);
    assert.strictEqual(AbstractTemporal._hoursToNanos(1), 3600000000000n);
    assert.strictEqual(AbstractTemporal._hoursToNanos(-1), -3600000000000n);

    assert.throws(() => {
      AbstractTemporal._hoursToNanos(1.5);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("_hoursToNanos(その他)", () => {
    assert.throws(() => {
      AbstractTemporal._hoursToNanos(1n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      AbstractTemporal._hoursToNanos("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      AbstractTemporal._hoursToNanos = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
