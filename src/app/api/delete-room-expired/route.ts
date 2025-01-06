import { deleteRoomIfExpired } from "@/models/chatroom";

export const POST = async () => {
  const result = await deleteRoomIfExpired();

  return Response.json({
    message: "Success Delete Room if Room Expired",
  });
};
