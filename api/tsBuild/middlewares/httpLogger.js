"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = void 0;
const morgan_1 = __importDefault(require("morgan"));
const utils_1 = require("../utils");
exports.httpLogger = (0, morgan_1.default)(":method :url :status :response-time ms - :res[content-length]", {
    stream: {
        write: (message) => utils_1.logger.info(message.substring(0, message.lastIndexOf("\n"))),
    },
});
