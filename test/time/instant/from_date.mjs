import assert from "assert";
import { Time } from "../../../index.mjs";
const Instant = Time.Instant;

describe("Time.Instant.fromDate", function() {

  it("fromDate()", () => {
    assert.throws(() => {
      Instant.fromDate();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("fromDate(Date)", () => {
    assert.strictEqual(Instant.fromDate(new Date(0)).value, 0n);
    assert.strictEqual(Instant.fromDate(new Date(1)).value, 1000000n);
    assert.strictEqual(Instant.fromDate(new Date(-1)).value, -1000000n);

  });

  it("fromDate(その他)", () => {
    assert.throws(() => {
      Instant.fromDate("1");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      Instant.fromDate(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      Instant.fromDate = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
