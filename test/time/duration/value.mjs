import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.prototype.value", function() {

  const i0 = new Duration(0n);
  const i1 = new Duration(1n);
  const i1m = new Duration(-1n);

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
