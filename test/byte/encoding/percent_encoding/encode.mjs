import assert from "assert";
import { Byte } from "../../../../index.mjs";

describe("PercentEncoding.prototype.encode", function() {

  const d0 = Byte.Encoding.for("percent");
  const d1 = Byte.Encoding.for("percent", {inclusions:[0x20]});
  const d2 = Byte.Encoding.for("percent", {inclusions:[0x20,0x2B], spaceAsPlus:true});
  const d3 = Byte.Encoding.for("percent", {inclusions:[0x20,0x2B]});

  it("encode()", () => {
    assert.throws(() => {
      d0.encode();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("encode(Uint8Array)", () => {

    const t0 = Uint8Array.of();
    assert.strictEqual(d0.encode(t0), "");

    const t1 = Uint8Array.of(3,2,1,0,0xFF,0xFE,0xFD,0xFC);
    assert.strictEqual(d0.encode(t1), "%03%02%01%00%FF%FE%FD%FC");

    const utf8 = new TextEncoder();
    const utf8Bytes1 = utf8.encode("1\u{0} !~\u{7F}あ+");

    //"1\u{0} !~\u{7F}あ+"
    assert.strictEqual(d0.encode(utf8Bytes1), "1%00 !~%7F%E3%81%82+");
    assert.strictEqual(d1.encode(utf8Bytes1), "1%00%20!~%7F%E3%81%82+");
    assert.strictEqual(d2.encode(utf8Bytes1), "1%00+!~%7F%E3%81%82%2B");
    assert.strictEqual(d3.encode(utf8Bytes1), globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));

  });

  it("encode(その他)", () => {
    assert.throws(() => {
      d0.encode(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      d0.encode("0");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      d0.encode([]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      d0.encode = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
