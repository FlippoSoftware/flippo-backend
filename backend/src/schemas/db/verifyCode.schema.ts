import z from "zod";

const VerifyCodeSchema = z.object({
  code: z.string().min(5).max(5),
  email: z.string().email(),
  exp: z.number()
});

type TVerifyCode = z.infer<typeof VerifyCodeSchema>;

export { VerifyCodeSchema, type TVerifyCode };
