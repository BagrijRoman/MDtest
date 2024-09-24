import express from "express";

import { testController } from "../controllers";

export const testRouter = express.Router();

/**
 * @openapi
 * /test:
 *   get:
 *     tags:
 *       - Test
 *     description: Responds "OK" if app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 * */

testRouter.all("/", testController);
