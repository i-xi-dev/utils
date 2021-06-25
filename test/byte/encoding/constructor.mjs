import assert from "assert";
import { Byte } from "../../../index.mjs";

describe("Byte.Encoding", function() {

  it("new Byte.Encoding()", () => {
    assert.throws(() => {
      new Byte.Encoding();
    }, {
      name: "_ixi.NotSupportedError",
    });
  });

  it("newなし", () => {
    assert.throws(() => {
      Byte.Encoding();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      Byte.Encoding.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
