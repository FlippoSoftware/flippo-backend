import * as jose from "jose";
import { type TRefreshJwtId, ENV } from "@schemas/index.ts";

import { getExpiration, getIssuedAt } from "./timestamps.ts";
import generateUUId from "./uuid.ts";
import {
  AccessPayloadSchema,
  DbTokenPayloadSchema,
  RefreshPayloadSchema,
  type TAccessPayload,
  type TDbTokenPayload,
  type TRefreshPayload
} from "./types/TAuthPayload.ts";
import { type TTokens } from "./types/TTokens.ts";
import { PrivateKeyObject } from "./keys/privateKey.ts";
import { PublicKeyObject } from "./keys/publicKey.ts";
import { DbPrivateKey } from "./keys/index.ts";

function generateAccessTokenPayload(userId: string) {
  const iat: number = getIssuedAt();
  const expAccess: number = getExpiration(ENV.AUTH_EXP_ACCESS_TOKEN, iat);

  const payload = {
    iss: ENV.AUTH_ISS,
    id: userId,
    iat: iat,
    exp: expAccess
  } as TAccessPayload;

  return AccessPayloadSchema.parse(payload);
}

function generateRefreshTokenPayload(userId: string) {
  const iat: number = getIssuedAt();
  const expRefresh: number = getExpiration(ENV.AUTH_EXP_REFRESH_TOKEN, iat);
  const jtiRefresh: TRefreshJwtId = `refreshToken:${generateUUId()}` as TRefreshJwtId;

  const payload = {
    iss: ENV.AUTH_ISS,
    jti: jtiRefresh,
    userId: userId,
    iat: iat,
    exp: expRefresh
  } as TRefreshPayload;

  return RefreshPayloadSchema.parse(payload);
}

async function generateDbToken(userId: string) {
  const iat: number = getIssuedAt();
  const expDb: number = getExpiration(ENV.SURREALDB_EXP_DB_TOKEN, iat);

  const payload = {
    iss: ENV.AUTH_ISS,
    id: userId,
    ns: ENV.SURREALDB_NS,
    db: ENV.SURREALDB_DB,
    ac: ENV.SURREALDB_AC,
    iat: iat,
    exp: expDb
  } as TDbTokenPayload;

  DbTokenPayloadSchema.parse(payload);

  const dbToken = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: ENV.AUTH_HASH_ALG
    })
    .sign(DbPrivateKey);

  return dbToken;
}

async function generateTokens(userId: string): Promise<{
  tokens: TTokens;
  payloads: { accessPayload: TAccessPayload; refreshPayload: TRefreshPayload };
}> {
  const accessPayload: TAccessPayload = generateAccessTokenPayload(userId);
  const refreshPayload: TRefreshPayload = generateRefreshTokenPayload(userId);

  const accessToken: string = await generateToken<TAccessPayload>(accessPayload);
  const refreshToken: string = await generateToken<TRefreshPayload>(refreshPayload);

  return { tokens: { accessToken, refreshToken }, payloads: { accessPayload, refreshPayload } };
}

async function generateToken<T extends TAccessPayload | TRefreshPayload>(
  payload: T
): Promise<string> {
  const token: string = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: ENV.AUTH_HASH_ALG })
    .sign(PrivateKeyObject);

  return token;
}

async function verifyToken<T extends TRefreshPayload | TAccessPayload>(token: string): Promise<T> {
  const options: jose.JWTVerifyOptions = {
    algorithms: [ENV.AUTH_HASH_ALG],
    issuer: ENV.AUTH_ISS
  };

  const payload = (await jose.jwtVerify(token, PublicKeyObject, options)).payload as T;

  return payload;
}

export { generateTokens, verifyToken, generateDbToken };
