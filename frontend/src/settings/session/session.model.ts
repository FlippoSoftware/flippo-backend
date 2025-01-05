import * as sessionApi from '@shared/api';
import { chainRoute, type RouteInstance, type RouteParams, type RouteParamsAndQuery } from 'atomic-router';
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  type Effect,
  type Event,
  type EventCallable,
  is,
  sample,
  split
} from 'effector';
import { and, condition, not } from 'patronum';

import { SessionSchema, type TSession } from './session.schema';

enum AuthStatus {
  Initial = 0,
  Pending,
  Anonymous,
  Authenticated
}

// #region session
const sessionAuthFx = attach({ effect: sessionApi.sessionAuthFx });
const sessionRefreshFx = attach({ effect: sessionApi.sessionRefreshFx });
const sessionSignOutFx = attach({ effect: sessionApi.sessionSignOutFx });

export const $session = createStore<null | TSession>(null);
export const sessionChanged = createEvent<TSession>();
export const sessionReset = createEvent();

export const sessionAuth = createEvent();
export const sessionSignOut = createEvent();
export const sessionRefresh = createEvent();

export const sessionValidateFx = createEffect<TSession, TSession>((session) => {
  SessionSchema.parse(session);

  return session;
});

const COUNT_ATTEMPTS = 2;
const $countOfAuthenticationAttempts = createStore<number>(COUNT_ATTEMPTS);
const countOfAuthenticationAttemptsDecrement = createEvent();

const $authenticationStatus = createStore<AuthStatus>(AuthStatus.Initial);

$authenticationStatus.on(sessionAuthFx, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending;
  return status;
});

$authenticationStatus.on(sessionAuthFx.done, () => AuthStatus.Authenticated);
$authenticationStatus.on(sessionAuthFx.fail, () => AuthStatus.Anonymous);
$authenticationStatus.on(sessionSignOutFx.finally, () => AuthStatus.Anonymous);

$countOfAuthenticationAttempts.reset(sessionAuthFx.doneData, sessionSignOut);
$session.reset(sessionReset);

sample({
  clock: countOfAuthenticationAttemptsDecrement,
  source: $countOfAuthenticationAttempts,
  fn: (state) => {
    if (state > 0) return state - 1;

    return 0;
  },
  target: $countOfAuthenticationAttempts
});

sample({
  clock: sessionChanged,
  target: sessionValidateFx
});

sample({ clock: sessionValidateFx.doneData, target: $session });

sample({
  clock: sessionAuth,
  filter: not(sessionAuthFx.pending),
  target: sessionAuthFx
});

sample({
  clock: sessionAuthFx.doneData,
  target: sessionChanged
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
// #endregion

// #region chain routes of authorization
interface ChainParams {
  otherwise?: Effect<void, any, any> | Event<void> | EventCallable<void>;
}

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams = {}
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionAuthFx
  });

  sample({
    clock: [alreadyAnonymous, sessionAuthFx.fail],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAnonymous
  });

  if (otherwise) {
    split({
      source: sessionReceivedAnonymous,
      match: {
        effect: () => is.effect(otherwise),
        event: () => is.event(otherwise)
      },
      cases: {
        effect: otherwise,
        event: otherwise
      }
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthenticated, sessionAuthFx.done],
    cancelOn: sessionReceivedAnonymous
  });
}

export function chainAnonymous<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams = {}
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAuthenticated = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionAuthFx
  });

  sample({
    clock: [alreadyAuthenticated, sessionAuthFx.done],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAuthenticated
  });

  if (otherwise) {
    split({
      source: sessionReceivedAuthenticated,
      match: {
        effect: () => is.effect(otherwise),
        event: () => is.event(otherwise)
      },
      cases: {
        effect: otherwise,
        event: otherwise
      }
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, sessionAuthFx.fail],
    cancelOn: sessionReceivedAuthenticated
  });
}

export function chainOptionalAuthorization<Params extends RouteParams>(
  route: RouteInstance<Params>
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionAuthFx
  });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, alreadyAuthenticated, sessionAuthFx.done, sessionAuthFx.fail]
  });
}
// #endregion
