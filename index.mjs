import { Byte } from "./src/Byte.mjs";
import { ByteSequence } from "./src/ByteSequence.mjs";
import { Text } from "./src/Text.mjs";
import { Uri } from "./src/Uri.mjs";
import { Uuid } from "./src/Uuid.mjs";
import { Time } from "./src/Time.mjs";

import { Base64Encoding } from "./src/Byte/Encoding/Base64Encoding.mjs";
import { PercentEncoding } from "./src/Byte/Encoding/PercentEncoding.mjs";
Byte.Encoding.register("Base64", Base64Encoding);
Byte.Encoding.register("Percent", PercentEncoding);

import { Sha256Algorithm } from "./src/Byte/DigestAlgorithm/Sha256Algorithm.mjs";
Byte.DigestAlgorithm.register("SHA-256", Sha256Algorithm);

import { Utf8Encoding } from "./src/Text/Encoding/Utf8Encoding.mjs";
Text.Encoding.register("UTF-8", Utf8Encoding);

if ((globalThis.crypto === undefined) && (globalThis.process)) {
  globalThis.crypto = (await import("crypto")).webcrypto;
}

if ((globalThis.Blob === undefined) && (globalThis.process)) {
  globalThis.Blob = (await import("buffer")).Blob;
}

export {
  Byte,
  ByteSequence,
  Text,
  Uri,
  Uuid,
  Time,
};
