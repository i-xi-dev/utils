import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.toJSON", function() {

  it("toJSON()", () => {
    const bs0 = ByteSequence.create(0);
    const bs1 = ByteSequence.create(1000);

    assert.strictEqual(bs0.toJSON().length, 0);
    assert.strictEqual(bs1.toJSON().length, 1000);

    const a2 = [1,2,3,4,5];
    const bs2 = ByteSequence.from(a2);
    assert.strictEqual(JSON.stringify(a2), JSON.stringify(bs2.toJSON()));
  });

  it("代入不可", () => {
    assert.throws(() => {
      ByteSequence.create(0).toJSON = 500;
    }, {
      name: "TypeError",
      //message: "Cannot add property toJSON, object is not extensible",
    });
  });

});
