import assert from "assert";
import { Uuid } from "../../index.mjs";

describe("Uuid.generateRandom", function() {

  it("generateRandom()", () => {
    const uuids = [];
    for (let i = 0; i < 100; i++) {
      const uuid = Uuid.generateRandom();
      assert.strictEqual(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid.toString()), true);

      uuids.push(uuid);
    };
    assert.strictEqual(uuids.length, (new Set(uuids)).size);
  });

  it("代入不可", () => {
    assert.throws(() => {
      Uuid.generateRandom = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
