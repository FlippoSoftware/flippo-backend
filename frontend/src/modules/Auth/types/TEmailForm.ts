import { z } from "zod";

const EmailFormSchema = z.object({
  email: z
    .string()
    .min(1, "Пожалуйста введите почту.")
    .email("Такой почты не существует. Опечатка?🧐")
});

type TEmailForm = z.infer<typeof EmailFormSchema>;

export { EmailFormSchema, type TEmailForm };
