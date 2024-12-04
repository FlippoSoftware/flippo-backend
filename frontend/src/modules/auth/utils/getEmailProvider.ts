import type { TEmailProviderNames } from '../types/TEmailProviderNames';

const EmailDomains: { [key in TEmailProviderNames]: string[] } = {
  aol: ['@aol.com'],
  gmail: ['@gmail.com'],
  iCloud: ['@icloud.com'],
  mailru: ['@mail.ru', '@bk.ru', '@list.ru', '@inbox.ru'],
  outlook: ['@outlook.com', '@hotmail.com', '@live.com'],
  protonMail: ['@protonmail.com', '@protonmail.ch'],
  yahoo: ['@yahoo.com', '@yahoo.co.uk', '@ymail.com'],
  yandex: ['@yandex.ru', '@yandex.com', '@ya.ru']
};

const RedirectEmail: { [key in TEmailProviderNames]: string } = {
  aol: 'https://mail.aol.com/',
  gmail: 'https://mail.google.com',
  iCloud: 'https://www.icloud.com/mail',
  mailru: 'https://e.mail.ru/',
  outlook: 'https://outlook.live.com/owa',
  protonMail: 'https://protonmail.com/login',
  yahoo: 'https://mail.yahoo.com',
  yandex: 'https://mail.yandex.ru'
};

export type TEmailProvider = { name: TEmailProviderNames; redirectURL: string };

export function getEmailProvider(email: string): null | TEmailProvider {
  for (const [key, value] of Object.entries(EmailDomains)) {
    const isInclude = value.some((domain: string) => email.endsWith(domain));
    if (isInclude) {
      return {
        name: key as TEmailProviderNames,
        redirectURL: RedirectEmail[key as TEmailProviderNames]
      };
    }
  }

  return null;
}
