import dotenv from 'dotenv';
import mongoose, { Mongoose } from 'mongoose';

import { logger } from './utils';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

if (MONGO_URL) {
  mongoose.connect(MONGO_URL)
    .then((mongooseInst: Mongoose) => {
      logger.info(`Connected to Mongo Database. DB name: ${mongooseInst.connections[0].name}`)
    })
    .catch((err) => logger.error(`Mongo connection error: ${err.toString()}`));
} else {
  logger.error("No mongo URL provided");
}

import './server';