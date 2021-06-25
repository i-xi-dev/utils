import assert from "assert";
import { Text } from "../../../index.mjs";

describe("Text.Encoding.for", function() {

  it("for()", () => {
    assert.throws(() => {
      Text.Encoding.for();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("for(string)", () => {
    const x1 = Text.Encoding.for("utf-8");
    assert.strictEqual(x1.decode(Uint8Array.of()), "");

    assert.throws(() => {
      Text.Encoding.for("utf7x");
    }, {
      name: "_ixi.NotFoundError",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Text.Encoding.for = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
