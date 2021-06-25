import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.prototype.isNegative", function() {

  const i0 = new Duration(0n);
  const i1 = new Duration(86400n);
  const i1m = new Duration(-86400n);
  const ix = new Duration(86400000000000n);
  const ixm = new Duration(-86400000000000n);

  it("isNegative", () => {
    assert.strictEqual(i0.isNegative, false);
    assert.strictEqual(i1.isNegative, false);
    assert.strictEqual(i1m.isNegative, true);
    assert.strictEqual(ix.isNegative, false);
    assert.strictEqual(ixm.isNegative, true);

    assert.throws(() => {
      i0.isNegative();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.isNegative = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
