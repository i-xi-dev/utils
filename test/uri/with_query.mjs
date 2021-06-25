import assert from "assert";
import { Uri } from "../../src/Uri.mjs";

describe("Uri.prototype.withQuery", function() {

  const t0 = new Uri("http://example.com/");

  it("withQuery()", () => {

    const u1 = (new Uri("http://example.com:80/hoge?")).withQuery();
    assert.strictEqual(JSON.stringify(u1.query), 'null');
    assert.strictEqual(u1.toString(), "http://example.com/hoge");

    const u2 = (new Uri("http://example.com:80/hoge?a=1#z")).withQuery();
    assert.strictEqual(JSON.stringify(u2.query), 'null');
    assert.strictEqual(u2.toString(), "http://example.com/hoge#z");

  });

  it("withQuery(Array<Array<string,string>>)", () => {

    const u0 = (new Uri("http://example.com:80/hoge?a=1")).withQuery([]);
    assert.strictEqual(JSON.stringify(u0.query), '[]');
    assert.strictEqual(u0.toString(), "http://example.com/hoge?");

    const u1 = (new Uri("http://example.com:80/hoge?a=1")).withQuery([["b","2"]]);
    assert.strictEqual(JSON.stringify(u1.query), '[["b","2"]]');
    assert.strictEqual(u1.toString(), "http://example.com/hoge?b=2");

    const u2 = (new Uri("http://example.com:80/hoge#foo")).withQuery([["b","3"],["c","1"]]);
    assert.strictEqual(JSON.stringify(u2.query), '[["b","3"],["c","1"]]');
    assert.strictEqual(u2.toString(), "http://example.com/hoge?b=3&c=1#foo");

    const u3 = (new Uri("http://example.com:80/hoge#foo")).withQuery([["b","3"],["b","1"]]);
    assert.strictEqual(JSON.stringify(u3.query), '[["b","3"],["b","1"]]');
    assert.strictEqual(u3.toString(), "http://example.com/hoge?b=3&b=1#foo");

    const u4 = (new Uri("http://example.com:80/hoge")).withQuery([["b","2=4"]]);
    assert.strictEqual(JSON.stringify(u4.query), '[["b","2=4"]]');
    assert.strictEqual(u4.toString(), "http://example.com/hoge?b=2%3D4");

    const u5 = (new Uri("http://example.com:80/hoge")).withQuery([["b",""]]);
    assert.strictEqual(JSON.stringify(u5.query), '[["b",""]]');
    assert.strictEqual(u5.toString(), "http://example.com/hoge?b=");

    const u6 = (new Uri("http://example.com:80/hoge")).withQuery([["b","あ"]]);
    assert.strictEqual(JSON.stringify(u6.query), '[["b","あ"]]');
    assert.strictEqual(u6.toString(), "http://example.com/hoge?b=%E3%81%82");

    const u7 = (new Uri("http://example.com:80/hoge?a=1")).withQuery([["",""]]);
    assert.strictEqual(JSON.stringify(u7.query), '[["",""]]');
    assert.strictEqual(u7.toString(), "http://example.com/hoge?=");

  });

  it("withQuery(null)", () => {
    const u1 = (new Uri("http://example.com:80/hoge?a=1")).withQuery(null);
    assert.strictEqual(JSON.stringify(u1.query), 'null');
    assert.strictEqual(u1.toString(), "http://example.com/hoge");
  });

  it("withQuery(その他)", () => {
    assert.throws(() => {
      t0.withQuery(1);
    }, {
      name: "TypeError",
      //message: "...",
    });

    assert.throws(() => {
      t0.withQuery([1]);
    }, {
      name: "TypeError",
      //message: "...",
    });

    assert.throws(() => {
      t0.withQuery([{a:1}]);
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      t0.withQuery = "1";
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
