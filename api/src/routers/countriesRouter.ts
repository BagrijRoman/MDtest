import express from "express";

import { requireAuth } from "../middlewares";
import { getCountriesListController } from "../controllers";
import { ExpressMiddlewareFnType } from "../types";

export const countriesRouter = express.Router();

countriesRouter.use(requireAuth as ExpressMiddlewareFnType);

/**
 * @openapi
 * '/countries':
 *   get:
 *     tags:
 *       - Countries
 *     summary: Get countries list paginated
 *     responses:
 *       200:
 *         description: Ok
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: User have no permissions
 *       500:
 *         description: Internal server error
 * */

countriesRouter.get("/", getCountriesListController as ExpressMiddlewareFnType);
