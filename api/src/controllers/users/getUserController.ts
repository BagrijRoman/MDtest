import { Request, Response } from "express";
import { Types } from "mongoose";

import { logger } from "../../utils";
import { UserDetails } from "../../models";
import { handleApiError } from "../../helpers";
import { STATUS_CODES } from "../../const";
import { getUserProfileDetails } from "../user/helpers";

export const getUsersData = async () => {
  try {
    return UserDetails
      .find()
      .populate({
        path: "user",
        select: ["email", "firstName", "middleName", "lastName", "createdAt", "updatedAt"],
      })
      .populate({
        path: "country",
        select: ["name", "phoneCode", "ISOCode", "deleted", "createdAt", "updatedAt"],
      });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`getUserProfileDetails error: ${err.toString()}`);
      throw err;
    }
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.params.id);
    const userData = await getUserProfileDetails(userId);

    return res.json({ data: userData });
  } catch (err) {
    if (err instanceof Error) {
      handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, { err: err.toString() });
    }
  }
};
