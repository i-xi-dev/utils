import assert from "assert";
import { Byte } from "../../index.mjs";

describe("Byte.MAX_VALUE", function() {

  it("MAX_VALUE", () => {
    assert.strictEqual(Byte.MAX_VALUE, 255);
  });

  it("代入不可", () => {
    assert.throws(() => {
      Byte.MAX_VALUE = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
