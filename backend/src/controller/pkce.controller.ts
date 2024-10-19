import { type Request, type Response, type NextFunction } from "express";
import pkceChallenge from "pkce-challenge";

import { codeVerifierCookieOptions } from "./constant/cookieOption.ts";

class PkceController {
  static async generatePkce(req: Request, res: Response, next: NextFunction) {
    try {
      const { code_verifier: codeVerifier, code_challenge: codeChallenge } =
        await pkceChallenge(64);

      res.cookie("codeVerifier", encodeURIComponent(codeVerifier), codeVerifierCookieOptions);

      res.status(200).json({ codeChallenge });
    } catch (error: any) {
      return next(error);
    }
  }
}

export { PkceController };
