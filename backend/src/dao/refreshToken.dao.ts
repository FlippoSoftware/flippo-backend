import {
  RefreshJwtIDSchema,
  RefreshTokenSchema,
  TRefreshJwtID,
  TRefreshToken
} from "@schemas/index.ts";
import { getSurreal } from "@utils/connect.ts";

async function fetchRefreshToken(id: TRefreshJwtID) {
  id = RefreshJwtIDSchema.parse(id);

  const [result] = await getSurreal().select<TRefreshToken>(id);
  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function createRefreshToken(token: TRefreshToken) {
  token = RefreshTokenSchema.parse(token);

  const [result] = await getSurreal().create<TRefreshToken>("refresh_token", token);
  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function revokeRefreshToken(id: TRefreshJwtID) {
  id = RefreshJwtIDSchema.parse(id);

  const [result] = await getSurreal().merge<TRefreshToken, Pick<TRefreshToken, "isRevoked">>(id, {
    isRevoked: true
  });
  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function deleteRefreshToken(id: TRefreshJwtID) {
  id = RefreshJwtIDSchema.parse(id);

  const [result] = await getSurreal().select<TRefreshToken>(id);
  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

export { fetchRefreshToken, createRefreshToken, revokeRefreshToken, deleteRefreshToken };
