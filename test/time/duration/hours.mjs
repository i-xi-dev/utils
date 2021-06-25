import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.prototype.hours", function() {

  const i0 = new Duration(0n);
  const i1 = new Duration(3600n);
  const i1m = new Duration(-3600n);
  const ix = new Duration(3600000000000n);
  const ixm = new Duration(-3600000000000n);
  const iy = new Duration(5400000000000n);
  const iym = new Duration(-5400000000000n);

  it("hours", () => {
    assert.strictEqual(i0.hours, 0);
    assert.strictEqual(i1.hours.toFixed(9), (0.000000001).toFixed(9));
    assert.strictEqual(i1m.hours.toFixed(9), (-0.000000001).toFixed(9));
    assert.strictEqual(ix.hours, 1);
    assert.strictEqual(ixm.hours, -1);
    assert.strictEqual(iy.hours, 1.5);
    assert.strictEqual(iym.hours, -1.5);

    assert.throws(() => {
      i0.hours();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.hours = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
