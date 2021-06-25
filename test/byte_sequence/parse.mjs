import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.parse", function() {

  const formatterR16Lz4 = {radix:16,zeroPaddedLength:4,upperCase:true,};
  const formatterR2Lz8 = {radix:2,zeroPaddedLength:8,upperCase:true,};

  it("parse()", () => {
    assert.throws(() => {
      ByteSequence.parse();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("parse(string)", () => {
    const bs0 = ByteSequence.parse("41424344");
    assert.strictEqual(bs0.toString(), "41424344");

    assert.throws(() => {
      ByteSequence.parse("あ");
    }, {
      name: "_ixi.DataError",
      //message: "...",
    });

    assert.throws(() => {
      ByteSequence.parse("GG");
    }, {
      name: "_ixi.DataError",
      //message: "...",
    });
  });

  it("parse(その他)", () => {
    assert.throws(() => {
      ByteSequence.parse(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.parse(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("parse(string, ByteFormatOptions)", () => {
    const bs0 = ByteSequence.parse("41424344", {});
    assert.strictEqual(bs0.toString(), "41424344");

    const bs = ByteSequence.parse("0041004200430044", formatterR16Lz4);

    assert.strictEqual(bs.toString(), "41424344");
    assert.strictEqual(bs.format(formatterR2Lz8), "01000001010000100100001101000100");
  });

  it("parse(string, その他)", () => {
    assert.throws(() => {
      ByteSequence.parse("41424344", null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.parse("41424344", "");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("代入不可", () => {
    assert.throws(() => {
      ByteSequence.parse = 500;
    }, {
      name: "TypeError",
      //message: "Cannot assign to read only property 'parse' of function 'class ByteSequence { ...",
    });
  });

});
