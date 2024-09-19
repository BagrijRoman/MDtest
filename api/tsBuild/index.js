"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("./utils");
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL;
if (MONGO_URL) {
    mongoose_1.default.connect(MONGO_URL)
        .then((mongooseInst) => {
        utils_1.logger.info(`Connected to Mongo Database. DB name: ${mongooseInst.connections[0].name}`);
    })
        .catch((err) => utils_1.logger.error(`Mongo connection error: ${err.toString()}`));
}
else {
    utils_1.logger.error("No mongo URL provided");
}
require("./server");
