import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.prototype.seconds", function() {

  const i0 = new Duration(0n);
  const i1 = new Duration(1n);
  const i1m = new Duration(-1n);
  const ix = new Duration(1000000000n);
  const ixm = new Duration(-1000000000n);
  const iy = new Duration(1500000000n);
  const iym = new Duration(-1500000000n);

  it("seconds", () => {
    assert.strictEqual(i0.seconds, 0);
    assert.strictEqual(i1.seconds, 0.000000001);
    assert.strictEqual(i1m.seconds, -0.000000001);
    assert.strictEqual(ix.seconds, 1);
    assert.strictEqual(ixm.seconds, -1);
    assert.strictEqual(iy.seconds, 1.5);
    assert.strictEqual(iym.seconds, -1.5);

    assert.throws(() => {
      i0.seconds();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.seconds = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
