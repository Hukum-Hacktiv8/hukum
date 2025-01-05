import { deactiveRoom } from "@/models/chatroom";

export const PATCH = async () => {
  const result = await deactiveRoom();

  return Response.json({
    message: "Success Make Room Expired",
  });
};
