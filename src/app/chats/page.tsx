import Chat from "@/components/chat/layout";
// import { findRoom } from "../../models/chatroom";

export default async function Chats() {
  const data = await fetch("http://localhost:3000/api/roomchats", {
    method: `GET`,
  });
  const roomchat = await data.json();
  console.log(roomchat);

  return (
    <div>
      <Chat />
    </div>
  );
}
