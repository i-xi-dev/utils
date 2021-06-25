import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.format", function() {

  const bs0 = ByteSequence.create(0);
  const bs1 = ByteSequence.of(0x41, 0x3C, 0xA, 0x20, 0xA9);

  it("format()", () => {
    assert.strictEqual(bs0.format(), "");
    assert.strictEqual(bs1.format(), "413c0a20a9");
  });

  it("format(ByteFormatOptions)", () => {
    assert.strictEqual(bs1.format({}), "413c0a20a9");
    assert.strictEqual(bs1.format({upperCase:true}), "413C0A20A9");
    assert.strictEqual(bs1.format({zeroPaddedLength:3}), "04103c00a0200a9");
    assert.strictEqual(bs1.format({radix:10, zeroPaddedLength:4, upperCase:true,}), "00650060001000320169");
  });

  it("format(その他)", () => {
    assert.throws(() => {
      bs0.format(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs0.format("upperCase");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs0.format(true);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      bs0.format = 500;
    }, {
      name: "TypeError",
      //message: "Cannot add property format, object is not extensible",
    });
  });

});
