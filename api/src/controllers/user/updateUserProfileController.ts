import { Response } from "express";
import mongoose, { Types } from 'mongoose';

import { RequestWithUserData } from "../../types";
import { handleApiError, validateByRules } from "../../helpers";
import { STATUS_CODES, VALIDATOR_RULES } from "../../const";
import { Users, UserDetails, Countries } from '../../models';
import { getUserProfileDetails } from "./helpers";

export const updateUserProfileController = async (req: RequestWithUserData, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      user,
      body,
      body: {
        countryId,
        firstName,
        lastName,
        middleName,
        address,
        extraInfo,
      }
    } = req;

    const userRecordUpdates = {};
    const userDetailsUpdates = {};

    const isDataValid = await validateByRules(body ,{
      firstName: VALIDATOR_RULES.optionalName,
      lastName: VALIDATOR_RULES.optionalName,
      middleName: VALIDATOR_RULES.optionalName,
      address: VALIDATOR_RULES.address,
      extraInfo: VALIDATOR_RULES.extraInfo,
    });

    if (!isDataValid || (countryId && !Types.ObjectId.isValid(countryId))) {
      return handleApiError(res, STATUS_CODES.UNPROCESSABLE_ENTITY, { err: "Invalid input data" });
    }

    firstName && Object.assign(userRecordUpdates, { firstName });
    lastName && Object.assign(userRecordUpdates, { lastName });
    middleName && Object.assign(userRecordUpdates, { middleName });

    if (Object.keys(userRecordUpdates).length) {
      await Users.updateOne({ _id: user._id }, userRecordUpdates, { session })
    }

    if (countryId) {
      const countryData = await Countries.findOne({ _id: new Types.ObjectId(countryId) })

      if (!countryData) {
        return handleApiError(res, STATUS_CODES.UNPROCESSABLE_ENTITY, { err: "Invalid countryId provided" });
      }

      Object.assign(userDetailsUpdates, { country: countryData._id });
    }

    address && Object.assign(userDetailsUpdates, { address });
    extraInfo && Object.assign(userDetailsUpdates, { extraInfo });

    if (Object.keys(userDetailsUpdates).length) {
      await UserDetails.updateOne({ user: user._id }, userDetailsUpdates, { session });
    }

    await session.commitTransaction();

    const userProfileData = await getUserProfileDetails(user._id);

    return res.json(userProfileData);
  } catch (err) {
    await session.abortTransaction();
    if (err instanceof Error) {
      handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, { err: err.toString() });
    }
  } finally {
    session.endSession();
  }
}
