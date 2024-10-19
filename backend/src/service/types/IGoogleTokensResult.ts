import { type ITokensResult } from "./ITokensResult.ts";

interface IGoogleTokensResult extends ITokensResult {
  id_token: string;
}

export type { IGoogleTokensResult };
