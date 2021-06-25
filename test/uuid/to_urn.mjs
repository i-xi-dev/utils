import assert from "assert";
import { Uuid } from "../../index.mjs";

describe("Uuid.prototype.toUrn", function() {

  const i0 = Uuid.nil();

  it("toUrn()", () => {
    assert.strictEqual(i0.toUrn().toString(), "urn:uuid:00000000-0000-0000-0000-000000000000");
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.toUrn = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
