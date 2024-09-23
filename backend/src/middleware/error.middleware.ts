import { Request, Response, NextFunction } from "express";
import { ApiError } from "src/exceptions/api.error.ts";
import logger from "@utils/logger.ts";

function error(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(err.message);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: "Unexpected error." });
}

export default error;
