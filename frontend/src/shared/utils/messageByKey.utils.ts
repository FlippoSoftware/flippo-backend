import { createTranslator } from "next-intl";
import { type TInternationalizationLocales } from "@shared/constants/internationalization.constant";

import { getLocale } from "./getLocale.utils";

type TMessages = { locale: TInternationalizationLocales; dictionary: IntlMessages };
let messages: TMessages | undefined = undefined;

export async function errorMessageByKey(key: string, namespace?: string) {
  const locale = getLocale();

  // Attempt to upload a localization file
  if (typeof messages === "undefined" || messages.locale !== locale) {
    messages = {
      locale,
      dictionary: await import(`../../../messages/${locale}.json`).catch(() => undefined)
    } as TMessages;
  }

  // Checking if the dictionary was loaded successfully
  if (!messages.dictionary) {
    console.error(`Failed to load messages for locale ${locale}`);
    return "ERROR: An error occurred while retrieving the error message. Sorry for the problems.";
  }

  const t = createTranslator({ locale, messages: messages.dictionary });

  if (namespace && t.has(`${namespace}.${key}` as any)) {
    return t(`${namespace}.${key}` as any);
  }

  if (t.has(`error.${key}` as any)) return t(`error.${key}` as any);

  return t("error.500");
}
