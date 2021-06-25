import assert from "assert";
import { Time } from "../../../index.mjs";
const Instant = Time.Instant;

describe("Time.Instant.prototype.toUnixTimeMilliseconds", function() {

  const i0 = new Instant(0n);

  it("toUnixTimeMilliseconds()", () => {
    assert.strictEqual(i0.toUnixTimeMilliseconds(), 0);

    assert.strictEqual((new Instant(1000000n)).toUnixTimeMilliseconds(), 1);
    assert.strictEqual((new Instant(-1000000n)).toUnixTimeMilliseconds(), -1);

    const n = Date.now();
    assert.strictEqual(Instant.fromUnixTimeMilliseconds(n).toUnixTimeMilliseconds(), n);
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.toUnixTimeMilliseconds = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });
});
