import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { getLocale } from "@shared/i18n/getLocale.utils";
import { RedirectType } from "next/navigation";
import {
  INTERNATIONALIZATION_COOKIE_LIFETIME,
  INTERNATIONALIZATION_COOKIE_NAME,
  INTERNATIONALIZATION_DEFAULT_LOCALE,
  INTERNATIONALIZATION_LOCALES
} from "@shared/i18n/internationalization.constant";

export const routing = defineRouting({
  locales: INTERNATIONALIZATION_LOCALES,
  defaultLocale: INTERNATIONALIZATION_DEFAULT_LOCALE,
  localeCookie: {
    name: INTERNATIONALIZATION_COOKIE_NAME,
    maxAge: INTERNATIONALIZATION_COOKIE_LIFETIME
  }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

export const redirectWithLocale = (href: string, type: RedirectType = RedirectType.push) => {
  const locale = getLocale();

  redirect({ href, locale }, type);
};
