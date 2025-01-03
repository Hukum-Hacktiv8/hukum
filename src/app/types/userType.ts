import { ObjectId } from "mongodb";

export type Profile = {
  address: string;
  birth: string;
};

export type UserModel = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  profile: Profile;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
};
