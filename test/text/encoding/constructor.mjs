import assert from "assert";
import { Text } from "../../../index.mjs";

describe("Text.Encoding", function() {

  it("new Text.Encoding()", () => {
    assert.throws(() => {
      new Text.Encoding();
    }, {
      name: "_ixi.NotSupportedError",
    });
  });

  it("newなし", () => {
    assert.throws(() => {
      Text.Encoding();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      Text.Encoding.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
