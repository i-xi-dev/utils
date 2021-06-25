import assert from "assert";
import { Text } from "../../../index.mjs";

describe("Text.ScriptSet", function() {

  it("new Text.ScriptSet()", () => {
    assert.throws(() => {
      new Text.ScriptSet();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("new Text.ScriptSet(Array)", () => {
    const i0 = new Text.ScriptSet([]);
    assert.strictEqual(i0.toJSON().join(","), "");

    const i1 = new Text.ScriptSet(["Latn","Hira"]);
    assert.strictEqual(i1.toJSON().join(","), "Hira,Latn");
  });

  it("new Text.ScriptSet(その他)", () => {
    assert.throws(() => {
      new Text.ScriptSet("Latn");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("newなし", () => {
    assert.throws(() => {
      Text.ScriptSet();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      Text.ScriptSet.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
