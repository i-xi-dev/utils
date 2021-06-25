import assert from "assert";
import { Uri } from "../../src/Uri.mjs";

describe("Uri", function() {

  const u0 = "http://example.com/";

  it("new Uri()", () => {
    assert.throws(() => {
      new Uri();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("new Uri(string)", () => {
    assert.strictEqual((new Uri(u0)).toString(), u0);
    assert.strictEqual((new Uri("http://example.com/?=")).toString(), "http://example.com/?=");

    assert.throws(() => {
      new Uri("");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new Uri("1");
    }, {
      name: "_ixi.DataError",
    });

    assert.throws(() => {
      new Uri("1.text");
    }, {
      name: "_ixi.DataError",
    });

    assert.throws(() => {
      new Uri("./1.text");
    }, {
      name: "_ixi.DataError",
    });

    assert.throws(() => {
      new Uri("http://");
    }, {
      name: "_ixi.DataError",
    });
  });

  it("new Uri(URL)", () => {
    assert.strictEqual((new Uri(new URL(u0))).toString(), u0);
  });

  it("new Uri(その他)", () => {
    assert.throws(() => {
      new Uri(0);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      new Uri(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("newなし", () => {
    assert.throws(() => {
      Uri(u0);
    }, {
      name: "TypeError",
      //message: "Class constructor Uri cannot be invoked without 'new'",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      const bf0 = new Uri("https://www.google.com/");
      bf0.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "Cannot add property aaaaa, object is not extensible",
    });
  });

  it("変更不可", () => {
    assert.throws(() => {
      Uri.aaaaa = 1;
    }, {
      name: "TypeError",
      //message: "Cannot add property aaaaa, object is not extensible",
    });
  });

});
