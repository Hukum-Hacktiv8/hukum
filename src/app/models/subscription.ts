import { ObjectId } from "mongodb";
import { getDb } from "./user";

export type InputSubscription = {
  userId: string;
  type: string;
  status: string;
};

export type InputSubscriptionRegister = {
  userId: string;
  type: string;
};

const COLLECTION = "subscriptions";

export const createSubsFirstRegister = async (body: InputSubscriptionRegister) => {
  const db = await getDb();

  const bodyInput = {
    ...body,
    userId: new ObjectId(body.userId),
    startDate: null,
    endDate: null,
    status: "expired",
  };

  const response = await db.collection(COLLECTION).insertOne(bodyInput);

  return response;
};

export const checkSubs = async (id: string) => {
  const db = await getDb();

  const response = await db.collection(COLLECTION).findOne({ userId: new ObjectId(id) });

  return response;
};

export const createSubs = async (body: InputSubscription) => {
  const db = await getDb();

  const Subs = await checkSubs(body.userId);

  if (!Subs) {
    throw `Not Found User`;
  }

  Subs.startDate = new Date().toISOString();
  Subs.updatedAt = new Date().toISOString();
  Subs.status = "active";
  Subs.type = "premium";

  const response = await db.collection(COLLECTION).updateOne({ userId: new ObjectId(body.userId) }, Subs);

  return response;
};

export async function extractObjectIdString(input: any) {
  // Jika input adalah object dengan toString method (ObjectId)
  if (typeof input === "object" && input !== null) {
    return input.toString();
  }

  // Jika input sudah berupa string
  if (typeof input === "string") {
    return input;
  }

  return null;
}
