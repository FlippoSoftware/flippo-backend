import { TokenService } from "@service/token.service.ts";
import { type TAccessPayload } from "@utils/jwt/types/TAuthPayload.ts";
import { type Request, type Response, type NextFunction } from "express";
import { ApiError } from "src/exceptions/api.error.ts";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw ApiError.Unauthorized();
    }

    const verificationResult = await TokenService.verifyToken<TAccessPayload>(accessToken);
    if (!verificationResult || verificationResult.code === "ERR_JWT_EXPIRED") {
      throw ApiError.Unauthorized();
    }

    return next();
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.status).json();
    }

    return res.status(500).json();
  }
}

export default authMiddleware;
