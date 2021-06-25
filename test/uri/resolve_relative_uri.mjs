import assert from "assert";
import { Uri } from "../../src/Uri.mjs";

describe("Uri.prototype.resolveRelativeUri", function() {

  const t0 = new Uri("http://example.com/");

  it("resolveRelativeUri()", () => {
    assert.throws(() => {
      t0.resolveRelativeUri();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("resolveRelativeUri(string)", () => {
    const u0 = new Uri("http://example.com:8080/");

    assert.strictEqual(u0.resolveRelativeUri("").toString(), "http://example.com:8080/");
    assert.strictEqual(u0.resolveRelativeUri(".").toString(), "http://example.com:8080/");
    assert.strictEqual(u0.resolveRelativeUri("./").toString(), "http://example.com:8080/");
    assert.strictEqual(u0.resolveRelativeUri("../").toString(), "http://example.com:8080/");

    assert.strictEqual(u0.resolveRelativeUri("t1.txt").toString(), "http://example.com:8080/t1.txt");
    assert.strictEqual(u0.resolveRelativeUri("./t1.txt").toString(), "http://example.com:8080/t1.txt");
    assert.strictEqual(u0.resolveRelativeUri("../t1.txt").toString(), "http://example.com:8080/t1.txt");

    const lu0 = new Uri("http://example.com/d1/d2/f1.js");
    assert.strictEqual(lu0.resolveRelativeUri("t1.txt").toString(), "http://example.com/d1/d2/t1.txt");
    assert.strictEqual(lu0.resolveRelativeUri("./t1.txt").toString(), "http://example.com/d1/d2/t1.txt");
    assert.strictEqual(lu0.resolveRelativeUri("../t1.txt").toString(), "http://example.com/d1/t1.txt");
    assert.strictEqual(lu0.resolveRelativeUri("t2/t2.txt").toString(), "http://example.com/d1/d2/t2/t2.txt");
    assert.strictEqual(lu0.resolveRelativeUri("./t2/t2.txt").toString(), "http://example.com/d1/d2/t2/t2.txt");
    assert.strictEqual(lu0.resolveRelativeUri("../t2/t2.txt").toString(), "http://example.com/d1/t2/t2.txt");

    const u5 = new Uri("urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
    assert.throws(() => {
      u5.resolveRelativeUri("t1.txt");
    }, {
      name: "_ixi.DataError",
    });

    assert.throws(() => {
      u0.resolveRelativeUri("https://example.com:8080/x");
    }, {
      name: "_ixi.DataError",
    });

    assert.throws(() => {
      u0.resolveRelativeUri("http://example.com:8080/x");
    }, {
      name: "_ixi.DataError",
    });

  });

  it("resolveRelativeUri(その他)", () => {
    assert.throws(() => {
      t0.resolveRelativeUri(new URL("http://example.com/"));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      t0.resolveRelativeUri = "1";
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
