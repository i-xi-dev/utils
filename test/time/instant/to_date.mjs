import assert from "assert";
import { Time } from "../../../index.mjs";
const Instant = Time.Instant;

describe("Time.Instant.prototype.toDate", function() {

  const i0 = new Instant(0n);

  it("toDate()", () => {
    assert.strictEqual(i0.toDate().valueOf(), 0);

    assert.strictEqual((new Instant(1000000n)).toDate().valueOf(), 1);
    assert.strictEqual((new Instant(-1000000n)).toDate().valueOf(), -1);

    const n = Date.now();
    assert.strictEqual(Instant.fromUnixTimeMilliseconds(n).toDate().valueOf(), n);
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.toDate = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });
});
