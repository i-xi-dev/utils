import assert from "assert";
import { Uuid } from "../../index.mjs";

describe("Uuid.prototype.equals", function() {

  const bs0 = Uuid.nil();
  const bs1 = Uuid.generateRandom();

  it("equals()", () => {
    assert.throws(() => {
      bs0.equals();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("equals(Uuid)", () => {
    assert.strictEqual(bs0.equals(Uuid.nil()), true);
    assert.strictEqual(bs0.equals(bs1), false);

  });

  it("equals(string)", () => {
    assert.strictEqual(bs0.equals(Uuid.nil().toString()), true);
    assert.strictEqual(bs0.equals(bs1.toString()), false);
    assert.strictEqual(bs1.equals(bs1.toString()), true);

  });

  it("equals(その他)", () => {
    assert.throws(() => {
      bs0.equals(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs0.equals({});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      bs0.equals(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      bs0.equals = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
