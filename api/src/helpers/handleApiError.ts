import { Response } from "express";

import { logger } from "../utils";

export const handleApiError = (res: Response, status: number, data: { err?: string, status?: string, data?: any  } = {}) => {
  logger.error(`Api error. Info:  ${ data.err }`);

  res.status(status);
  res.json({ data });
};
