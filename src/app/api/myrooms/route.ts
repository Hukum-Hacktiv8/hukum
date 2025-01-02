import { CheckRoomLogin } from "@/app/models/chatroom";

export const GET = async (request: Request) => {
  const clientId = request.headers.get("rg-user-id");

  if (!clientId) {
    throw "Authorization";
  }

  const data = await CheckRoomLogin(clientId);

  return Response.json({
    data,
  });
};
