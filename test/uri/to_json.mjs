import assert from "assert";
import { Uri } from "../../src/Uri.mjs";

describe("Uri.prototype.toJSON", function() {

  const t0 = new Uri("http://example.com/");

  it("toJSON()", () => {
    const u0 = new Uri("http://example.com:8080/");

    assert.strictEqual(u0.toJSON(), "http://example.com:8080/");

  });

  it("代入不可", () => {
    assert.throws(() => {
      t0.toJSON = "1";
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
