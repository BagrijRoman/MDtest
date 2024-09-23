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

userRouter.post('/profile', updateUserProfileController as ExpressMiddlewareFnType);
