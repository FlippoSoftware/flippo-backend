interface IGoogleTokensResult {
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: Number;
  scope: string;
  refresh_token: string;
}

export { IGoogleTokensResult };
