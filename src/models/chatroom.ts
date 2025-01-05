import { Db, ObjectId } from "mongodb";
import { connectToDatabase } from "../config/config";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date | { seconds: number; nanoseconds: number };
}

type keepChatHistoryProp = {
  messages: Message[];
  mongoDbRoomId: string;
};

export type RoomChat = {
  _id: ObjectId;
  participants: string[];
  createdAt: string;
  messages: Message[];
};

export type InputRoomChat = {
  participants: string[];
  bookDate: string;
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

export const createRoom = async (props: InputRoomChat) => {
  const db = await getDb();

  const participants = props?.participants;
  const bookDate = props?.bookDate;

  const bodyInput = {
    participants,
    createdAt: new Date().toISOString(),
    bookDate,
    messages: [],
    status: "pending",
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
          "participants.participants": id,
        },
      },
    ])
    .toArray();

  return data;
};

export const getRoomChatByParticipants = async (clientId: string, contactId: string) => {
  const db = await getDb();
  const chatroom = await db.collection(COLLECTION).findOne({
    "participants.participants": { $all: [clientId, contactId] },
  });
  return chatroom;
};

export const activateRoom = async () => {
  const db = await getDb();
  await db.collection(COLLECTION).updateMany({ status: "pending" }, { $set: { status: "active" } });

  return {
    message: "Success Update Room To Active",
  };
};

export const deactiveRoom = async () => {
  const db = await getDb();

  await db.collection(COLLECTION).updateMany({ status: "active" }, { $set: { status: "expired" } });

  return {
    message: "Success Update Room to Expired",
  };
};

export const deleteRoomIfExpired = async () => {
  const db = await getDb();
  await db.collection(COLLECTION).deleteMany({ status: "expired" });

  return {
    message: "Success Delete Room If that room expired",
  };
};

export const keepChatHistory = async (props: keepChatHistoryProp) => {
  const messages = props?.messages;
  const mongoDbRoomId = props?.mongoDbRoomId;

  const db = await getDb();
  await db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(mongoDbRoomId) }, // Match stage
    {
      $set: {
        messages,
      },
    }
  );

  return {
    message: "Success keep chat history.",
  };
};
