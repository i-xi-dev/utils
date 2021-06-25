import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;

describe("Time.Duration.ofHours", function() {

  it("ofHours()", () => {
    assert.throws(() => {
      Duration.ofHours();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("ofHours(number)", () => {
    assert.strictEqual(Duration.ofHours(0).value, 0n);
    assert.strictEqual(Duration.ofHours(1).value, 3600000000000n);
    assert.strictEqual(Duration.ofHours(-1).value, -3600000000000n);

    assert.throws(() => {
      Duration.ofHours(Number.NaN);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("ofHours(その他)", () => {
    assert.throws(() => {
      Duration.ofHours(0n);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Duration.ofHours = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
