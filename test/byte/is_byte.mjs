import assert from "assert";
import { Byte } from "../../index.mjs";

describe("Byte.isByte", function() {

  it("isByte(number)", () => {
    assert.strictEqual(Byte.isByte(0), true);
    assert.strictEqual(Byte.isByte(-0), true);  //XXX -0は許容でok？
    assert.strictEqual(Byte.isByte(Number(0)), true);
    assert.strictEqual(Byte.isByte(0), true);
    assert.strictEqual(Byte.isByte(1), true);

    // 非整数
    assert.strictEqual(Byte.isByte(0.5), false);
    assert.strictEqual(Byte.isByte(1.01), false);
    assert.strictEqual(Byte.isByte(Number.NaN), false);
    assert.strictEqual(Byte.isByte(Number.POSITIVE_INFINITY), false);
    assert.strictEqual(Byte.isByte(Number.NEGATIVE_INFINITY), false);

    // 0～255
    assert.strictEqual(Byte.isByte(-1), false);
    assert.strictEqual(Byte.isByte(-0), true);  //XXX -0は許容でok？
    assert.strictEqual(Byte.isByte(0), true);
    assert.strictEqual(Byte.isByte(1), true);
    assert.strictEqual(Byte.isByte(255), true);
    assert.strictEqual(Byte.isByte(256), false);
    assert.strictEqual(Byte.isByte(Number.MAX_SAFE_INTEGER), false);
    assert.strictEqual(Byte.isByte(Number.MIN_SAFE_INTEGER), false);
    assert.strictEqual(Byte.isByte(Number.MAX_VALUE), false);
    assert.strictEqual(Byte.isByte(Number.MIN_VALUE), false);
  });

  it("isByte(Number)", () => {
    assert.strictEqual(Byte.isByte(new Number(0)), false);
  });

  it("isByte(その他)", () => {
    assert.strictEqual(Byte.isByte("0"), false);
    assert.strictEqual(Byte.isByte(false), false);
    assert.strictEqual(Byte.isByte(), false);
    assert.strictEqual(Byte.isByte(undefined), false);
    assert.strictEqual(Byte.isByte(null), false);
    assert.strictEqual(Byte.isByte({}), false);
    assert.strictEqual(Byte.isByte([]), false);
  });

  it("代入不可", () => {
    assert.throws(() => {
      Byte.isByte = 500;
    }, {
      name: "TypeError",
      //message: "Cannot assign to read only property 'isByte' of function 'class Byte { ...",
    });
  });

});
