import assert from "assert";
import { Text } from "../../../../index.mjs";

describe("Utf8Encoding.prototype.encode", function() {

  const d0 = Text.Encoding.for("utf-8");

  it("encode()", () => {
    assert.throws(() => {
      d0.encode();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("encode(string)", () => {
    assert.strictEqual(JSON.stringify([...d0.encode("")]), "[]");
    assert.strictEqual(JSON.stringify([...d0.encode("1あ3\u{A9}\n\u{2000B}abc\na")]), "[49,227,129,130,51,194,169,10,240,160,128,139,97,98,99,10,97]");
    assert.strictEqual(JSON.stringify([...d0.encode("\uFEFF\u0031\u0033")]), "[239,187,191,49,51]");
    assert.strictEqual(JSON.stringify([...d0.encode("1あ3\u{A9}")]), "[49,227,129,130,51,194,169]");

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
