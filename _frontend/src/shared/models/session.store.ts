import { record } from '@schemas/record.schema';
import { sessionAuthFx, sessionRefreshFx, sessionSignOutFx } from '@shared/api/session.api';
import { createEffect, createEvent, createStore, sample, split } from 'effector';
import { and, condition } from 'patronum';
import { z } from 'zod';

export const SessionSchema = z.object({
  email: z.string().email().optional(),
  image: z.string().url().optional(),
  name: z.string().optional(),
  role: z.union([z.literal('user'), z.literal('admin'), z.literal('premium')]),
  surname: z.string().optional(),
  userId: record('user'),
  username: z.string().optional()
});

export type TSession = z.infer<typeof SessionSchema>;

export const $session = createStore<null | TSession>(null);
export const sessionChanged = createEvent<TSession>();
export const sessionReset = createEvent();

export const sessionAuth = createEvent();
export const sessionSignOut = createEvent();
export const sessionRefresh = createEvent();

const sessionValidateFx = createEffect<TSession, TSession>((session) => {
  SessionSchema.parse(session);

  return session;
});

const COUNT_ATTEMPTS = 2;
const $countOfAuthenticationAttempts = createStore<number>(COUNT_ATTEMPTS);
const countOfAuthenticationAttemptsDecrement = createEvent();

$countOfAuthenticationAttempts.reset(sessionAuthFx.doneData, sessionSignOut);

sample({
  clock: countOfAuthenticationAttemptsDecrement,
  source: $countOfAuthenticationAttempts,
  fn: (state) => {
    if (state > 0) return state - 1;

    return 0;
  },
  target: $countOfAuthenticationAttempts
});

$session.reset(sessionReset);

sample({
  clock: sessionChanged,
  target: sessionValidateFx
});

sample({ clock: sessionValidateFx.doneData, target: $session });

sample({
  clock: sessionAuth,
  target: sessionAuthFx
});

sample({
  clock: sessionAuthFx.doneData,
  target: $session
});

split({
  source: sessionAuthFx.failData,
  match: (value) => (value === '401' ? 'unauthorized' : 'fail'),
  cases: {
    fail: sessionSignOut,
    unauthorized: sessionRefresh
  }
});

condition({
  source: sessionRefresh,
  if: $countOfAuthenticationAttempts.map((state) => state > 0),
  then: sessionRefreshFx,
  else: sessionSignOut
});

sample({ clock: sessionRefreshFx.done, target: sessionAuth });

sample({
  clock: sessionRefreshFx.fail,
  target: sessionSignOut
});

sample({
  clock: sessionSignOut,
  filter: and($session),
  target: [sessionSignOutFx, sessionReset]
});
