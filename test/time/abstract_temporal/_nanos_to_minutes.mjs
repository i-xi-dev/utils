import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal._nanosToMinutes", function() {

  it("_nanosToMinutes()", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToMinutes();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("_nanosToMinutes(bigint)", () => {
    assert.strictEqual(AbstractTemporal._nanosToMinutes(0n), 0);
    assert.strictEqual(AbstractTemporal._nanosToMinutes(60000000000n), 1);
    assert.strictEqual(AbstractTemporal._nanosToMinutes(-60000000000n), -1);
    assert.strictEqual(AbstractTemporal._nanosToMinutes(90000000000n), 1.5);
    assert.strictEqual(AbstractTemporal._nanosToMinutes(-90000000000n), -1.5);
  });

  it("_nanosToMinutes(その他)", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToMinutes(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      AbstractTemporal._nanosToMinutes("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToMinutes = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
