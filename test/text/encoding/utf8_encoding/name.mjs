import assert from "assert";
import { Text } from "../../../../index.mjs";

describe("Utf8Encoding.prototype.name", function() {

  const d0 = Text.Encoding.for("utf-8");

  it("name", () => {
    assert.strictEqual(d0.name, "UTF-8");
  });

  it("代入不可", () => {
    assert.throws(() => {
      d0.name = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
