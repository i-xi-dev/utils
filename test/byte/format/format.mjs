import assert from "assert";
import { Byte } from "../../../index.mjs";

describe("Byte.Format.prototype.format", function() {

  const bf0 = new Byte.Format({});

  const formatterR16Lz2 = new Byte.Format({radix:16,zeroPaddedLength:2,upperCase:true,});
  const formatterR10Lz2 = new Byte.Format({radix:10,zeroPaddedLength:4,upperCase:true,});
  const formatterR10Lz4 = new Byte.Format({radix:10,zeroPaddedLength:6,upperCase:true,});
  const formatterR16Lz4 = new Byte.Format({radix:16,zeroPaddedLength:4,upperCase:true,});
  const formatterR16Lz4Uc0 = new Byte.Format({radix:16,zeroPaddedLength:4,upperCase:false,});
  const formatterR16Lz2Uc0 = new Byte.Format({radix:16,zeroPaddedLength:2,upperCase:false,});
  const formatterR16Lz2Px1 = new Byte.Format({radix:16,zeroPaddedLength:2,upperCase:true,prefix:"%"});
  const formatterR16Lz2Sx1 = new Byte.Format({radix:16,zeroPaddedLength:2,upperCase:true,suffix:"B"});

  it("format()", () => {
    assert.throws(() => {
      bf0.format();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("format(Uint8Array)", () => {
    assert.strictEqual(bf0.format(Uint8Array.of(0)), "00");
    assert.strictEqual(bf0.format(Uint8Array.of(1)), "01");
    assert.strictEqual(bf0.format(Uint8Array.of(255)), "ff");

    assert.strictEqual(formatterR16Lz2.format(Uint8Array.of(0)), "00");
    assert.strictEqual(formatterR16Lz2.format(Uint8Array.of(1)), "01");
    assert.strictEqual(formatterR16Lz2.format(Uint8Array.of(10)), "0A");
    assert.strictEqual(formatterR16Lz2.format(Uint8Array.of(255)), "FF");

    assert.strictEqual(formatterR10Lz2.format(Uint8Array.of(0)), "0000");
    assert.strictEqual(formatterR10Lz2.format(Uint8Array.of(1)), "0001");
    assert.strictEqual(formatterR10Lz2.format(Uint8Array.of(10)), "0010");
    assert.strictEqual(formatterR10Lz2.format(Uint8Array.of(255)), "0255");

    assert.strictEqual(formatterR10Lz4.format(Uint8Array.of(0)), "000000");
    assert.strictEqual(formatterR10Lz4.format(Uint8Array.of(1)), "000001");
    assert.strictEqual(formatterR10Lz4.format(Uint8Array.of(10)), "000010");
    assert.strictEqual(formatterR10Lz4.format(Uint8Array.of(255)), "000255");

    assert.strictEqual(formatterR16Lz4.format(Uint8Array.of(10)), "000A");
    assert.strictEqual(formatterR16Lz4.format(Uint8Array.of(255)), "00FF");

    assert.strictEqual(formatterR16Lz4Uc0.format(Uint8Array.of(0)), "0000");
    assert.strictEqual(formatterR16Lz4Uc0.format(Uint8Array.of(1)), "0001");
    assert.strictEqual(formatterR16Lz4Uc0.format(Uint8Array.of(10)), "000a");
    assert.strictEqual(formatterR16Lz4Uc0.format(Uint8Array.of(255)), "00ff");

    assert.strictEqual(formatterR16Lz2Uc0.format(Uint8Array.of(10)), "0a");
    assert.strictEqual(formatterR16Lz2Uc0.format(Uint8Array.of(255)), "ff");

    assert.strictEqual(formatterR16Lz2Px1.format(Uint8Array.of(255)), "%FF");
    assert.strictEqual(formatterR16Lz2Px1.format(Uint8Array.of(255,0,254)), "%FF%00%FE");

    assert.strictEqual(formatterR16Lz2Sx1.format(Uint8Array.of(255)), "FFB");

    const f1 = new Byte.Format({radix:16,zeroPaddedLength:2,upperCase:true,prefix:"\u{2000B}xx"});
    assert.strictEqual(f1.format(Uint8Array.of(255,0,254)), "\u{2000B}xxFF\u{2000B}xx00\u{2000B}xxFE");

  });

  it("format(その他)", () => {
    assert.throws(() => {
      bf0.format(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bf0.format(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bf0.format([]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      bf0.format = 500;
    }, {
      name: "TypeError",
      //message: "Cannot add property format, object is not extensible",
    });
  });

});
