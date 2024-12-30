import { Db, ObjectId } from "mongodb";
import { connectToDatabase } from "../config/config";

export type Message = {
  _id: ObjectId;
  senderId: ObjectId;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type RoomChat = {
  _id: ObjectId;
  participants: string[];
  createdAt: string;
  messages: Message[];
};

export type InputRoomChat = {
  participants: string[];
};

export type InputMessage = {
  senderId: string;
  content: string;
};
const DATABASE_NAME = "hacktivist";
const COLLECTION = "chatrooms";

export const getDb = async () => {
  const client = await connectToDatabase();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

export const createRoom = async (participants: InputRoomChat) => {
  const db = await getDb();
  const bodyInput = {
    participants,
    createdAt: new Date().toISOString(),
    messages: [],
  };
  const response = await db.collection(COLLECTION).insertOne(bodyInput);

  return response;
};

export const deleteRoom = async (id: string) => {
  const db = await getDb();

  await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });

  return {
    message: `Success Delete Room`,
  };
};

export const createMessage = async (id: string, body: InputMessage) => {
  //id di params peratama adalah id room chat
  //body nya adalah Input an dari message nya
  const db = await getDb();

  const roomchat = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });

  if (!roomchat) {
    throw `Room Not Found`;
  }

  const messageInput = {
    senderId: new ObjectId(body.senderId),
    content: body.content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  roomchat.messages.push(messageInput);

  await db.collection(COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: { messages: roomchat.messages } });

  return {
    messages: `Success add new Chat`,
  };
};

export const findRoom = async () => {
  const db = await getDb();

  const data = await db.collection(COLLECTION).find().toArray();

  return data;
};

export const roomDetail = async (id: string) => {
  const db = await getDb();

  const data = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });

  return data;
};

export const CheckRoomLogin = async (id: string) => {
  const db = await getDb();

  const data = await db
    .collection(COLLECTION)
    .aggregate([
      {
        $match: {
          "participants.participants": new ObjectId(id),
        },
      },
    ])
    .toArray();
  console.log(`masuk sini`);

  return data;
};
