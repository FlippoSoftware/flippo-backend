import { getDb } from "@utils/connect.ts";
import {
  CreateUserSchema,
  type TCreateUser,
  type TUser,
  UserSchema,
  ProviderIdSchema
} from "@schemas/index.ts";
import { RecordId } from "surrealdb";
import z from "zod";
import logger from "@utils/logger.ts";

async function findUserById(id: string) {
  id = UserSchema.shape.id.parse(id);

  const db = await getDb();
  const [table, value] = String(id).split(":");
  const result = await db.select<TUser>(new RecordId(table, value));

  return UserSchema.parse(result);
}

async function findUserByEmail(email: string) {
  email = z.string().email().parse(email);

  const db = await getDb();
  const [[result]] = await db.query<[[TUser]]>(
    /* surrealql */ `
            SELECT ONLY * FROM user WHERE $email = email
        `,
    { email }
  );

  return await UserSchema.parseAsync(result).catch(() => undefined);
}

async function findUserByProviderId(providerId: string) {
  providerId = ProviderIdSchema.parse(providerId);

  const db = await getDb();
  const [[result]] = await db.query<[[TUser]]>(
    /* surrealql */ `
            SELECT * FROM user WHERE $providerId IN providersId
        `,
    { providerId }
  );

  return await UserSchema.parseAsync(result).catch(() => undefined);
}

async function createUser(userData: TCreateUser) {
  userData = CreateUserSchema.parse(userData);

  const db = await getDb();
  const result = await db.create<TUser, TCreateUser>("user", userData);

  return await UserSchema.parseAsync(result).catch(() => undefined);
}

async function updateUser(
  id: string,
  userData: Partial<Omit<TUser, "id" | "created" | "updated">>
) {
  id = UserSchema.shape.id.parse(id);
  userData = UserSchema.omit({ id: true, created: true, updated: true }).partial().parse(userData);

  const db = await getDb();
  const [table, value] = String(id).split(":");
  const result = await db.merge<TUser, Partial<Omit<TUser, "id" | "created" | "updated">>>(
    new RecordId(table, value),
    userData
  );

  return await UserSchema.parseAsync(result).catch(() => undefined);
}

async function deleteUser(id: string) {
  id = UserSchema.shape.id.parse(id);

  const [table, value] = String(id).split(":");
  try {
    const db = await getDb();
    const result = await db.delete<TUser>(new RecordId(table, value));

    return await UserSchema.parseAsync(result).catch(() => undefined);
  } catch (error: any) {
    logger.error(`Failed to delete user: ${error.message}`);
    return undefined;
  }
}

export { findUserById, findUserByEmail, findUserByProviderId, createUser, updateUser, deleteUser };
