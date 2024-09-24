import express from "express";

import { ExpressMiddlewareFnType } from "../types";
import { requireAuth } from "../middlewares";
import {
  getUserProfileController,
  updateUserProfileController,
} from "../controllers";

export const userRouter = express.Router();

userRouter.use(requireAuth as ExpressMiddlewareFnType);

/**
 * @openapi
 * '/user/profile':
 *   get:
 *     tags:
 *       - UserProfile
 *     summary: Get user profile data
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


userRouter.get('/profile', getUserProfileController as ExpressMiddlewareFnType);

/**
 * @openapi
 * '/user/profile':
 *   patch:
 *     tags:
 *       - UserProfile
 *     summary: Update user profile data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               countryId:
 *                 type: string
 *               firstName:
 *                 type: string
 *               middleName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               address:
 *                 type: string
 *               extraInfo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ok
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: User have no permissions
 *       422:
 *         description: Invalid input data provided
 *       500:
 *         description: Internal server error
 * */

userRouter.patch('/profile', updateUserProfileController as ExpressMiddlewareFnType);
