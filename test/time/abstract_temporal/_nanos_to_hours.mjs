import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal._nanosToHours", function() {

  it("_nanosToHours()", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToHours();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("_nanosToHours(bigint)", () => {
    assert.strictEqual(AbstractTemporal._nanosToHours(0n), 0);
    assert.strictEqual(AbstractTemporal._nanosToHours(3600000000000n), 1);
    assert.strictEqual(AbstractTemporal._nanosToHours(-3600000000000n), -1);
    assert.strictEqual(AbstractTemporal._nanosToHours(5400000000000n), 1.5);
    assert.strictEqual(AbstractTemporal._nanosToHours(-5400000000000n), -1.5);
  });

  it("_nanosToHours(その他)", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToHours(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      AbstractTemporal._nanosToHours("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToHours = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
