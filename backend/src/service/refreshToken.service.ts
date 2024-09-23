import {
  fetchRefreshTokenById,
  deleteRefreshToken,
  createRefreshToken,
  updateRefreshTokenId,
  fetchRefreshTokenByData
} from "@dao/refreshToken.dao.ts";
import { TUserID } from "@schemas/db/user.schema.ts";
import { GoogleEnv, TConnectionData, TRefreshToken } from "@schemas/index.ts";
import { verifyToken, generateTokens } from "@utils/jwt/jwt.ts";
import { TAccessPayload, TRefreshPayload } from "@utils/jwt/types/IAuthPayload.ts";
import isTimeExpired from "@utils/jwt/utils/isTimeExpired.ts";
import { ApiError } from "src/exceptions/api.error.ts";
import { IGoogleTokensResult } from "./types/IGoogleTokensResult.ts";
import { IGoogleUserResult } from "./types/IGoogleUserResult.ts";
import axios from "axios";
import qs from "qs";
import { TCreateRefreshToken, TRefreshJwtID } from "@schemas/db/refreshToken.schema.ts";

class TokenService {
  static async generate(userID: TUserID, connectionData: Omit<TConnectionData, "date">) {
    try {
      const { tokens, payloads } = await generateTokens(userID);

      const refreshTokenDB: TRefreshToken | undefined = await TokenService.saveRefreshToken(
        payloads.refreshPayload.jti,
        {
          user: userID,
          isRevoked: false,
          connectionData
        }
      );

      if (!refreshTokenDB) {
        throw new Error("Failed to create a refresh token in DB.");
      }

      return tokens;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw ApiError.BadRequest(`Failed to create a refresh token. Reason${error.message}`);
      }

      throw ApiError.BadRequest("Failed to create a refresh token.");
    }
  }

  static async refresh(token: string, connectionData: TConnectionData) {
    const refreshPayload = await TokenService.verifyRefreshToken(token);
    if (!refreshPayload) throw ApiError.UnauthorizedError();

    if (isTimeExpired(refreshPayload.exp)) {
      await deleteRefreshToken(refreshPayload.jti);
      throw ApiError.UnauthorizedError();
    }

    const tokenDB = await fetchRefreshTokenById(refreshPayload.jti);
    if (!tokenDB || tokenDB.isRevoked) {
      throw ApiError.UnauthorizedError();
    }

    const tokens = await TokenService.generate(refreshPayload.userID as TUserID, connectionData);

    return tokens;
  }

  static async verifyAccessToken(token: string): Promise<TAccessPayload | null> {
    try {
      const accessPayload = (await verifyToken(token)) as TAccessPayload;

      return accessPayload;
    } catch (error: unknown) {
      return null;
    }
  }

  static async verifyRefreshToken(token: string): Promise<TRefreshPayload | null> {
    try {
      const refreshPayload = (await verifyToken(token)) as TRefreshPayload;

      return refreshPayload;
    } catch (error: unknown) {
      return null;
    }
  }

  static async saveRefreshToken(
    refreshID: TRefreshJwtID,
    refreshData: TCreateRefreshToken
  ): Promise<TRefreshToken | undefined> {
    try {
      const user = refreshData.user;
      const system = refreshData.connectionData.system;
      const browser = refreshData.connectionData.browser;
      const ip = refreshData.connectionData.ip;

      const tokenDB = await fetchRefreshTokenByData({ user, system, browser, ip });
      if (tokenDB) {
        const newTokenDB = await updateRefreshTokenId(tokenDB?.id, refreshID);
        return newTokenDB;
      }

      const newTokenDB = await createRefreshToken(refreshID, refreshData);
      return newTokenDB;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw ApiError.BadRequest(`The refresh token could not be saved. Reason${error.message}`);
      }

      throw ApiError.BadRequest("The refresh token could not be saved.");
    }
  }

  static async deleteRefreshToken(token: string): Promise<TRefreshToken | undefined> {
    const refreshPayload = await TokenService.verifyRefreshToken(token);
    if (!refreshPayload) throw new Error("Invalid refresh token.");

    const { jti } = refreshPayload;

    try {
      const tokenDB = await deleteRefreshToken(jti);

      return tokenDB;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw ApiError.BadRequest(`The token could not be deleted. Reason${error.message}`);
      }

      throw ApiError.BadRequest("The token could not be deleted.");
    }
  }

  static async findRefreshToken(token: string): Promise<TRefreshToken | undefined> {
    const refreshPayload = await TokenService.verifyRefreshToken(token);
    if (!refreshPayload) throw new Error("Invalid refresh token.");

    const { jti } = refreshPayload;

    try {
      const tokenDB = await fetchRefreshTokenById(jti);

      return tokenDB;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw ApiError.BadRequest(`The token could not be found. Reason${error.message}`);
      }

      throw ApiError.BadRequest("The token could not be found.");
    }
  }

  static async getGoogleOauthTokens(code: string): Promise<IGoogleTokensResult> {
    const url = "https://oauth2.googleapis.com/token";

    const options = {
      client_id: GoogleEnv.GOOGLE_CLIENT_ID,
      client_secret: GoogleEnv.GOOGLE_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: GoogleEnv.GOOGLE_REDIRECT_URL
    };

    try {
      const result = await axios.post<IGoogleTokensResult>(url, qs.stringify(options), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      return result.data;
    } catch (error: any) {
      throw ApiError.BadRequest(`Failed to get Google OAuth tokens. Reason: ${error.message}`);
    }
  }

  static async getGoogleUserInfo(access_token: string): Promise<IGoogleUserResult> {
    try {
      const result = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      return result.data;
    } catch (error: any) {
      throw ApiError.BadRequest(`Failed to get Google user info. Reason: ${error.message}`);
    }
  }
}

export { TokenService };
