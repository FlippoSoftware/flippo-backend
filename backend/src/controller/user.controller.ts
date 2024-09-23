import { TCreateUser } from "@schemas/db/user.schema.ts";
import { TConnectionData } from "@schemas/index.ts";
import { TokenService } from "@service/refreshToken.service.ts";
import { UserService } from "@service/user.service.ts";
import stringToUnixSeconds from "@utils/jwt/utils/stringToUnixSeconds.ts";
import logger from "@utils/logger.ts";
import { CookieOptions, Request, Response, NextFunction } from "express";
import { ApiError } from "src/exceptions/api.error.ts";

const accessTokenCookieOptions: CookieOptions = {
  maxAge: stringToUnixSeconds("15min"), // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: stringToUnixSeconds("24w") // 1 year
};

class UserController {
  private static async authUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userAgent = req.useragent;
      const connectionData = {
        ip: req.socket.remoteAddress,
        browser: userAgent ? userAgent.browser : "",
        system: userAgent ? userAgent.os : ""
      } as Omit<TConnectionData, "date">;

      const userData = await UserService.signUp(req.body, connectionData);
      res.cookie("refreshToken", userData.tokens.refreshToken, refreshTokenCookieOptions);
      res.cookie("accessToken", userData.tokens.accessToken, accessTokenCookieOptions);

      logger.info(userData);
      return res.json(userData.user);
    } catch (error: unknown) {
      return next(error); // -->error.middleware
    }
  }

  static async oauthGoogle(req: Request, res: Response, next: NextFunction) {
    const code = req.query.code;
    try {
      const { access_token } = await TokenService.getGoogleOauthTokens(code as string);

      const googleUser = await TokenService.getGoogleUserInfo(access_token);

      if (!googleUser.verified_email) throw ApiError.Forbidden("Google account is not verified.");

      const requestBody: TCreateUser["body"] = {
        name: googleUser.given_name,
        surname: googleUser.family_name,
        email: googleUser.email,
        providersID: [`google:${googleUser.id}`],
        role: "user",
        image: googleUser.picture
      };

      req.body = requestBody;
      await UserController.authUser(req, res, next);
    } catch (error: any) {
      return next(error); // -->error.middleware
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error: unknown) {
      return next(error); // -->error.middleware
    }
  }

  static async signOut(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error: unknown) {
      return next(error); // -->error.middleware.ts
    }
  }

  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error: unknown) {
      return next(error); // -->error.middleware.ts
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error: unknown) {
      return next(error); // -->error.middleware.ts
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error: unknown) {
      return next(error); // -->error.middleware.ts
    }
  }
}

export { UserController };
