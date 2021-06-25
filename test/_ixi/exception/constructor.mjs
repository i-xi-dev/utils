import assert from "assert";
import { _ixi } from "../../../src/_ixi.mjs";

describe("_ixi.Exception", function() {

  it("new _ixi.Exception()", () => {
    const ex0 = new _ixi.Exception();
    assert.strictEqual(ex0.name, "Error");
    assert.strictEqual(ex0.message, "");
    assert.strictEqual(ex0.causes.length, 0);
    assert.strictEqual(ex0 instanceof Error, true);
  });

  it("new _ixi.Exception(string)", () => {
    const ex0 = new _ixi.Exception("test.Error");
    assert.strictEqual(ex0.name, "test.Error");
    assert.strictEqual(ex0.message, "");
    assert.strictEqual(ex0.causes.length, 0);
    assert.strictEqual(ex0 instanceof Error, true);
  });

  it("new _ixi.Exception(string, string)", () => {
    const ex0 = new _ixi.Exception("name0", "message0");
    assert.strictEqual(ex0.name, "name0");
    assert.strictEqual(ex0.message, "message0");
    assert.strictEqual(ex0.causes.length, 0);
    assert.strictEqual(ex0 instanceof Error, true);
  });

  it("new _ixi.Exception(string, string, Array)", () => {
    const ex0 = new _ixi.Exception("name0", "message0", []);
    assert.strictEqual(ex0.name, "name0");
    assert.strictEqual(ex0.message, "message0");
    assert.strictEqual(ex0.causes.length, 0);
    assert.strictEqual(ex0 instanceof Error, true);

    const ex1 = new _ixi.Exception("name0", "message0", [ "1" ]);
    assert.strictEqual(ex1.name, "name0");
    assert.strictEqual(ex1.message, "message0");
    assert.strictEqual(ex1.causes.length, 1);
    assert.strictEqual(ex1.causes[0], "1");
    assert.strictEqual(ex1 instanceof Error, true);
  });

  it("new _ixi.Exception(string, string, string)", () => {
    const ex1 = new _ixi.Exception("name0", "message0", "2");
    assert.strictEqual(ex1.name, "name0");
    assert.strictEqual(ex1.message, "message0");
    assert.strictEqual(ex1.causes.length, 1);
    assert.strictEqual(ex1.causes[0], "2");
    assert.strictEqual(ex1 instanceof Error, true);
  });

  it("newなし", () => {
    assert.throws(() => {
      _ixi.Exception();
    }, {
      name: "TypeError",
      //message: "Class constructor Exception cannot be invoked without 'new'",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      const ex0 = new _ixi.Exception();
      ex0.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "Cannot add property aaaaa, object is not extensible",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      _ixi.Exception.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "Cannot add property aaaaa, object is not extensible",
    });
  });

});
