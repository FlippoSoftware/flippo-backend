import { z } from "zod";
import "dotenv/config";

const untestedVkontakteEnv = {
  VK_CLIENT_ID: process.env.VK_CLIENT_ID,
  VK_CLIENT_SECRET: process.env.VK_CLIENT_SECRET,
  VK_CLIENT_SERVICE_ACCESS: process.env.VK_CLIENT_SERVICE_ACCESS,
  VK_REDIRECT_URL: process.env.VK_REDIRECT_URL
};

const VkontakteEnvSchema = z.object({
  VK_CLIENT_ID: z.coerce
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number"
    })
    .int("Must be integer"),
  VK_CLIENT_SECRET: z.string().min(1, "Must be 1 or more characters long"),
  VK_CLIENT_SERVICE_ACCESS: z.string().min(1, "Must be 1 or more characters long"),
  VK_REDIRECT_URL: z.string().url("Invalid redirect URL")
});

const VkontakteEnv = VkontakteEnvSchema.parse(untestedVkontakteEnv);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof VkontakteEnvSchema> {}
  }
}

export { VkontakteEnv };
