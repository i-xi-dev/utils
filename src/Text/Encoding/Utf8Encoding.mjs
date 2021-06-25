/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:389b1bfa-e32f-4757-b386-9ed1cae5ceed",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-13"
    }
  ]
}
*/

import { _ixi } from "../../_ixi.mjs";

/**
 * 文字符号化方式名
 * @constant {string}
 */
const NAME = "UTF-8";

/**
 * UTF-8符号化方式
 * @implements {TextEncodingImpl}
 */
class Utf8Encoding {
  /**
   * 
   */
  constructor () {
    Object.freeze(this);
  }

  /**
   * 文字符号化方式名
   * @type {string}
   */
  get name() {
    return NAME;
  }

  /**
   * バイト列を文字列に復号し、文字列を返却
   * @param {Uint8Array} encoded - 符号化されたバイト列
   * @returns {string}
   */
  decode(encoded) {
    _ixi.precondition(() => encoded instanceof Uint8Array);

    const decoder = new TextDecoder(NAME, { fatal: true, ignoreBOM: true });
    try {
      return decoder.decode(encoded);
    }
    catch (exception) {
      throw new _ixi.Exception("_ixi.EncodingError", "decode error", exception);
    }
  }

  /**
   * 文字列をバイト列に符号化し、バイト列を返却
   * @param {string} toEncode - 文字列
   * @returns {Uint8Array}
   */
  encode(toEncode) {
    _ixi.precondition(() => typeof toEncode === "string");

    const encoder = new TextEncoder();
    return encoder.encode(toEncode);
  }
}
Object.freeze(Utf8Encoding);

export { Utf8Encoding };
