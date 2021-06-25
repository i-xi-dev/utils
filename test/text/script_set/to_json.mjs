import assert from "assert";
import { Text } from "../../../index.mjs";

describe("Text.ScriptSet.prototype.toJSON", function() {

  const i0 = new Text.ScriptSet([]);
  const i1 = new Text.ScriptSet(["Latn","Hira"]);

  it("toJSON()", () => {
    const ii0 = i0.toJSON();
    assert.strictEqual(JSON.stringify(ii0), "[]");

    const ii1 = i1.toJSON();
    assert.strictEqual(JSON.stringify(ii1), '["Hira","Latn"]');
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.toJSON = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
