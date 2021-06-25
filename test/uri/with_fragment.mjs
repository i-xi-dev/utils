import assert from "assert";
import { Uri } from "../../src/Uri.mjs";

describe("Uri.prototype.withFragment", function() {

  const t0 = new Uri("http://example.com/");

  it("withFragment()", () => {

    const u1 = (new Uri("http://example.com:80/hoge#")).withFragment();
    assert.strictEqual(u1.fragment, null);
    assert.strictEqual(u1.toString(), "http://example.com/hoge");

    const u2 = (new Uri("http://example.com:80/hoge#f<o>o")).withFragment();
    assert.strictEqual(u2.fragment, null);
    assert.strictEqual(u2.toString(), "http://example.com/hoge");

    const u3 = (new Uri("http://example.com:80/hoge#foo#5")).withFragment();
    assert.strictEqual(u3.fragment, null);
    assert.strictEqual(u3.toString(), "http://example.com/hoge");

    const u4 = (new Uri("http://example.com:80/hoge#foo#5=%3CA")).withFragment();
    assert.strictEqual(u4.fragment, null);
    assert.strictEqual(u4.toString(), "http://example.com/hoge");

    const u5 = (new Uri("http://example.com:80/hoge#foo#5%3DA")).withFragment();
    assert.strictEqual(u5.fragment, null);
    assert.strictEqual(u5.toString(), "http://example.com/hoge");

  });

  it("withFragment(string)", () => {

    const u1 = (new Uri("http://example.com:80/hoge#foo")).withFragment("a");
    assert.strictEqual(u1.fragment, "a");
    assert.strictEqual(u1.toString(), "http://example.com/hoge#a");

    const u2 = (new Uri("http://example.com:80/hoge#foo")).withFragment("#a");
    assert.strictEqual(u2.fragment, "#a");
    assert.strictEqual(u2.toString(), "http://example.com/hoge##a");

    const u3 = (new Uri("http://example.com:80/hoge#foo")).withFragment("a<2");
    assert.strictEqual(u3.fragment, "a<2");
    assert.strictEqual(u3.toString(), "http://example.com/hoge#a%3C2");

    const u4 = (new Uri("http://example.com:80/hoge#foo")).withFragment("");
    assert.strictEqual(u4.fragment, "");
    assert.strictEqual(u4.toString(), "http://example.com/hoge#");

    const u5 = (new Uri("http://example.com:80/hoge#foo")).withFragment("#h#o#g#e");
    assert.strictEqual(u5.fragment, "#h#o#g#e");
    assert.strictEqual(u5.toString(), "http://example.com/hoge##h#o#g#e");

    const u6 = (new Uri("http://example.com:80/hoge#foo")).withFragment("# h\"#<o>#g#`e");
    assert.strictEqual(u6.fragment, "# h\"#<o>#g#`e");
    assert.strictEqual(u6.toString(), "http://example.com/hoge##%20h%22#%3Co%3E#g#%60e");

    const u7 = (new Uri("http://example.com:80/hoge#foo")).withFragment("あ");
    assert.strictEqual(u7.fragment, "あ");
    assert.strictEqual(u7.toString(), "http://example.com/hoge#%E3%81%82");

  });

  it("withFragment(null)", () => {
    const u1 = (new Uri("http://example.com:80/hoge#foo")).withFragment(null);
    assert.strictEqual(u1.fragment, null);
    assert.strictEqual(u1.toString(), "http://example.com/hoge");
  });

  it("withFragment(その他)", () => {
    assert.throws(() => {
      t0.withFragment(1);
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      t0.withFragment = "1";
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
