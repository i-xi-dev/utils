import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.ofMilliseconds", function() {

  it("ofMilliseconds()", () => {
    assert.throws(() => {
      Duration.ofMilliseconds();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("ofMilliseconds(number)", () => {
    assert.strictEqual(Duration.ofMilliseconds(0).value, 0n);
    assert.strictEqual(Duration.ofMilliseconds(1).value, 1000000n);
    assert.strictEqual(Duration.ofMilliseconds(-1).value, -1000000n);

    assert.throws(() => {
      Duration.ofMilliseconds(Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("ofMilliseconds(その他)", () => {
    assert.throws(() => {
      Duration.ofMilliseconds(0n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Duration.ofMilliseconds = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
