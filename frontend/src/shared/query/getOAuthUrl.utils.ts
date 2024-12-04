import { ENV } from '@shared/env';
import { match } from '@shared/utils';

import { addQueryParams } from './addQueryParams.utils';

const authProviders = ['google', 'vkontakte', 'yandexID'] as const;
type TAuthProvider = (typeof authProviders)[number];

type TSharedQueryParams = {
  client_id: string;
  code_challenge?: string;
  code_challenge_method?: string;
  include_granted_scopes?: boolean;
  redirect_uri: string;
  response_type: string;
  scope: string;
  state?: string;
};

const oauthBaseUrlRecord: Record<TAuthProvider, string> = {
  google: 'https://accounts.google.com/o/oauth2/v2/auth',
  vkontakte: 'https://id.vk.com/authorize',
  yandexID: 'https://oauth.yandex.ru/authorize'
};

const oauthScopeRecord: Record<TAuthProvider, string> = {
  google: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(
    ' '
  ),
  vkontakte: ['vkid.personal_info', 'email'].join(' '),
  yandexID: ['login:email', 'login:info', 'login:avatar'].join(' ')
};

const oauthClientIdRecord: Record<TAuthProvider, string> = {
  google: ENV.GOOGLE_CLIENT_ID,
  vkontakte: ENV.VK_CLIENT_ID,
  yandexID: ENV.YANDEX_CLIENT_ID
};

const getOAuthRedirectUri = (provider: TAuthProvider) => `${ENV.API_BASE_URL}/oauth/${provider}`;

function getOAuthUrl({
  codeChallenge,
  provider,
  state
}: {
  codeChallenge?: string;
  provider: TAuthProvider;
  state?: string;
}) {
  const baseUrl: string = oauthBaseUrlRecord[provider];

  const sharedQueryParams: TSharedQueryParams = {
    client_id: oauthClientIdRecord[provider],
    redirect_uri: getOAuthRedirectUri(provider),
    response_type: 'code',
    scope: oauthScopeRecord[provider]
  };

  if (codeChallenge) {
    sharedQueryParams.code_challenge = codeChallenge;
    sharedQueryParams.code_challenge_method = 'S256';
  }

  if (state) {
    sharedQueryParams.state = state;
  }

  const customQueryParams = match<TAuthProvider, object>(provider, {
    google: () => ({
      access_type: 'offline',
      prompt: 'consent'
    }),
    vkontakte: () => ({
      auth_type: 'offline',
      display: 'popup'
    }),
    yandexID: () => ({
      force_confirm: 'yes'
    })
  });

  return addQueryParams(baseUrl, {
    ...sharedQueryParams,
    ...customQueryParams
  });
}

export { authProviders, getOAuthRedirectUri, getOAuthUrl, type TAuthProvider, type TSharedQueryParams };
