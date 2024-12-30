import { createRoom, findRoom } from "@/app/models/chatroom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const POST = async (request: Request) => {
  const data = await request.json();
  const clientId = request.headers.get("rg-user-id");

  data.participants.push(clientId);

  // Create room di mongodb
  await createRoom(data);

  // Create room di firestore
  await addDoc(collection(db, "chat-rooms"), {
    participants: data.participants,
    createdAt: new Date().toISOString(),
    messages: [],
  });

  return Response.json(
    {
      statusCode: 201,
      message: "Success Create New Room",
    },
    {
      status: 201,
    }
  );
};

export const GET = async () => {
  const data = await findRoom();

  return Response.json({
    statusCode: 200,
    data,
  });
};
