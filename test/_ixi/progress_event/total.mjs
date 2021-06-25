import assert from "assert";
import { _ixi } from "../../../src/_ixi.mjs";

describe("_ixi.ProgressEvent.prototype.total", function() {

  it("total", () => {
    const pe = new _ixi.ProgressEvent("progress", { total:50 });
    assert.strictEqual(pe.total, 50);

    const pe2 = new _ixi.ProgressEvent("progress", { total:{} });
    assert.strictEqual(pe2.total, 0);

    const pe3 = new _ixi.ProgressEvent("progress", { total:null });
    assert.strictEqual(pe3.total, 0);

    const pe4 = new _ixi.ProgressEvent("progress", { });
    assert.strictEqual(pe4.total, 0);
  });

  it("変更不可", () => {
    assert.throws(() => {
      const pe = new _ixi.ProgressEvent("progress", { lengthComputable:true, loaded:50, total:100 });
      pe.total = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
