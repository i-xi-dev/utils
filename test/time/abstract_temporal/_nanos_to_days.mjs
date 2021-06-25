import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal._nanosToDays", function() {

  it("_nanosToDays()", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToDays();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("_nanosToDays(bigint)", () => {
    assert.strictEqual(AbstractTemporal._nanosToDays(0n), 0);
    assert.strictEqual(AbstractTemporal._nanosToDays(86400000000000n), 1);
    assert.strictEqual(AbstractTemporal._nanosToDays(-86400000000000n), -1);
    assert.strictEqual(AbstractTemporal._nanosToDays(129600000000000n), 1.5);
    assert.strictEqual(AbstractTemporal._nanosToDays(-129600000000000n), -1.5);
  });

  it("_nanosToDays(その他)", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToDays(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      AbstractTemporal._nanosToDays("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      AbstractTemporal._nanosToDays = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
