import { $t } from '@settings/i18next';
import { createEvent, sample } from 'effector';

import { createErrorNotification } from '../models/ToastContainerStorage';

export const displayRequestError = createEvent<string>();

sample({
  clock: displayRequestError,
  source: $t,
  filter: $t.map((t) => !!t),
  fn: (t, error) => {
    return { message: t([`error.${error}` as any, 'error.500']) };
  },
  target: createErrorNotification
});
