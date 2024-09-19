import { z } from "zod";
import { TimeFormatSchema } from "@schemas/utils/time.schema.ts";
import "dotenv/config";

const untestedAuthEnv = {
  AUTH_ISS: process.env.AUTH_ISS,
  AUTH_EXP_ACCESS_TOKEN: process.env.AUTH_EXP_ACCESS_TOKEN,
  AUTH_EXP_REFRESH_TOKEN: process.env.AUTH_EXP_REFRESH_TOKEN,
  AUTH_HASH_ALG: process.env.AUTH_HASH_ALG,
  AUTH_PRIVATE_KEY: process.env.AUTH_PRIVATE_KEY,
  AUTH_PUBLIC_KEY: process.env.AUTH_PUBLIC_KEY
};

const AuthEnvSchema = z.object({
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

const AuthEnv = AuthEnvSchema.parse(untestedAuthEnv);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof AuthEnvSchema> {}
  }
}

export { AuthEnv };
