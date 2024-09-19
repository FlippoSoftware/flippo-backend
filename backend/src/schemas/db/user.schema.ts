import { z } from "zod";
import { record } from "./record.schema.ts";

const UserRole = z.union([z.literal("admin"), z.literal("user"), z.literal("premium")]);
type TUserRole = z.infer<typeof UserRole>;

const UserSchema = z.object({
  id: record("user"),
  name: z.string(),
  surname: z.string(),
  patronymic: z.string().optional(),
  username: z.string().optional(),
  email: z.string(),
  password: z.string(),
  avatarURL: z.string().url().optional(),
  role: UserRole,
  created: z.coerce.date(),
  updated: z.coerce.date()
});

type TUser = z.infer<typeof UserSchema>;

export { UserRole, type TUserRole, UserSchema, type TUser };
