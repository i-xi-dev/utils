import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.ofSeconds", function() {

  it("ofSeconds()", () => {
    assert.throws(() => {
      Duration.ofSeconds();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("ofSeconds(number)", () => {
    assert.strictEqual(Duration.ofSeconds(0).value, 0n);
    assert.strictEqual(Duration.ofSeconds(1).value, 1000000000n);
    assert.strictEqual(Duration.ofSeconds(-1).value, -1000000000n);

    assert.throws(() => {
      Duration.ofSeconds(Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("ofSeconds(その他)", () => {
    assert.throws(() => {
      Duration.ofSeconds(0n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Duration.ofSeconds = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
