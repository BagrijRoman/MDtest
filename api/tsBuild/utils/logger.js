"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston_1.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`), winston_1.format.json()),
    transports: [
        new winston_1.transports.File({
            filename: "./logs/all-logs.log",
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston_1.transports.Console(),
    ],
});
exports.logger = logger;
