import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.prototype.toJSON", function() {

  const i0 = new Duration(0n);

  it("toJSON()", () => {
    assert.strictEqual(i0.toJSON(), "PT00H00M00.000000000S");
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
