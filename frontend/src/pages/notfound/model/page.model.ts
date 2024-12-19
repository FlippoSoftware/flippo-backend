import { router } from '@settings/routing';
import { createEvent, sample } from 'effector';

export const redirectBack = createEvent<any>();

sample({ clock: redirectBack, target: router.back });
