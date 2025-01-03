"use client";

import { useState, useRef, useEffect } from "react";
import { collection, query, onSnapshot, orderBy, where, getDocs, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ObjectId } from "mongodb";
import ChatUI from "./ChatUI";

interface Message {
  id: string;
  text: string;
  sender: "user" | "lawyer";
  timestamp: Date | { seconds: number; nanoseconds: number };
}

interface Contact {
  id: string;
  name: string;
  role: string;
  isOnline: boolean;
}

interface VideoCallState {
  isActive: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
}

type Room = {
  _id: ObjectId;
  participants: { participants: string[] };
  createdAt: string;
  messages: Message[];
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [clientId, setClientId] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch("http://localhost:3000/api/myrooms", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }

        const data = await response.json();
        const rooms: Room[] = data.data;

        if (!rooms || rooms.length === 0) {
          // console.log("No rooms found");
          setContacts([]);
          return;
        }

        const contactsPromises = rooms.map(async (room) => {
          const participantIds = room.participants.participants;
          // console.log(participantIds, "ini untuk check isinya apa ");

          if (!participantIds || participantIds.length === 0) {
            // console.log(`No participants found for room `);
            return null;
          }

          try {
            const response = await fetch("/api/participant-details", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ participantIds }),
            });

            if (!response.ok) {
              throw new Error("Failed to fetch participant details");
            }

            return await response.json();
          } catch (error) {
            // console.error("Error fetching participant details:", error);
            return null;
          }
        });

        const fetchedContacts = await Promise.all(contactsPromises);
        setContacts(fetchedContacts.filter(Boolean));
      } catch (error) {
        // console.error("Error fetching contacts:", error);
        setContacts([]);
      }
    }

    fetchContacts();
  }, []);

  const handleContactSelection = async (contact: Contact) => {
    setSelectedContact(contact);

    const response = await fetch("/api/find-chatroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactId: contact.id }),
    });

    const data = await response.json();
    const roomId = data?.roomId;
    const clientId = data?.clientId;
    await setClientId(clientId);

    const chatroom = await findChatRoomInFirestore(clientId, contact.id);

    if (chatroom) {
      setRoomId(chatroom.id);

      const chatRoomRef = doc(db, "chat-rooms", chatroom.id);
      const unsubscribe = onSnapshot(chatRoomRef, (doc) => {
        const roomData = doc.data();
        if (roomData?.messages) {
          setMessages(roomData.messages as Message[]);
        }
      });

      return unsubscribe;
    }
  };

  const findChatRoomInFirestore = async (
    clientId: string,
    contactId: string
  ) => {
    const chatroomsRef = collection(db, "chat-rooms");

    const q = query(
      chatroomsRef,
      where("participants", "array-contains", clientId)
    );
    const querySnapshot = await getDocs(q);

    for (let doc of querySnapshot.docs) {
      const data = doc.data();
      if (data.participants.includes(contactId)) {
        return { id: doc.id, ...data };
      }
    }

    return null;
  };

  const sendMessage = async () => {
    if (!roomId || !newMessage.trim()) return;

    const chatRoomRef = doc(db, "chat-rooms", roomId);

    await updateDoc(chatRoomRef, {
      messages: arrayUnion({
        text: newMessage,
        sender: clientId,
        timestamp: new Date(),
      }),
    });

    setNewMessage("");
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return <ChatUI contacts={contacts} selectedContact={selectedContact} messages={messages} newMessage={newMessage} messagesEndRef={messagesEndRef} onContactSelect={handleContactSelection} onMessageChange={(msg) => setNewMessage(msg)} onMessageSubmit={handleMessageSubmit} />;
}
