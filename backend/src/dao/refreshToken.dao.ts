import { CreateRefreshTokenSchema, TCreateRefreshToken } from "@schemas/db/refreshToken.schema.ts";
import { TUserID, UserIDSchema } from "@schemas/db/user.schema.ts";
import {
  ConnectionDataSchema,
  RefreshJwtIDSchema,
  RefreshTokenSchema,
  TConnectionData,
  TRefreshJwtID,
  TRefreshToken
} from "@schemas/index.ts";
import { getSurreal } from "@utils/connect.ts";

async function fetchRefreshTokenById(id: string) {
  id = RefreshJwtIDSchema.parse(id);

  const [result] = await getSurreal().select<TRefreshToken>(id);
  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function fetchRefreshTokenByData({
  user,
  system,
  browser,
  ip
}: Pick<TRefreshToken, "user"> & Pick<TConnectionData, "system" | "browser" | "ip">) {
  user = UserIDSchema.parse(user);
  system = ConnectionDataSchema.shape.system.parse(system);
  browser = ConnectionDataSchema.shape.browser.parse(browser);
  ip = ConnectionDataSchema.shape.ip.parse(ip);

  const [result] = await getSurreal().query<[TRefreshToken]>(
    /* surql */ `
      SELECT * FROM refreshToken WHERE $user = user AND connectionData.system = $system
       AND connectionData.browser = $browser AND connectionData.ip = $ip
      ;
    `,
    { user, system, browser, ip }
  );

  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function createRefreshToken(refreshID: TRefreshJwtID, refreshData: TCreateRefreshToken) {
  refreshID = RefreshJwtIDSchema.parse(refreshID);
  refreshData = CreateRefreshTokenSchema.parse(refreshData);

  const [table, value] = refreshID.split(":");
  const [[result]] = await getSurreal().query<[[TRefreshToken]]>(
    /* surql */ `
      CREATE type::thing($table, $value) SET user = $user, isRevoked = $isRevoked,
        connectionData.system = $system,
        connectionData.browser = $browser,
        connectionData.ip = $ip
      ;
    `,
    {
      table: table,
      value: value,
      user: refreshData.user,
      isRevoked: refreshData.isRevoked,
      system: refreshData.connectionData.system,
      browser: refreshData.connectionData.browser,
      ip: refreshData.connectionData.ip
    }
  );
  return RefreshTokenSchema.parse(result);
}

async function revokeRefreshToken(id: TRefreshJwtID) {
  id = RefreshJwtIDSchema.parse(id);

  const [result] = await getSurreal().merge<TRefreshToken, Pick<TRefreshToken, "isRevoked">>(id, {
    isRevoked: true
  });
  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function updateRefreshTokenId(id: string, newID: string) {
  id = RefreshJwtIDSchema.parse(id);
  newID = RefreshJwtIDSchema.parse(newID);

  const [result] = await getSurreal().merge<TRefreshToken, Pick<TRefreshToken, "id">>(id, {
    id: newID as TRefreshJwtID
  });
  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function deleteRefreshToken(id: string) {
  id = RefreshJwtIDSchema.parse(id);

  const [result] = await getSurreal().select<TRefreshToken>(id);
  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function deleteAllRefreshTokens(userID: TUserID) {
  userID = UserIDSchema.parse(userID);

  const result = await getSurreal().query<[TRefreshToken]>(
    /* surrealql */ `
      DELETE refreshToken WHERE user = $userID
    `,
    { userID }
  );

  return result.length;
}

export {
  fetchRefreshTokenById,
  fetchRefreshTokenByData,
  createRefreshToken,
  revokeRefreshToken,
  updateRefreshTokenId,
  deleteRefreshToken,
  deleteAllRefreshTokens
};
