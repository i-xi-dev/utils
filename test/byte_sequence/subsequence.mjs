import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.subsequence", function() {

  const bs0 = ByteSequence.create(0);

  it("subsequence()", () => {
    assert.throws(() => {
      bs0.subsequence();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("subsequence(number)", () => {
    const bs1 = ByteSequence.generateRandom(1000);

    assert.strictEqual(bs0.subsequence(0).count, 0);
    assert.notStrictEqual(bs0.subsequence(0).buffer, bs0.buffer);
    assert.strictEqual(bs0.subsequence(0).toString(), bs0.toString());

    assert.strictEqual(bs1.subsequence(0).count, 1000);
    assert.strictEqual(bs1.subsequence(999).count, 1);
    assert.strictEqual(bs1.subsequence(1000).count, 0);
    assert.notStrictEqual(bs1.subsequence(0).buffer, bs1.buffer);
    assert.strictEqual(bs1.subsequence(0).toString(), bs1.toString());

    const a2 = [1,2,3,4,5];
    const bs2 = ByteSequence.from(a2);
    assert.strictEqual(JSON.stringify(a2), JSON.stringify(bs2.subsequence(0).toArray()));

    assert.throws(() => {
      bs0.subsequence(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.subsequence(1001);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("subsequence(その他)", () => {
    assert.throws(() => {
      bs0.subsequence();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("subsequence(number, number)", () => {
    const bs1 = ByteSequence.generateRandom(1000);

    assert.strictEqual(bs0.subsequence(0, 0).count, 0);
    assert.notStrictEqual(bs0.subsequence(0, 0).buffer, bs0.buffer);
    assert.strictEqual(bs0.subsequence(0, 0).toString(), bs0.toString());

    assert.strictEqual(bs1.subsequence(0, 1000).count, 1000);
    assert.strictEqual(bs1.subsequence(999, 1000).count, 1);
    assert.strictEqual(bs1.subsequence(1000, 1000).count, 0);
    assert.notStrictEqual(bs1.subsequence(0, 1000).buffer, bs1.buffer);
    assert.strictEqual(bs1.subsequence(0, 1000).toString(), bs1.toString());

    assert.strictEqual(bs1.subsequence(100, 200).toString(), ByteSequence.from(bs1.get(100, 100)).toString());

    assert.throws(() => {
      bs0.subsequence(0, 1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.subsequence(0, 1001);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs1.subsequence(1000, 1001);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("subsequence(number, その他)", () => {
    assert.throws(() => {
      bs0.subsequence(0, null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      ByteSequence.create(0).subsequence = 500;
    }, {
      name: "TypeError",
      //message: "Cannot add property subsequence, object is not extensible",
    });
  });

});
