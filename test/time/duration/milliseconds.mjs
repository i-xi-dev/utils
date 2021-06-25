import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.prototype.milliseconds", function() {

  const i0 = new Duration(0n);
  const i1 = new Duration(1n);
  const i1m = new Duration(-1n);
  const ix = new Duration(1000000n);
  const ixm = new Duration(-1000000n);

  it("milliseconds", () => {
    assert.strictEqual(i0.milliseconds, 0);
    assert.strictEqual(i1.milliseconds, 0.000001);
    assert.strictEqual(i1m.milliseconds, -0.000001);
    assert.strictEqual(ix.milliseconds, 1);
    assert.strictEqual(ixm.milliseconds, -1);

    assert.throws(() => {
      i0.milliseconds();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.milliseconds = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
