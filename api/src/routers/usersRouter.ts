import express from "express";

import { ExpressMiddlewareFnType } from "../types";
import { requireAuth } from "../middlewares";
import {
  getAllUsersController,
  getUserController,
} from "../controllers";

export const usersRouter = express.Router();

usersRouter.use(requireAuth as ExpressMiddlewareFnType);

/**
 * @openapi
 * /users/all:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users data
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


usersRouter.get('/all', getAllUsersController as ExpressMiddlewareFnType);

/**
 * @openapi
 * /users/:id:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by id
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


usersRouter.get('/:id', getUserController as ExpressMiddlewareFnType);
