import assert from "assert";
import { _ixi } from "../../../src/_ixi.mjs";

describe("_ixi.ProgressEvent.prototype.lengthComputable", function() {

  it("lengthComputable", () => {
    const pe = new _ixi.ProgressEvent("progress", { lengthComputable:true });
    assert.strictEqual(pe.lengthComputable, true);

    const pe2 = new _ixi.ProgressEvent("progress", { lengthComputable:{} });
    assert.strictEqual(pe2.lengthComputable, false);

    const pe3 = new _ixi.ProgressEvent("progress", { lengthComputable:null });
    assert.strictEqual(pe3.lengthComputable, false);

    const pe4 = new _ixi.ProgressEvent("progress", { });
    assert.strictEqual(pe4.lengthComputable, false);
  });

  it("変更不可", () => {
    assert.throws(() => {
      const pe = new _ixi.ProgressEvent("progress", { lengthComputable:true, loaded:50, total:100 });
      pe.lengthComputable = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
