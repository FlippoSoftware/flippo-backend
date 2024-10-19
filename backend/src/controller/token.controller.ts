import { TokenService } from "@service/token.service.ts";
import { type Request, type Response, type NextFunction } from "express";
import { UserService } from "@service/user.service.ts";
import { type TAccessPayload } from "@utils/jwt/types/TAuthPayload.ts";
import { ApiError } from "src/exceptions/api.error.ts";

import {
  accessTokenCookieOptions,
  dbTokenCookieOptions,
  refreshTokenCookieOptions
} from "./constant/cookieOption.ts";

class TokenController {
  static async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken: string = req.cookies["accessToken"];
      const verificationResult = await TokenService.verifyToken<TAccessPayload>(accessToken);

      if (!verificationResult || verificationResult.code === "ERR_JWT_EXPIRED")
        throw ApiError.Unauthorized();

      const user = await UserService.getUserById(verificationResult.payload.id);

      return res.status(200).json({
        userId: user.id,
        name: user.name,
        surname: user.surname,
        username: user.username,
        image: user.image
      });
    } catch (error: any) {
      return next(error); // -->error.middleware.ts
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const tokens = await TokenService.refresh(refreshToken);

      res.cookie("refreshToken", tokens.refreshToken, refreshTokenCookieOptions);
      res.cookie("accessToken", tokens.accessToken, accessTokenCookieOptions);

      return res.sendStatus(200);
    } catch (error: any) {
      return next(error); // -->error.middleware.ts
    }
  }

  static async getDbToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;

      const verificationResult = await TokenService.verifyToken<TAccessPayload>(accessToken);
      if (!verificationResult) throw ApiError.Unauthorized();

      const { id } = verificationResult.payload;
      const dbToken = await TokenService.generateDbToken(id);

      res.cookie("dbToken", dbToken, dbTokenCookieOptions);

      return res.sendStatus(200);
    } catch (error) {
      return next(error); // --> error.middleware.ts
    }
  }
}

export { TokenController };
