import { record } from "@lib/zod";
import { z } from "zod";

const UserSchema = z.object({
  id: record("user"),
  name: z.string(),
  surname: z.string(),
  patronymic: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  avatarURL: z.string().url(),
  role: z.enum(["admin", "user", "premium"]),
  created: z.coerce.date(),
  updated: z.coerce.date()
});

type TUser = z.infer<typeof UserSchema>;

export { UserSchema, type TUser };
