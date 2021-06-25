import assert from "assert";
import { _ixi } from "../../../src/_ixi.mjs";

describe("_ixi.String.devide", function() {

  it("devide()", () => {
    assert.throws(() => {
      _ixi.String.devide();
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("devide(string)", () => {
    assert.throws(() => {
      _ixi.String.devide("a");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      _ixi.String.devide("");
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("devide(その他)", () => {
    assert.throws(() => {
      _ixi.String.devide(1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      _ixi.String.devide(null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("devide(string, StringDividingMethod)", () => {
    assert.strictEqual(JSON.stringify(_ixi.String.devide("", { unit: _ixi.String.Unit.CHAR, value: 1, })), JSON.stringify([]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("", { unit: _ixi.String.Unit.CHAR, value: 2, })), JSON.stringify([]));

    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEF", { unit: _ixi.String.Unit.CHAR, value: 1, })), JSON.stringify(["A","B","C","D","E","F"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEF", { unit: _ixi.String.Unit.CHAR, value: 2, })), JSON.stringify(["AB","CD","EF"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEFG", { unit: _ixi.String.Unit.CHAR, value: 2, })), JSON.stringify(["AB","CD","EF","G"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEFG", { unit: _ixi.String.Unit.CHAR, value: 3, })), JSON.stringify(["ABC","DEF","G"]));

    assert.strictEqual(JSON.stringify(_ixi.String.devide("", { unit: _ixi.String.Unit.RUNE, value: 1, })), JSON.stringify([]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("", { unit: _ixi.String.Unit.RUNE, value: 2, })), JSON.stringify([]));

    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEF", { unit: _ixi.String.Unit.RUNE, value: 1, })), JSON.stringify(["A","B","C","D","E","F"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEF", { unit: _ixi.String.Unit.RUNE, value: 2, })), JSON.stringify(["AB","CD","EF"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEFG", { unit: _ixi.String.Unit.RUNE, value: 2, })), JSON.stringify(["AB","CD","EF","G"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEFG", { unit: _ixi.String.Unit.RUNE, value: 3, })), JSON.stringify(["ABC","DEF","G"]));

    assert.strictEqual(JSON.stringify(_ixi.String.devide("", { unit: _ixi.String.Unit.GRAPHEME, value: 1, })), JSON.stringify([]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("", { unit: _ixi.String.Unit.GRAPHEME, value: 2, })), JSON.stringify([]));

    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEF", { unit: _ixi.String.Unit.GRAPHEME, value: 1, })), JSON.stringify(["A","B","C","D","E","F"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEF", { unit: _ixi.String.Unit.GRAPHEME, value: 2, })), JSON.stringify(["AB","CD","EF"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEFG", { unit: _ixi.String.Unit.GRAPHEME, value: 2, })), JSON.stringify(["AB","CD","EF","G"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEFG", { unit: _ixi.String.Unit.GRAPHEME, value: 3, })), JSON.stringify(["ABC","DEF","G"]));

    assert.strictEqual(JSON.stringify(_ixi.String.devide("A\u{2000B}CDEFG", { unit: _ixi.String.Unit.RUNE, value: 3, })), JSON.stringify(["A\u{2000B}C","DEF","G"]));

    assert.strictEqual(JSON.stringify(_ixi.String.devide("A\u{2000B}CDEFG", { unit: _ixi.String.Unit.GRAPHEME, value: 3, })), JSON.stringify(["A\u{2000B}C","DEF","G"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("A\u{845B}\u{E0100}CDEFG", { unit: _ixi.String.Unit.GRAPHEME, value: 3, })), JSON.stringify(["A\u{845B}\u{E0100}C","DEF","G"]));

    assert.throws(() => {
      _ixi.String.devide("", { unit: "char", value: 1.5, });
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      _ixi.String.devide("", { unit: _ixi.String.Unit.CHAR, value: 1.5, });
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      _ixi.String.devide("", { unit: _ixi.String.Unit.CHAR, value: 0, });
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("devide(string, その他)", () => {
    assert.throws(() => {
      _ixi.String.devide("1", 1);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      _ixi.String.devide("1", null);
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });
  });

  it("devide(string, StringDividingMethod, string)", () => {
    assert.strictEqual(JSON.stringify(_ixi.String.devide("", { unit: _ixi.String.Unit.CHAR, value: 1, }, "x")), JSON.stringify([]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("", { unit: _ixi.String.Unit.CHAR, value: 1, }, "")), JSON.stringify([]));

    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEFG", { unit: _ixi.String.Unit.CHAR, value: 3, }, "x")), JSON.stringify(["ABC","DEF","Gxx"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEFG", { unit: _ixi.String.Unit.CHAR, value: 3, }, "")), JSON.stringify(["ABC","DEF","G"]));

    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEF", { unit: _ixi.String.Unit.CHAR, value: 1, }, "-")), JSON.stringify(["A","B","C","D","E","F"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEFG", { unit: _ixi.String.Unit.CHAR, value: 3, }, ".")), JSON.stringify(["ABC","DEF","G.."]));
  
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEF", { unit: _ixi.String.Unit.RUNE, value: 1, }, "-")), JSON.stringify(["A","B","C","D","E","F"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEFG", { unit: _ixi.String.Unit.RUNE, value: 3, }, ".")), JSON.stringify(["ABC","DEF","G.."]));
  
    assert.strictEqual(JSON.stringify(_ixi.String.devide("A\u{2000B}CDEFG", { unit: _ixi.String.Unit.RUNE, value: 3, }, "\u{2000B}")), JSON.stringify(["A\u{2000B}C","DEF","G\u{2000B}\u{2000B}"]));
  
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEF", { unit: _ixi.String.Unit.GRAPHEME, value: 1, }, "-")), JSON.stringify(["A","B","C","D","E","F"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("ABCDEFG", { unit: _ixi.String.Unit.GRAPHEME, value: 3, }, ".")), JSON.stringify(["ABC","DEF","G.."]));
  
    assert.strictEqual(JSON.stringify(_ixi.String.devide("A\u{2000B}CDEFG", { unit: _ixi.String.Unit.GRAPHEME, value: 3, }, "\u{2000B}")), JSON.stringify(["A\u{2000B}C","DEF","G\u{2000B}\u{2000B}"]));
    assert.strictEqual(JSON.stringify(_ixi.String.devide("A\u{845B}\u{E0100}CDEFG", { unit: _ixi.String.Unit.GRAPHEME, value: 3, }, "\u{845B}\u{E0100}")), JSON.stringify(["A\u{845B}\u{E0100}C","DEF","G\u{845B}\u{E0100}\u{845B}\u{E0100}"]));

  });

  it("devide(string, StringDividingMethod, その他)", () => {
    assert.throws(() => {
      assert.strictEqual(JSON.stringify(_ixi.String.devide("", { unit: _ixi.String.Unit.CHAR, value: 1, }, 1)), JSON.stringify([]));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      assert.strictEqual(JSON.stringify(_ixi.String.devide("", { unit: _ixi.String.Unit.CHAR, value: 1, }, null)), JSON.stringify([]));
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("devide(その他, *)", () => {
    assert.throws(() => {
      _ixi.String.devide(1, {unit: _ixi.String.Unit.CHAR, length: 1});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

    assert.throws(() => {
      _ixi.String.devide(null, {unit: _ixi.String.Unit.CHAR, length: 1});
    }, {
      name: "TypeError",
      message: "_ixi.PreconditionFailure",
    });

  });

  it("代入不可", () => {
    assert.throws(() => {
      _ixi.String.devide = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

});
