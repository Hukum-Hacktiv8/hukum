import { createRoom, findRoom } from "@/app/models/chatroom";

export const POST = async (request: Request) => {
  const data = await request.json();
  const clientId = request.headers.get("rg-user-id");
  data.participants.push(clientId);

  await createRoom(data);

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
