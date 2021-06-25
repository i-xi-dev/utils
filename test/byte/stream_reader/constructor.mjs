import assert from "assert";
import { Byte } from "../../../index.mjs";

describe("Byte.StreamReader", function() {

  it("new Byte.StreamReader()", () => {
    const bf0 = new Byte.StreamReader();
    assert.strictEqual(bf0 instanceof Byte.StreamReader, true);
  });

  it("newなし", () => {
    assert.throws(() => {
      Byte.StreamReader();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      const bf0 = new Byte.StreamReader();
      bf0.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      Byte.StreamReader.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
