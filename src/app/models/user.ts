import { Db } from "mongodb";
import { connectToDatabase } from "../config/config";
import { hashPass } from "../utils/bcrypt";

export type Profile = {
  address: string;
  birth: string;
};
export type CredentialLawyer = {
  education: string[];
  certification: string;
};
export type InputUser = {
  name: string;
  email: string;
  password: string;
  role: string;
  profile: Profile;
};

export type InputLawyer = {
  name: string;
  email: string;
  password: string;
  role: string;
  profile: Profile;
  specialization: string;
  credentials: CredentialLawyer;
};
const DATABASE_NAME = "hacktivist";
const COLLECTION = "users";
const COLLECTION2 = "lawyers";

export const getDb = async () => {
  const client = await connectToDatabase();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

export const registerUser = async (body: InputUser) => {
  const db = await getDb();
  body.password = await hashPass(body.password);
  const bodyInput = {
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const result = await db.collection(COLLECTION).insertOne(bodyInput);

  return result;
};

export const registerLawyer = async (body: InputLawyer) => {
  const db = await getDb();
  body.password = await hashPass(body.password);
  const bodyInput = {
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const result = await db.collection(COLLECTION2).insertOne(bodyInput);

  return result;
};

export const getUserByEmail = async (email: string) => {
  //ini dipakai saat login
  const db = await getDb();

  const result = db.collection(COLLECTION).findOne({ email });

  return result;
};
