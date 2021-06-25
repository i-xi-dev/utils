import assert from "assert";
import { Time } from "../../../index.mjs";
const Duration = Time.Duration;
const Instant = Time.Instant;

describe("Time.Instant.prototype.toString", function() {

  const i0 = new Instant(0n);

  it("toString()", () => {
    assert.strictEqual(i0.toString(), "1970-01-01T00:00:00.000000000Z");

    const x1 = new Instant(1607253374056000000n);
    assert.strictEqual(x1.toString(), "2020-12-06T11:16:14.056000000Z");
    assert.strictEqual(x1.plus(Duration.ofSeconds(1)).toString(), "2020-12-06T11:16:15.056000000Z");
    assert.strictEqual(x1.minus(Duration.ofSeconds(1)).toString(), "2020-12-06T11:16:13.056000000Z");

    const d365 = Duration.ofDays(365);
    const d366 = Duration.ofDays(366);
    const d1461 = Duration.ofDays(1461);
    const x2 = new Instant(1607253374056123890n);
    assert.strictEqual(x2.toString(), "2020-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.plus(Duration.ofSeconds(1)).toString(), "2020-12-06T11:16:15.056123890Z");
    assert.strictEqual(x2.minus(Duration.ofSeconds(1)).toString(), "2020-12-06T11:16:13.056123890Z");
    assert.strictEqual(x2.minus(d366).toString(), "2019-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).toString(), "2018-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).toString(), "2017-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).toString(), "2016-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).toString(), "2015-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).toString(), "2014-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).toString(), "2013-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).toString(), "2012-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).toString(), "2011-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).toString(), "2010-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).toString(), "2009-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).toString(), "2008-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).toString(), "2007-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).toString(), "2006-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).toString(), "2005-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).toString(), "2004-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).toString(), "2003-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).toString(), "2002-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).toString(), "2001-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).toString(), "2000-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).toString(), "1999-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).toString(), "1998-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).toString(), "1997-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).toString(), "1996-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).toString(), "1995-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).toString(), "1994-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).toString(), "1993-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).toString(), "1992-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).minus(d365).minus(d365).minus(d365).minus(d366).toString(), "1991-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).toString(), "1987-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).toString(), "1983-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).toString(), "1979-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).toString(), "1975-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).toString(), "1971-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d365).toString(), "1970-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.minus(d366).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d1461).minus(d365).minus(d365).toString(), "1969-12-06T11:16:14.056123890Z");

  });

  it("toString(Object)", () => {
    assert.strictEqual(i0.toString({fractionDigits:9}), "1970-01-01T00:00:00.000000000Z");
    assert.strictEqual(i0.toString({fractionDigits:1}), "1970-01-01T00:00:00.0Z");
    assert.strictEqual(i0.toString({fractionDigits:0}), "1970-01-01T00:00:00Z");

    const i1m = i0.minus(Duration.ofSeconds(1));
    assert.strictEqual(i1m.toString({fractionDigits:9}), "1969-12-31T23:59:59.000000000Z");

    const i1 = i0.plus(Duration.ofSeconds(1));
    assert.strictEqual(i1.toString({fractionDigits:9}), "1970-01-01T00:00:01.000000000Z");

    const i2m = i0.minus(new Duration(1n));
    assert.strictEqual(i2m.toString({fractionDigits:9}), "1969-12-31T23:59:59.999999999Z");

    const i2 = i0.plus(new Duration(1n));
    assert.strictEqual(i2.toString({fractionDigits:9}), "1970-01-01T00:00:00.000000001Z");

    assert.strictEqual(i0.minus(new Duration(10n)).toString({fractionDigits:9}),         "1969-12-31T23:59:59.999999990Z");
    assert.strictEqual(i0.minus(new Duration(100n)).toString({fractionDigits:9}),        "1969-12-31T23:59:59.999999900Z");
    assert.strictEqual(i0.minus(new Duration(1000n)).toString({fractionDigits:9}),       "1969-12-31T23:59:59.999999000Z");
    assert.strictEqual(i0.minus(new Duration(10000n)).toString({fractionDigits:9}),      "1969-12-31T23:59:59.999990000Z");
    assert.strictEqual(i0.minus(new Duration(100000n)).toString({fractionDigits:9}),     "1969-12-31T23:59:59.999900000Z");
    assert.strictEqual(i0.minus(new Duration(1000000n)).toString({fractionDigits:9}),    "1969-12-31T23:59:59.999000000Z");
    assert.strictEqual(i0.minus(new Duration(10000000n)).toString({fractionDigits:9}),   "1969-12-31T23:59:59.990000000Z");
    assert.strictEqual(i0.minus(new Duration(100000000n)).toString({fractionDigits:9}),  "1969-12-31T23:59:59.900000000Z");
    assert.strictEqual(i0.minus(new Duration(1000000000n)).toString({fractionDigits:9}), "1969-12-31T23:59:59.000000000Z");

    const x2 = new Instant(1607253374056123890n);
    assert.strictEqual(x2.toString({fractionDigits:9}), "2020-12-06T11:16:14.056123890Z");
    assert.strictEqual(x2.toString({fractionDigits:8}), "2020-12-06T11:16:14.05612389Z");
    assert.strictEqual(x2.toString({fractionDigits:7}), "2020-12-06T11:16:14.0561238Z");
    assert.strictEqual(x2.toString({fractionDigits:6}), "2020-12-06T11:16:14.056123Z");
    assert.strictEqual(x2.toString({fractionDigits:5}), "2020-12-06T11:16:14.05612Z");
    assert.strictEqual(x2.toString({fractionDigits:4}), "2020-12-06T11:16:14.0561Z");
    assert.strictEqual(x2.toString({fractionDigits:3}), "2020-12-06T11:16:14.056Z");
    assert.strictEqual(x2.toString({fractionDigits:2}), "2020-12-06T11:16:14.05Z");
    assert.strictEqual(x2.toString({fractionDigits:1}), "2020-12-06T11:16:14.0Z");
    assert.strictEqual(x2.toString({fractionDigits:0}), "2020-12-06T11:16:14Z");
  });

  it("toString(その他)", () => {
    assert.strictEqual(i0.toString(11), "1970-01-01T00:00:00.000000000Z");
    assert.strictEqual(i0.toString(""), "1970-01-01T00:00:00.000000000Z");

    assert.throws(() => {
      i0.toString(null);
    }, {
      name: "TypeError",
      //message: "...",
    });
  });

  it("代入不可", () => {
    assert.throws(() => {
      i0.toString = 500;
    }, {
      name: "TypeError",
      //message: "...",
    });
  });


});
