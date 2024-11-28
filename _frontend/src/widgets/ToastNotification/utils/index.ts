import { $t } from '@settings/i18next/i18next.config';
import { createEvent, sample } from 'effector';
import { type Namespace } from 'i18next';

import { createErrorNotification } from '../models/ToastContainerStorage';

export const errorToastDisplay = createEvent<{ key: string; namespace?: string }>();

sample({
  clock: errorToastDisplay,
  source: $t,
  fn: (t, { key, namespace }) => {
    const message: string = t(key as any, { ns: (namespace as Namespace) || null });

    if (message === key) return { message: t('error.500') };

    return { message };
  },
  target: createErrorNotification
});
