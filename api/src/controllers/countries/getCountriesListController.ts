import { Request, Response } from "express";

import { Countries } from '../../models';
import { handleApiError, validateByRules } from "../../helpers";
import { STATUS_CODES, VALIDATOR_RULES } from '../../const';

export const getCountriesListController = async (req: Request, res: Response) => {
  try {
    const {
      query: { offset, limit },
    } = req;

    const isDataValid = await validateByRules({ offset, limit }, {
      offset: VALIDATOR_RULES.offset,
      limit: VALIDATOR_RULES.limit,
    });

    if (!isDataValid) {
      return handleApiError(res, STATUS_CODES.UNPROCESSABLE_ENTITY, { err: "Invalid input data" });
    }

    const dbQuery = { deleted: false };

    const countriesData = await Countries
      .find(dbQuery)
      .skip(Number(offset))
      .limit(Number(limit));

    const existingRecordsCount = await Countries.countDocuments(dbQuery);

    return res.json({
      list: countriesData,
      totalCount: existingRecordsCount,
      offset: Number(offset),
      limit: Number(limit),
    });
  } catch (err) {
    if (err instanceof Error) {
      handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, {
        err: `Get countries list error.  ${ err.toString() }`,
      });
    }
  }
};
