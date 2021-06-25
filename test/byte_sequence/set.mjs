import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.set", function() {

  const bs0 = ByteSequence.create(0);
  const bs1 = ByteSequence.create(100);

  it("set()", () => {
    assert.throws(() => {
      bs0.set();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("set(number)", () => {
    assert.throws(() => {
      bs1.set(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("set(number, *)", () => {
    assert.throws(() => {
      bs1.set(1.5, [1]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(Number.NaN, [1]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("set(その他, *)", () => {
    assert.throws(() => {
      bs1.set("1", [1]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(1n, [1]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("set(number, Array)", () => {
    bs1.set(0, [1,2,3,4]);
    assert.strictEqual(bs1.get(0)[0], 1);
    assert.strictEqual(bs1.get(1)[0], 2);
    assert.strictEqual(bs1.get(2)[0], 3);
    assert.strictEqual(bs1.get(3)[0], 4);

    bs1.set(99, [1]);

    assert.throws(() => {
      bs1.set(0, []);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(0, [Number.NaN]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(0, [-1]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(0, [256]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(0, [1.6]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(0, ["0"]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      const a101 = new Array(101);
      a101.fill(1);
      bs1.set(0, a101);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(99, [1, 2]);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("set(number, Uint8Array)", () => {
    bs1.set(0, Uint8Array.of(11,12,13,14));
    assert.strictEqual(bs1.get(0)[0], 11);
    assert.strictEqual(bs1.get(1)[0], 12);
    assert.strictEqual(bs1.get(2)[0], 13);
    assert.strictEqual(bs1.get(3)[0], 14);

    bs1.set(0, new Uint8Array(100));
    bs1.set(99, new Uint8Array(1));

    assert.throws(() => {
      bs1.set(0, Uint8Array.from([]));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(0, new Uint8Array(101));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(99, new Uint8Array(2));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("set(number, ByteSequence)", () => {
    bs1.set(0, ByteSequence.of(21,22,23,24));
    assert.strictEqual(bs1.get(0)[0], 21);
    assert.strictEqual(bs1.get(1)[0], 22);
    assert.strictEqual(bs1.get(2)[0], 23);
    assert.strictEqual(bs1.get(3)[0], 24);

    bs1.set(0, ByteSequence.create(100));
    bs1.set(99, ByteSequence.create(1));

    assert.throws(() => {
      bs1.set(0, ByteSequence.create(0));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(0, ByteSequence.create(101));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(99, ByteSequence.create(2));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("set(number, その他)", () => {
    assert.throws(() => {
      bs1.set(0, 1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.set(0, null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("代入不可", () => {
    assert.throws(() => {
      bs0.set = () => {};
    }, {
      name: "TypeError",
      //message: "Cannot add property set, object is not extensible",
    });
  });

});
