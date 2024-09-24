import { Types } from "mongoose";

type TUserDetailsData = {
  _id: Types.ObjectId,
  user: Types.ObjectId,
  country: Types.ObjectId,
  address: string,
  extraInfo: string,
};

export const userDetailsData: TUserDetailsData[] = [
  {
    _id: new Types.ObjectId("65d4aa4372016fa8f1d9ce31"),
    user: new Types.ObjectId("65de0ba57e31f6d8d068640d"),
    country: new Types.ObjectId("65017fb2f10cef1c0c0fe1d3"),
    address: "Some street, 12",
    extraInfo: "Some extra user info",
  },
  {
    _id: new Types.ObjectId("65d4aa4372016fa8f1d9ce38"),
    user: new Types.ObjectId("65de0ba57e31f6d8d0686412"),
    country: new Types.ObjectId("65017fb2f10cef1c0c0fe1d3"),
    address: "Some street, 12",
    extraInfo: "Some extra user info",
  },
  {
    _id: new Types.ObjectId("65d4aa4372016fa8f1d9ce7a"),
    user: new Types.ObjectId("65de0ba57e31f6d8d0686416"),
    country: new Types.ObjectId("65d4a99c3a307a6d121cda3f"),
    address: "Some street, 12",
    extraInfo: "Some extra user info",
  },
  {
    _id: new Types.ObjectId("65d4aa4372016fa8f1d9ce95"),
    user: new Types.ObjectId("667c7b554f876077de21b0a9"),
    country: new Types.ObjectId("65d4aa4372016fa8f1d9ce36"),
    address: "Some street, 12",
    extraInfo: "Some extra user info",
  },
];
