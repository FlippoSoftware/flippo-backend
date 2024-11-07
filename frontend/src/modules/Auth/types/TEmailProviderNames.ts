export const EmailProviderNames = [
  "gmail",
  "outlook",
  "yahoo",
  "iCloud",
  "protonMail",
  "mailru",
  "yandex",
  "aol"
] as const;
export type TEmailProviderNames = (typeof EmailProviderNames)[number];
