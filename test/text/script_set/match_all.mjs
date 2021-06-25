import assert from "assert";
import { Text } from "../../../index.mjs";

describe("Text.ScriptSet.prototype.matchAll", function() {

  const i0 = new Text.ScriptSet([]);
  const i1 = new Text.ScriptSet(["Latn","Hira"]);
  const i2 = new Text.ScriptSet(["Hani"]);

  it("matchAll()", () => {
    assert.throws(() => {
      i0.matchAll();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("matchAll(string)", () => {
    assert.strictEqual(JSON.stringify(i0.matchAll("")), "[]");
    assert.strictEqual(JSON.stringify(i0.matchAll("a1")), "[]");
    assert.strictEqual(JSON.stringify(i0.matchAll("a1あ")), "[]");
    assert.strictEqual(JSON.stringify(i0.matchAll("a1あア")), "[]");

    assert.strictEqual(JSON.stringify(i1.matchAll("")), '[]');
    assert.strictEqual(JSON.stringify(i1.matchAll("a1")), '[{"char":"a","index":0}]');
    assert.strictEqual(JSON.stringify(i1.matchAll("a1あ")), '[{"char":"a","index":0},{"char":"あ","index":2}]');
    assert.strictEqual(JSON.stringify(i1.matchAll("a1あアー")), '[{"char":"a","index":0},{"char":"あ","index":2},{"char":"ー","index":4}]');
    assert.strictEqual(JSON.stringify(i1.matchAll("ア")), '[]');
    assert.strictEqual(JSON.stringify(i1.matchAll("アb")), '[{"char":"b","index":1}]');
    assert.strictEqual(JSON.stringify(i1.matchAll("ア\nb")), '[{"char":"b","index":2}]');
    assert.strictEqual(JSON.stringify(i1.matchAll("ア\r\nb")), '[{"char":"b","index":3}]');
    assert.strictEqual(JSON.stringify(i1.matchAll("ア\r\nbq\u{2000B}r4")), '[{"char":"b","index":3},{"char":"q","index":4},{"char":"r","index":7}]');

    assert.strictEqual(JSON.stringify(i2.matchAll("")), '[]');
    assert.strictEqual(JSON.stringify(i2.matchAll("ア")), '[]');
    assert.strictEqual(JSON.stringify(i2.matchAll("\u{2000B}")), '[{"char":"𠀋","index":0}]');
    assert.strictEqual(JSON.stringify(i2.matchAll("\u{2000B}a\u{2000B}")), '[{"char":"𠀋","index":0},{"char":"𠀋","index":3}]');
    assert.strictEqual(JSON.stringify(i2.matchAll("新kan線が緊キュウ停し線")), '[{"char":"新","index":0},{"char":"線","index":4},{"char":"緊","index":6},{"char":"停","index":10},{"char":"線","index":12}]');

  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.matchAll = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
