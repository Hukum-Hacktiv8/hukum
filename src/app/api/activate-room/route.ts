import { activateRoom } from "@/app/models/chatroom";

export const PATCH = async (request: Request) => {
  const result = await activateRoom();

  return Response.json({
    message: "Success Activate Room",
  });
};
