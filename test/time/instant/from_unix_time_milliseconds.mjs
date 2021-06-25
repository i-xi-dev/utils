import assert from "assert";
import { Time } from "../../../index.mjs";
const Instant = Time.Instant;

describe("Time.Instant.fromUnixTimeMilliseconds", function() {

  it("fromUnixTimeMilliseconds()", () => {
    assert.throws(() => {
      Instant.fromUnixTimeMilliseconds();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("fromUnixTimeMilliseconds(number)", () => {
    assert.strictEqual(Instant.fromUnixTimeMilliseconds(0).value, 0n);
    assert.strictEqual(Instant.fromUnixTimeMilliseconds(1).value, 1000000n);
    assert.strictEqual(Instant.fromUnixTimeMilliseconds(-1).value, -1000000n);

    assert.throws(() => {
      Instant.fromUnixTimeMilliseconds(Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("fromUnixTimeMilliseconds(その他)", () => {
    assert.throws(() => {
      Instant.fromUnixTimeMilliseconds("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      Instant.fromUnixTimeMilliseconds(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Instant.fromUnixTimeMilliseconds = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
