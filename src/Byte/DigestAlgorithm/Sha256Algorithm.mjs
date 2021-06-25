/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:117667ff-8151-4325-aff8-4f766143e56f",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-18"
    }
  ]
}
*/

if ((globalThis.crypto === undefined) && (globalThis.process)) {
  globalThis.crypto = (await import("crypto")).webcrypto;
}
import { _ixi } from "../../_ixi.mjs";

/**
 * SHA-256ハッシュアルゴリズム
 * @implements {DigestAlgorithmImpl}
 */
class Sha256Algorithm {
  /**
   * 
   */
  constructor () {
    Object.freeze(this);
  }

  /**
   * バイト列からハッシュを生成し返却
   * @param {Uint8Array} toDigest - バイト列
   * @returns {Promise<Uint8Array>}
   */
  async compute(toDigest) {
    _ixi.precondition(() => toDigest instanceof Uint8Array);

    const digestBuffer = await globalThis.crypto.subtle.digest("SHA-256", toDigest);
    return new Uint8Array(digestBuffer);
  }
}
Object.freeze(Sha256Algorithm);

export { Sha256Algorithm };
