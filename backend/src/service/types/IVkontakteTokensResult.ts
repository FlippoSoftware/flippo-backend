import { type ITokensResult } from "./ITokensResult.ts";

interface IVkontakteTokensResult extends ITokensResult {
  id_token: string;
  user_id: string;
}

export type { IVkontakteTokensResult };
