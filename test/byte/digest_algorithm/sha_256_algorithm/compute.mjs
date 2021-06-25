import assert from "assert";
import { Byte } from "../../../../index.mjs";

describe("Sha256Algorithm.prototype.compute", function() {

  const d0 = Byte.DigestAlgorithm.for("sha-256");

  it("compute()", async () => {
    await assert.rejects(async () => {
      await d0.compute();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("compute(Uint8Array)", async () => {

    const bf = new Byte.Format();
    assert.strictEqual(bf.format(await d0.compute(Uint8Array.of())), "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");

  });

  it("compute(その他)", async () => {
    await assert.rejects(async () => {
      await d0.compute(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    await assert.rejects(async () => {
      await d0.compute("0");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    await assert.rejects(async () => {
      await d0.compute([]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      d0.compute = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
