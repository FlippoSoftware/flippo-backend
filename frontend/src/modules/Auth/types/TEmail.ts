const EmailProviders = [
  "gmail",
  "outlook",
  "yahoo",
  "iCloud",
  "protonMail",
  "mailru",
  "yandex",
  "aol"
] as const;
type TEmailProviders = (typeof EmailProviders)[number];

export { type TEmailProviders };
