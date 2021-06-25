import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.toEncoded", function() {

  const bs0 = ByteSequence.create(0);

  it("toEncoded()", () => {
    assert.throws(() => {
      bs0.toEncoded();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("toEncoded(string)", () => {
    const s1 = bs0.toEncoded("BASE64");
    assert.strictEqual(s1.length, 0);

    // 結果の妥当性はエンコーディングクラスのテストにて確認

    assert.throws(() => {
      bs0.toEncoded("");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs0.toEncoded("BASE32X");
    }, {
      name: "_ixi.NotFoundError",
    });
  });

  it("toEncoded(その他)", () => {
    assert.throws(() => {
      bs0.toEncoded(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs0.toEncoded({});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs0.toEncoded(new String("BASE64"));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("toEncoded(string, ByteEncodingOptions)", () => {
    const s1 = bs0.toEncoded("BASE64", {});
    assert.strictEqual(s1.length, 0);

    // 結果の妥当性はエンコーディングクラスのテストにて確認
  });

  it("toEncoded(string, その他)", () => {
    const s1 = bs0.toEncoded("BASE64", undefined);
    assert.strictEqual(s1.length, 0);

    const s2 = bs0.toEncoded("BASE64", []);
    assert.strictEqual(s2.length, 0);

    assert.throws(() => {
      bs0.toEncoded("BASE64", null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs0.toEncoded("BASE64", 0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs0.toEncoded("BASE64", "");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("代入不可", () => {
    assert.throws(() => {
      bs0.toEncoded = 500;
    }, {
      name: "TypeError",
      //message: "Cannot add property toEncoded, object is not extensible",
    });
  });

});
