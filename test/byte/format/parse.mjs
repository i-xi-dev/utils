import assert from "assert";
import { Byte } from "../../../index.mjs";

describe("Byte.Format.prototype.parse", function() {

  const bf0 = new Byte.Format({});

  it("parse()", () => {
    assert.throws(() => {
      bf0.parse();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("parse(string)", () => {
    assert.strictEqual(JSON.stringify([ ...bf0.parse("00") ]), JSON.stringify([ 0 ]));
    assert.strictEqual(JSON.stringify([ ...bf0.parse("01") ]), JSON.stringify([ 1 ]));
    assert.strictEqual(JSON.stringify([ ...bf0.parse("ff") ]), JSON.stringify([ 255 ]));

    assert.throws(() => {
      bf0.parse("-0");
    }, {
      name: "_ixi.DataError",
      //message: "...",
    });

    assert.throws(() => {
      bf0.parse("-01");
    }, {
      name: "_ixi.DataError",
      //message: "...",
    });

    assert.throws(() => {
      bf0.parse("100");
    }, {
      name: "_ixi.DataError",
      //message: "...",
    });

    const formatterR16Lz2 = new Byte.Format({radix:16,zeroPaddedLength:2,upperCase:true,});
    assert.strictEqual(formatterR16Lz2.parse("00")[0], 0);
    assert.strictEqual(formatterR16Lz2.parse("01")[0], 1);
    assert.strictEqual(formatterR16Lz2.parse("FF")[0], 255);
    const r0 = formatterR16Lz2.parse("FF0001");
    assert.strictEqual(r0[0], 255);
    assert.strictEqual(r0[1], 0);
    assert.strictEqual(r0[2], 1);
    assert.strictEqual(r0.length, 3);

    const formatterR10Lz2 = new Byte.Format({radix:10,zeroPaddedLength:3,upperCase:true,});
    assert.strictEqual(formatterR10Lz2.parse("000")[0], 0);
    assert.strictEqual(formatterR10Lz2.parse("001")[0], 1);
    assert.strictEqual(formatterR10Lz2.parse("255")[0], 255);

    const formatterR10Lz4 = new Byte.Format({radix:10,zeroPaddedLength:4,upperCase:true,});
    assert.strictEqual(formatterR10Lz4.parse("0000")[0], 0);
    assert.strictEqual(formatterR10Lz4.parse("0001")[0], 1);
    assert.strictEqual(formatterR10Lz4.parse("0255")[0], 255);

    const formatterR16Lz4 = new Byte.Format({radix:16,zeroPaddedLength:4,upperCase:true,});
    assert.strictEqual(formatterR16Lz4.parse("0000")[0], 0);
    assert.strictEqual(formatterR16Lz4.parse("0001")[0], 1);
    assert.strictEqual(formatterR16Lz4.parse("00FF")[0], 255);

    const formatterR16Lz4Uc0 = new Byte.Format({radix:16,zeroPaddedLength:4,upperCase:false,});
    assert.strictEqual(formatterR16Lz4Uc0.parse("0000")[0], 0);
    assert.strictEqual(formatterR16Lz4Uc0.parse("0001")[0], 1);
    assert.strictEqual(formatterR16Lz4Uc0.parse("00ff")[0], 255);

    const formatterR16Lz2Uc0 = new Byte.Format({radix:16,zeroPaddedLength:2,upperCase:false,});
    assert.strictEqual(formatterR16Lz2Uc0.parse("00", formatterR16Lz2Uc0)[0], 0);
    assert.strictEqual(formatterR16Lz2Uc0.parse("01", formatterR16Lz2Uc0)[0], 1);
    assert.strictEqual(formatterR16Lz2Uc0.parse("ff", formatterR16Lz2Uc0)[0], 255);

    const formatterR16Lz2Px1 = new Byte.Format({radix:16,zeroPaddedLength:2,upperCase:true,prefix:"%"});
    assert.strictEqual(formatterR16Lz2Px1.parse("%0A")[0], 10);
    const formatterR16Lz2Px2 = new Byte.Format({radix:16,zeroPaddedLength:8,upperCase:true,prefix:"あ"});
    const r6 = formatterR16Lz2Px2.parse("あ000000FFあ00000000あ00000001");
    assert.strictEqual(r6[0], 255);
    assert.strictEqual(r6[1], 0);
    assert.strictEqual(r6[2], 1);
    assert.strictEqual(r6.length, 3);
    const formatterR16Lz2Px3 = new Byte.Format({radix:16,zeroPaddedLength:8,upperCase:true,prefix:"\u{2000B}xx"});
    const r6b = formatterR16Lz2Px3.parse("\u{2000B}xx000000FF\u{2000B}xx00000000\u{2000B}xx00000001");
    assert.strictEqual(r6b[0], 255);
    assert.strictEqual(r6b[1], 0);
    assert.strictEqual(r6b[2], 1);
    assert.strictEqual(r6b.length, 3);

    const formatterR16Lz2Sx1 = new Byte.Format({radix:16,zeroPaddedLength:2,upperCase:true,suffix:"B"});
    assert.strictEqual(formatterR16Lz2Sx1.parse("0AB")[0], 10);

  });

  it("parse(その他)", () => {
    assert.throws(() => {
      bf0.parse(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bf0.parse(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      bf0.parse = 500;
    }, {
      name: "TypeError",
      //message: "Cannot add property parse, object is not extensible",
    });
  });

});
