import { z } from "zod";
import { record } from "./record.schema.ts";

const RefreshJwtIDSchema = record("refreshToken");
/**
 * @type тип идентификатора refresh токена.
 */
type TRefreshJwtID = z.infer<typeof RefreshJwtIDSchema>;

const ConnectionDataSchema = z.object({
  system: z.string(),
  browser: z.string(),
  ip: z.string(),
  date: z.date()
});

type TConnectionData = z.infer<typeof ConnectionDataSchema>;

const RefreshTokenSchema = z.object({
  id: RefreshJwtIDSchema,
  user: record("user"),
  isRevoked: z.boolean(),
  connectionData: ConnectionDataSchema
});

type TRefreshToken = z.infer<typeof RefreshTokenSchema>;

const CreateRefreshTokenSchema = RefreshTokenSchema.extend({
  connectionData: ConnectionDataSchema.omit({ date: true })
}).omit({ id: true });

type TCreateRefreshToken = z.infer<typeof CreateRefreshTokenSchema>;

export {
  RefreshJwtIDSchema,
  type TRefreshJwtID,
  ConnectionDataSchema,
  type TConnectionData,
  RefreshTokenSchema,
  type TRefreshToken,
  CreateRefreshTokenSchema,
  type TCreateRefreshToken
};
