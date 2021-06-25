import assert from "assert";
import { _ixi } from "../../../src/_ixi.mjs";

describe("_ixi.Exception.causes", function() {

  it("causes", () => {
    const ex0 = new _ixi.Exception("name0", "message0", []);
    assert.strictEqual(ex0.causes.length, 0);

    const ex1 = new _ixi.Exception("name0", "message0", [ "1" ]);
    assert.strictEqual(ex1.causes[0], "1");

    const ex2 = new _ixi.Exception("name0", "message0", [ "1", 2, false, null, {} ]);
    assert.strictEqual(ex2.causes.length, 5)
    assert.strictEqual(ex2.causes[0], "1");
    assert.strictEqual(ex2.causes[1], 2);
    assert.strictEqual(ex2.causes[2], false);
    assert.strictEqual(ex2.causes[3], null);
    assert.strictEqual(JSON.stringify(ex2.causes[4]), JSON.stringify({}));
  });

  it("代入不可", () => {
    assert.throws(() => {
      const ex0 = new _ixi.Exception("name0", "message0", []);
      ex0.causes = 500;
    }, {
      name: "TypeError",
      //message: "Cannot set property causes of Error which has only a getter",
    });
  });

});
