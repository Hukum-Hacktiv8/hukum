import Chat from "@/components/chat/layout";

export default async function Chats() {
  const data = await fetch("http://localhost:3000/api/roomchats", {
    method: `GET`,
  });
  const roomchat = await data.json();

  return (
    <div>
      <Chat />
    </div>
  );
}
