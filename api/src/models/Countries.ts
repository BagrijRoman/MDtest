import { Schema, model } from "mongoose";

import { MODEL_DB_NAMES } from "../const";

const CountrySchema = new Schema(
  {
    name: { type: String, required: true },
    phoneCode: { type: String, required: true },
    ISOCode: { type: String, required: true },
    deleted: { type: Boolean, default: false, required: false },
  },
  { timestamps: true },
);

export const Countries = model(MODEL_DB_NAMES.COUNTRIES, CountrySchema);