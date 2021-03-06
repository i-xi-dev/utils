import assert from "assert";
import { Uri } from "../../src/Uri.mjs";

describe("Uri.prototype.query", function() {

  const t0 = new Uri("http://example.com/");

  it("query", () => {
    const u0 = new Uri("http://example.com:8080/");
    const u0b = new Uri("Http://example.COM:8080/");
    const u1 = new Uri("http://example.com:80/hoge");
    const u2 = new Uri("https://example.com:80/hoge");
    const u3 = new Uri("file:///D:/hoge/index.txt");
    const u4 = new Uri("blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f");
    const u5 = new Uri("urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
    const u6 = new Uri("data:,Hello%2C%20World!");

    assert.strictEqual(u0.query, null);
    assert.strictEqual(u0b.query, null);
    assert.strictEqual(u1.query, null);
    assert.strictEqual(u2.query, null);
    assert.strictEqual(u3.query, null);
    assert.strictEqual(u4.query, null);
    assert.strictEqual(u5.query, null);
    assert.strictEqual(u6.query, null);

    assert.strictEqual((new Uri("chrome://hoge")).query, null);
    assert.strictEqual((new Uri("tel:aaaa")).query, null);
    assert.strictEqual((new Uri("urn:ietf:rfc:2648")).query, null);
    assert.strictEqual((new Uri("geo:13.4125,103.8667")).query, null);


    assert.strictEqual(JSON.stringify([...(new Uri("http://example.com:80/hoge?")).query]), "[]");
    assert.strictEqual(JSON.stringify([...(new Uri("http://example.com:80/hoge?=")).query]), '[["",""]]');
    assert.strictEqual(JSON.stringify([...(new Uri("http://example.com:80/hoge?=&=")).query]), '[["",""],["",""]]');
    assert.strictEqual(JSON.stringify([...(new Uri("http://example.com:80/hoge?foo")).query]), '[["foo",""]]');
    assert.strictEqual(JSON.stringify([...(new Uri("http://example.com:80/hoge?foo=5")).query]), '[["foo","5"]]');
    assert.strictEqual(JSON.stringify([...(new Uri("http://example.com:80/hoge?foo=5#bar")).query]), '[["foo","5"]]');
    assert.strictEqual(JSON.stringify([...(new Uri("http://example.com:80/hoge?foo=5%3D6")).query]), '[["foo","5=6"]]');
    assert.strictEqual(JSON.stringify([...(new Uri("http://example.com:80/hoge?foo=5%3D6&bar=a")).query]), '[["foo","5=6"],["bar","a"]]');
    assert.strictEqual(JSON.stringify([...(new Uri("http://example.com:80/hoge?foo=%E3%81%82")).query]), '[["foo","???"]]');


  });

  it("????????????", () => {
    assert.throws(() => {
      t0.query = "1";
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
/*
  assert.strictEqual(u0.query, null);
  assert.strictEqual(u1.query, null);
  assert.strictEqual(u2.query, null);
  assert.strictEqual(u3.query, null);
  assert.strictEqual(u4.query, null);

  assert.strictEqual(u5.query, null);
  assert.strictEqual(u6.query, null);

  assert.strictEqual(u1q1.query, "");
  assert.strictEqual(u1q2.query, "foo");
  assert.strictEqual(u1q3.query, "foo=5");
  assert.strictEqual(u1q3a.query, "foo=5");
  assert.strictEqual(u1q4.query, "foo=5%3D6");
*/
