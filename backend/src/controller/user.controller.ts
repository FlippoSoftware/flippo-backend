import { type Request, type Response, type NextFunction } from "express";
import { ENV, type TCreateUser, type TUser } from "@schemas/index.ts";
import { OAuthService } from "@service/oauth.service.ts";
import { type IGoogleTokensResult } from "@service/types/IGoogleTokensResult.ts";
import { type IGoogleUserResult } from "@service/types/IGoogleUserResult.ts";
import { type IVkontakteTokensResult } from "@service/types/IVkontakteTokensResult.ts";
import { type IVkontakteUserResult } from "@service/types/IVkontakteUserResult.ts";
import { type IYandexTokensResult } from "@service/types/IYandexTokensResult.ts";
import { type IYandexUserResult } from "@service/types/IYandexUserResult.ts";
import { UserService } from "@service/user.service.ts";
import getConnectionData from "@utils/getConnectionData.ts";
import { ApiError } from "src/exceptions/api.error.ts";
import { type TAllTokens } from "@utils/jwt/types/TTokens.ts";
import { EmailService } from "@service/email.service.ts";

import {
  accessTokenClearCookieOptions,
  accessTokenCookieOptions,
  dbTokenCookieOptions,
  refreshTokenClearCookieOptions,
  refreshTokenCookieOptions,
  registrationEmailClearCookieOptions
} from "./constant/cookieOption.ts";

class UserController {
  static composeAnAuthResponse(res: Response, tokens: TAllTokens, user: TUser) {
    res.cookie("refreshToken", tokens.refreshToken, refreshTokenCookieOptions);
    res.cookie("accessToken", tokens.accessToken, accessTokenCookieOptions);
    res.cookie("dbToken", tokens.dbToken, dbTokenCookieOptions);

    const composeData = {
      userId: user.id,
      role: user.role,
      email: user.email,
      image: user.image,
      name: user.name,
      surname: user.surname,
      username: user.username
    };

    return composeData;
  }

  static async authProcess(req: Request, res: Response, authUser: TCreateUser) {
    const connectionData = getConnectionData(req);

    let userData = await UserService.signIn(authUser.providersId[0], connectionData);
    if (!userData.user) userData = await UserService.signUp(authUser, connectionData);

    const { user, tokens } = userData;

    UserController.composeAnAuthResponse(res, tokens, user);

    return res.redirect(`${ENV.APP_REDIRECT_URL}`);
  }

  static async oauthGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      const code = req.query.code;
      const codeVerifier = decodeURIComponent(req.cookies["codeVerifier"]);

      const { access_token } = await OAuthService.getOauthTokens<IGoogleTokensResult>(
        "google",
        code as string,
        codeVerifier
      );

      const googleUser = await OAuthService.getUserInfo<IGoogleUserResult>(
        "google",
        access_token as string
      );

      if (!googleUser.verified_email) throw ApiError.Forbidden("Google account is not verified.");

      const authUser: TCreateUser = {
        name: googleUser.given_name,
        surname: googleUser.family_name,
        email: googleUser.email,
        providersId: [`google:${googleUser.id}`],
        role: "user",
        image: googleUser.picture
      };

      await UserController.authProcess(req, res, authUser);
    } catch (error: any) {
      return next(error); // -->error.middleware
    }
  }

  static async oauthVkontakte(req: Request, res: Response, next: NextFunction) {
    try {
      const { code, device_id } = req.query;
      const codeVerifier = decodeURIComponent(req.cookies["codeVerifier"]);
      const { access_token } = await OAuthService.getOauthTokens<IVkontakteTokensResult>(
        "vkontakte",
        code as string,
        codeVerifier,
        device_id as string
      );

      const { user: vkontakteUser } = await OAuthService.getUserInfo<IVkontakteUserResult>(
        "vkontakte",
        access_token
      );

      const authUser: TCreateUser = {
        name: vkontakteUser.first_name,
        surname: vkontakteUser.last_name,
        email: vkontakteUser.email,
        providersId: [`vkontakte:${vkontakteUser.user_id}`],
        role: "user",
        image: vkontakteUser.avatar
      };

      await UserController.authProcess(req, res, authUser);
      return;
    } catch (error: any) {
      return next(error); // -->error.middleware
    }
  }

  static async oauthYandex(req: Request, res: Response, next: NextFunction) {
    try {
      const code = req.query.code;
      const codeVerifier = decodeURIComponent(req.cookies["codeVerifier"]);
      const { access_token } = await OAuthService.getOauthTokens<IYandexTokensResult>(
        "yandex",
        code as string,
        codeVerifier
      );

      const yandexUser = await OAuthService.getUserInfo<IYandexUserResult>("yandex", access_token);

      const authUser: TCreateUser = {
        name: yandexUser.first_name,
        surname: yandexUser.last_name,
        email: yandexUser.default_email,
        providersId: [`yandex:${yandexUser.id}`],
        role: "user",
        image: !yandexUser.is_avatar_empty
          ? `https://avatars.yandex.net/get-yapic/${yandexUser.default_avatar_id}/islands-200`
          : undefined
      };

      await UserController.authProcess(req, res, authUser);
    } catch (error: any) {
      return next(error); // -->error.middleware
    }
  }

  static async signUpWithEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email } = req.body;
      const { registrationEmail } = req.cookies;

      await EmailService.validateEmail(registrationEmail, email);

      const userData: TCreateUser = {
        name: "",
        surname: "",
        username,
        email,
        providersId: [`email:${email}`],
        role: "user",
        image: undefined
      };

      const connectionData = getConnectionData(req);
      const { user, tokens } = await UserService.signUp(userData, connectionData);

      const composeData = UserController.composeAnAuthResponse(res, tokens, user);

      res.clearCookie("registrationEmail", registrationEmailClearCookieOptions);

      return res.status(200).json(composeData);
    } catch (error: any) {
      return next(error); // --> error.middleware.ts
    }
  }

  static async signInWitEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const { registrationEmail } = req.cookies;

      await EmailService.validateEmail(registrationEmail, email);

      const providerId = `email:${email}`;

      const connectionData = getConnectionData(req);
      const { user, tokens } = await UserService.signIn(providerId, connectionData);
      if (!user) throw ApiError.Unauthorized();

      const composeData = UserController.composeAnAuthResponse(res, tokens, user);

      res.clearCookie("registrationEmail", registrationEmailClearCookieOptions);

      return res.status(200).json(composeData);
    } catch (error: any) {
      return next(error); // --> error.middleware.ts
    }
  }

  static async signOut(req: Request, res: Response, next: NextFunction) {
    const clearCookies = () => {
      res.clearCookie("refreshToken", refreshTokenClearCookieOptions);
      res.clearCookie("accessToken", accessTokenClearCookieOptions);
    };

    try {
      const { refreshToken } = req.cookies;
      await UserService.signOut(refreshToken);

      clearCookies();

      return res.sendStatus(200);
    } catch (error: any) {
      clearCookies();
      return next(error); // -->error.middleware.ts
    }
  }
}

export { UserController };
