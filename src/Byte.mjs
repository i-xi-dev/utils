/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:224eb027-86ac-47e6-b7d1-3163477a87d8",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-21"
    }
  ]
}
*/

import { _ixi } from "./_ixi.mjs";
import { Type } from "./Byte/Type.mjs";
import { Encoding } from "./Byte/Encoding.mjs";
import { Format } from "./Byte/Format.mjs";
import { DigestAlgorithm } from "./Byte/DigestAlgorithm.mjs";
import { StreamReader } from "./Byte/StreamReader.mjs";

const Byte = Object.freeze({
  MIN_VALUE: Type.MIN_VALUE,
  MAX_VALUE: Type.MAX_VALUE,
  isByte: Type.isByte,
  Encoding,
  Format,
  DigestAlgorithm,
  StreamReader,
});
export { Byte };
