import type auth from '../../../locales/en/auth.json';
import type translation from '../../../locales/en/translation.json';

type TTranslation = typeof translation;
type TAuth = typeof auth;

type TResource = {
  auth: TAuth;
  translation: TTranslation;
};

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: TResource;
  }
}

import { type Effect, type Store } from 'effector';
import { type Event as Event_2 } from 'effector';
import { type i18n, type TFunction } from 'i18next';

declare module '@withease/i18next' {
  export type I18nextIntegration = {
    $instance: Store<i18n | null>;
    $isReady: Store<boolean>;
    $language: Store<null | string>;
    $t: Store<TFunction>;
    changeLanguageFx: Effect<string, void, unknown>;
    reporting: {
      missingKey: Event_2<MissinKeyReport>;
    };
    translated: Translated;
  };

  export type MissinKeyReport = {
    key: string;
    lngs: readonly string[];
    namespace: string;
    res: string;
  };

  export interface Translated {
    (key: string, variables?: Record<string, Store<string>>): Store<string>;
    (parts: TemplateStringsArray, ...stores: Store<string>[]): Store<string>;
  }
}
