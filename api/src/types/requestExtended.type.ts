import { Request } from "express";
import { Types } from "mongoose";

export interface RequestUserData {
  _id: Types.ObjectId;
}

export interface RequestWithUserData extends Request {
  user: RequestUserData;
}

export interface RequestWithOptionalUserData extends Request {
  user: RequestUserData | null;
}
