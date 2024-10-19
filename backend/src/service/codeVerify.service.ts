import { createVerifyCode, deleteVerifyCode, findVerifyCode } from "@dao/verificationCode.dao.ts";
import isTimeExpired from "@utils/jwt/isTimeExpired.ts";
import { ApiError } from "src/exceptions/api.error.ts";

class CodeVerifyService {
  static async findCode(email: string) {
    const verificationCodeDB = await findVerifyCode(email);

    return verificationCodeDB;
  }

  static async saveCode(email: string, code: string, exp: number) {
    const verificationCodeDB = await createVerifyCode({ email, code, exp });

    return verificationCodeDB;
  }

  static async deleteCode(email: string) {
    const isDeleted = await deleteVerifyCode(email);

    return isDeleted;
  }

  static async verifyCode(email: string, code: string) {
    const verificationCodeDB = await this.findCode(email);
    if (!verificationCodeDB)
      throw ApiError.Expired("Could not find code. Verification code expired");

    if (verificationCodeDB.code !== code) throw ApiError.BadRequest("Invalid code.");

    if (isTimeExpired(verificationCodeDB.exp)) throw ApiError.Expired("Verification code expired");

    return true;
  }
}

export { CodeVerifyService };
