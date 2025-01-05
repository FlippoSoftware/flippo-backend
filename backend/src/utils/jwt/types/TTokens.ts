type TTokens = { accessToken: string; refreshToken: string };
type TAllTokens = TTokens & { dbToken: string };

export type { TTokens, TAllTokens };
