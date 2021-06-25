import assert from "assert";
import { Text } from "../../../index.mjs";

describe("Text.Encoding.register", function() {

  it("register()", () => {
    assert.throws(() => {
      Text.Encoding.register();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("register(string)", () => {
    assert.throws(() => {
      Text.Encoding.register("xxx");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("register(string, Function)", () => {
    
  });

  it("register(string, その他)", () => {
    assert.throws(() => {
      Text.Encoding.register("xxx", null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      Text.Encoding.register("xxx", {});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Text.Encoding.register = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
