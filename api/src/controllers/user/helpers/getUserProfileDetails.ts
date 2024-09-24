import { Types } from "mongoose";

import { logger } from "../../../utils";
import { UserDetails } from "../../../models";

export const getUserProfileDetails = async (userId: Types.ObjectId ) => {
  try {
    return UserDetails
      .findOne({ user: userId })
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
