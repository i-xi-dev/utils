import assert from "assert";
import { _ixi } from "../../src/_ixi.mjs";

describe("_ixi.precondition", function() {

  it("precondition()", () => {
    assert.throws(() => {
      _ixi.precondition();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("precondition(function)", () => {
    _ixi.precondition(() => true);

    assert.throws(() => {
      _ixi.precondition(() => false);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    _ixi.config.noAssert = true;
    _ixi.precondition(() => false);
    _ixi.config.noAssert = false;
  });

  it("代入不可", () => {
    assert.throws(() => {
      _ixi.precondition = 500;
    }, {
      name: "TypeError",
      //message: "Cannot assign to read only property 'precondition' of object '#<Object>'",
    });
  });

});
