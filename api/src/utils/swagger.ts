import { Express, Request, Response } from "express";
import path from "path";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
    path.join(__dirname, "/../routers/*.js"),
    path.join(__dirname, "/../models/*.js"),
    path.join(__dirname, "/../controllers/*.js"),
    path.join(__dirname, "/../routers/*/*.js"),
    path.join(__dirname, "/../models/*/*.js"),
    path.join(__dirname, "/../controllers/*/*.js"),
    path.join(__dirname, "/../routers/*.ts"),
    path.join(__dirname, "/../models/*.ts"),
    path.join(__dirname, "/../controllers/*.ts"),
    path.join(__dirname, "/../routers/*/*.ts"),
    path.join(__dirname, "/../models/*/*.ts"),
    path.join(__dirname, "/../controllers/*/*.ts"),
  ],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export const initSwaggerDocs = (app: Express, port: number) => {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Json docs
  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/docs`);
};
