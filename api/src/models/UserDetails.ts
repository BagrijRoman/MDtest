import { Schema, model } from 'mongoose';

import { MODEL_DB_NAMES } from '../const';

const userDetailSchema = new Schema({
  user: { type: Schema.ObjectId, required: true, unique: true, ref: MODEL_DB_NAMES.USERS },

  country: { type: Schema.Types.ObjectId, ref: MODEL_DB_NAMES.COUNTRIES },
  address: { type: Schema.Types.String, required: false },
  extraInfo: { type: Schema.Types.String, required: false },
}, {
  timestamps: true,
});

export const UserDetails = model(MODEL_DB_NAMES.USER_DETAILS, userDetailSchema);
