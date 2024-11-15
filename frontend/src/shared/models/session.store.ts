import { createStore, createEvent, sample, split, createEffect } from "effector";
import { z } from "zod";
import { and, condition } from "patronum";
import { record } from "@schemas/record.schema";
import { sessionAuthFx, sessionRefreshFx, sessionSignOutFx } from "@shared/api/session.api";

export const SessionSchema = z.object({
  userId: record("user"),
  email: z.string().email().optional(),
  name: z.string().optional(),
  surname: z.string().optional(),
  username: z.string().optional(),
  role: z.union([z.literal("user"), z.literal("admin"), z.literal("premium")]),
  image: z.string().url().optional()
});

export type TSession = z.infer<typeof SessionSchema>;

export const $session = createStore<TSession | null>(null);
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
  match: (value) => (value === "401" ? "unauthorized" : "fail"),
  cases: {
    unauthorized: sessionRefresh,
    fail: sessionSignOut
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
