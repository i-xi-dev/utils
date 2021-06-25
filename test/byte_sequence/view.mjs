import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.view", function() {

  const b0 = new Uint8Array(0);
  const bs0 = ByteSequence.from(b0);
  const bs1 = ByteSequence.create(1000);

  it("view()", () => {
    assert.strictEqual(bs0.view().byteLength, 0);
    assert.strictEqual(bs1.view().byteLength, 1000);
    assert.strictEqual((bs1.view() instanceof Uint8Array), true);
  });

  it("view(number)", () => {
    assert.strictEqual(bs1.view(0).byteLength, 1000);
    assert.strictEqual(bs1.view(1).byteLength, 999);
    assert.strictEqual(bs1.view(999).byteLength, 1);

    assert.throws(() => {
      bs1.view(-1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.view(1000);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.view(Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("view(その他)", () => {
    assert.throws(() => {
      bs1.view(1.5);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.view("100");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.view(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("view(number, number)", () => {
    assert.strictEqual(bs1.view(0, 1).byteLength, 1);
    assert.strictEqual(bs1.view(0, 1000).byteLength, 1000);
    assert.strictEqual(bs1.view(999, 1).byteLength, 1);

    assert.throws(() => {
      bs1.view(0, Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.view(0, 1.5);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.view(0, 1001);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.view(999, 2);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.view(0, 0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("view(number, その他)", () => {
    assert.throws(() => {
      bs1.view(0, "1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.view(0, 1n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("view(number, number, function)", () => {
    assert.strictEqual(bs1.view(0, 1, Uint8Array).byteLength, 1);
    assert.strictEqual(bs1.view(0, 1000, Uint8Array).byteLength, 1000);
    assert.strictEqual(bs1.view(999, 1, Uint8Array).byteLength, 1);
    assert.strictEqual(bs1.view(0, 500, Uint16Array).byteLength, 1000);

    assert.throws(() => {
      bs1.view(0, 501, Uint16Array);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.view(999, 2, Uint16Array);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("view(number, number, その他)", () => {
    assert.throws(() => {
      bs1.view(0, 1, () => {});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.view(0, 1, null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.view(0, 1, class {
        static BYTES_PER_ELEMENT = 1;
      });
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("fromメソッドに渡したインスタンスとは異なるインスタンスが返る", () => {
    assert.notStrictEqual(bs0.view(), b0);
  });

  it("返却値への操作は自身に影響する", () => {
    const a1 = Uint8Array.of(255,254);
    const t1 = ByteSequence.from(a1);
    const a1c = t1.view();
    t1.set(0, [12]);

    assert.strictEqual(a1c[0], 12);
    assert.strictEqual(new Uint8Array(t1.buffer)[0], 12);

    a1c[1] = 33;

    assert.strictEqual(a1c[1], 33);
    assert.strictEqual(new Uint8Array(t1.buffer)[1], 33);
  });

  it("代入不可", () => {
    assert.throws(() => {
      bs0.view = 500;
    }, {
      name: "TypeError",
      //message: "Cannot add property view, object is not extensible",
    });
  });

});
