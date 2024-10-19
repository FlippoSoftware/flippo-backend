import { ENV } from "@schemas/index.ts";
import logger from "@utils/logger.ts";
import nodemailer from "nodemailer";
import { ApiError } from "src/exceptions/api.error.ts";

class EmailService {
  static async sendVerifyCode(to: string, code: number | string) {
    try {
      const transporter = nodemailer.createTransport({
        service: ENV.EMAIL_SERVICE,
        auth: {
          user: ENV.EMAIL_USER,
          pass: ENV.EMAIL_APP_PASS
        }
      });

      const info = await transporter.sendMail({
        from: `"Flippo" <${ENV.EMAIL_USER}>`,
        to,
        subject: "Your Verification Code for Flippo",
        html: `
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; color: #333;">
          <p style="font-size: 16px; line-height: 1.5;">
            Hi <strong>${to}</strong>,
          </p>

          <p style="font-size: 16px; line-height: 1.5;">
            Thank you for signing up with <strong>Flippo</strong>! To complete your registration, please use the verification code below:
          </p>

          <h1 style="color: #4CAF50; text-align: center; font-size: 36px;">
            ${code}
          </h1>

          <p style="font-size: 16px; line-height: 1.5;">
            Enter this code in the app to verify your email and activate your account. If you didn't sign up for an account, please ignore this email.
          </p>

          <p style="font-size: 16px; line-height: 1.5;">
            If you have any questions or need assistance, feel free to contact our support team.
          </p>

          <p style="font-size: 16px; line-height: 1.5;">
            Welcome to Flippo!
          </p>

          <p style="font-size: 12px; text-align: center; color: #999; margin-top: 20px;">
            Best regards,<br>The Flippo Team<br>flippo.support@yandex.com
          </p>
        </div>
        `
      });

      return info;
    } catch (error: any) {
      logger.error(error.message);
      throw ApiError.BadRequest("Failed send verification code");
    }
  }

  static async validateEmail(emailFromCookie: string, email: string) {
    if (emailFromCookie !== email) {
      throw ApiError.BadRequest("Invalid email");
    }

    return true;
  }
}

export { EmailService };
