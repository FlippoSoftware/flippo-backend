import * as jose from "jose";
import { TRefreshJwtID } from "@schemas/index.ts";
import { getExpiration, getIssuedAt } from "./utils/timestamps.ts";
import generateUUID from "./utils/uuid.ts";
import {
  AccessPayloadSchema,
  RefreshPayloadSchema,
  TAccessPayload,
  TRefreshPayload
} from "./types/IAuthPayload.ts";
import { TTokens } from "./types/TTokens.ts";
import { SurrealDBEnv, AuthEnv } from "@schemas/index.ts";
import { TUserID, UserIDSchema } from "@schemas/db/user.schema.ts";
import { PrivateKeyObject } from "./utils/keys/privateKey.ts";
import { PublicKeyObject } from "./utils/keys/publicKey.ts";

function generateAccessTokenPayload(userID: TUserID) {
  const iat: number = getIssuedAt();
  const expAccess: number = getExpiration(AuthEnv.AUTH_EXP_ACCESS_TOKEN, iat);

  const payload = {
    iss: AuthEnv.AUTH_ISS,
    ID: userID,
    NS: SurrealDBEnv.SURREALDB_NS,
    DB: SurrealDBEnv.SURREALDB_DB,
    AC: SurrealDBEnv.SURREALDB_AC,
    iat: iat,
    exp: expAccess
  } as TAccessPayload;

  return AccessPayloadSchema.parse(payload);
}

function generateRefreshTokenPayload(userID: TUserID) {
  const iat: number = getIssuedAt();
  const expRefresh: number = getExpiration(AuthEnv.AUTH_EXP_REFRESH_TOKEN, iat);
  const jtiRefresh: TRefreshJwtID = `refreshToken:${generateUUID()}` as TRefreshJwtID;

  const payload = {
    iss: AuthEnv.AUTH_ISS,
    jti: jtiRefresh,
    userID: userID,
    iat: iat,
    exp: expRefresh
  } as TRefreshPayload;

  return RefreshPayloadSchema.parse(payload);
}

async function generateTokens(userID: TUserID): Promise<{
  tokens: TTokens;
  payloads: { accessPayload: TAccessPayload; refreshPayload: TRefreshPayload };
}> {
  const parseRes = UserIDSchema.safeParse(userID);
  if (!parseRes.success) {
    throw new TypeError("Invalid user ID");
  }

  userID = parseRes.data;

  const accessPayload: TAccessPayload = generateAccessTokenPayload(userID);
  const refreshPayload: TRefreshPayload = generateRefreshTokenPayload(userID);

  const accessToken: string = await generateToken(accessPayload);
  const refreshToken: string = await generateToken(refreshPayload);

  return { tokens: { accessToken, refreshToken }, payloads: { accessPayload, refreshPayload } };
}

async function generateToken(payload: TAccessPayload | TRefreshPayload): Promise<string> {
  const token: string = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: AuthEnv.AUTH_HASH_ALG })
    .sign(PrivateKeyObject);

  return token;
}

async function verifyToken(token: string): Promise<TRefreshPayload | TAccessPayload> {
  const options: jose.JWTVerifyOptions = {
    algorithms: [AuthEnv.AUTH_HASH_ALG],
    issuer: AuthEnv.AUTH_ISS
  };

  const payload: TRefreshPayload | TAccessPayload = (
    await jose.jwtVerify(token, PublicKeyObject, options)
  ).payload as TRefreshPayload | TAccessPayload;

  return payload;
}

export { generateTokens, verifyToken };
