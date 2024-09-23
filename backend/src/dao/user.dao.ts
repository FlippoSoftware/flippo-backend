import { getSurreal } from "@utils/connect.ts";
import { TUser, UserSchema, ProviderIDSchema, TProviderID } from "@schemas/index.ts";
import { CreateUserSchema, TCreateUser, TUserID } from "@schemas/db/user.schema.ts";
import logger from "@utils/logger.ts";

async function fetchUserById(id: TUserID) {
  id = UserSchema.shape.id.parse(id);

  const [result] = await getSurreal().select<TUser>(id);
  return UserSchema.parse(result);
}

async function fetchUserByEmail({ email }: Pick<TUser, "email">) {
  email = UserSchema.shape.email.parse(email);

  const [result] = await getSurreal().query<[TUser]>(
    /* surrealql */ `
            SELECT ONLY * FROM user WHERE $email = email
        `,
    { email }
  );
  return await UserSchema.parseAsync(result).catch(() => undefined);
}

async function fetchUserByProviderId(providerID: TProviderID) {
  providerID = ProviderIDSchema.parse(providerID);

  const [result] = await getSurreal().query<[TUser]>(
    /* surrealql */ `
            SELECT * FROM user WHERE $providerID IN providersID
        `,
    { providerID }
  );
  return await UserSchema.parseAsync(result).catch(() => undefined);
}

async function createUser(user: TCreateUser["body"]) {
  user = CreateUserSchema.shape.body.parse(user);

  const result = await getSurreal().create<TUser, TCreateUser["body"]>("user", user);
  const v = UserSchema.safeParse(result);
  logger.info(result);
  logger.info(v);
  return await UserSchema.parseAsync(result).catch(() => undefined);
}

async function updateUser(
  id: TUserID,
  userData: Partial<Omit<TUser, "id" | "created" | "updated">>
) {
  id = UserSchema.shape.id.parse(id);
  userData = UserSchema.omit({ id: true, created: true, updated: true }).partial().parse(userData);

  const [result] = await getSurreal().merge<
    TUser,
    Partial<Omit<TUser, "id" | "created" | "updated">>
  >(id, userData);
  return await UserSchema.parseAsync(result).catch(() => undefined);
}

async function deleteUser(id: TUser["id"]) {
  id = UserSchema.shape.id.parse(id);

  const [result] = await getSurreal().delete<TUser>(id);
  return await UserSchema.parseAsync(result).catch(() => undefined);
}

export {
  fetchUserById,
  fetchUserByEmail,
  fetchUserByProviderId,
  createUser,
  updateUser,
  deleteUser
};
