import { $language, changeLanguageFx } from '@settings/i18next';
import { authRoute, settingsRoute } from '@settings/routing';
import { $session, sessionSignOut } from '@settings/session';
import { type TFolder, type TSet } from '@shared/schemas';
import { createEffect, createEvent, restore, sample } from 'effector';

import { fetchUserFolders, fetchUserRecent } from '../api';

export const logout = createEvent();
export const toSettings = createEvent();
export const toAuth = createEvent();
export const $sessionForHeader = $session.map((store) => {
  if (!store) return null;

  const username = store.username || `${store.name} ${store.surname}` || store.email || store.userId;

  return {
    avatarUrl: store.image,
    userId: store.userId,
    username
  };
});

export const $currentLanguage = $language.map((store) => store || 'en');
export const languageSwitch = createEvent();

const getFoldersFx = createEffect<string, Pick<TFolder, 'id' | 'name'>[]>(async (userId) => {
  const result = await fetchUserFolders(userId);

  return result;
});

const getRecentFx = createEffect<string, Pick<TSet, 'id' | 'name'>[]>(async (userId) => {
  const result = await fetchUserRecent(userId);

  return result;
});

export const $folders = restore(getFoldersFx.doneData, []);
export const $recent = restore(getRecentFx.doneData, []);

sample({
  clock: languageSwitch,
  source: $language,
  fn: (lng) => {
    return lng === 'ru' ? 'en' : 'ru';
  },
  target: changeLanguageFx
});

sample({ clock: logout, target: sessionSignOut });

sample({
  clock: toSettings,
  source: $sessionForHeader,
  filter: (session) => !!session,
  fn: (session) => ({ userId: session?.userId as string }),
  target: settingsRoute.open
});

sample({
  clock: $sessionForHeader,
  filter: (session) => !!session,
  fn: (session) => session?.userId as string,
  target: [getFoldersFx, getRecentFx]
});

sample({ clock: toAuth, target: authRoute.open });
