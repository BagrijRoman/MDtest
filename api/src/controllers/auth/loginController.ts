import bcrypt from "bcrypt";
import { Response } from "express";

import { STATUS_CODES, VALIDATOR_RULES } from "../../const";
import {
  handleApiError,
  validateByRules,
  generateTokens,
} from "../../helpers";
import { Users } from "../../models";
import { RequestWithUserData } from "../../types";
import { logger } from "../../utils";

export const loginController = async (req: RequestWithUserData, res: Response) => {
  try {
    if (req.user) {
      return handleApiError(res, STATUS_CODES.FORBIDDEN, { err: "User already logged in" });
    }

    const isDataValid = await validateByRules(req.body, {
      email: VALIDATOR_RULES.email,
      password: VALIDATOR_RULES.password,
    });

    if (!isDataValid) {
      return handleApiError(res, STATUS_CODES.UNPROCESSABLE_ENTITY, { err: "Invalid input data" });
    }

    const { email, password } = req.body;
    const userData = await Users.findOne({ email, deleted: false })
      .lean();

    if (!userData || !userData.password) {
      return handleApiError(res, STATUS_CODES.UNPROCESSABLE_ENTITY, { err: "Invalid credentials" });
    }

    const { password: DbPassword, ...restUserData } = userData;
    const match = await bcrypt.compare(password, DbPassword);

    if (!match) {
      return handleApiError(res, STATUS_CODES.UNPROCESSABLE_ENTITY, { err: "Invalid credentials" });
    }

    const tokens = generateTokens({ userId: restUserData._id, email });

    return res.status(STATUS_CODES.OK).json({
      ...tokens,
      user: restUserData,
    });
  } catch (err) {
    if (err instanceof Error) {
      handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, { err: err.toString() });
    }
  }
};
