"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
exports.testRouter = express_1.default.Router();
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
exports.testRouter.all("/", controllers_1.testController);
