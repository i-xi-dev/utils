import assert from "assert";
import { AbstractTemporal } from "../../../src/Time/AbstractTemporal.mjs";

describe("Time.AbstractTemporal._fieldsOf", function() {

  it("_fieldsOf()", () => {
    assert.throws(() => {
      AbstractTemporal._fieldsOf();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("_fieldsOf(bigint)", () => {
    const f1 = AbstractTemporal._fieldsOf(0n);
    assert.strictEqual(f1.year, 1970);
    assert.strictEqual(f1.month, 1);
    assert.strictEqual(f1.day, 1);
    assert.strictEqual(f1.dayOfWeek, 4);
    assert.strictEqual(f1.hour, 0);
    assert.strictEqual(f1.minute, 0);
    assert.strictEqual(f1.second, 0);
    assert.strictEqual(f1.millisecond, 0);
    assert.strictEqual(f1.microsecond, 0);
    assert.strictEqual(f1.nanosecond, 0);

    const ht2 = performance.timeOrigin + performance.now();
    const d2 = new Date(ht2);
    const f2 = AbstractTemporal._fieldsOf(AbstractTemporal._millisToNanos(d2.valueOf()));
    assert.strictEqual(f2.year, d2.getUTCFullYear());
    assert.strictEqual(f2.month, d2.getUTCMonth() + 1);
    assert.strictEqual(f2.day, d2.getUTCDate());
    assert.strictEqual(f2.dayOfWeek, d2.getUTCDay() === 0 ? 7 : d2.getUTCDay());
    assert.strictEqual(f2.hour, d2.getUTCHours());
    assert.strictEqual(f2.minute, d2.getUTCMinutes());
    assert.strictEqual(f2.second, d2.getUTCSeconds());
    assert.strictEqual(f2.millisecond, d2.getUTCMilliseconds());
    const x = ht2.toFixed(7).slice(-11).padStart(0, 11).substring(0, 10).replace(".", "");
    assert.strictEqual(f2.millisecond, Number.parseInt(x.substring(0, 3), 10));
    assert.strictEqual(f2.microsecond, Number.parseInt(x.substring(0, 3) + "000", 10));
    assert.strictEqual(f2.nanosecond, Number.parseInt(x.substring(0, 3) + "000000", 10));

    const f2b = AbstractTemporal._fieldsOf(BigInt(ht2 * 1000000));
    assert.strictEqual(f2b.year, d2.getUTCFullYear());
    assert.strictEqual(f2b.month, d2.getUTCMonth() + 1);
    assert.strictEqual(f2b.day, d2.getUTCDate());
    assert.strictEqual(f2b.dayOfWeek, d2.getUTCDay() === 0 ? 7 : d2.getUTCDay());
    assert.strictEqual(f2b.hour, d2.getUTCHours());
    assert.strictEqual(f2b.minute, d2.getUTCMinutes());
    assert.strictEqual(f2b.second, d2.getUTCSeconds());
    assert.strictEqual(f2b.millisecond, d2.getUTCMilliseconds());
    assert.strictEqual(f2b.millisecond, Number.parseInt(x.substring(0, 3), 10));
    //誤差が出る assert.strictEqual(f2b.microsecond, Number.parseInt(x.substring(0, 6), 10));
    //誤差が出る assert.strictEqual(f2b.nanosecond, Number.parseInt(x, 10));

    // 2000-01-02T03:04:05.123345567Z
    const f3 = AbstractTemporal._fieldsOf(946782245123345567n);
    assert.strictEqual(f3.year, 2000);
    assert.strictEqual(f3.month, 1);
    assert.strictEqual(f3.day, 2);
    assert.strictEqual(f3.dayOfWeek, 7);
    assert.strictEqual(f3.hour, 3);
    assert.strictEqual(f3.minute, 4);
    assert.strictEqual(f3.second, 5);
    assert.strictEqual(f3.millisecond, 123);
    assert.strictEqual(f3.microsecond, 123345);
    assert.strictEqual(f3.nanosecond, 123345567);

    // 1969-01-01T03:04:05.123345567Z
    const f4 = AbstractTemporal._fieldsOf(-31438554876654433n);
    assert.strictEqual(f4.year, 1969);
    assert.strictEqual(f4.month, 1);
    assert.strictEqual(f4.day, 2);
    assert.strictEqual(f4.dayOfWeek, 4);
    assert.strictEqual(f4.hour, 3);
    assert.strictEqual(f4.minute, 4);
    assert.strictEqual(f4.second, 5);
    assert.strictEqual(f4.millisecond, 123);
    assert.strictEqual(f4.microsecond, 123345);
    assert.strictEqual(f4.nanosecond, 123345567);

  });

  it("_fieldsOf(その他)", () => {
    assert.throws(() => {
      AbstractTemporal._fieldsOf(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      AbstractTemporal._fieldsOf(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("代入不可", () => {
    assert.throws(() => {
      AbstractTemporal._fieldsOf = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
