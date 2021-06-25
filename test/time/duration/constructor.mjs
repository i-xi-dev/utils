import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration", function() {

  const i0 = new Duration(0n);
  const i1 = new Duration(1n);
  const i1m = new Duration(-1n);

  it("new Duration()", () => {
    assert.throws(() => {
      new Duration();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("new Duration(bigint)", () => {
    assert.strictEqual(i0 instanceof Duration, true);
    assert.strictEqual(i0.value, 0n);
    assert.strictEqual(i1.value, 1n);
    assert.strictEqual(i1m.value, -1n);
  });

  it("new Duration(その他)", () => {
    assert.throws(() => {
      new Duration(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new Duration("0");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new Duration(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("newなし", () => {
    assert.throws(() => {
      Duration(0n);
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      const i0b = new Duration(0n);
      i0b.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      Duration.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });
});
