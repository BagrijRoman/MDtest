import express from 'express';

import { requireAuth } from '../middlewares'
import { getCountriesListController } from '../controllers';
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
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           min: 0
 *           default: 0
 *         description: The number of items to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           min: 1
 *           max: 100
 *           default: 20
 *         description: The number of items to return per page
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

countriesRouter.get('/', getCountriesListController as ExpressMiddlewareFnType);
