/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:ecc8477e-3051-4862-aa60-76660109f056",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-15"
    }
  ]
}
*/

import { Encoding } from "./Text/Encoding.mjs";
import { ScriptSet } from "./Text/ScriptSet.mjs";

const Text = Object.freeze({
  Encoding,
  ScriptSet,
});
export { Text };
