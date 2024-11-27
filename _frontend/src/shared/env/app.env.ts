import { z } from 'zod';

const uncheckEnv = {
  API_BASE_URL: import.meta.env.FLIPPO_API_BASE_URL,
  APP_BASE_URL: import.meta.env.FLIPPO_APP_BASE_URL,
  GOOGLE_CLIENT_ID: import.meta.env.FLIPPO_GOOGLE_CLIENT_ID,
  SURREALDB_AC: import.meta.env.FLIPPO_SURREALDB_AC,
  SURREALDB_DB: import.meta.env.FLIPPO_SURREALDB_DB,
  SURREALDB_ENDPOINT: import.meta.env.FLIPPO_SURREALDB_ENDPOINT,
  SURREALDB_NS: import.meta.env.FLIPPO_SURREALDB_NS,
  VK_CLIENT_ID: import.meta.env.FLIPPO_VK_CLIENT_ID,
  YANDEX_CLIENT_ID: import.meta.env.FLIPPO_YANDEX_CLIENT_ID
};

const AppEnvSchema = z.object({
  API_BASE_URL: z.string().url('Invalid url'),
  APP_BASE_URL: z.string().url('Invalid url'),
  GOOGLE_CLIENT_ID: z.string(),
  SURREALDB_AC: z.string(),
  SURREALDB_DB: z.string(),
  SURREALDB_ENDPOINT: z.string().url('Invalid url'),
  SURREALDB_NS: z.string(),
  VK_CLIENT_ID: z.string(),
  YANDEX_CLIENT_ID: z.string()
});

export const ENV = AppEnvSchema.parse(uncheckEnv);
