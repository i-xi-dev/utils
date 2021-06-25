import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal", function() {

  const i0 = new AbstractTemporal(0n);
  const i1 = new AbstractTemporal(1n);
  const i1m = new AbstractTemporal(-1n);

  it("new AbstractTemporal()", () => {
    assert.throws(() => {
      new AbstractTemporal();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("new AbstractTemporal(bigint)", () => {
    assert.strictEqual(i0 instanceof AbstractTemporal, true);
    assert.strictEqual(i0.value, 0n);
    assert.strictEqual(i1.value, 1n);
    assert.strictEqual(i1m.value, -1n);
  });

  it("new AbstractTemporal(その他)", () => {
    assert.throws(() => {
      new AbstractTemporal(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new AbstractTemporal("0");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new AbstractTemporal(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("newなし", () => {
    assert.throws(() => {
      AbstractTemporal(0n);
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更可", () => {
    const i0b = new AbstractTemporal(0n);
    i0b.aaaaa = 1;
    assert.strictEqual(i0b.aaaaa, 1);
  });

  it("変更不可", () => {
    assert.throws(() => {
      AbstractTemporal.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });
});
