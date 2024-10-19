import type { TEmailProviders } from "../types/TEmail";

const EmailDomains: { [key in TEmailProviders]: string[] } = {
  gmail: ["@gmail.com"],
  outlook: ["@outlook.com", "@hotmail.com", "@live.com"],
  yahoo: ["@yahoo.com", "@yahoo.co.uk", "@ymail.com"],
  iCloud: ["@icloud.com"],
  protonMail: ["@protonmail.com", "@protonmail.ch"],
  yandex: ["@yandex.ru", "@yandex.com", "@ya.ru"],
  mailru: ["@mail.ru", "@bk.ru", "@list.ru", "@inbox.ru"],
  aol: ["@aol.com"]
};

const RedirectEmail: { [key in TEmailProviders]: string } = {
  gmail: "https://mail.google.com",
  outlook: "https://outlook.live.com/owa",
  yahoo: "https://mail.yahoo.com",
  iCloud: "https://www.icloud.com/mail",
  protonMail: "https://protonmail.com/login",
  yandex: "https://mail.yandex.ru",
  mailru: "https://e.mail.ru/",
  aol: "https://mail.aol.com/"
};

function getEmailProviders(email: string): { redirectURL: string; name: TEmailProviders } | null {
  for (const [key, value] of Object.entries(EmailDomains)) {
    const isInclude = value.some((domain: string) => email.endsWith(domain));
    if (isInclude) {
      return { redirectURL: RedirectEmail[key as TEmailProviders], name: key as TEmailProviders };
    }
  }

  return null;
}

export { getEmailProviders };
