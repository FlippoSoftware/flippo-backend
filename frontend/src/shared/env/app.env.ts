import { z } from "zod";

const uncheckEnv = {
  APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  VK_CLIENT_ID: process.env.NEXT_PUBLIC_VK_CLIENT_ID,
  YANDEX_CLIENT_ID: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID,
  SURREALDB_ENDPOINT: process.env.NEXT_PUBLIC_SURREALDB_ENDPOINT,
  SURREALDB_NS: process.env.NEXT_PUBLIC_SURREALDB_NS,
  SURREALDB_DB: process.env.NEXT_PUBLIC_SURREALDB_DB,
  SURREALDB_AC: process.env.NEXT_PUBLIC_SURREALDB_AC
};

const AppEnvSchema = z.object({
  APP_BASE_URL: z.string().url("Invalid url"),
  API_BASE_URL: z.string().url("Invalid url"),
  GOOGLE_CLIENT_ID: z.string(),
  VK_CLIENT_ID: z.string(),
  YANDEX_CLIENT_ID: z.string(),
  SURREALDB_ENDPOINT: z.string().url("Invalid url"),
  SURREALDB_NS: z.string(),
  SURREALDB_DB: z.string(),
  SURREALDB_AC: z.string()
});

export const ENV = AppEnvSchema.parse(uncheckEnv);
