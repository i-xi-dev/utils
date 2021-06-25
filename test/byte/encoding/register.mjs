import assert from "assert";
import { Byte } from "../../../index.mjs";

describe("Byte.Encoding.register", function() {

  it("register()", () => {
    assert.throws(() => {
      Byte.Encoding.register();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("register(string)", () => {
    assert.throws(() => {
      Byte.Encoding.register("xxx");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("register(string, Function)", () => {
    
  });

  it("register(string, その他)", () => {
    assert.throws(() => {
      Byte.Encoding.register("xxx", null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      Byte.Encoding.register("xxx", {});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Byte.Encoding.register = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
