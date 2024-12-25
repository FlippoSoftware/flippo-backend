import { type Request, type Response, type NextFunction } from "express";
import { ApiError } from "src/exceptions/api.error.ts";
import logger from "@utils/logger.ts";
import { ENV } from "@schemas/index.ts";

async function errorOauthMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(error.message);

  if (error instanceof ApiError) {
    return res.redirect(`${ENV.APP_REDIRECT_URL}?error=${error.status}`);
  }

  return res.redirect(`${ENV.APP_REDIRECT_URL}?error=500`);
}

export default errorOauthMiddleware;
