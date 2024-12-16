import { createHistoryRouter, createRoute, type UnmappedRouteObject } from 'atomic-router';
import { createEvent, sample } from 'effector';
import { createBrowserHistory } from 'history';

export type TMainRouteParams = {
  userId?: string;
};

export type TCollectionRouteParams = {
  userId: string;
};

export type TCommunityRouteParams = {
  userId?: string;
};

export type TProfileRouteParams = {
  userId: string;
};

export const initRouter = createEvent();

export const mainRoute = createRoute<TMainRouteParams>();
export const authRoute = createRoute();
export const callbackRoute = createRoute();
export const collectionRoute = createRoute<TCollectionRouteParams>();
export const communityRoute = createRoute<TCommunityRouteParams>();
export const profileRoute = createRoute<TProfileRouteParams>();

const ROUTES: UnmappedRouteObject<any>[] = [
  { path: '/', route: mainRoute },
  { path: '/auth', route: authRoute },
  { path: '/auth/callback', route: callbackRoute },
  { path: '/collection', route: collectionRoute },
  { path: '/community', route: communityRoute },
  { path: '/profile/:userId', route: profileRoute }
];

export const router: ReturnType<typeof createHistoryRouter> = createHistoryRouter({ routes: ROUTES });

sample({ clock: initRouter, fn: () => createBrowserHistory(), target: router.setHistory });
