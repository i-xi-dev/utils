import assert from "assert";
import { Uuid } from "../../index.mjs";

describe("Uuid.nil", function() {

  it("nil()", () => {
    assert.strictEqual(Uuid.nil().toString(), "00000000-0000-0000-0000-000000000000");
    assert.strictEqual(Uuid.nil() === Uuid.nil(), false);
  });

  it("代入不可", () => {
    assert.throws(() => {
      Uuid.nil = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
