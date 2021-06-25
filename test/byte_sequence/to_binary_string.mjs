import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.toBinaryString", function() {

  const binStr = "ABCD";
  const bsbs = ByteSequence.fromBinaryString(binStr);

  it("toBinaryString()", () => {
    assert.strictEqual(bsbs.toBinaryString(), binStr);
  });

  it("代入不可", () => {
    assert.throws(() => {
      bsbs.toBinaryString = 500;
    }, {
      name: "TypeError",
      //message: "Cannot add property toBinaryString, object is not extensible",
    });
  });

});
