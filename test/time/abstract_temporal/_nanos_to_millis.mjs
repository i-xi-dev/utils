import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal._nanosToMillis", function() {

  it("_nanosToMillis()", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToMillis();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("_nanosToMillis(bigint)", () => {
    assert.strictEqual(AbstractTemporal._nanosToMillis(0n), 0);
    assert.strictEqual(AbstractTemporal._nanosToMillis(1000000n), 1);
    assert.strictEqual(AbstractTemporal._nanosToMillis(-1000000n), -1);
  });

  it("_nanosToMillis(その他)", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToMillis(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      AbstractTemporal._nanosToMillis("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToMillis = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
