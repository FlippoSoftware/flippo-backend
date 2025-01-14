import { getDb } from "@utils/connect.ts";
import {
  type TVerificationCode,
  VerificationCodeSchema
} from "@schemas/db/verificationCode.schema.ts";
import logger from "@utils/logger.ts";

async function findVerifyCode(email: string) {
  email = VerificationCodeSchema.shape.email.parse(email);

  const db = await getDb();
  const [[result]] = await db.query<[[TVerificationCode]]>(
    /*surql*/ `
      SELECT * FROM verifyCode WHERE email = $email
      ;
    `,
    {
      email
    }
  );

  return await VerificationCodeSchema.parseAsync(result).catch(() => undefined);
}

async function createVerifyCode({ code, email, exp }: TVerificationCode) {
  const verificationCode = VerificationCodeSchema.parse({ code, email, exp });

  const db = await getDb();
  const result = await db.create<TVerificationCode>("verifyCode", verificationCode);

  return await VerificationCodeSchema.parseAsync(result).catch(() => undefined);
}

async function deleteVerifyCode(email: string) {
  email = VerificationCodeSchema.shape.email.parse(email);

  try {
    const db = await getDb();
    const [result] = await db.query<[TVerificationCode[]]>(
      /*surql*/ `
        DELETE FROM verifyCode WHERE email = $email RETURN BEFORE
        ;
  `,
      { email }
    );

    return await VerificationCodeSchema.parseAsync(result).catch(() => undefined);
  } catch (error: any) {
    logger.error(`Failed to delete verification code: ${error.message}`);
    return undefined;
  }
}

export { findVerifyCode, createVerifyCode, deleteVerifyCode };
