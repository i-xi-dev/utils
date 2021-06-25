import assert from "assert";
import { Byte } from "../../../index.mjs";

describe("Byte.Encoding.for", function() {

  it("for()", () => {
    assert.throws(() => {
      Byte.Encoding.for();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("for(string)", () => {
    const x1 = Byte.Encoding.for("percent");
    assert.strictEqual(x1.encode(Uint8Array.of(255)), "%FF");

    const x2 = Byte.Encoding.for("base64");
    assert.strictEqual(x2.encode(Uint8Array.of(255)), btoa("\u00FF"));

    assert.throws(() => {
      Byte.Encoding.for("base32x");
    }, {
      name: "_ixi.NotFoundError",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Byte.Encoding.for = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
