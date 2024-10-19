import { type Request, type Response, type NextFunction } from "express";
import generateCode from "@utils/generateVerificationCode.ts";
import { CodeVerifyService } from "@service/codeVerify.service.ts";
import { EmailService } from "@service/email.service.ts";
import { getExpiration } from "@utils/jwt/timestamps.ts";
import logger from "@utils/logger.ts";

import { registrationEmailCookieOptions } from "./constant/cookieOption.ts";

const CODE_LENGTH = 5;
const LIFE_TIME = "5mins";

class EmailController {
  static async generateVerificationCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const oldCode = await CodeVerifyService.findCode(email);
      if (oldCode) {
        await CodeVerifyService.deleteCode(email);
      }

      const code = generateCode(CODE_LENGTH);
      const exp = getExpiration(LIFE_TIME);
      await CodeVerifyService.saveCode(email, code, exp);

      const info = await EmailService.sendVerifyCode(email, code);
      logger.info({ info });

      res.cookie("registrationEmail", email, registrationEmailCookieOptions);

      return res.sendStatus(200);
    } catch (error: any) {
      return next(error);
    }
  }

  static async verifyCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, code } = req.body;
      const { registrationEmail } = req.cookies;

      await EmailService.validateEmail(registrationEmail, email);

      await CodeVerifyService.verifyCode(email, code);

      await CodeVerifyService.deleteCode(email);

      return res.sendStatus(200);
    } catch (error) {
      return next(error);
    }
  }
}

export { EmailController };
