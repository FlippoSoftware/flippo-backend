import { ENV } from "@schemas/index.ts";
import axios, { type AxiosRequestConfig } from "axios";
import { ApiError } from "src/exceptions/api.error.ts";

import { type IGoogleTokensResult } from "./types/IGoogleTokensResult.ts";
import { type IGoogleUserResult } from "./types/IGoogleUserResult.ts";
import { type IYandexTokensResult } from "./types/IYandexTokensResult.ts";
import { type IVkontakteTokensResult } from "./types/IVkontakteTokensResult.ts";
import { type IYandexUserResult } from "./types/IYandexUserResult.ts";
import { type IVkontakteUserResult } from "./types/IVkontakteUserResult.ts";

type TOAuthProviders = "google" | "yandex" | "vkontakte";

type TSharedQueryParams = {
  client_id: string;
  client_secret: string;
  code: string;
  grant_type: "authorization_code";
  redirect_uri: string;
  code_verifier?: string;
  device_id?: string;
};

const oauthTokenUrl: { [key in TOAuthProviders]: string } = {
  google: `https://oauth2.googleapis.com/token`,
  yandex: `https://oauth.yandex.ru/token`,
  vkontakte: `https://id.vk.com/oauth2/auth`
};

const oauthUserInfoUrl: { [key in TOAuthProviders]: string } = {
  google: `https://www.googleapis.com/oauth2/v1/userinfo`,
  yandex: `https://login.yandex.ru/info`,
  vkontakte: `https://id.vk.com/oauth2/user_info`
};

const providerData = {
  google: {
    client_id: ENV.GOOGLE_CLIENT_ID,
    client_secret: ENV.GOOGLE_CLIENT_SECRET,
    redirect_uri: ENV.GOOGLE_REDIRECT_URL
  },
  yandex: {
    client_id: ENV.YANDEX_CLIENT_ID,
    client_secret: ENV.YANDEX_CLIENT_SECRET,
    redirect_uri: ENV.YANDEX_REDIRECT_URL
  },
  vkontakte: {
    client_id: ENV.VK_CLIENT_ID,
    client_secret: ENV.VK_CLIENT_SECRET,
    redirect_uri: ENV.VK_REDIRECT_URL
  }
};

const configForRequestUserInfo: {
  [key in TOAuthProviders]: (access_token: string, ...args: any) => AxiosRequestConfig;
} = {
  google: (access_token) => {
    return {
      url: oauthUserInfoUrl["google"],
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    };
  },
  yandex: (access_token) => {
    return {
      url: oauthUserInfoUrl["yandex"],
      method: "GET",
      headers: {
        Authorization: `OAuth ${access_token}`
      }
    };
  },
  vkontakte: (access_token) => {
    return {
      url: oauthUserInfoUrl["vkontakte"],
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        client_id: ENV.VK_CLIENT_ID,
        access_token
      }
    };
  }
};

class OAuthService {
  static async getOauthTokens<
    T extends IGoogleTokensResult | IYandexTokensResult | IVkontakteTokensResult
  >(
    provider: TOAuthProviders,
    code: string,
    codeVerifier?: string,
    device_id?: string
  ): Promise<T> {
    try {
      const options: TSharedQueryParams = {
        ...providerData[provider],
        code,
        grant_type: "authorization_code",
        code_verifier: codeVerifier,
        device_id: device_id
      };

      const result = await axios.post<T>(oauthTokenUrl[provider], options, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      return result.data;
    } catch (error: any) {
      throw ApiError.BadRequest(`Failed to get ${provider} OAuth tokens. Reason: ${error.message}`);
    }
  }

  static async getUserInfo<T extends IGoogleUserResult | IYandexUserResult | IVkontakteUserResult>(
    provider: TOAuthProviders,
    access_token: string
  ): Promise<T> {
    try {
      const result = await axios<T>(configForRequestUserInfo[provider](access_token));

      return result.data;
    } catch (error: any) {
      throw ApiError.BadRequest(`Failed to get ${provider} user info. Reason: ${error.message}`);
    }
  }
}

export { OAuthService };
