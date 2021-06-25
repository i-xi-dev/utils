import assert from "assert";
import { Text } from "../../../index.mjs";

describe("Text.ScriptSet.prototype.containedIn", function() {

  const i0 = new Text.ScriptSet([]);
  const i1 = new Text.ScriptSet(["Latn","Hira"]);

  it("containedIn()", () => {
    assert.throws(() => {
      i0.containedIn();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("containedIn(string)", () => {
    assert.strictEqual(i0.containedIn(""), false);
    assert.strictEqual(i0.containedIn("a1"), false);
    assert.strictEqual(i0.containedIn("a1あ"), false);
    assert.strictEqual(i0.containedIn("a1あア"), false);

    assert.strictEqual(i1.containedIn(""), false);
    assert.strictEqual(i1.containedIn("a1"), true);
    assert.strictEqual(i1.containedIn("a1あ"), true);
    assert.strictEqual(i1.containedIn("a1あア"), true);
    assert.strictEqual(i1.containedIn("ア"), false);
    assert.strictEqual(i1.containedIn("アb"), true);
    assert.strictEqual(i1.containedIn("ア\nb"), true);
    assert.strictEqual(i1.containedIn("ア\r\nb"), true);

  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.containedIn = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
