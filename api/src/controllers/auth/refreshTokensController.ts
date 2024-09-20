import { Response } from "express";

import { STATUS_CODES } from "../../const";
import { handleApiError, generateTokens, verifyRefreshToken } from "../../helpers";
import { Users } from "../../models";
import { RequestWithUserData } from "../../types";

export const refreshTokensController = async (req: RequestWithUserData, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: "Authorization is required" });
    }

    let decoded;

    try {
      decoded = await verifyRefreshToken(refreshToken);
    } catch (err) {
      return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: "Authorization is required" });
    }

    const { userId, email } = decoded;
    const userRecord = await Users.findOne(
      { _id: userId, email, deleted: false },
      { password: 0 },
    );

    if (!userRecord) {
      return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: "User not found" });
    }

    const updatedTokens = generateTokens({ userId: userRecord._id, email });

    return res.status(STATUS_CODES.OK).json({
      status: "OK",
      user: userRecord,
      ...updatedTokens,
    });
  } catch (err) {
    if (err instanceof Error) {
      handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, {
        err: `Refresh tokens error.  ${err.toString()}`,
      });
    }
  }
};
