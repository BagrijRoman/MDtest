import mongoose, { Mongoose, Model, Types } from 'mongoose';
// @ts-ignore
import dotenv from 'dotenv';

import { logger } from '../src/utils';

import { countriesTestData } from './countries';
import { usersTestData } from './users';
import { userDetailsData } from './userDetails';
import { Users, UserDetails, Countries } from '../src/models';

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const initCollectionData = async (collection: Model<any>, initialData: { _id: Types.ObjectId }[]) => {
  try {
    if (!initialData.length) {
      return;
    }

    console.log('collection ', collection);

    const existingRecordsCount = await collection.countDocuments({});
    const docsToAdd = [];

    if (!existingRecordsCount) {
      docsToAdd.push(...initialData);
    } else {
      for (let i = 0; i < initialData.length; i++) {
        const recordToAdd: { _id: Types.ObjectId  } = initialData[i];
        const existingRecord = await collection.findOne({ _id: recordToAdd._id });

        if (!existingRecord) {
          docsToAdd.push(recordToAdd);
        }
      }
    }

    if (docsToAdd.length) {
      await collection.insertMany(docsToAdd);
    }
  } catch (err) {
    logger.error(`Init collection data error: ${collection}.  Details: ${err.toString()} `);
  }
}

if (MONGO_URL) {
  mongoose.connect(MONGO_URL)
    .then(async (mongooseInst: Mongoose) => {
      logger.info(`Connected to Mongo Database. DB name: ${mongooseInst.connections[0].name}`)

      await initCollectionData(Users, usersTestData);
      await initCollectionData(UserDetails, userDetailsData);
      await initCollectionData(Countries, countriesTestData);

      logger.info('Data init finished');
    })
    .catch((err) => logger.error(`Mongo connection error: ${err.toString()}`));
} else {
  logger.error("No mongo URL provided");
}