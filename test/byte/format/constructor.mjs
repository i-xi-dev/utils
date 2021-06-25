import assert from "assert";
import { Byte } from "../../../index.mjs";

describe("Byte.Format", function() {

  it("new Byte.Format(ByteFormatOptions)", () => {
    const bf0 = new Byte.Format({});
    assert.strictEqual(bf0 instanceof Byte.Format, true);
    assert.strictEqual(bf0.format(Uint8Array.of(255,0)), "ff00");

    const bf1 = new Byte.Format({upperCase:true});
    assert.strictEqual(bf1.format(Uint8Array.of(255,0)), "FF00");

    assert.throws(() => {
      new Byte.Format({radix:"2"});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new Byte.Format({radix:3});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new Byte.Format({zeroPaddedLength:"1"});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new Byte.Format({radix:16,zeroPaddedLength:1});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new Byte.Format({upperCase:"true"});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new Byte.Format({prefix:true});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new Byte.Format({suffix:0});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("new Byte.Format()", () => {
    const bf0 = new Byte.Format();
    assert.strictEqual(bf0 instanceof Byte.Format, true);
    assert.strictEqual(bf0.format(Uint8Array.of(255,0)), "ff00");
  });

  it("new Byte.Format(その他)", () => {
    const bf0 = new Byte.Format(1);
    assert.strictEqual(bf0 instanceof Byte.Format, true);
    assert.strictEqual(bf0.format(Uint8Array.of(255,0)), "ff00");

    assert.throws(() => {
      new Byte.Format(null);
    }, {
      name: "TypeError",
      //message: "Cannot read property 'radix' of null",
    });
  });

  it("newなし", () => {
    assert.throws(() => {
      Byte.Format();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      const bf0 = new Byte.Format();
      bf0.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      Byte.Format.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
