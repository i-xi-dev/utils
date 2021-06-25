import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.prototype.equals", function() {

  const i0 = new Duration(0n);
  const i1 = new Duration(1n);
  const i1m = new Duration(-1n);

  it("equals()", () => {
    assert.strictEqual(i0.equals(), false);
  });

  it("equals(Time.Duration)", () => {
    assert.strictEqual(i0.equals(i1), false);
    assert.strictEqual(i0.equals(i1m), false);
    assert.strictEqual(i0.equals(i0), true);

  });

  it("equals(その他)", () => {
    assert.strictEqual(i0.equals(0n), false);
    assert.strictEqual(i0.equals(null), false);
    assert.strictEqual(i0.equals({}), false);

  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.equals = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
