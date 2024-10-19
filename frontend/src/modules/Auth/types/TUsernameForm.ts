import { z } from "zod";

const UsernameFromSchema = z.object({
  username: z
    .string()
    .min(1, "Пожалуйста введите имя.")
    .min(2, "Имя должно содержать не менее 2-х символа")
});

type TUsernameFrom = z.infer<typeof UsernameFromSchema>;

export { UsernameFromSchema, type TUsernameFrom };
