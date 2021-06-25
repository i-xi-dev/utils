import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal._minutesToNanos", function() {

  it("_minutesToNanos()", () => {
    assert.throws(() => {
      AbstractTemporal._minutesToNanos();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("_minutesToNanos(number)", () => {
    assert.strictEqual(AbstractTemporal._minutesToNanos(0), 0n);
    assert.strictEqual(AbstractTemporal._minutesToNanos(1), 60000000000n);
    assert.strictEqual(AbstractTemporal._minutesToNanos(-1), -60000000000n);

    assert.throws(() => {
      AbstractTemporal._minutesToNanos(1.5);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("_minutesToNanos(その他)", () => {
    assert.throws(() => {
      AbstractTemporal._minutesToNanos(1n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      AbstractTemporal._minutesToNanos("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      AbstractTemporal._minutesToNanos = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
