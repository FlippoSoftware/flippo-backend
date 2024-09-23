import {
  createUser,
  deleteUser,
  fetchUserById,
  fetchUserByProviderId,
  updateUser
} from "@dao/user.dao.ts";
import { TCreateUser, TUser, TUserID } from "@schemas/db/user.schema.ts";
import { TConnectionData } from "@schemas/index.ts";
import { TokenService } from "./refreshToken.service.ts";
import { ApiError } from "src/exceptions/api.error.ts";
import { deleteRefreshToken } from "@dao/refreshToken.dao.ts";
class UserService {
  static async signUp(
    userData: TCreateUser["body"],
    connectionData: Omit<TConnectionData, "date">
  ) {
    const candidate = await fetchUserByProviderId(userData.providersID[0]);
    if (candidate) {
      const tokens = await TokenService.generate(candidate.id, connectionData);
      return { user: candidate, tokens };
    }

    const user = await createUser(userData);
    if (!user) throw ApiError.ServiceUnavailable("Failed to create a user.");

    const tokens = await TokenService.generate(user.id, connectionData);

    return { user, tokens };
  }

  static async signOut(refreshToken: string) {
    const token = await deleteRefreshToken(refreshToken);
    if (!token) throw ApiError.ServiceUnavailable("Failed to delete token.");

    return token;
  }

  static async getUserById(userID: TUserID) {
    const user = await fetchUserById(userID);

    return user;
  }

  static async updateUser(
    userID: TUserID,
    userData: Partial<Omit<TUser, "id" | "created" | "updated">>
  ) {
    const user = await updateUser(userID, userData);

    return user;
  }

  static async deleteUser(userID: TUserID) {
    const user = await deleteUser(userID);

    return user;
  }
}

export { UserService };
