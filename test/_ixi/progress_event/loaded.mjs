import assert from "assert";
import { _ixi } from "../../../src/_ixi.mjs";

describe("_ixi.ProgressEvent.prototype.loaded", function() {

  it("loaded", () => {
    const pe = new _ixi.ProgressEvent("progress", { loaded:50 });
    assert.strictEqual(pe.loaded, 50);

    const pe2 = new _ixi.ProgressEvent("progress", { loaded:{} });
    assert.strictEqual(pe2.loaded, 0);

    const pe3 = new _ixi.ProgressEvent("progress", { loaded:null });
    assert.strictEqual(pe3.loaded, 0);

    const pe4 = new _ixi.ProgressEvent("progress", { });
    assert.strictEqual(pe4.loaded, 0);
  });

  it("変更不可", () => {
    assert.throws(() => {
      const pe = new _ixi.ProgressEvent("progress", { lengthComputable:true, loaded:50, total:100 });
      pe.loaded = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
