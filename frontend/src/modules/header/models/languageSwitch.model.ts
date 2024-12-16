import { $language, changeLanguageFx } from '@settings/i18next';
import { createEvent, sample } from 'effector';

export const $isRu = $language.map((store) => store === 'ru');
export const languageSwitch = createEvent();

sample({
  clock: languageSwitch,
  source: $language,
  fn: (lng) => {
    return lng === 'ru' ? 'en' : 'ru';
  },
  target: changeLanguageFx
});
