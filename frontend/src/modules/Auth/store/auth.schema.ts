import z from "zod";

import { record } from "@schemas/record.schema";

const AuthSchema = z.object({
  userId: record("user"),
  email: z.string().email(),
  name: z.string(),
  surname: z.string(),
  username: z.string().optional(),
  image: z.string().url().optional()
});

export { AuthSchema };
