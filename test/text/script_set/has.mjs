import assert from "assert";
import { Text } from "../../../index.mjs";

describe("Text.ScriptSet.prototype.has", function() {

  const i0 = new Text.ScriptSet([]);
  const i1 = new Text.ScriptSet(["Latn","Hira"]);

  it("has()", () => {
    assert.strictEqual(i0.has(), false);
  });

  it("has(string)", () => {
    assert.strictEqual(i0.has("Latn"), false);
    assert.strictEqual(i1.has("Latn"), true);
    assert.strictEqual(i1.has("Hira"), true);
    assert.strictEqual(i1.has("Jpan"), false);

  });

  it("has(その他)", () => {
    assert.strictEqual(i0.has(1), false);
    assert.strictEqual(i1.has(["Latn"]), false);
    assert.strictEqual(i1.has(new String("Latn")), false);
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.has = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
