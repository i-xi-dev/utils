import assert from "assert";
import { Byte } from "../../../index.mjs";

describe("Byte.DigestAlgorithm", function() {

  it("new Byte.DigestAlgorithm()", () => {
    assert.throws(() => {
      new Byte.DigestAlgorithm();
    }, {
      name: "_ixi.NotSupportedError",
    });
  });

  it("newなし", () => {
    assert.throws(() => {
      Byte.DigestAlgorithm();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      Byte.DigestAlgorithm.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
