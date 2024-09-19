"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const middlewares_1 = require("./middlewares");
const utils_1 = require("./utils");
const routers_1 = require("./routers");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 4000);
app.use((0, cors_1.default)({ origin: process.env.CLIENT_DOMAIN }));
app.use(middlewares_1.httpLogger);
app.use(express_1.default.json());
app.use('/test', routers_1.testRouter);
app.listen(port, () => {
    utils_1.logger.info(`Listening on port ${port}`);
    (0, utils_1.initSwaggerDocs)(app, port);
});
