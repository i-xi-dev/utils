/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:8efd36ec-b21f-44e2-b422-a2bfe03a6d1c",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-18"
    }
  ]
}
*/

import { _ixi } from "../../_ixi.mjs";
import { Type } from "../Type.mjs";

/**
 * Base64符号化方式
 *     {@link https://datatracker.ietf.org/doc/html/rfc4648|RFC 4648} の仕様に準拠（しているはず）。
 *     ただし改行には非対応。また、RFC 4648以外の亜種には対応しない。
 * @implements {ByteEncodingImpl}
 */
class Base64Encoding {
  /**
   * Base64符号化方式オプション
   * @typedef {ByteEncodingOptions} Base64EncodingOptions
   * @property {string} _62ndChar - 変換テーブルの62番目の文字（標準では"+"）
   *     コードポイント255以下の1文字、かつ
   *     変換テーブル・パディング・_63rdCharと重複しない文字
   * @property {string} _63rdChar - 変換テーブルの63番目の文字（標準では"/"）
   *     コードポイント255以下の1文字
   *     変換テーブル・パディング・_62ndCharと重複しない文字
   * @property {boolean} usePadding - パディングを付加するか否か
   *     パディング文字は"="固定
   */

  /**
   * Base64変換テーブル
   * @readonly
   * @type {Array<string>}
   */
  static #TABLE = Object.freeze([
    "A",  // 0
    "B",  // 1
    "C",  // 2
    "D",  // 3
    "E",  // 4
    "F",  // 5
    "G",  // 6
    "H",  // 7
    "I",  // 8
    "J",  // 9
    "K",  // 10
    "L",  // 11
    "M",  // 12
    "N",  // 13
    "O",  // 14
    "P",  // 15
    "Q",  // 16
    "R",  // 17
    "S",  // 18
    "T",  // 19
    "U",  // 20
    "V",  // 21
    "W",  // 22
    "X",  // 23
    "Y",  // 24
    "Z",  // 25
    "a",  // 26
    "b",  // 27
    "c",  // 28
    "d",  // 29
    "e",  // 30
    "f",  // 31
    "g",  // 32
    "h",  // 33
    "i",  // 34
    "j",  // 35
    "k",  // 36
    "l",  // 37
    "m",  // 38
    "n",  // 39
    "o",  // 40
    "p",  // 41
    "q",  // 42
    "r",  // 43
    "s",  // 44
    "t",  // 45
    "u",  // 46
    "v",  // 47
    "w",  // 48
    "x",  // 49
    "y",  // 50
    "z",  // 51
    "0",  // 52
    "1",  // 53
    "2",  // 54
    "3",  // 55
    "4",  // 56
    "5",  // 57
    "6",  // 58
    "7",  // 59
    "8",  // 60
    "9",  // 61
    //"+",  // 62
    //"/",  // 63
  ]);

  /**
   * パディング文字
   * @constant {string}
   */
  static #PADDING_CHAR = "=";

  /**
   * 変換テーブルの62番目の文字のデフォルト
   * @constant {string}
   */
  static #default62ndChar = "+";

  /**
   * 変換テーブルの63番目の文字のデフォルト
   * @constant {string}
   */
  static #default63rdChar = "/";

  /**
   * パディングが必要か否かのデフォルト
   * @constant {boolean}
   */
  static #defaultPadEnd = true;

  /**
   * 変換テーブルの62番目の文字
   * @type {string}
   */
  #_62ndChar;

  /**
   * 変換テーブルの63番目の文字
   * @type {string}
   */
  #_63rdChar;

  /**
   * パディングが必要か否か
   * @type {boolean}
   */
  #usePadding;

  /**
   * 変換テーブル
   * @type {Array<string>}
   */
  #table;

  /**
   * @param {Base64EncodingOptions} [options] - 符号化方式オプション
   */
  constructor ({
    _62ndChar = Base64Encoding.#default62ndChar,
    _63rdChar = Base64Encoding.#default63rdChar,
    usePadding = Base64Encoding.#defaultPadEnd,
  } = {}) {

    _ixi.precondition(() => typeof _62ndChar === "string");
    _ixi.precondition(() => _62ndChar.length === 1);
    _ixi.precondition(() => Type.isByte(_62ndChar.charCodeAt(0)));
    _ixi.precondition(() => Base64Encoding.#TABLE.includes(_62ndChar) !== true);
    _ixi.precondition(() => _62ndChar !== Base64Encoding.#PADDING_CHAR);
    _ixi.precondition(() => typeof _63rdChar === "string");
    _ixi.precondition(() => _63rdChar.length === 1);
    _ixi.precondition(() => Type.isByte(_63rdChar.charCodeAt(0)));
    _ixi.precondition(() => Base64Encoding.#TABLE.includes(_63rdChar) !== true);
    _ixi.precondition(() => _63rdChar !== Base64Encoding.#PADDING_CHAR);
    _ixi.precondition(() => _62ndChar !== _63rdChar);
    _ixi.precondition(() => typeof usePadding === "boolean");

    this.#_62ndChar = _62ndChar;
    this.#_63rdChar = _63rdChar;
    this.#usePadding = usePadding;
    this.#table = Base64Encoding.#createTable(_62ndChar, _63rdChar);
    Object.freeze(this);
  }

  /**
   * 変換テーブルを生成し返却
   * @param {string} _62ndChar - 変換テーブルの62番目の文字
   * @param {string} _63rdChar - 変換テーブルの63番目の文字
   * @returns {Array<string>}
   */
  static #createTable(_62ndChar, _63rdChar) {
    const table = [ ...Base64Encoding.#TABLE ];
    table.push(_62ndChar);
    table.push(_63rdChar);
    return table;
  }

  /**
   * 文字列が、符号化方式オプションで指定したとおりにBase64符号化された文字列であるか否かを返却
   * @param {string} encoded - Base64符号化された文字列
   * @returns {boolean}
   */
  #test(encoded) {
    const _62ndCharPattern = `\\u{${ this.#_62ndChar.charCodeAt(0).toString(16) }}`;
    const _63rdCharPattern = `\\u{${ this.#_63rdChar.charCodeAt(0).toString(16) }}`;
    const bodyPattern = `[A-Za-z0-9${ _62ndCharPattern }${ _63rdCharPattern }]`;
    let regex;
    if (this.#usePadding === true) {
      const paddingPattern = `\\u{${ Base64Encoding.#PADDING_CHAR.charCodeAt(0).toString(16) }}`;
      regex = new RegExp(`^(${ bodyPattern }+${ paddingPattern }*|${ bodyPattern }*)$`, "u");
    }
    else {
      regex = new RegExp(`^${ bodyPattern }*$`, "u");
    }

    return regex.test(encoded);
  }

  /**
   * 文字列をバイト列に復号し、バイト列を返却
   * @param {string} encoded - Base64符号化された文字列
   * @returns {Uint8Array}
   * @throws {_ixi.Exception} encodedが、符号化方式オプションで指定したとおりにBase64符号化された文字列ではない場合スロー
   */
  decode(encoded) {
    _ixi.precondition(() => typeof encoded === "string");

    if (this.#test(encoded) !== true) {
      throw new _ixi.Exception("_ixi.EncodingError", "decode error (1)");
    }

    const paddingStart = encoded.indexOf(Base64Encoding.#PADDING_CHAR);
    let paddingCount;
    let encodedBody;
    if (this.#usePadding === true) {
      if ((encoded.length % 4) !== 0) {
        throw new _ixi.Exception("_ixi.EncodingError", "decode error (2)");
      }

      if (paddingStart >= 0) {
        paddingCount = encoded.length - paddingStart;
        encodedBody = encoded.substring(0, paddingStart);
      }
      else {
        paddingCount = 0;
        encodedBody = encoded;
      }
    }
    else {
      //if (paddingStart >= 0) {
      //  throw new _ixi.Exception("_ixi.InvalidCharacterError", "decode error (3)"); (1)で例外になる
      //}
      paddingCount = 4 - (encoded.length % 4);
      encodedBody = encoded;
    }

    let _6bit1;
    let _6bit2;
    let _6bit3;
    let _6bit4;
    let _8bitI = 0;
    const decodedBytes = new Uint8Array(((encodedBody.length + paddingCount) * 3 / 4) - paddingCount);

    let i = 0;
    if (encodedBody.length >= 4) {
      for (i = 0; i < encodedBody.length; i = i + 4) {
        _6bit1 = this.#table.indexOf(encodedBody[i]);
        _6bit2 = this.#table.indexOf(encodedBody[i + 1]);
        _6bit3 = this.#table.indexOf(encodedBody[i + 2]);
        _6bit4 = this.#table.indexOf(encodedBody[i + 3]);

        // 8-bit (1)
        decodedBytes[_8bitI++] = (_6bit1 << 2) | (_6bit2 >> 4);

        // 8-bit (2)
        if (_6bit3 < 0) {
          decodedBytes[_8bitI++] = ((_6bit2 & 0b001111) << 4);
          break;
        }
        decodedBytes[_8bitI++] = ((_6bit2 & 0b001111) << 4) | (_6bit3 >> 2);

        // 8-bit (3)
        if (_6bit4 < 0) {
          decodedBytes[_8bitI++] = ((_6bit3 & 0b000011) << 6);
          break;
        }
        decodedBytes[_8bitI++] = ((_6bit3 & 0b000011) << 6) | _6bit4;
      }
    }
    return decodedBytes;
  }

  /**
   * バイト列を文字列に符号化し、文字列を返却
   * @param {Uint8Array} toEncode - バイト列
   * @returns {string}
   */
  encode(toEncode) {
    _ixi.precondition(() => toEncode instanceof Uint8Array);

    let _6bit1e;
    let _6bit2e;
    let _6bit3e;
    let _6bit4e;
    let encodedChars = "";
    for (let i = 0; i < toEncode.byteLength; i = i + 3) { 
      const [ _8bit1, _8bit2, _8bit3 ] = toEncode.subarray(i, i + 3);

      // 6-bit (1)
      _6bit1e = this.#table[_8bit1 >> 2];

      // 6-bit (2)
      _6bit2e = this.#table[((_8bit1 & 0b00000011) << 4) | ((_8bit2 !== undefined ? _8bit2 : 0) >> 4)];

      if (_8bit2 !== undefined) {
        // 6-bit (3)
        _6bit3e = this.#table[((_8bit2 & 0b00001111) << 2) | ((_8bit3 !== undefined ? _8bit3 : 0) >> 6)];

        if (_8bit3 !== undefined) {
          // 6-bit (4)
          _6bit4e = this.#table[_8bit3 & 0b00111111];
        }
        else {
          _6bit4e = (this.#usePadding === true) ? Base64Encoding.#PADDING_CHAR : "";
        }
      }
      else {
        _6bit3e = (this.#usePadding === true) ? Base64Encoding.#PADDING_CHAR : "";
        _6bit4e = (this.#usePadding === true) ? Base64Encoding.#PADDING_CHAR : "";
      }
      encodedChars = encodedChars.concat(_6bit1e + _6bit2e + _6bit3e + _6bit4e);
    }
    return encodedChars;
  }
}
Object.freeze(Base64Encoding);

export { Base64Encoding };
