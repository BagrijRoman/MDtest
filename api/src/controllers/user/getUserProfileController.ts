import { Response } from "express";

import { RequestWithUserData } from "../../types";
import { handleApiError } from "../../helpers";
import { STATUS_CODES } from "../../const";
import { getUserProfileDetails } from './helpers';

export const getUserProfileController = async (req: RequestWithUserData, res: Response) => {
  try {
    const { user } = req;

    const userProfile = await getUserProfileDetails(user._id);

    return res.json(userProfile);
  } catch (err) {
    if (err instanceof Error) {
      handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, { err: err.toString() });
    }
  }
};
