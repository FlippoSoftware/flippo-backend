import {
  findRefreshTokenById,
  findRefreshTokenByData,
  deleteRefreshToken,
  createRefreshToken
} from "@dao/refreshToken.dao.ts";
import { type TConnectionData, type TUserId } from "@schemas/index.ts";
import * as JWT from "@utils/jwt/jwt.ts";
import { type TAccessPayload, type TRefreshPayload } from "@utils/jwt/types/TAuthPayload.ts";
import { ApiError } from "src/exceptions/api.error.ts";
import { type TCreateRefreshToken, type TRefreshJwtId } from "@schemas/db/refreshToken.schema.ts";
import { omit } from "lodash-es";
import { JWTExpired } from "jose/errors";

type TVerificationResultCodeJWT = "SUCCESS" | "ERR_JWT_EXPIRED";

type TVerificationResultJWT<T extends TAccessPayload | TRefreshPayload> = {
  code: TVerificationResultCodeJWT;
  payload: T;
};

class TokenService {
  static async generateAccessRefreshTokens(
    userId: TUserId,
    connectionData: Omit<TConnectionData, "date">
  ) {
    const { tokens, payloads } = await JWT.generateTokens(userId);

    const refreshTokenDB = await TokenService.saveRefreshToken(payloads.refreshPayload.jti, {
      user: userId,
      isRevoked: false,
      connectionData
    });

    if (!refreshTokenDB) throw ApiError.Internal("Failed to generate a refresh token in DB.");

    return tokens;
  }

  static async refresh(token: string) {
    const verificationResult = await TokenService.verifyToken<TRefreshPayload>(token);
    if (!verificationResult) throw ApiError.Unauthorized();

    if (verificationResult.code === "ERR_JWT_EXPIRED") {
      await deleteRefreshToken(verificationResult.payload.jti);
      throw ApiError.Unauthorized();
    }

    const tokenDB = await findRefreshTokenById(verificationResult.payload.jti);
    if (!tokenDB || tokenDB.isRevoked) {
      throw ApiError.Unauthorized();
    }

    await deleteRefreshToken(verificationResult.payload.jti);

    const connectionData = omit(tokenDB.connectionData, "date");
    const tokens = await this.generateAccessRefreshTokens(
      verificationResult.payload.userId as TUserId,
      connectionData
    );

    return tokens;
  }

  static async verifyToken<T extends TRefreshPayload | TAccessPayload>(
    token: string
  ): Promise<TVerificationResultJWT<T> | null> {
    try {
      const payload = await JWT.verifyToken<T>(token);

      return { code: "SUCCESS", payload: payload };
    } catch (error: any) {
      if (error instanceof JWTExpired)
        return {
          code: "ERR_JWT_EXPIRED",
          payload: error.payload as T
        };

      return null;
    }
  }

  static async saveRefreshToken(refreshId: TRefreshJwtId, refreshData: TCreateRefreshToken) {
    const userId = refreshData.user;
    const system = refreshData.connectionData.system;
    const browser = refreshData.connectionData.browser;
    const ip = refreshData.connectionData.ip;

    const tokenDB = await findRefreshTokenByData(userId, { system, browser, ip });
    if (tokenDB) {
      const isDeleted = await this.deleteRefreshToken(tokenDB.id);
      if (!isDeleted) throw ApiError.Internal("Failed to delete refresh token from DB.");
    }

    const newTokenDB = await createRefreshToken(refreshId, refreshData);
    if (!newTokenDB) throw ApiError.Internal("Failed to save a refresh token in DB.");

    return newTokenDB;
  }

  static async deleteRefreshToken(jti: string) {
    const isDeleted = await deleteRefreshToken(jti);

    return isDeleted;
  }

  static async findRefreshToken(jti: string) {
    const tokenDB = await findRefreshTokenById(jti);

    return tokenDB;
  }

  static async generateDbToken(userId: string) {
    const token = await JWT.generateDbToken(userId);
    if (!token) throw ApiError.Internal("Failed to generate a DB token.");

    return token;
  }
}

export { TokenService };
