import {
  createUser,
  deleteUser,
  findUserById,
  findUserByProviderId,
  updateUser
} from "@dao/user.dao.ts";
import { type TConnectionData, type TCreateUser, type TUser } from "@schemas/index.ts";
import { ApiError } from "src/exceptions/api.error.ts";
import { type TRefreshPayload } from "@utils/jwt/types/TAuthPayload.ts";

import { TokenService } from "./token.service.ts";

class UserService {
  static async signUp(userData: TCreateUser, connectionData: Omit<TConnectionData, "date">) {
    const user = await createUser(userData);
    if (!user) throw ApiError.ServiceUnavailable("Failed to create a user.");

    const tokens = await TokenService.generateAccessRefreshTokens(user.id, connectionData);
    return { user, tokens };
  }

  static async signIn(providerId: string, connectionData: Omit<TConnectionData, "date">) {
    const user = await findUserByProviderId(providerId);
    if (!user) return { user: undefined, tokens: undefined };

    const tokens = await TokenService.generateAccessRefreshTokens(user.id, connectionData);

    return { user, tokens };
  }

  static async signOut(refreshToken: string) {
    const verificationResult = await TokenService.verifyToken<TRefreshPayload>(refreshToken);
    if (!verificationResult) throw ApiError.BadRequest("Refresh token not found.");

    const isDeleted = await TokenService.deleteRefreshToken(verificationResult.payload.jti);
    if (!isDeleted) throw ApiError.BadRequest("Failed to delete token.");

    return true;
  }

  static async getUserById(userId: string) {
    const user = await findUserById(userId);

    return user;
  }

  static async getUserByProviderId(providerId: string) {
    const user = await findUserByProviderId(providerId);

    return user;
  }

  static async updateUser(
    userId: string,
    userData: Partial<Omit<TUser, "id" | "created" | "updated">>
  ) {
    const user = await updateUser(userId, userData);

    return user;
  }

  static async deleteUser(userId: string) {
    const user = await deleteUser(userId);

    return user;
  }
}

export { UserService };
