import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.ofMinutes", function() {

  it("ofMinutes()", () => {
    assert.throws(() => {
      Duration.ofMinutes();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("ofMinutes(number)", () => {
    assert.strictEqual(Duration.ofMinutes(0).value, 0n);
    assert.strictEqual(Duration.ofMinutes(1).value, 60000000000n);
    assert.strictEqual(Duration.ofMinutes(-1).value, -60000000000n);

    assert.throws(() => {
      Duration.ofMinutes(Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("ofMinutes(その他)", () => {
    assert.throws(() => {
      Duration.ofMinutes(0n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Duration.ofMinutes = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
