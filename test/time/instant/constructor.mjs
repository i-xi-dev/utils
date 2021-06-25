import assert from "assert";
import { Time } from "../../../index.mjs";
const Instant = Time.Instant;

describe("Time.Instant", function() {

  const i0 = new Instant(0n);
  const i1 = new Instant(1n);
  const i1m = new Instant(-1n);

  it("new Instant()", () => {
    assert.throws(() => {
      new Instant();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("new Instant(bigint)", () => {
    assert.strictEqual(i0 instanceof Instant, true);
    assert.strictEqual(i0.value, 0n);
    assert.strictEqual(i1.value, 1n);
    assert.strictEqual(i1m.value, -1n);
  });

  it("new Instant(その他)", () => {
    assert.throws(() => {
      new Instant(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new Instant("0");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new Instant(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("newなし", () => {
    assert.throws(() => {
      Instant(0n);
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      const i0b = new Instant(0n);
      i0b.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      Instant.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });
});
