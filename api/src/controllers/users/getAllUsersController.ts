import { Request, Response } from "express";

import { logger } from "../../utils";
import { UserDetails } from '../../models';
import { handleApiError } from "../../helpers";
import { STATUS_CODES } from "../../const";

const getUsersData = async () => {
  try {
    return UserDetails
      .find()
      .populate({
        path: "user",
        select: ["email", "firstName", "middleName", "lastName", "createdAt", "updatedAt"],
      });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`getUserProfileDetails error: ${err.toString()}`);
      throw err;
    }
  }
}

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const usersData = await getUsersData();

    return res.json({ data: usersData });
  } catch (err) {
    if (err instanceof Error) {
      handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, { err: err.toString() });
    }
  }
};
