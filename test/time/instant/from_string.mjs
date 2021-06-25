import assert from "assert";
import { Time } from "../../../index.mjs";
const Instant = Time.Instant;

describe("Time.Instant.fromString", function() {

  it("fromString()", () => {
    assert.throws(() => {
      Instant.fromString();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("fromString(string)", () => {
    assert.strictEqual(Instant.fromString("1970-01-01T00:00:00.000000000Z").value, 0n);
    assert.strictEqual(Instant.fromString("+001970-01-01T00:00:00.000000000Z").value, 0n);
    assert.strictEqual(Instant.fromString("2021-06-09T04:36:56.000000000Z").value, 1623213416000000000n);
    assert.strictEqual(Instant.fromString("1968-03-02T04:48:39.000000000Z").value, -57870681000000000n);

    assert.strictEqual(Instant.fromString("2021-01-02T03:04:05.543000000Z").value, 1609556645543000000n);
    assert.strictEqual(Instant.fromString("1958-12-11T23:44:55.543000000Z").value, -348884104457000000n);

    assert.strictEqual(Instant.fromString("1970-01-01T00:00:00.000000001Z").value, 1n);
    assert.strictEqual(Instant.fromString("1970-01-01T00:00:00.000000010Z").value, 10n);
    assert.strictEqual(Instant.fromString("1970-01-01T00:00:00.000000100Z").value, 100n);
    assert.strictEqual(Instant.fromString("1970-01-01T00:00:00.000001000Z").value, 1000n);
    assert.strictEqual(Instant.fromString("1970-01-01T00:00:00.000010000Z").value, 10000n);
    assert.strictEqual(Instant.fromString("1970-01-01T00:00:00.000100000Z").value, 100000n);
    assert.strictEqual(Instant.fromString("1970-01-01T00:00:00.001000000Z").value, 1000000n);
    assert.strictEqual(Instant.fromString("1970-01-01T00:00:00.010000000Z").value, 10000000n);
    assert.strictEqual(Instant.fromString("1970-01-01T00:00:00.100000000Z").value, 100000000n);
    assert.strictEqual(Instant.fromString("1970-01-01T00:00:01.000000000Z").value, 1000000000n);

    assert.strictEqual(Instant.fromString("1969-12-31T23:59:59.999999999Z").value, -1n);
    assert.strictEqual(Instant.fromString("1969-12-31T23:59:59.999999990Z").value, -10n);
    assert.strictEqual(Instant.fromString("1969-12-31T23:59:59.999999900Z").value, -100n);
    assert.strictEqual(Instant.fromString("1969-12-31T23:59:59.999999000Z").value, -1000n);
    assert.strictEqual(Instant.fromString("1969-12-31T23:59:59.999990000Z").value, -10000n);
    assert.strictEqual(Instant.fromString("1969-12-31T23:59:59.999900000Z").value, -100000n);
    assert.strictEqual(Instant.fromString("1969-12-31T23:59:59.999000000Z").value, -1000000n);
    assert.strictEqual(Instant.fromString("1969-12-31T23:59:59.990000000Z").value, -10000000n);
    assert.strictEqual(Instant.fromString("1969-12-31T23:59:59.900000000Z").value, -100000000n);
    assert.strictEqual(Instant.fromString("1969-12-31T23:59:59.000000000Z").value, -1000000000n);

    assert.throws(() => {
      Instant.fromString("a1970-01-01T00:00:00.000000000Z");
    }, {
      name: "_ixi.DataError",
    });
  });

  it("fromString(string, Object)", () => {
    assert.strictEqual(Instant.fromString("1970-01-01T00:00:00Z", {fractionDigits:0}).value, 0n);
    assert.strictEqual(Instant.fromString("+001970-01-01T00:00:00Z", {fractionDigits:0}).value, 0n);
    assert.strictEqual(Instant.fromString("2021-06-09T04:36:56Z", {fractionDigits:0}).value, 1623213416000000000n);

    assert.strictEqual(Instant.fromString("1969-11-01T11:12:10Z", {fractionDigits:0}).value,      -5230070000000000n);
    assert.strictEqual(Instant.fromString("1969-11-01T11:12:13Z", {fractionDigits:0}).value,      -5230067000000000n);
    assert.strictEqual(Instant.fromString("1969-11-01T11:12:13.4Z", {fractionDigits:1}).value,    -5230066600000000n);
    assert.strictEqual(Instant.fromString("1969-11-01T11:12:13.45Z", {fractionDigits:2}).value,   -5230066550000000n);
    assert.strictEqual(Instant.fromString("1969-11-01T11:12:13.456Z", {fractionDigits:3}).value,  -5230066544000000n);
    assert.strictEqual(Instant.fromString("1969-11-01T11:12:13.4567Z", {fractionDigits:4}).value, -5230066543300000n);

    assert.throws(() => {
      Instant.fromString("1970-01-01T00:00:00.000000000Z", {fractionDigits:0});
    }, {
      name: "_ixi.DataError",
    });
  });

  it("fromString(string, その他)", () => {
    assert.strictEqual(Instant.fromString("1970-01-01T00:00:00.000000000Z", "").value, 0n);

    assert.throws(() => {
      Instant.fromString("1970-01-01T00:00:00.000000000Z", null);
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("fromString(その他)", () => {
    assert.throws(() => {
      Instant.fromString(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Instant.fromString = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
