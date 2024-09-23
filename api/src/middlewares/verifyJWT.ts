import { NextFunction, Response } from "express";

import { STATUS_CODES } from "../const";
import { handleApiError, verifyAccessToken } from "../helpers";
import { Users } from "../models";
import { logger } from "../utils";

export const verifyJWT = async (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      logger.warn("No auth header provided");

      req.user = null;
      return next();
    }

    const token = authHeader.split(" ")[1];
    let decoded;

    try {
      decoded = await verifyAccessToken(token);
    } catch (err) {
      return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: "Authorization is required" });
    }

    const { userId, email } = decoded;

    req.user = await Users.findOne({ _id: userId, email, deleted: false }, { password: 0 });

    next();
  } catch (err) {
    if (err instanceof Error) {
      return handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, { err: err.toString() });
    }
  }
};
