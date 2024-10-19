import { type TTimeFormat } from "@schemas/index.ts";

import epoch from "./epoch.ts";
import stringToUnixSeconds from "./stringToUnixSeconds.ts";

function getIssuedAt(): number {
  return epoch(new Date());
}

/**
 *
 * @param offset - смещение относительно "iat" в UNIX, в случае если "iat" не передано берётся текущее время.
 * @param iat - время, в которое был выдан токен, в UNIX секундах.
 */
function getNotBefore(offset: TTimeFormat = "0s", iat?: number): number {
  return (iat ?? getIssuedAt()) + stringToUnixSeconds(offset);
}

/**
 *
 * @param offset - смещение относительно "nbf" в UNIX, в случае если "nbf" не передано берётся текущее время.
 * @param nbf - время, до истечения которого токен не будет принят для установления новых аутентифицированных сеансов, в UNIX секундах.
 */
function getExpiration(offset: TTimeFormat = "1h", nbf?: number): number {
  return (nbf ?? getNotBefore()) + stringToUnixSeconds(offset);
}

export { getIssuedAt, getNotBefore, getExpiration };
