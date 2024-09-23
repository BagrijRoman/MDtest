import express from "express";

import { loginController, refreshTokensController } from '../controllers';
import { ExpressMiddlewareFnType } from '../types';

export const authRouter = express.Router();

/**
 * @openapi
 * '/auth/login':
 *  post:
 *    tags:
 *      - Auth
 *    summary: Login user with credentials
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: testuser@gmail.com
 *              password:
 *                type: string
 *                default: 123123
 *    responses:
 *      200:
 *        description: OK
 *      403:
 *        description: Already logged in
 *      422:
 *        description: Invalid auth data provided
 *      500:
 *        description: Internal server error
 * */

authRouter.post("/login", loginController as ExpressMiddlewareFnType);

/**
 * @openapi
 * '/auth/refresh':
 *    post:
 *      tags:
 *        - Auth
 *      summary: Refresh user tokens
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - refreshToken
 *              properties:
 *                refreshToken:
 *                  type: string
 *                  default: refresh_token_value
 *      responses:
 *        200:
 *          description: Ok
 *        401:
 *          description: Invalid refresh token provided
 *        500:
 *          description: Internal server error
 * */

authRouter.post("/refresh", refreshTokensController as ExpressMiddlewareFnType);
