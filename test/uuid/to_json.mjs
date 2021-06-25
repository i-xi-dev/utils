import assert from "assert";
import { Uuid } from "../../index.mjs";

describe("Uuid.prototype.toJSON", function() {

  const i0 = Uuid.nil();

  it("toJSON()", () => {
    assert.strictEqual(i0.toJSON(), "00000000-0000-0000-0000-000000000000");
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.toJSON = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
