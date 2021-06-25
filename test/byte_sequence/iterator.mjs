import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype[Symbol.iterator]", function() {

  const bs0 = ByteSequence.from([]);
  const bs1 = ByteSequence.from([255,254,253,252,251,250,249,248,]);

  it("[Symbol.iterator]", () => {
    assert.strictEqual([...bs0,].length, 0);
    let i = 0;
    for (const b of bs1) {
      i++;
    }
    assert.strictEqual(i, 8);

    const i1 = bs1[Symbol.iterator]();
    assert.strictEqual(i1.next().value, 255);
    const i1b = bs1[Symbol.iterator]();
    bs1.set(0, [11,12]);
    assert.strictEqual(i1b.next().value, 11);

    assert.strictEqual(i1.next().value, 12);
    assert.strictEqual(i1b.next().value, 12);

    assert.strictEqual(i1.next().value, 253);
    assert.strictEqual(i1b.next().value, 253);
  });

  it("代入不可", () => {
    assert.throws(() => {
      bs0[Symbol.iterator] = 0;
    }, {
      name: "TypeError",
      //message: "Cannot add property Symbol(Symbol.iterator), object is not extensible",
    });
  });

});
