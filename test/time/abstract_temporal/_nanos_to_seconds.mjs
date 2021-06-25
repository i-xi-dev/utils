import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal._nanosToSeconds", function() {

  it("_nanosToSeconds()", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToSeconds();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("_nanosToSeconds(bigint)", () => {
    assert.strictEqual(AbstractTemporal._nanosToSeconds(0n), 0);
    assert.strictEqual(AbstractTemporal._nanosToSeconds(1000000000n), 1);
    assert.strictEqual(AbstractTemporal._nanosToSeconds(-1000000000n), -1);
    assert.strictEqual(AbstractTemporal._nanosToSeconds(1500000000n), 1.5);
    assert.strictEqual(AbstractTemporal._nanosToSeconds(-1500000000n), -1.5);
  });

  it("_nanosToSeconds(その他)", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToSeconds(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      AbstractTemporal._nanosToSeconds("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToSeconds = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
