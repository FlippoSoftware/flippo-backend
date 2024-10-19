import { getSurreal } from "@utils/connect.ts";
import { type TVerifyCode, VerifyCodeSchema } from "@schemas/db/verifyCode.schema.ts";
import logger from "@utils/logger.ts";

async function findVerifyCode(email: string) {
  email = VerifyCodeSchema.shape.email.parse(email);

  const [[result]] = await getSurreal().query<[[TVerifyCode]]>(
    /*surql*/ `
      SELECT * FROM verifyCode WHERE email = $email
      ;
    `,
    {
      email
    }
  );

  return await VerifyCodeSchema.parseAsync(result).catch(() => undefined);
}

async function createVerifyCode({ code, email, exp }: TVerifyCode) {
  const verifyCode = VerifyCodeSchema.parse({ code, email, exp });

  const result = await getSurreal().create<TVerifyCode>("verifyCode", verifyCode);

  return await VerifyCodeSchema.parseAsync(result).catch(() => undefined);
}

async function deleteVerifyCode(email: string) {
  email = VerifyCodeSchema.shape.email.parse(email);

  try {
    const [result] = await getSurreal().query<[TVerifyCode[]]>(
      /*surql*/ `
        DELETE FROM verifyCode WHERE email = $email RETURN BEFORE
        ;
  `,
      { email }
    );

    return await VerifyCodeSchema.parseAsync(result).catch(() => undefined);
  } catch (error: any) {
    logger.error(`Failed to delete verify code: ${error.message}`);
    return undefined;
  }
}

export { findVerifyCode, createVerifyCode, deleteVerifyCode };
