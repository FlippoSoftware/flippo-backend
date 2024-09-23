import { z } from "zod";
import { record } from "./record.schema.ts";
import { providerId } from "@schemas/utils/providerId.schema.ts";

const UserRoleSchema = z.union([z.literal("admin"), z.literal("user"), z.literal("premium")]);
type TUserRole = z.infer<typeof UserRoleSchema>;

const UserIDSchema = record("user");
type TUserID = z.infer<typeof UserIDSchema>;

const ProviderIDSchema = z.union([
  providerId("google"),
  providerId("vkontakte"),
  providerId("email")
]);
type TProviderID = z.infer<typeof ProviderIDSchema>;

const UserSchema = z.object({
  id: UserIDSchema,
  name: z.string(),
  surname: z.string(),
  patronymic: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email(),
  providersID: z.array(ProviderIDSchema),
  image: z.string().url().optional(),
  role: UserRoleSchema,
  created: z.coerce.date(),
  updated: z.coerce.date()
});

type TUser = z.infer<typeof UserSchema>;

const CreateUserSchema = z.object({
  body: UserSchema.omit({
    id: true,
    created: true,
    updated: true
  })
});

type TCreateUser = z.infer<typeof CreateUserSchema>;

export {
  UserRoleSchema,
  type TUserRole,
  UserIDSchema,
  type TUserID,
  ProviderIDSchema,
  type TProviderID,
  UserSchema,
  type TUser,
  CreateUserSchema,
  type TCreateUser
};
