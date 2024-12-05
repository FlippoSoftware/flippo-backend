import {
  ConnectionDataSchema,
  RefreshJwtIdSchema,
  RefreshTokenSchema,
  UserIdSchema,
  CreateRefreshTokenSchema,
  type TCreateRefreshToken,
  type TConnectionData,
  type TRefreshToken
} from "@schemas/index.ts";
import { getSurreal } from "@utils/connect.ts";
import logger from "@utils/logger.ts";
import { RecordId } from "surrealdb";
import { z } from "zod";

async function findRefreshTokenById(id: string) {
  id = RefreshJwtIdSchema.parse(id);

  const [table, value] = String(id).split(":");
  const result = await getSurreal().select<TRefreshToken>(new RecordId(table, value));

  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function findRefreshTokenByData(
  userId: string,
  { system, browser, ip }: Pick<TConnectionData, "system" | "browser" | "ip">
) {
  userId = UserIdSchema.parse(userId);
  system = ConnectionDataSchema.shape.system.parse(system);
  browser = ConnectionDataSchema.shape.browser.parse(browser);
  ip = ConnectionDataSchema.shape.ip.parse(ip);

  const [tableUser, valueUser] = String(userId).split(":");
  const [[result]] = await getSurreal().query<[[TRefreshToken]]>(
    /* surql */ `
      SELECT * FROM refreshToken WHERE $user = user AND connectionData.system = $system
       AND connectionData.browser = $browser AND connectionData.ip = $ip
      ;
    `,
    { user: new RecordId(tableUser, valueUser), system, browser, ip }
  );

  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function createRefreshToken(refreshId: string, refreshData: TCreateRefreshToken) {
  refreshId = RefreshJwtIdSchema.parse(refreshId);
  refreshData = CreateRefreshTokenSchema.parse(refreshData);

  const [table, value] = String(refreshId).split(":");
  const [tableUser, valueUser] = String(refreshData.user).split(":");
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
      user: new RecordId(tableUser, valueUser),
      isRevoked: refreshData.isRevoked,
      system: refreshData.connectionData.system,
      browser: refreshData.connectionData.browser,
      ip: refreshData.connectionData.ip
    }
  );

  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function revokeRefreshToken(id: string) {
  id = RefreshJwtIdSchema.parse(id);

  const [table, value] = String(id).split(":");
  const [result] = await getSurreal().merge<TRefreshToken, Pick<TRefreshToken, "isRevoked">>(
    new RecordId(table, value),
    {
      isRevoked: true
    }
  );

  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function deleteRefreshToken(id: string) {
  id = RefreshJwtIdSchema.parse(id);

  const [table, value] = String(id).split(":");
  try {
    const [[result]] = await getSurreal().query<[[TRefreshToken]]>(
      /* surql */ `
      DELETE ${id} RETURN BEFORE; //type::thing($table, $value)
      `,
      {
        table: table,
        value: value
      }
    );

    return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
  } catch (error: any) {
    logger.error(`Failed to delete refresh token: ${error.message}`);
    return undefined;
  }
}

async function deleteAllRefreshTokens(userId: string) {
  userId = UserIdSchema.parse(userId);

  const [tableUser, valueUser] = String(userId).split(":");
  try {
    const [result] = await getSurreal().query<[TRefreshToken[]]>(
      /* surrealql */ `
      DELETE refreshToken WHERE user = $userId RETURN BEFORE
      ;
    `,
      { userId: new RecordId(tableUser, valueUser) }
    );

    return await z
      .array(RefreshTokenSchema)
      .parseAsync(result)
      .catch(() => undefined);
  } catch (error: any) {
    logger.error(`Failed to delete refresh tokens: ${error.message}`);
    return undefined;
  }
}

export {
  findRefreshTokenById,
  findRefreshTokenByData,
  createRefreshToken,
  revokeRefreshToken,
  deleteRefreshToken,
  deleteAllRefreshTokens
};
