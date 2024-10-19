import { z } from "zod";

const untestedAppEnv = {
  NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_VK_CLIENT_ID: process.env.NEXT_PUBLIC_VK_CLIENT_ID,
  NEXT_PUBLIC_YANDEX_CLIENT_ID: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID
};

const AppEnvSchema = z.object({
  NEXT_PUBLIC_APP_BASE_URL: z.string().url("Invalid url"),
  NEXT_PUBLIC_API_BASE_URL: z.string().url("Invalid url"),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
  NEXT_PUBLIC_VK_CLIENT_ID: z.string(),
  NEXT_PUBLIC_YANDEX_CLIENT_ID: z.string()
});

const AppEnv = AppEnvSchema.parse(untestedAppEnv);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof AppEnvSchema> {}
  }
}

export { AppEnv };
