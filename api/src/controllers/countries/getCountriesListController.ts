import { Request, Response } from "express";

import { Countries } from '../../models';
import { handleApiError } from "../../helpers";
import { STATUS_CODES } from '../../const';

export const getCountriesListController = async (req: Request, res: Response) => {
  try {
    const countriesData = await Countries.find({ deleted: false })

    return res.json(countriesData);
  } catch (err) {
    if (err instanceof Error) {
      handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, {
        err: `Get countries list error.  ${ err.toString() }`,
      });
    }
  }
};
