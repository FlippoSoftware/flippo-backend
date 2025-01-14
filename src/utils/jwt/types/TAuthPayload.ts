import { RefreshJwtIdSchema, UserIdSchema } from "@schemas/index.ts";
import z from "zod";

const DbTokenPayloadSchema = z.object({
  iss: z.string().min(1, "Must be 1 or more characters long"),
  id: UserIdSchema,
  ns: z.string().min(1, "Must be 1 or more characters long"),
  db: z.string().min(1, "Must be 1 or more characters long"),
  ac: z.string().min(1, "Must be 1 or more characters long"),
  iat: z.number(),
  exp: z.number()
});

type TDbTokenPayload = z.infer<typeof DbTokenPayloadSchema>;

const AccessPayloadSchema = z.object({
  iss: z.string().min(1, "Must be 1 or more characters long"),
  id: UserIdSchema,
  iat: z.number(),
  exp: z.number()
});

type TAccessPayload = z.infer<typeof AccessPayloadSchema>;

const RefreshPayloadSchema = z.object({
  iss: z.string().min(1, "Must be 1 or more characters long"),
  jti: RefreshJwtIdSchema,
  userId: UserIdSchema,
  iat: z.number(),
  exp: z.number()
});

type TRefreshPayload = z.infer<typeof RefreshPayloadSchema>;

export {
  AccessPayloadSchema,
  type TAccessPayload,
  RefreshPayloadSchema,
  type TRefreshPayload,
  DbTokenPayloadSchema,
  type TDbTokenPayload
};
