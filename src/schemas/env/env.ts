import { TimeFormatSchema } from "@schemas/utils/time.schema.ts";
import { z } from "zod";
import "dotenv/config";
import { buildEnvProxy } from "@utils/buildEnvProxy.ts";
import { parseConfig } from "@utils/parseConfig.ts";

const EnvSchema = z.object({
  API_BASE_URL: z.string().url("Invalid url"),
  API_PORT: z.coerce.number(),
  APP_BASE_URL: z.string().url("Invalid url"),
  APP_REDIRECT_URL: z.string().url("Invalid url!"),

  EMAIL_SERVICE: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  EMAIL_APP_PASS: z.string(),
  EMAIL_ISSUER: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_SECURE: z.coerce.boolean(),

  GOOGLE_CLIENT_ID: z.string().min(1, "Must be 1 or more characters long"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "Must be 1 or more characters long"),
  GOOGLE_REDIRECT_URL: z.string().url("Invalid redirect URL"),

  VK_CLIENT_ID: z.string().min(1, "Must be 1 or more characters long"),
  VK_CLIENT_SECRET: z.string().min(1, "Must be 1 or more characters long"),
  VK_CLIENT_SERVICE_ACCESS: z.string().min(1, "Must be 1 or more characters long"),
  VK_REDIRECT_URL: z.string().url("Invalid redirect URL"),

  YANDEX_CLIENT_ID: z.string().min(1, "Must be 1 or more characters long"),
  YANDEX_CLIENT_SECRET: z.string().min(1, "Must be 1 or more characters long"),
  YANDEX_REDIRECT_URL: z.string().url("Invalid redirect URL"),

  SURREALDB_ENDPOINT: z.string().url("Invalid url"),
  SURREALDB_USER: z.string().min(1, "Must be 1 or more characters long"),
  SURREALDB_PASS: z.string().min(1, "Must be 1 or more characters long"),
  SURREALDB_NS: z.string().min(1, "Must be 1 or more characters long"),
  SURREALDB_DB: z.string().min(1, "Must be 1 or more characters long"),
  SURREALDB_AC: z.string().min(1, "Must be 1 or more characters long"),
  SURREALDB_EXP_DB_TOKEN: TimeFormatSchema,
  SURREALDB_PRIVATE_KEY: z.string(),
  SURREALDB_PUBLIC_KEY: z.string(),

  AUTH_ISS: z.string().min(1, "Must be 1 or more characters long"),
  AUTH_EXP_ACCESS_TOKEN: TimeFormatSchema,
  AUTH_EXP_REFRESH_TOKEN: TimeFormatSchema,
  AUTH_HASH_ALG: z.union([
    z.literal("RS256"),
    z.literal("EDDSA"),
    z.literal("ES256"),
    z.literal("ES384"),
    z.literal("ES512"),
    z.literal("PS256"),
    z.literal("PS384"),
    z.literal("PS512"),
    z.literal("RS256"),
    z.literal("RS384"),
    z.literal("RS512")
  ]),
  AUTH_PRIVATE_KEY: z.string().min(1, "Must be 1 or more characters long"),
  AUTH_PUBLIC_KEY: z.string().min(1, "Must be 1 or more characters long")
});

const envObj = buildEnvProxy([{ source: process.env }]);
const ENV = parseConfig(envObj, EnvSchema);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof EnvSchema> {}
  }
}

export { ENV };
