import express from "express";
import cors from "cors";
import helmet from "helmet";

import { httpLogger, verifyJWT } from './middlewares';
import { logger, initSwaggerDocs } from './utils';

import {
  testRouter,
  authRouter,
  countriesRouter,
  userRouter,
  usersRouter,
} from './routers';

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors({ origin: process.env.CLIENT_DOMAIN }));
app.use(helmet());
app.use(express.json());

app.use(httpLogger);
app.use(verifyJWT);

app.use('/test', testRouter);
app.use('/auth', authRouter);
app.use('/countries', countriesRouter);
app.use('/user', userRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);

  initSwaggerDocs(app, port);
});