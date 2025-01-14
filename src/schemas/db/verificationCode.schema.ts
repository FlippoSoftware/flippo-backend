import z from "zod";

const VerificationCodeSchema = z.object({
  code: z.string().min(5).max(5),
  email: z.string().email(),
  exp: z.number()
});

type TVerificationCode = z.infer<typeof VerificationCodeSchema>;

export { VerificationCodeSchema, type TVerificationCode };
