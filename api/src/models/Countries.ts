import { Schema, model } from "mongoose";

import { MODEL_DB_NAMES } from "../const";

const CountrySchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    ISOCode: { type: String, required: true },
  },
  { timestamps: true },
);

export const Countries = model(MODEL_DB_NAMES.COUNTRIES, CountrySchema);