import assert from "assert";
import { Time } from "../../../index.mjs";
const Instant = Time.Instant;

describe("Time.Instant.fromUnixTimeSeconds", function() {

  it("fromUnixTimeSeconds()", () => {
    assert.throws(() => {
      Instant.fromUnixTimeSeconds();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("fromUnixTimeSeconds(number)", () => {
    assert.strictEqual(Instant.fromUnixTimeSeconds(0).value, 0n);
    assert.strictEqual(Instant.fromUnixTimeSeconds(1).value, 1000000000n);
    assert.strictEqual(Instant.fromUnixTimeSeconds(-1).value, -1000000000n);

    assert.throws(() => {
      Instant.fromUnixTimeSeconds(Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("fromUnixTimeSeconds(その他)", () => {
    assert.throws(() => {
      Instant.fromUnixTimeSeconds("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      Instant.fromUnixTimeSeconds(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Instant.fromUnixTimeSeconds = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
