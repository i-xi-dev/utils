import assert from "assert";
import { Time } from "../../../index.mjs";
const Instant = Time.Instant;

describe("Time.Instant.now", function() {

  it("now()", () => {
    const i0 = Instant.now();
    const i1 = Instant.now();
    const i2 = Instant.now();
    const i3 = Instant.now();
    const i4 = Instant.now();
    const i5 = Instant.now();
    const i6 = Instant.now();
    const i7 = Instant.now();
    const i8 = Instant.now();
    const i9 = Instant.now();
    const i10 = Instant.now();
    const i11 = Instant.now();
    const i12 = Instant.now();
    console.log(i0.toString());

    assert.strictEqual(i0.value <= i1.value, true);
    assert.strictEqual(i1.value <= i2.value, true);
    assert.strictEqual(i2.value <= i3.value, true);
    assert.strictEqual(i3.value <= i4.value, true);
    assert.strictEqual(i4.value <= i5.value, true);
    assert.strictEqual(i5.value <= i6.value, true);
    assert.strictEqual(i6.value <= i7.value, true);
    assert.strictEqual(i7.value <= i8.value, true);
    assert.strictEqual(i8.value <= i9.value, true);
    assert.strictEqual(i9.value <= i10.value, true);
    assert.strictEqual(i10.value <= i11.value, true);
    assert.strictEqual(i11.value <= i12.value, true);
  });

  it("代入不可", () => {
    assert.throws(() => {
      Instant.now = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
