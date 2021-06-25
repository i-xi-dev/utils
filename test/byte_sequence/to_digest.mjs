import assert from "assert";
import { ByteSequence } from "../../index.mjs";

describe("ByteSequence.prototype.toDigest", function() {

  const bs0 = ByteSequence.create(0);

  it("toDigest()", async () => {
    await assert.rejects(async () => {
      await bs0.toDigest();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("toDigest(string)", async () => {
    // const d1 = await bs0.toDigest("sha-512");
    // assert.strictEqual(d1.toString(), "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e");

    // const d2 = await bs0.toDigest("shA-384");
    // assert.strictEqual(d2.toString(), "38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b");

    const d3 = await bs0.toDigest("SHA-256");
    assert.strictEqual(d3.toString(), "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");

    // const d4 = await bs0.toDigest("SHA-1");
    // assert.strictEqual(d4.toString(), "da39a3ee5e6b4b0d3255bfef95601890afd80709");

    const r = ByteSequence.from([255, 0, 254, 1, 253, 2, 252, 3]);
    // const sha1OfR = await r.toDigest("SHA-1");
    // assert.strictEqual(sha1OfR.format(), "1f743b15aee33c5a54a07f0535e5c96895e63a5e");
    const sha256OfR = await r.toDigest("SHA-256");
    assert.strictEqual(sha256OfR.format(), "ba3880474f6e28cff0d6cad930a7fdc6227b0554b1c401903ab904a2cf8bd901");
    // const sha384OfR = await r.toDigest("SHA-384");
    // assert.strictEqual(sha384OfR.format(), "1c2869a5b1d156d80a78a266cfa349e5d3aa7bbcba20c556e812e7df6e36e79c9fcda6f595a71e979cb09ffd5172b976");
    // const sha512OfR = await r.toDigest("SHA-512");
    // assert.strictEqual(sha512OfR.format(), "a0bf43483a3f8b16707e3c091362df13215bf4527b23fbd1ee09a89dcd47dfc1b6a797dc83fd5469e157d6e24ca6ab7b98b3a4177e58961ecd73824fa8c0c618");

    await assert.rejects(async () => {
      await bs0.toDigest("MD5X");
    }, {
      name: "_ixi.NotFoundError",
    });
  });

  it("toDigest(その他)", async () => {
    await assert.rejects(async () => {
      await bs0.toDigest(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    await assert.rejects(async () => {
      await bs0.toDigest({});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", async () => {
    assert.throws(() => {
      bs0.toDigest = 500;
    }, {
      name: "TypeError",
      //message: "Cannot add property toDigest, object is not extensible",
    });
  });

});
