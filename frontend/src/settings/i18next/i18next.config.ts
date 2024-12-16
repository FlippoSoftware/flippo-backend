import { createI18nextIntegration, type I18nextIntegration } from '@withease/i18next';
import { createEvent, createStore } from 'effector';
import i18next, { type i18n } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { HMRPlugin } from 'i18next-hmr/plugin';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import {
  INTERNATIONALIZATION_COOKIE_LIFETIME,
  INTERNATIONALIZATION_COOKIE_NAME,
  INTERNATIONALIZATION_DEFAULT_LOCALE,
  INTERNATIONALIZATION_LOCALES
} from './i18next.constants';

export const initI18next = createEvent();
export const teardownI18next = createEvent();

const defaultI18nextInstance = i18next
  .createInstance({
    backend: {
      crossDomain: true,
      loadPath: '../../../locales/{{lng}}/{{ns}}.json',
      withCredentials: false
    },
    defaultNS: 'translation',
    detection: {
      // cache user language on
      caches: ['localStorage', 'cookie'],

      // expiry and domain for set cookie
      cookieDomain: 'localhost',
      cookieMinutes: INTERNATIONALIZATION_COOKIE_LIFETIME,

      // optional set cookie options
      cookieOptions: { path: '/', sameSite: 'strict' },

      // keys or params to lookup language from
      lookupCookie: INTERNATIONALIZATION_COOKIE_NAME,
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      lookupLocalStorage: 'i18nextLng',
      lookupQuerystring: 'lng',
      lookupSessionStorage: 'i18nextLng',

      // order and from where user language should be detected
      order: ['subdomain', 'path', 'navigator', 'cookie', 'localStorage', 'sessionStorage', 'querystring', 'htmlTag']
    },
    fallbackLng: INTERNATIONALIZATION_DEFAULT_LOCALE,
    ns: ['translation', 'auth', 'header'],
    react: {
      useSuspense: true
    },
    supportedLngs: INTERNATIONALIZATION_LOCALES
  })
  .use(initReactI18next)
  .use(HttpBackend)
  .use(LanguageDetector);

if (import.meta.env.NODE_ENV !== 'production') {
  defaultI18nextInstance.use(
    new HMRPlugin({
      vite: {
        client: typeof window !== 'undefined'
      }
    })
  );
}

const $i18nextInstance = createStore<i18n>(defaultI18nextInstance, { serialize: 'ignore' });

export default defaultI18nextInstance;

export const {
  $instance: $i18n,
  $isReady,
  $language,
  $t,
  changeLanguageFx,
  translated
}: I18nextIntegration = createI18nextIntegration({
  instance: $i18nextInstance,
  setup: initI18next,
  teardown: teardownI18next
});
