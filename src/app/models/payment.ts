import { ObjectId } from "mongodb";
import { getDb } from "./user";

export type InputPayments = {
  userId: string;
  amount: number;
  paymentType: string;
  status: string;
};

const COLLECTION = "payments";

export const createPayment = async (body: InputPayments) => {
  const db = await getDb();
  const bodyInput = {
    ...body,
    transactionDate: new Date().toISOString(),
  };

  const response = await db.collection(COLLECTION).insertOne(bodyInput);

  return response;
};

export const readPayment = async (id: string) => {
  const db = await getDb();

  const response = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });

  return response;
};
