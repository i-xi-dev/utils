import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.fromString", function() {

  it("fromString()", () => {
    assert.throws(() => {
      Duration.fromString();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("fromString(string)", () => {
    assert.strictEqual(Duration.fromString("PT00H00M00.000000000S").value, 0n);
    assert.strictEqual(Duration.fromString("PT00H00M00.000000001S").value, 1n);
    assert.strictEqual(Duration.fromString("PT00H00M00.000001000S").value, 1000n);
    assert.strictEqual(Duration.fromString("PT00H00M00.001000000S").value, 1000000n);
    assert.strictEqual(Duration.fromString("PT00H00M01.000000000S").value, 1000000000n);
    assert.strictEqual(Duration.fromString("PT00H01M00.000000000S").value, 60000000000n);
    assert.strictEqual(Duration.fromString("PT01H00M00.000000000S").value, 3600000000000n);
    assert.strictEqual(Duration.fromString("PT24H00M00.000000000S").value, 86400000000000n);
    assert.strictEqual(Duration.fromString("PT2400H00M00.000000000S").value, 8640000000000000n);

    assert.strictEqual(Duration.fromString("-PT00H00M00.000000001S").value, -1n);
    assert.strictEqual(Duration.fromString("-PT00H00M00.000001000S").value, -1000n);
    assert.strictEqual(Duration.fromString("-PT00H00M00.001000000S").value, -1000000n);
    assert.strictEqual(Duration.fromString("-PT00H00M01.000000000S").value, -1000000000n);
    assert.strictEqual(Duration.fromString("-PT00H01M00.000000000S").value, -60000000000n);
    assert.strictEqual(Duration.fromString("-PT01H00M00.000000000S").value, -3600000000000n);
    assert.strictEqual(Duration.fromString("-PT24H00M00.000000000S").value, -86400000000000n);
    assert.strictEqual(Duration.fromString("-PT2400H00M00.000000000S").value, -8640000000000000n);

    assert.strictEqual(Duration.fromString("PT00H20M30.123456789S").value, 1230123456789n);

    assert.throws(() => {
      Duration.fromString("APT00H00M00.000000001S");
    }, {
      name: "_ixi.DataError",
    });
  });

  it("fromString(string, Object)", () => {
    assert.strictEqual(Duration.fromString("PT00H00M00S", {fractionDigits:0}).value, 0n);
    assert.strictEqual(Duration.fromString("PT00H00M01S", {fractionDigits:0}).value, 1000000000n);
    assert.strictEqual(Duration.fromString("PT00H01M00S", {fractionDigits:0}).value, 60000000000n);
    assert.strictEqual(Duration.fromString("PT01H00M00S", {fractionDigits:0}).value, 3600000000000n);
    assert.strictEqual(Duration.fromString("PT24H00M00S", {fractionDigits:0}).value, 86400000000000n);
    assert.strictEqual(Duration.fromString("PT2400H00M00S", {fractionDigits:0}).value, 8640000000000000n);

    assert.throws(() => {
      Duration.fromString("PT00H00M00.000000001S", {fractionDigits:0});
    }, {
      name: "_ixi.DataError",
    });
  });

  it("fromString(string, その他)", () => {
    assert.strictEqual(Duration.fromString("PT00H00M00.000000000S", "").value, 0n);

    assert.throws(() => {
      Duration.fromString("PT00H00M00.000000001S", null);
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("fromString(その他)", () => {
    assert.throws(() => {
      Duration.fromString(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Duration.fromString = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
