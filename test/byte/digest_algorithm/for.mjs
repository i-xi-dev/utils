import assert from "assert";
import { Byte } from "../../../index.mjs";

describe("Byte.DigestAlgorithm.for", function() {

  it("for()", () => {
    assert.throws(() => {
      Byte.DigestAlgorithm.for();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("for(string)", async () => {
    const x1 = Byte.DigestAlgorithm.for("sha-256");
    const bf = new Byte.Format();
    assert.strictEqual(bf.format(await x1.compute(Uint8Array.of())), "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");

    assert.throws(() => {
      Byte.DigestAlgorithm.for("sha-1x");
    }, {
      name: "_ixi.NotFoundError",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Byte.DigestAlgorithm.for = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
