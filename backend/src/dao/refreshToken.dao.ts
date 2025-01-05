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
import { getDb } from "@utils/connect.ts";
import logger from "@utils/logger.ts";
import { RecordId } from "surrealdb";
import { z } from "zod";

async function findRefreshTokenById(id: string) {
  id = RefreshJwtIdSchema.parse(id);

  const db = await getDb();
  const [table, value] = String(id).split(":");
  const result = await db.select<TRefreshToken>(new RecordId(table, value));

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

  const db = await getDb();
  const [tableUser, valueUser] = String(userId).split(":");
  const [[result]] = await db.query<[[TRefreshToken]]>(
    /* surql */ `
      SELECT * FROM refreshToken WHERE $user = user AND connectionData.system = $system
       AND connectionData.browser = $browser AND connectionData.ip = $ip
      ;
    `,
    { user: new RecordId(tableUser, valueUser), system, browser, ip }
  );

  if (result) result.id = result.id.toString() as z.infer<typeof RefreshJwtIdSchema>;

  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function createRefreshToken(refreshId: string, refreshData: TCreateRefreshToken) {
  refreshId = RefreshJwtIdSchema.parse(refreshId);
  refreshData = CreateRefreshTokenSchema.parse(refreshData);

  const db = await getDb();
  const [table, value] = String(refreshId).split(":");
  const [tableUser, valueUser] = String(refreshData.user).split(":");
  const [[result]] = await db.query<[[TRefreshToken]]>(
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

  result.id = result.id.toString() as z.infer<typeof RefreshJwtIdSchema>;

  return await RefreshTokenSchema.parseAsync(result).catch(() => undefined);
}

async function revokeRefreshToken(id: string) {
  id = RefreshJwtIdSchema.parse(id);

  const db = await getDb();
  const [table, value] = String(id).split(":");
  const [result] = await db.merge<TRefreshToken, Pick<TRefreshToken, "isRevoked">>(
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
    const db = await getDb();
    const [[result]] = await db.query<[[TRefreshToken]]>(
      /* surql */ `
      DELETE $id RETURN BEFORE;
      `,
      {
        id: new RecordId(
          table,
          value.startsWith("⟨") && value.endsWith("⟩") ? value.slice(1, -1) : value
        )
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
    const db = await getDb();
    const [result] = await db.query<[TRefreshToken[]]>(
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
