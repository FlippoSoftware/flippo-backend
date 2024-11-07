import type { TEmailProviderNames } from "../types/TEmailProviderNames";

const EmailDomains: { [key in TEmailProviderNames]: string[] } = {
  gmail: ["@gmail.com"],
  outlook: ["@outlook.com", "@hotmail.com", "@live.com"],
  yahoo: ["@yahoo.com", "@yahoo.co.uk", "@ymail.com"],
  iCloud: ["@icloud.com"],
  protonMail: ["@protonmail.com", "@protonmail.ch"],
  yandex: ["@yandex.ru", "@yandex.com", "@ya.ru"],
  mailru: ["@mail.ru", "@bk.ru", "@list.ru", "@inbox.ru"],
  aol: ["@aol.com"]
};

const RedirectEmail: { [key in TEmailProviderNames]: string } = {
  gmail: "https://mail.google.com",
  outlook: "https://outlook.live.com/owa",
  yahoo: "https://mail.yahoo.com",
  iCloud: "https://www.icloud.com/mail",
  protonMail: "https://protonmail.com/login",
  yandex: "https://mail.yandex.ru",
  mailru: "https://e.mail.ru/",
  aol: "https://mail.aol.com/"
};

export type TEmailProvider = { redirectURL: string; name: TEmailProviderNames };

export function getEmailProvider(email: string): TEmailProvider | null {
  for (const [key, value] of Object.entries(EmailDomains)) {
    const isInclude = value.some((domain: string) => email.endsWith(domain));
    if (isInclude) {
      return {
        redirectURL: RedirectEmail[key as TEmailProviderNames],
        name: key as TEmailProviderNames
      };
    }
  }

  return null;
}
