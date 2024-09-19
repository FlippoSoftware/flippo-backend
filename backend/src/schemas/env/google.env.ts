import { z } from "zod";
import "dotenv/config";

const untestedGoogleEnv = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL
};

const GoogleEnvSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1, "Must be 1 or more characters long"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "Must be 1 or more characters long"),
  GOOGLE_REDIRECT_URL: z.string().url("Invalid redirect URL")
});

const GoogleEnv = GoogleEnvSchema.parse(untestedGoogleEnv);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof GoogleEnvSchema> {}
  }
}

export { GoogleEnv };
