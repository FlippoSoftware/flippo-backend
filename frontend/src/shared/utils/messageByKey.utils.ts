import { createEffect } from "effector";
import { createTranslator } from "next-intl";
import { type TInternationalizationLocales } from "@shared/constants/internationalization.constant";

import { getLocale } from "./getLocale.utils";

type TMessages = { locale: TInternationalizationLocales; dictionary: IntlMessages };
let messages: TMessages | undefined = undefined;

export const errorMessageByKeyFx = createEffect<{ key: string; namespace?: string }, string>(
  async ({ key, namespace }) => {
    const locale = getLocale();

    if (typeof messages === "undefined" || messages.locale !== locale) {
      messages = {
        locale,
        dictionary: await import(`../../../messages/${locale}.json`)
      } as TMessages;
    }

    const t = createTranslator({ locale, messages: messages.dictionary });

    if (namespace && t.has(`${namespace}.${key}` as any)) {
      return t(`${namespace}.${key}` as any);
    }

    if (t.has(`error.${key}` as any)) return t(`error.${key}` as any);

    return t("error.500");
  }
);
