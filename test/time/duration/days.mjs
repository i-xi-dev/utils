import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.prototype.days", function() {

  const i0 = new Duration(0n);
  const i1 = new Duration(86400n);
  const i1m = new Duration(-86400n);
  const ix = new Duration(86400000000000n);
  const ixm = new Duration(-86400000000000n);
  const iy = new Duration(129600000000000n);
  const iym = new Duration(-129600000000000n);

  it("days", () => {
    assert.strictEqual(i0.days, 0);
    assert.strictEqual(i1.days.toFixed(9), (0.000000001).toFixed(9));
    assert.strictEqual(i1m.days.toFixed(9), (-0.000000001).toFixed(9));
    assert.strictEqual(ix.days, 1);
    assert.strictEqual(ixm.days, -1);
    assert.strictEqual(iy.days, 1.5);
    assert.strictEqual(iym.days, -1.5);

    assert.throws(() => {
      i0.days();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.days = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
