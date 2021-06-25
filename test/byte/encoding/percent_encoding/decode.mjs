import assert from "assert";
import { Byte, ByteSequence } from "../../../../index.mjs";

describe("PercentEncoding.prototype.decode", function() {

  const d0 = Byte.Encoding.for("percent");
  const d1 = Byte.Encoding.for("percent", {inclusions:[0x20]});
  const d2 = Byte.Encoding.for("percent", {inclusions:[0x20,0x2B], spaceAsPlus:true});
  const d3 = Byte.Encoding.for("percent", {inclusions:[0x20,0x2B]});

  const r1 = ByteSequence.generateRandom(256).toUint8Array();
  const r2 = ByteSequence.generateRandom(256).toUint8Array();
  const r3 = ByteSequence.generateRandom(256).toUint8Array();
  const r4 = ByteSequence.generateRandom(256).toUint8Array();

  it("decode()", () => {
    assert.throws(() => {
      d0.decode();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("decode(string)", () => {
    assert.strictEqual(Array.from(d0.decode("")).join(""), "");

    const t1 = Uint8Array.of(3,2,1,0,0xFF,0xFE,0xFD,0xFC);

    assert.strictEqual(Array.from(d0.decode("%03%02%01%00%FF%FE%FD%FC")).join(","), Array.from(t1).join(","));

    const m1 = (byte) => {
      if ((byte < 0x20) || (byte > 0x7E) || (byte === 0x25)) {
        return "%" + byte.toString(16).toUpperCase().padStart(2, "0");
      }
      return String.fromCharCode(byte);
    };

    assert.strictEqual(ByteSequence.from(r1).toEncoded("percent"), Array.from(r1).map(m1).join(""));
    assert.strictEqual(ByteSequence.from(r2).toEncoded("percent"), Array.from(r2).map(m1).join(""));
    assert.strictEqual(ByteSequence.from(r3).toEncoded("percent"), Array.from(r3).map(m1).join(""));
    assert.strictEqual(ByteSequence.from(r4).toEncoded("percent"), Array.from(r4).map(m1).join(""));


    assert.throws(() => {
      d0.decode("あ");
    }, {
      name: "_ixi.EncodingError",
      message: "decode error (1)",
    });

    const utf8 = new TextEncoder();
    const utf8Bytes1 = utf8.encode("1\u{0} !~\u{7F}あ+");

    //"1\u{0} !~\u{7F}あ+"
    assert.strictEqual(Array.from(d0.decode("1%00 !~%7F%E3%81%82+")).join(","), Array.from(utf8Bytes1).join(","));
    assert.strictEqual(Array.from(d1.decode("1%00%20!~%7F%E3%81%82+")).join(","), Array.from(utf8Bytes1).join(","));
    assert.strictEqual(Array.from(d2.decode("1%00+!~%7F%E3%81%82%2B")).join(","), Array.from(utf8Bytes1).join(","));
    assert.strictEqual(Array.from(d3.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"))).join(","), Array.from(utf8Bytes1).join(","));

    //console.log(globalThis.decodeURIComponent("%%65A")); // →malformed
    assert.throws(() => {
      d0.decode("%%65A");
    }, {
      name: "_ixi.EncodingError",
      message: "decode error (2)",
    });

    //console.log(globalThis.decodeURIComponent("%41"));
    assert.throws(() => {
      d0.decode("%41");
    }, {
      name: "_ixi.EncodingError",
      message: "decode error (3)",
    });

    //console.log(globalThis.decodeURIComponent("%9A")); // →malformed
    assert.strictEqual(Array.from(d0.decode("%9A")).join(","), Array.of(0x9A).join(","));

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
