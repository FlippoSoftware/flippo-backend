import { z } from "zod";
import { providerId } from "@schemas/utils/providerId.schema.ts";

import { record } from "./record.schema.ts";

const UserRoleSchema = z.union([z.literal("admin"), z.literal("user"), z.literal("premium")]);
type TUserRole = z.infer<typeof UserRoleSchema>;

const UserIdSchema = record("user");
type TUserId = z.infer<typeof UserIdSchema>;

const ProviderIdSchema = z.union([
  providerId("google"),
  providerId("vkontakte"),
  providerId("email"),
  providerId("yandex")
]);
type TProviderId = z.infer<typeof ProviderIdSchema>;

const UserSchema = z.object({
  id: UserIdSchema,
  name: z.string().optional(),
  surname: z.string().optional(),
  patronymic: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  providersId: z.array(ProviderIdSchema),
  image: z.string().url().optional(),
  role: UserRoleSchema,
  created: z.coerce.date(),
  updated: z.coerce.date()
});

type TUser = z.infer<typeof UserSchema>;

const CreateUserSchema = UserSchema.omit({
  id: true,
  created: true,
  updated: true
});

type TCreateUser = z.infer<typeof CreateUserSchema>;

export {
  UserRoleSchema,
  type TUserRole,
  UserIdSchema,
  type TUserId,
  ProviderIdSchema,
  type TProviderId,
  UserSchema,
  type TUser,
  CreateUserSchema,
  type TCreateUser
};
