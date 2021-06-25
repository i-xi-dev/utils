import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence", function() {

  const bytes0 = new Uint8Array(0);
  const bytes1 = Uint8Array.of(255, 254, 1, 0, 100);

  it("new ByteSequence(ArrayBuffer)", () => {
    const bs0 = new ByteSequence(bytes0.buffer);
    const bs1 = new ByteSequence(bytes1.buffer);

    assert.strictEqual(bs0 instanceof ByteSequence, true);
    assert.strictEqual(bs0.count, 0);
    assert.strictEqual(bs1.count, 5);
  });

  it("コンストラクターに渡したArrayBufferへの操作は、自身に影響する", () => {
    const bs1 = new ByteSequence(bytes1.buffer);
    const a1 = bytes1.buffer;
    const nb1 = new Uint8Array(a1);
    nb1.set([1,2,3,4]);

    assert.strictEqual(bs1.get(0)[0], 1);
    assert.strictEqual(bs1.get(1)[0], 2);
    assert.strictEqual(bs1.get(2)[0], 3);
    assert.strictEqual(bs1.get(3)[0], 4);
    assert.strictEqual(bs1.get(4)[0], 100);
  });

  it("new ByteSequence()", () => {
    assert.throws(() => {
      new ByteSequence();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("new ByteSequence(その他)", () => {
    assert.throws(() => {
      new ByteSequence(bytes0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("newなし", () => {
    assert.throws(() => {
      ByteSequence(bytes0.buffer);
    }, {
      name: "TypeError",
      //message: "Class constructor ByteSequence cannot be invoked without 'new'",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      const bs0 = new ByteSequence(new ArrayBuffer(0));
      bs0.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "Cannot add property aaaaa, object is not extensible",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      ByteSequence.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "Cannot add property aaaaa, object is not extensible",
    });
  });

});
