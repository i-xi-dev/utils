import assert from "assert";
import { Byte, ByteSequence } from "../../../../index.mjs";

describe("Base64Encoding.prototype.encode", function() {

  const d0 = Byte.Encoding.for("base64");
  const d1 = Byte.Encoding.for("base64", {_62ndChar:"-", _63rdChar:"_",});
  const d2 = Byte.Encoding.for("base64", {usePadding:false,});
  const d3 = Byte.Encoding.for("base64", {_62ndChar:"-",_63rdChar:"_",usePadding:false,});

  const r1 = ByteSequence.generateRandom(256).toUint8Array();
  const r2 = ByteSequence.generateRandom(256).toUint8Array();
  const r3 = ByteSequence.generateRandom(256).toUint8Array();
  const r4 = ByteSequence.generateRandom(256).toUint8Array();

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
    const t1 = Uint8Array.of(3,2,1,0,0xFF,0xFE,0xFD,0xFC);

    assert.strictEqual(d0.encode(t1), "AwIBAP/+/fw=");
    assert.strictEqual(d1.encode(t1), "AwIBAP_-_fw=");
    assert.strictEqual(d2.encode(t1), "AwIBAP/+/fw");
    assert.strictEqual(d3.encode(t1), "AwIBAP_-_fw");
    assert.strictEqual(d0.encode(t0), "");

    assert.strictEqual(d0.encode(r1), Buffer.from(r1.buffer).toString("BASE64"));
    assert.strictEqual(d0.encode(r2), Buffer.from(r2.buffer).toString("BASE64"));
    assert.strictEqual(d0.encode(r3), Buffer.from(r3.buffer).toString("BASE64"));
    assert.strictEqual(d0.encode(r4), Buffer.from(r4.buffer).toString("BASE64"));

  });

  it("encode(その他)", () => {
    assert.throws(() => {
      d0.encode(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      d0.encode(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      d0.encode([0]);
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
