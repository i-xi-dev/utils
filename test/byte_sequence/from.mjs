import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.from", function() {

  it("from()", () => {
    assert.throws(() => {
      ByteSequence.from();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("from(Array)", () => {
    const a0 = [9,8,7,6,5,4,3,2,0,255];
    const bs0 = ByteSequence.from(a0);

    assert.strictEqual(bs0.count, 10);
    const bs0a = [ ...bs0 ];
    assert.strictEqual(bs0a[8], 0);
    assert.strictEqual(bs0a[9], 255);

    const a1 = [];
    const bs1 = ByteSequence.from(a1);

    assert.strictEqual(bs1.count, 0);

    assert.throws(() => {
      ByteSequence.from([-1]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.from([256]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.from(["1"]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.from([1.5]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.from([[1]]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("from(Uint8Array)", () => {
    const a0 = Uint8Array.of(9,8,7,6,5,4,3,2,1,0);
    const bs0 = ByteSequence.from(a0);

    assert.strictEqual(bs0.count, 10);
    const bs0a = [ ...bs0 ];
    assert.strictEqual(bs0a[0], 9);
    assert.strictEqual(bs0a[9], 0);

    const a1 = new Uint8Array(0);
    const bs1 = ByteSequence.from(a1);

    assert.strictEqual(bs1.count, 0);

  });

  it("from(ByteSequence)", () => {
    const bs1 = ByteSequence.generateRandom(256);
    const bs1c = ByteSequence.from(bs1);

    assert.notStrictEqual(bs1, bs1c);
    assert.strictEqual(JSON.stringify(bs1.toArray()), JSON.stringify(bs1c.toArray()));
  });

  it("from(その他)", () => {
    assert.throws(() => {
      ByteSequence.from("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.from(new ArrayBuffer(128));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      ByteSequence.from(new DataView(new ArrayBuffer(128)));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("fromに渡したUint8Arrayへの操作は、自身に影響しない", () => {
    const a0 = Uint8Array.of(255,254,253,252,251);
    const bs0 = ByteSequence.from(a0);

    assert.strictEqual(bs0.get(0)[0], 255);
    assert.strictEqual(bs0.get(1)[0], 254);
    assert.strictEqual(bs0.get(2)[0], 253);
    assert.strictEqual(bs0.get(3)[0], 252);
    assert.strictEqual(bs0.get(4)[0], 251);

    a0[0] = 1;

    assert.strictEqual(bs0.get(0)[0], 255);
  });

  it("代入不可", () => {
    assert.throws(() => {
      ByteSequence.from = 500;
    }, {
      name: "TypeError",
      //message: "Cannot assign to read only property 'from' of function 'class ByteSequence { ...",
    });
  });

});
