const EmailProviderNames = [
  "gmail",
  "outlook",
  "yahoo",
  "iCloud",
  "protonMail",
  "mailru",
  "yandex",
  "aol"
] as const;
type TEmailProviderNames = (typeof EmailProviderNames)[number];

export { type TEmailProviderNames };
