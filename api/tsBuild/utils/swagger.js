"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSwaggerDocs = void 0;
const path_1 = __importDefault(require("path"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MD test API docs",
            version: "0.0.1",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        path_1.default.join(__dirname, "/../routers/*.js"),
        path_1.default.join(__dirname, "/../models/*.js"),
        path_1.default.join(__dirname, "/../controllers/*.js"),
        path_1.default.join(__dirname, "/../routers/*/*.js"),
        path_1.default.join(__dirname, "/../models/*/*.js"),
        path_1.default.join(__dirname, "/../controllers/*/*.js"),
        path_1.default.join(__dirname, "/../routers/*.ts"),
        path_1.default.join(__dirname, "/../models/*.ts"),
        path_1.default.join(__dirname, "/../controllers/*.ts"),
        path_1.default.join(__dirname, "/../routers/*/*.ts"),
        path_1.default.join(__dirname, "/../models/*/*.ts"),
        path_1.default.join(__dirname, "/../controllers/*/*.ts"),
    ],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
const initSwaggerDocs = (app, port) => {
    // Swagger page
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    // Json docs
    app.get("docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(`Docs available at http://localhost:${port}/docs`);
};
exports.initSwaggerDocs = initSwaggerDocs;
