import assert from "assert";
import { _ixi } from "../../../src/_ixi.mjs";

describe("_ixi.String", function() {

  it("new _ixi.String()", () => {
    assert.throws(() => {
      new _ixi.String();
    }, {
      name: "_ixi.NotSupportedError",
    });
  });

  it("newなし", () => {
    assert.throws(() => {
      _ixi.String();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      _ixi.String.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
