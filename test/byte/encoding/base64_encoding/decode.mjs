import assert from "assert";
import { Byte, ByteSequence } from "../../../../index.mjs";

describe("Base64Encoding.prototype.decode", function() {

  const d0 = Byte.Encoding.for("base64");
  const d1 = Byte.Encoding.for("base64", {_62ndChar:"-", _63rdChar:"_",});
  const d2 = Byte.Encoding.for("base64", {usePadding:false,});
  const d3 = Byte.Encoding.for("base64", {_62ndChar:"-",_63rdChar:"_",usePadding:false,});

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

    assert.strictEqual(Array.from(d0.decode("AwIBAP/+/fw=")).join(","), Array.from(t1).join(","));
    assert.strictEqual(Array.from(d1.decode("AwIBAP_-_fw=")).join(","), Array.from(t1).join(","));
    assert.strictEqual(Array.from(d2.decode("AwIBAP/+/fw")).join(","), Array.from(t1).join(","));
    assert.strictEqual(Array.from(d3.decode("AwIBAP_-_fw")).join(","), Array.from(t1).join(","));

    assert.strictEqual(Buffer.from("AwIBAP/+/fw=", "BASE64").toJSON().data.join(","), Array.from(t1).join(","));

    assert.strictEqual(Array.from(d0.decode(Buffer.from(r1).toString('base64'))).join(","), Array.from(r1).join(","));
    assert.strictEqual(Array.from(d0.decode(Buffer.from(r2).toString('base64'))).join(","), Array.from(r2).join(","));
    assert.strictEqual(Array.from(d0.decode(Buffer.from(r3).toString('base64'))).join(","), Array.from(r3).join(","));
    assert.strictEqual(Array.from(d0.decode(Buffer.from(r4).toString('base64'))).join(","), Array.from(r4).join(","));

    assert.throws(() => {
      d0.decode("あ");
    }, {
      name: "_ixi.EncodingError",
    });

    assert.throws(() => {
      d0.decode("AwIBAP_-_fw=");
    }, {
      name: "_ixi.EncodingError",
    });

    assert.throws(() => {
      d0.decode("AwIBAP/+/fw");
    }, {
      name: "_ixi.EncodingError",
    });

    assert.throws(() => {
      d0.decode("=AwIBAP/+/fw");
    }, {
      name: "_ixi.EncodingError",
    });

    assert.throws(() => {
      d2.decode("AwIBAP/+/fw=");
    }, {
      name: "_ixi.EncodingError",
    });

    assert.throws(() => {
      d0.decode("=");
    }, {
      name: "_ixi.EncodingError",
    });

    assert.throws(() => {
      d0.decode("AwIBAP/+/fw,");
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
