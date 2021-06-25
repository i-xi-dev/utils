import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.get", function() {

  const bs0 = ByteSequence.create(0);
  const bs1 = ByteSequence.create(1000);
  bs1.set(50, [38]);

  it("get()", () => {
    assert.throws(() => {
      bs0.get();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("get(number)", () => {
    assert.strictEqual(bs1.get(0).length, 1);
    assert.strictEqual(bs1.get(999).length, 1);

    assert.throws(() => {
      bs0.get(0); //XXX これは空の配列を返すようにする？
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.get(Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.get(1.5);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.get(-1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.get(1000);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("get(その他)", () => {
    assert.throws(() => {
      bs1.get("0");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.get(BigInt("1"));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("get(number, number)", () => {
    assert.strictEqual(bs1.get(0, 1000).length, 1000);
    assert.strictEqual(bs1.get(999, 1).length, 1);

    assert.throws(() => {
      bs1.get(0, 0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.get(0, Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.get(0, 1.5);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.get(0, 1001);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.get(999, 2);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.strictEqual(bs1.get(50, 1)[0], new Uint8Array(bs1.buffer)[50]);
    assert.strictEqual(bs1.get(50, 1)[0], 38);
  });

  it("get(number, その他)", () => {
    assert.throws(() => {
      bs1.get(0, "1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.get(0, BigInt("1"));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      bs0.get = () => {};
    }, {
      name: "TypeError",
      //message: "Cannot add property get, object is not extensible",
    });
  });

});
