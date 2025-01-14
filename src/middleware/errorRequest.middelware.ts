import logger from "@utils/logger.ts";
import { type Request, type Response, type NextFunction } from "express";
import { ApiError } from "src/exceptions/api.error.ts";

async function errorRequestMiddelware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(error.message);

  if (error instanceof ApiError) {
    return res.status(error.status).json({ error: error.message });
  }

  return res.status(500).json({ error: "Internal Server Error" });
}

export default errorRequestMiddelware;
