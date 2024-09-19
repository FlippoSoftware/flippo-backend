import { z } from "zod";

const untestedAppEnv = {
  APP_BASE_URL: process.env.APP_BASE_URL
};

const AppEnvSchema = z.object({
  APP_BASE_URL: z.string().url("Invalid url")
});

const AppEnv = AppEnvSchema.parse(untestedAppEnv);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof AppEnvSchema> {}
  }
}

export { AppEnv };
