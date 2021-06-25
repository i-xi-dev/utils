import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal.prototype.value", function() {

  const i0 = new AbstractTemporal(0n);
  const i1 = new AbstractTemporal(1n);
  const i1m = new AbstractTemporal(-1n);

  it("value", () => {
    assert.strictEqual(i0.value, 0n);
    assert.strictEqual(i1.value, 1n);
    assert.strictEqual(i1m.value, -1n);

    assert.throws(() => {
      i0.value();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.value = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
