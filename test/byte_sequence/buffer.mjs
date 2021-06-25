import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.buffer", function() {

  const a0 = new ArrayBuffer(0);
  const bs0 = new ByteSequence(a0);
  const bs0b = new ByteSequence(a0);
  const a1 = new ArrayBuffer(100);
  const b1 = new Uint8Array(a1);
  const bs1 = ByteSequence.from(b1);
  const bs1b = ByteSequence.from(b1);

  it("buffer", () => {
    assert.strictEqual(bs0.buffer, a0);
    assert.strictEqual(bs0.buffer, bs0b.buffer);
    assert.notStrictEqual(bs1.buffer, a1);
    assert.notStrictEqual(bs1.buffer, bs1b.buffer);

    assert.throws(() => {
      bs0.buffer();
    }, {
      name: "TypeError",
      //message: "bs0.buffer is not a function",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      bs0.buffer = new ArrayBuffer(100);
    }, {
      name: "TypeError",
      //message: "Cannot set property buffer of [object Object] which has only a getter",
    });
  });

});
