import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.fromEncoded", function() {

  it("fromEncoded()", () => {
    assert.throws(() => {
      ByteSequence.fromEncoded();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("fromEncoded(string)", () => {
    assert.throws(() => {
      ByteSequence.fromEncoded("");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("fromEncoded(その他, string)", () => {
    assert.throws(() => {
      ByteSequence.fromEncoded([""], "BASE64");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("fromEncoded(string, string)", () => {
    const bs0 = ByteSequence.fromEncoded("", "BASE64");
    assert.strictEqual(bs0.count, 0);

    const bs1 = ByteSequence.fromEncoded("", "PERCENT");
    assert.strictEqual(bs1.count, 0);

    assert.throws(() => {
      ByteSequence.fromEncoded("", "BASE32X");
    }, {
      name: "_ixi.NotFoundError",
    });

    const bs2 = ByteSequence.fromEncoded("%03", "PERCENT");
    assert.strictEqual(bs2.get(0)[0], 0x03);

    // 結果の妥当性はエンコーディングクラスのテストにて確認
  });

  it("fromEncoded(string, その他)", () => {
    assert.throws(() => {
      ByteSequence.fromEncoded("", 0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("fromEncoded(string, string, ByteEncodingOptions)", () => {
    const bs0 = ByteSequence.fromEncoded("", "BASE64", {});
    assert.strictEqual(bs0.count, 0);

    // 結果の妥当性はエンコーディングクラスのテストにて確認
  });

  it("fromEncoded(string, string, その他)", () => {
    const bs0 = ByteSequence.fromEncoded("", "BASE64", undefined);
    assert.strictEqual(bs0.count, 0);

    const bs1 = ByteSequence.fromEncoded("", "BASE64", []);
    assert.strictEqual(bs1.count, 0);


    assert.throws(() => {
      ByteSequence.fromEncoded("", "BASE64", null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.fromEncoded("", "BASE64", 0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.fromEncoded("", "BASE64", "");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("代入不可", () => {
    assert.throws(() => {
      ByteSequence.fromEncoded = 500;
    }, {
      name: "TypeError",
      //message: "Cannot assign to read only property 'fromEncoded' of function 'class ByteSequence { ...",
    });
  });

});
