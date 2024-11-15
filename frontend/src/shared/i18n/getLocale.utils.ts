import {
  INTERNATIONALIZATION_DEFAULT_LOCALE,
  INTERNATIONALIZATION_COOKIE_NAME,
  INTERNATIONALIZATION_LOCALES,
  type TInternationalizationLocales
} from "@shared/i18n/internationalization.constant";

const localesUnion = INTERNATIONALIZATION_LOCALES.join("|");

export const getLocale = () => {
  if (window) {
    const path = window.location.pathname;
    const searchInPath = new RegExp(`^/(${localesUnion})/`).exec(path);
    if (
      searchInPath &&
      INTERNATIONALIZATION_LOCALES.includes(searchInPath[1] as TInternationalizationLocales)
    ) {
      return searchInPath[1];
    }

    const searchInCookies = document.cookie.match(`${INTERNATIONALIZATION_COOKIE_NAME}=(.+?)(;|$)`);
    if (searchInCookies && searchInCookies[1]) {
      return searchInCookies[1];
    }
  }

  return INTERNATIONALIZATION_DEFAULT_LOCALE;
};
