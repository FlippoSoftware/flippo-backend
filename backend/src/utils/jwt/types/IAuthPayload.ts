import { UserIDSchema } from "@schemas/db/user.schema.ts";
import { RefreshJwtIDSchema } from "@schemas/index.ts";
import z from "zod";

const AccessPayloadSchema = z.object({
  iss: z.string().min(1, "Must be 1 or more characters long"),
  ID: UserIDSchema,
  NS: z.string().min(1, "Must be 1 or more characters long"),
  DB: z.string().min(1, "Must be 1 or more characters long"),
  AC: z.string().min(1, "Must be 1 or more characters long"),
  iat: z.number(),
  exp: z.number()
});

type TAccessPayload = z.infer<typeof AccessPayloadSchema>;

const RefreshPayloadSchema = z.object({
  iss: z.string().min(1, "Must be 1 or more characters long"),
  jti: RefreshJwtIDSchema,
  userID: UserIDSchema,
  iat: z.number(),
  exp: z.number()
});

type TRefreshPayload = z.infer<typeof RefreshPayloadSchema>;

export { AccessPayloadSchema, type TAccessPayload, RefreshPayloadSchema, type TRefreshPayload };
