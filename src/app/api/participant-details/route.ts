import { getUserById } from "@/app/models/user";

export const POST = async (request: Request) => {
  const clientId = request.headers.get("rg-user-id");
  if (!clientId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { participantIds } = await request.json();
<<<<<<< HEAD
  console.log("participantIds:", participantIds);
=======
  // console.log(participantIds);
>>>>>>> 2e18144344b627b9dceaa9143fc03740d8a140c1

  if (!participantIds || !Array.isArray(participantIds)) {
    return new Response(JSON.stringify({ error: "Invalid body, expected array of IDs" }), { status: 400 });
  }

  const otherParticipantId = participantIds.find((id) => id !== clientId);
  console.log("otherParticipantId:", otherParticipantId);
  if (!otherParticipantId) {
    return new Response(JSON.stringify({ error: "No valid participant found" }), { status: 404 });
  }
  console.log(otherParticipantId, "other");

  const user = await getUserById(otherParticipantId);

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(user), { status: 200 });
};
