import { Types } from "mongoose";
import { hashSync } from "bcrypt";

type TUserTestData = {
  _id: Types.ObjectId,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
};

export const usersTestData: TUserTestData[] = [
  {
    _id: new Types.ObjectId("65de0ba57e31f6d8d068640d"),
    email: "testuser@gmail.com",
    password: hashSync("123123", 10),
    firstName: "John",
    lastName: "Doe",
  },
  {
    _id: new Types.ObjectId("65de0ba57e31f6d8d0686412"),
    email: "testuse2r@gmail.com",
    password: hashSync("123123", 10),
    firstName: "John2",
    lastName: "Doe2",
  },
  {
    _id: new Types.ObjectId("65de0ba57e31f6d8d0686416"),
    email: "testuser3@gmail.com",
    password: hashSync("123123", 10),
    firstName: "Some name",
    lastName: "LastName",
  },
  {
    _id: new Types.ObjectId("667c7b554f876077de21b0a9"),
    email: "testuse4r@gmail.com",
    password: hashSync("123123", 10),
    firstName: "OtherName",
    lastName: "UserLastName",
  },
];
