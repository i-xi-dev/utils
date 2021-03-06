import assert from "assert";
import { Uri } from "../../index.mjs";

describe("Uri.prototype.port", function() {

  const a0 = new Uri("http://example.com/");

  it("port", () => {
    assert.strictEqual(a0.port, 80);

    const u0 = new Uri("http://example.com:8080/");
    const u0b = new Uri("Http://example.COM:8080/");
    const u1 = new Uri("http://example.com:80/hoge");
    const u2 = new Uri("https://example.com:80/hoge");
    const u3 = new Uri("file:///D:/hoge/index.txt");
    const u4 = new Uri("blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f");
    const u5 = new Uri("urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
    const u6 = new Uri("data:,Hello%2C%20World!");

    assert.strictEqual(u0.port, 8080);
    assert.strictEqual(u0b.port, 8080);
    assert.strictEqual(u1.port, 80);
    assert.strictEqual(u2.port, 80);
    assert.strictEqual(u3.port, null);
    assert.strictEqual(u4.port, null);
    assert.strictEqual(u5.port, null);
    assert.strictEqual(u6.port, null);

    assert.strictEqual((new Uri("chrome://hoge")).port, null);
    assert.strictEqual((new Uri("tel:aaaa")).port, null);
    assert.strictEqual((new Uri("urn:ietf:rfc:2648")).port, null);
    assert.strictEqual((new Uri("geo:13.4125,103.8667")).port, null);

    assert.throws(() => {
      a0.port();
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      a0.port = 1;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
