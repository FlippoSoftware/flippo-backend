import { z } from "zod";
import "dotenv/config";

const untestedEmailEnv = {
  ISSUER_EMAIL: process.env.ISSUER_EMAIL
};

const EmailEnvSchema = z.object({
  ISSUER_EMAIL: z.string().email("Invalid email.")
});

const EmailEnv = EmailEnvSchema.parse(untestedEmailEnv);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof EmailEnvSchema> {}
  }
}

export { EmailEnv };
