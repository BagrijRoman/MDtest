export interface IUserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

interface ICountry {
  name: string;
  ISOCode: string;
}

export interface IUser {
  _id: string;
  user: IUserDetails;
  country: ICountry;
}
