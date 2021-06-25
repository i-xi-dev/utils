import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.prototype.minutes", function() {

  const i0 = new Duration(0n);
  const i1 = new Duration(60n);
  const i1m = new Duration(-60n);
  const ix = new Duration(60000000000n);
  const ixm = new Duration(-60000000000n);
  const iy = new Duration(90000000000n);
  const iym = new Duration(-90000000000n);

  it("minutes", () => {
    assert.strictEqual(i0.minutes, 0);
    assert.strictEqual(i1.minutes.toFixed(9), (0.000000001).toFixed(9));
    assert.strictEqual(i1m.minutes.toFixed(9), (-0.000000001).toFixed(9));
    assert.strictEqual(ix.minutes, 1);
    assert.strictEqual(ixm.minutes, -1);
    assert.strictEqual(iy.minutes, 1.5);
    assert.strictEqual(iym.minutes, -1.5);

    assert.throws(() => {
      i0.minutes();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.minutes = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
