import express from "express";

import {
  getUserProfileController,
  updateUserProfileController,
} from "../controllers";
import { ExpressMiddlewareFnType } from "../types";

export const userRouter = express.Router();

userRouter.get('/profile', getUserProfileController as ExpressMiddlewareFnType);

userRouter.post('/profile', updateUserProfileController as ExpressMiddlewareFnType);