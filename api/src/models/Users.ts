import { Schema, model } from "mongoose";

import { MODEL_DB_NAMES } from "../const";

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String },

    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },

    country: { type: Schema.Types.ObjectId, ref: MODEL_DB_NAMES.COUNTRIES },

    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Users = model(MODEL_DB_NAMES.USERS, UserSchema);
