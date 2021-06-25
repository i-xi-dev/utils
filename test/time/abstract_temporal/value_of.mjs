import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal.prototype.valueOf", function() {

  const i0 = new AbstractTemporal(0n);
  const i1 = new AbstractTemporal(1n);
  const i1x = new AbstractTemporal(1000000n);
  const i1x2 = new AbstractTemporal(100000n);
  const i1xm = new AbstractTemporal(-1000000n);

  it("valueOf()", () => {
    assert.strictEqual(i0.valueOf(), 0);
    assert.strictEqual(i1.valueOf(), 0.000001);
    assert.strictEqual(i1x.valueOf(), 1);
    assert.strictEqual(i1x2.valueOf(), 0.1);
    assert.strictEqual(i1xm.valueOf(), -1);

    assert.strictEqual((new AbstractTemporal(1609556645678901900n)).valueOf(), 1609556645678.9019);
  });

  it("代入可", () => {
    i0.valueOf = 500;
    assert.strictEqual(i0.valueOf, 500);
  });

});
