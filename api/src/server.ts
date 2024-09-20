import express from "express";
import cors from "cors";

import { httpLogger } from './middlewares';
import { logger, initSwaggerDocs } from './utils';

import {
  testRouter,
  authRouter,
} from './routers';

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors({ origin: process.env.CLIENT_DOMAIN }));
app.use(httpLogger);
app.use(express.json());

app.use('/test', testRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);

  initSwaggerDocs(app, port);
});