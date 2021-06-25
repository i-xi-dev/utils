/*
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "urn:uuid:53446ecf-6b4c-4021-bff9-ab2eb0b2b25c",
      "schema:about": { "@id": "" },
      "schema:copyrightHolder": { "@id": "tag:i-xi.dev,2021-02:agent" },
      "schema:copyrightYear": 2021,
      "schema:license": { "@id": "https://github.com/i-xi-dev/utils/blob/main/LICENSE" },
      "schema:dateModified": "2021-06-08"
    }
  ]
}
*/

import { Duration } from "./Time/Duration.mjs";
import { Instant } from "./Time/Instant.mjs";

const Time = Object.freeze({
  Duration,
  Instant,
});
export { Time };
