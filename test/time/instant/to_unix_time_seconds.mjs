import assert from "assert";
import { Time } from "../../../index.mjs";
const Instant = Time.Instant;

describe("Time.Instant.prototype.toUnixTimeSeconds", function() {

  const i0 = new Instant(0n);

  it("toUnixTimeSeconds()", () => {
    assert.strictEqual(i0.toUnixTimeSeconds(), 0);

    assert.strictEqual((new Instant(1000000000n)).toUnixTimeSeconds(), 1);
    assert.strictEqual((new Instant(-1000000000n)).toUnixTimeSeconds(), -1);

  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.toUnixTimeSeconds = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });
});
