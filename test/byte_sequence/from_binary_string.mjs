import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.fromBinaryString", function() {

  const binStr = "ABCD";
  const bsbs = ByteSequence.fromBinaryString(binStr);
  
  it("fromBinaryString()", () => {
    assert.throws(() => {
      ByteSequence.fromBinaryString();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("fromBinaryString(string)", () => {
    const bsa = bsbs.toArray();

    assert.strictEqual(bsa[0], 65);
    assert.strictEqual(bsa[1], 66);
    assert.strictEqual(bsa[2], 67);
    assert.strictEqual(bsa[3], 68);

    assert.strictEqual(ByteSequence.fromBinaryString("").count, 0);

    assert.throws(() => {
      ByteSequence.fromBinaryString("あ");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  
  });

  it("fromBinaryString(その他)", () => {
    assert.throws(() => {
      ByteSequence.fromBinaryString(new ArrayBuffer(1));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.fromBinaryString(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("代入不可", () => {
    assert.throws(() => {
      ByteSequence.fromBinaryString = 500;
    }, {
      name: "TypeError",
      //message: "Cannot assign to read only property 'fromBinaryString' of function 'class ByteSequence { ...",
    });
  });

});
