import assert from "assert";
import { Time } from "../../../index.mjs";
const Instant = Time.Instant;

describe("Time.Instant.prototype.toJSON", function() {

  const i0 = new Instant(0n);

  it("toJSON()", () => {
    assert.strictEqual(i0.toJSON(), "1970-01-01T00:00:00.000000000Z");
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.toJSON = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });


});
