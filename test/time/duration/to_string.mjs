import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.prototype.toString", function() {

  const i0 = new Duration(0n);

  it("toString()", () => {
    assert.strictEqual(i0.toString(), "PT00H00M00.000000000S");

    assert.strictEqual((new Duration(1n)).toString(), "PT00H00M00.000000001S");
    assert.strictEqual((new Duration(-1n)).toString(), "-PT00H00M00.000000001S");

    assert.strictEqual(Duration.ofDays(10).plus(Duration.ofHours(1)).plus(Duration.ofMinutes(11)).plus(Duration.ofSeconds(28)).plus(new Duration(655n)).toString(), "PT241H11M28.000000655S");
    assert.strictEqual(Duration.ofDays(-10).plus(Duration.ofHours(-1)).plus(Duration.ofMinutes(-11)).plus(Duration.ofSeconds(-28)).plus(new Duration(-655n)).toString(), "-PT241H11M28.000000655S");
    assert.strictEqual(Duration.ofDays(10).plus(Duration.ofHours(1)).plus(Duration.ofMinutes(11)).plus(Duration.ofSeconds(28)).minus(new Duration(1n)).toString(), "PT241H11M27.999999999S");

  });

  it("toString(Object)", () => {
    assert.strictEqual(i0.toString({fractionDigits:9}), "PT00H00M00.000000000S");
    assert.strictEqual(i0.toString({fractionDigits:1}), "PT00H00M00.0S");
    assert.strictEqual(i0.toString({fractionDigits:0}), "PT00H00M00S");

    const m1 = Duration.ofMinutes(1);
    assert.strictEqual(m1.toString({fractionDigits:9}), "PT00H01M00.000000000S");
    assert.strictEqual(m1.toString({fractionDigits:0}), "PT00H01M00S");

    const m1m = Duration.ofMinutes(-1);
    assert.strictEqual(m1m.toString({fractionDigits:9}), "-PT00H01M00.000000000S");
    assert.strictEqual(m1m.toString({fractionDigits:0}), "-PT00H01M00S");

    const h1 = Duration.ofHours(1);
    assert.strictEqual(h1.toString({fractionDigits:9}), "PT01H00M00.000000000S");
    assert.strictEqual(h1.toString({fractionDigits:0}), "PT01H00M00S");

    const d1 = Duration.ofDays(1);
    assert.strictEqual(d1.toString({fractionDigits:9}), "PT24H00M00.000000000S");
    assert.strictEqual(d1.toString({fractionDigits:0}), "PT24H00M00S");

    const d10 = Duration.ofDays(10);
    assert.strictEqual(d10.toString({fractionDigits:9}), "PT240H00M00.000000000S");
    assert.strictEqual(d10.toString({fractionDigits:0}), "PT240H00M00S");

  });

  it("toString(その他)", () => {
    assert.strictEqual(i0.toString(11), "PT00H00M00.000000000S");
    assert.strictEqual(i0.toString(""), "PT00H00M00.000000000S");

    assert.throws(() => {
      i0.toString(null);
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.toString = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });


});
