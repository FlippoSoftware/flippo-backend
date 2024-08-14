import { z } from "zod";

const EnvSchema = z.object({
  SURREALDB_ENDPOINT: z.string().url("Invalid url"),
  SURREALDB_USER: z.string().min(1, "Must be 1 or more characters long"),
  SURREALDB_PASS: z.string().min(1, "Must be 1 or more characters long"),
  SURREALDB_NS: z.string().min(1, "Must be 1 or more characters long"),
  SURREALDB_DB: z.string().min(1, "Must be 1 or more characters long")
});

const env = EnvSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof EnvSchema> {}
  }
}

export { env };
