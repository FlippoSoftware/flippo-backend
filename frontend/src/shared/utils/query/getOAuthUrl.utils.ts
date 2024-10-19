import { AppEnv } from "@shared/env/app.env";
import { match } from "@shared/utils/match.utils";
import { addQueryParams } from "@shared/utils/query/addQueryParams.utils";

const authProviders = ["google", "vkontakte", "yandexID"] as const;
type TAuthProvider = (typeof authProviders)[number];

type TSharedQueryParams = {
  client_id: string;
  redirect_uri: string;
  scope: string;
  response_type: string;
  code_challenge?: string;
  code_challenge_method?: string;
  state?: string;
  include_granted_scopes?: boolean;
};

const oauthBaseUrlRecord: Record<TAuthProvider, string> = {
  google: "https://accounts.google.com/o/oauth2/v2/auth",
  vkontakte: "https://id.vk.com/authorize",
  yandexID: "https://oauth.yandex.ru/authorize"
};

const oauthScopeRecord: Record<TAuthProvider, string> = {
  google: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
  ].join(" "),
  vkontakte: ["vkid.personal_info", "email"].join(" "),
  yandexID: ["login:email", "login:info", "login:avatar"].join(" ")
};

const oauthClientIdRecord: Record<TAuthProvider, string> = {
  google: AppEnv.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  vkontakte: AppEnv.NEXT_PUBLIC_VK_CLIENT_ID,
  yandexID: AppEnv.NEXT_PUBLIC_YANDEX_CLIENT_ID
};

const getOAuthRedirectUri = (provider: TAuthProvider) =>
  `${AppEnv.NEXT_PUBLIC_API_BASE_URL}/oauth/${provider}`;

function getOAuthUrl({
  provider,
  state,
  codeChallenge
}: {
  provider: TAuthProvider;
  state?: string;
  codeChallenge?: string;
}) {
  const baseUrl: string = oauthBaseUrlRecord[provider];

  const sharedQueryParams: TSharedQueryParams = {
    client_id: oauthClientIdRecord[provider],
    redirect_uri: getOAuthRedirectUri(provider),
    scope: oauthScopeRecord[provider],
    response_type: "code"
  };

  if (codeChallenge) {
    sharedQueryParams.code_challenge = codeChallenge;
    sharedQueryParams.code_challenge_method = "S256";
  }

  if (state) {
    sharedQueryParams.state = state;
  }

  const customQueryParams = match<TAuthProvider, object>(provider, {
    google: () => ({
      access_type: "offline",
      prompt: "consent"
    }),
    vkontakte: () => ({
      auth_type: "offline",
      display: "popup"
    }),
    yandexID: () => ({
      force_confirm: "yes"
    })
  });

  return addQueryParams(baseUrl, {
    ...sharedQueryParams,
    ...customQueryParams
  });
}

export {
  getOAuthRedirectUri,
  getOAuthUrl,
  authProviders,
  type TSharedQueryParams,
  type TAuthProvider
};
