import { NextFunction, Response } from "express";

import { STATUS_CODES } from "../const";
import { handleApiError } from "../helpers";
import { RequestWithOptionalUserData } from "../types";

export const requireAuth = (
  req: RequestWithOptionalUserData,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const { user } = req;

  if (!authHeader || !user) {
    return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: "Authorization is required" });
  }

  return next();
};
