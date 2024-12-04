import type { TAuthProvider } from '@shared/query';
import type { ReactElement } from 'react';

import { GoogleIcon } from '@shared/icons';
import { VKIcon } from '@shared/icons';
import { YandexIcon } from '@shared/icons';

const SIZE = { height: 24, width: 24 };

export const PROVIDER_ICONS: { [key in TAuthProvider]: ReactElement<any> } = {
  google: <GoogleIcon {...SIZE} />,
  vkontakte: <VKIcon {...SIZE} />,
  yandexID: <YandexIcon {...SIZE} />
};

export const PROVIDER_NAMES: { [key in TAuthProvider]: string } = {
  google: 'Google',
  vkontakte: 'VK',
  yandexID: 'Яндекс ID'
};

export const TIMEOUT_IN_MINUTES = 5;
export const TIMEOUT_IN_MILLISECONDS = TIMEOUT_IN_MINUTES * 60 * 1000;
