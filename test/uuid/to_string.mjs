import assert from "assert";
import { Uuid } from "../../index.mjs";

describe("Uuid.prototype.toString", function() {

  const i0 = Uuid.nil();

  it("toString()", () => {
    assert.strictEqual(i0.toString(), "00000000-0000-0000-0000-000000000000");

  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.toString = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
