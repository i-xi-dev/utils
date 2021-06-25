import assert from "assert";
import { Byte } from "../../index.mjs";

describe("Byte", function() {

  it("new Byte()", () => {
    assert.throws(() => {
      new Byte();
    }, {
      name: "TypeError",
    });
  });

  it("newなし", () => {
    assert.throws(() => {
      Byte();
    }, {
      name: "TypeError",
      //message: "Class constructor Byte cannot be invoked without 'new'",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      Byte.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "Cannot add property aaaaa, object is not extensible",
    });
  });

});
