import assert from "assert";
import fs from "fs";
import { Byte } from "../../../index.mjs";

describe("Byte.StreamReader.prototype.addEventListener", function() {
  const r0 = new Byte.StreamReader();

  it("addEventListener(*)", async () => {
    const stream = fs.createReadStream("./test/_testdata/128.txt", { highWaterMark: 64 });
    const r0b = new Byte.StreamReader();
    let es = [];
    r0b.addEventListener("progress", (e) => {
      es.push({
        loaded: e.loaded,
        total: e.total,
        lengthComputable: e.lengthComputable,
      });
    });
    const bytes = await r0b.read(stream);
    assert.strictEqual(bytes.byteLength, 128);
    let i = 0;
    for (const e of es) {
      i = i + 64;
      assert.strictEqual(e.total, 0);
      assert.strictEqual(e.lengthComputable, false);
      assert.strictEqual(e.loaded, i);
    }

    const stream2 = fs.createReadStream("./test/_testdata/128.txt", { highWaterMark: 64 });
    const r0b2 = new Byte.StreamReader();
    let es2 = [];
    r0b2.addEventListener("progress", (e) => {
      es2.push({
        loaded: e.loaded,
        total: e.total,
        lengthComputable: e.lengthComputable,
      });
    });
    const bytes2 = await r0b2.read(stream2, 128);
    assert.strictEqual(bytes2.byteLength, 128);
    let i2 = 0;
    for (const e of es2) {
      i2 = i2 + 64;
      assert.strictEqual(e.total, 128);
      assert.strictEqual(e.lengthComputable, true);
      assert.strictEqual(e.loaded, i2);
    }

  });

  it("代入不可", () => {
    assert.throws(() => {
      r0.addEventListener = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
