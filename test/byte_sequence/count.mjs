import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.count", function() {

  const bs0 = ByteSequence.create(0);
  const bs1 = ByteSequence.create(1000);

  it("count", () => {
    assert.strictEqual(bs0.count, 0);
    assert.strictEqual(bs1.count, 1000);

    assert.throws(() => {
      bs0.count();
    }, {
      name: "TypeError",
      //message: "bs0.count is not a function",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      bs0.count = 500;
    }, {
      name: "TypeError",
      //message: "Cannot set property count of [object Object] which has only a getter",
    });
  });

});
