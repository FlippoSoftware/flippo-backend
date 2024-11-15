export const INTERNATIONALIZATION_LOCALES = ["en", "ru"] as const;
export type TInternationalizationLocales = (typeof INTERNATIONALIZATION_LOCALES)[number];

export const INTERNATIONALIZATION_COOKIE_NAME = "FLIPPO_USER_LOCALE";
export const INTERNATIONALIZATION_COOKIE_LIFETIME = 60 * 60 * 24 * 356;
export const INTERNATIONALIZATION_DEFAULT_LOCALE: TInternationalizationLocales = "ru";
