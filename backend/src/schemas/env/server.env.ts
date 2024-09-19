import { z } from "zod";
import "dotenv/config";

const untestedServerEnv = {
  SERVER_PORT: process.env.SERVER_PORT
};

const ServerEnvSchema = z.object({
  SERVER_PORT: z.coerce.number()
});

const ServerEnv = ServerEnvSchema.parse(untestedServerEnv);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof ServerEnvSchema> {}
  }
}

export { ServerEnv };
