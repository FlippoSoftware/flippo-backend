import { z } from "zod";
import "dotenv/config";

const untestedSurrealDBEnv = {
  SURREALDB_ENDPOINT: process.env.SURREALDB_ENDPOINT,
  SURREALDB_USER: process.env.SURREALDB_USER,
  SURREALDB_PASS: process.env.SURREALDB_PASS,
  SURREALDB_NS: process.env.SURREALDB_NS,
  SURREALDB_DB: process.env.SURREALDB_DB,
  SURREALDB_AC: process.env.SURREALDB_AC
};

const SurrealDBEnvSchema = z.object({
  SURREALDB_ENDPOINT: z.string().url("Invalid url"),
  SURREALDB_USER: z.string().min(1, "Must be 1 or more characters long"),
  SURREALDB_PASS: z.string().min(1, "Must be 1 or more characters long"),
  SURREALDB_NS: z.string().min(1, "Must be 1 or more characters long"),
  SURREALDB_DB: z.string().min(1, "Must be 1 or more characters long"),
  SURREALDB_AC: z.string().min(1, "Must be 1 or more characters long")
});

const SurrealDBEnv = SurrealDBEnvSchema.parse(untestedSurrealDBEnv);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof SurrealDBEnvSchema> {}
  }
}

export { SurrealDBEnv };
