import assert from "assert";
import { Text } from "../../../index.mjs";

describe("Text.ScriptSet.prototype.values", function() {

  const i0 = new Text.ScriptSet([]);
  const i1 = new Text.ScriptSet(["Latn","Hira"]);

  it("values()", () => {
    const ii0 = i0.values();
    assert.strictEqual(JSON.stringify([...ii0]), "[]");

    const ii1 = i1.values();
    assert.strictEqual(JSON.stringify([...ii1]), '["Hira","Latn"]');
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.values = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
