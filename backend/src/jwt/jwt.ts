import * as jose from "jose";
import { TConnectionData, TRefreshJwtID, TRefreshToken } from "@schemas/index.ts";
import { getExpiration, getIssuedAt } from "./utils/timestamps.ts";
import generateUUID from "./utils/uuid.ts";
import isTimeExpired from "./utils/isTimeExpired.ts";
import instanceOfA from "./utils/instanceOfA.ts";
import {
  AccessPayloadSchema,
  RefreshPayloadSchema,
  TAccessPayload,
  TRefreshPayload,
  TUserID,
  UserIDSchema
} from "./types/IAuthPayload.ts";
import { TTokens } from "./types/TTokens.ts";
import {
  createRefreshToken,
  revokeRefreshToken,
  fetchRefreshToken,
  deleteRefreshToken
} from "@dao/refreshToken.dao.ts";
import { SurrealDBEnv, AuthEnv } from "@schemas/index.ts";

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
  } satisfies TAccessPayload;

  return payload;
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
  } satisfies TRefreshPayload;

  return payload;
}

async function generateTokens(userID: TUserID, connectionData: TConnectionData): Promise<TTokens> {
  const parseRes = UserIDSchema.safeParse(userID);
  if (!parseRes.success) {
    throw new TypeError("Invalid user ID");
  }

  userID = parseRes.data;

  const accessPayload: TAccessPayload = generateAccessTokenPayload(userID);
  const refreshPayload: TRefreshPayload = generateRefreshTokenPayload(userID);

  const accessToken: string = await generateToken(accessPayload);
  const refreshToken: string = await generateToken(refreshPayload);

  const refreshTokenDB: TRefreshToken | undefined = await createRefreshToken({
    id: refreshPayload.jti,
    user: userID,
    isRevoked: false,
    connectionData
  } as TRefreshToken);

  if (!refreshTokenDB) {
    throw new Error("Failed to create a refresh token");
  }

  return { accessToken, refreshToken };
}

async function refreshTokens(
  refreshToken: string,
  connectionData: TConnectionData
): Promise<TTokens> {
  const { userID, jti, exp }: TRefreshPayload = (await verifyToken(
    refreshToken
  )) as TRefreshPayload;

  if (isTimeExpired(exp)) {
    await deleteRefreshToken(jti);
    throw new Error("Refresh token has expired!");
  }

  // TODO: implement a token selection to check if it has been revoked
  const tokenDB: TRefreshToken | undefined = await fetchRefreshToken(jti);
  if (!tokenDB) {
    throw new Error("There is no such refresh token!");
  }

  if (tokenDB.isRevoked) {
    throw new Error("The refresh token has been revoked!");
  }

  const tokens: Promise<TTokens> = generateTokens(userID, connectionData);

  // TODO: implement token invalidation
  await revokeRefreshToken(jti);

  return tokens;
}

async function generateToken(payload: TAccessPayload | TRefreshPayload): Promise<string> {
  payload = instanceOfA<TAccessPayload>(payload)
    ? AccessPayloadSchema.parse(payload)
    : RefreshPayloadSchema.parse(payload);

  const privateKey: Uint8Array = new TextEncoder().encode(AuthEnv.AUTH_PRIVATE_KEY);

  const token: string = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: AuthEnv.AUTH_HASH_ALG })
    .sign(privateKey);

  return token;
}

async function verifyToken(token: string): Promise<TRefreshPayload | TAccessPayload | undefined> {
  const publicKey: Uint8Array = new TextEncoder().encode(AuthEnv.AUTH_PUBLIC_KEY);
  const options: jose.JWTVerifyOptions = { issuer: AuthEnv.AUTH_ISS };

  const payload: TRefreshPayload | TAccessPayload = (
    await jose.jwtVerify(token, publicKey, options)
  ).payload as TRefreshPayload | TAccessPayload;

  return payload;
}

export { generateTokens, refreshTokens, verifyToken };
