import assert from "assert";
import { Text } from "../../../../index.mjs";

describe("Utf8Encoding.prototype.decode", function() {

  const d0 = Text.Encoding.for("utf-8");

  it("decode()", () => {
    assert.throws(() => {
      d0.decode();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("decode(Uint8Array)", () => {
    assert.strictEqual(d0.decode(Uint8Array.of()), "");
    assert.strictEqual(d0.decode(Uint8Array.of(49,227,129,130,51,194,169,10,240,160,128,139,97,98,99,10,97)), "1あ3\u{A9}\n\u{2000B}abc\na");
    assert.strictEqual(d0.decode(Uint8Array.of(239,187,191,49,51)), "\uFEFF\u0031\u0033");
    assert.strictEqual(d0.decode(Uint8Array.of(49,227,129,130,51,194,169)), "1あ3\u{A9}");

    assert.throws(() => {
      d0.decode(Uint8Array.of(0x31, 0x82, 0xA0, 0x33));
    }, {
      name: "_ixi.EncodingError",
    });
  });

  it("decode(その他)", () => {
    assert.throws(() => {
      d0.decode(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      d0.decode(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      d0.decode = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
