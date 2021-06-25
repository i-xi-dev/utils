import assert from "assert";
import { Byte } from "../../index.mjs";

describe("Byte.MIN_VALUE", function() {

  it("MIN_VALUE", () => {
    assert.strictEqual(Byte.MIN_VALUE, 0);
  });

  it("代入不可", () => {
    assert.throws(() => {
      Byte.MIN_VALUE = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
