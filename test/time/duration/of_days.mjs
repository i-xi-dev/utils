import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.ofDays", function() {

  it("ofDays()", () => {
    assert.throws(() => {
      Duration.ofDays();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("ofDays(number)", () => {
    assert.strictEqual(Duration.ofDays(0).value, 0n);
    assert.strictEqual(Duration.ofDays(1).value, 86400000000000n);
    assert.strictEqual(Duration.ofDays(-1).value, -86400000000000n);

    assert.throws(() => {
      Duration.ofDays(Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("ofDays(その他)", () => {
    assert.throws(() => {
      Duration.ofDays(0n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Duration.ofDays = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
