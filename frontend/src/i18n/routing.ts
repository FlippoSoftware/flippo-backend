import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "ru"],
  defaultLocale: "en",
  localeCookie: {
    name: "FLIPPO_USER_LOCALE",
    maxAge: 60 * 60 * 24 * 356
  }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
