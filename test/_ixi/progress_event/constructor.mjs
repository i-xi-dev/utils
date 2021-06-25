import assert from "assert";
import { _ixi } from "../../../src/_ixi.mjs";

describe("_ixi.ProgressEvent", function() {

  it("new _ixi.ProgressEvent()", () => {
    const pe = new _ixi.ProgressEvent();
    //assert.strictEqual(pe.type, );
    assert.strictEqual(pe.bubbles, false);
    assert.strictEqual(pe.cancelable, false);
    assert.strictEqual(pe.composed, false);
    assert.strictEqual(pe.currentTarget, null);
    assert.strictEqual(pe.defaultPrevented, false);
    assert.strictEqual(pe.eventPhase, 0);
    assert.strictEqual(pe.returnValue, true);
    assert.strictEqual(pe.target, null);
    assert.strictEqual(typeof pe.timeStamp, "number");
    assert.strictEqual(pe.isTrusted, false);
    assert.strictEqual(Array.isArray(pe.composedPath()), true);

    assert.strictEqual(pe.lengthComputable, false);
    assert.strictEqual(pe.loaded, 0);
    assert.strictEqual(pe.total, 0);
  });

  it("new _ixi.Exception(string)", () => {
    const pe = new _ixi.ProgressEvent("progress");
    assert.strictEqual(pe.type, "progress");

    assert.strictEqual(pe.lengthComputable, false);
    assert.strictEqual(pe.loaded, 0);
    assert.strictEqual(pe.total, 0);
  });

  it("new _ixi.Exception(string, ProgressEventInit)", () => {
    const pe = new _ixi.ProgressEvent("progress", { lengthComputable:true, loaded:50, total:100 });
    assert.strictEqual(pe.type, "progress");
    assert.strictEqual(pe.bubbles, false);
    assert.strictEqual(pe.cancelable, false);
    assert.strictEqual(pe.composed, false);
    assert.strictEqual(pe.currentTarget, null);
    assert.strictEqual(pe.defaultPrevented, false);
    assert.strictEqual(pe.eventPhase, 0);
    assert.strictEqual(pe.returnValue, true);
    assert.strictEqual(pe.target, null);
    assert.strictEqual(typeof pe.timeStamp, "number");
    assert.strictEqual(pe.isTrusted, false);
    assert.strictEqual(Array.isArray(pe.composedPath()), true);

    assert.strictEqual(pe.lengthComputable, true);
    assert.strictEqual(pe.loaded, 50);
    assert.strictEqual(pe.total, 100);
  });

  it("new _ixi.Exception(その他)", () => {
    const pe = new _ixi.ProgressEvent(0);
    assert.strictEqual(pe.type, "0");
  });

  it("new _ixi.Exception(string, その他)", () => {
    const pe = new _ixi.ProgressEvent("progress", null);
    assert.strictEqual(pe.type, "progress");

    assert.strictEqual(pe.lengthComputable, false);
    assert.strictEqual(pe.loaded, 0);
    assert.strictEqual(pe.total, 0);

  });

  it("newなし", () => {
    assert.throws(() => {
      _ixi.ProgressEvent();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  // it("変更不可", () => {
  //   assert.throws(() => {
  //     const ex0 = new _ixi.ProgressEvent();
  //     console.log(ex0)
  //     ex0.aaaaa = 1;
  //   }, {
  //     name: "TypeError",
  //     message: "...",
  //   });
  // });

  it("変更不可", () => {
    assert.throws(() => {
      _ixi.ProgressEvent.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
