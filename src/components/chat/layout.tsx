"use client";

import { useState, useRef, useEffect } from "react";
import { collection, query, onSnapshot, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createPeerConnection, createRoom, joinRoom } from "@/lib/webrtc";
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
  const [videoCall, setVideoCall] = useState<VideoCallState>({
    isActive: false,
    isMuted: false,
    isVideoOn: true,
  });
  const [clientId, setClientId] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    async function fetchContacts() {
      const response = await fetch("http://localhost:3000/api/myrooms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const rooms: Room[] = data.data;

      const contactsPromises = rooms?.map(async (el) => {
        const participantIds = el.participants.participants;
        const response = await fetch("/api/participant-details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ participantIds }),
        });
        return await response.json();
      });
      const fetchedContacts = await Promise.all(contactsPromises);

      setContacts(fetchedContacts.filter(Boolean));
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

  const startCall = async () => {
    if (!roomId) return;

    const pc = createPeerConnection();
    await createRoom(pc, roomId);
    setPeerConnection(pc);

    setVideoCall({ ...videoCall, isActive: true });
    await startMedia(pc);
  };

  const joinCall = async () => {
    if (!roomId) return;

    const pc = createPeerConnection();

    await joinRoom(pc, roomId);
    setPeerConnection(pc);

    setVideoCall((prevState) => ({ ...prevState, isActive: true }));
    await startMedia(pc);
  };

  const startMedia = async (pc: RTCPeerConnection) => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideoRef.current) localVideoRef.current.srcObject = localStream;

    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
    pc.ontrack = (event) => {
      if (remoteVideoRef.current)
        remoteVideoRef.current.srcObject = event.streams[0];
    };
  };

  const endCall = () => {
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }

    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setVideoCall({ isActive: false, isMuted: false, isVideoOn: true });
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleToggleMute = () => {
    setVideoCall((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const handleToggleVideo = () => {
    setVideoCall((prev) => ({ ...prev, isVideoOn: !prev.isVideoOn }));
  };

  return (
    <ChatUI
      contacts={contacts}
      selectedContact={selectedContact}
      messages={messages}
      newMessage={newMessage}
      videoCall={videoCall}
      localVideoRef={localVideoRef}
      remoteVideoRef={remoteVideoRef}
      messagesEndRef={messagesEndRef}
      onContactSelect={handleContactSelection}
      onMessageChange={(msg) => setNewMessage(msg)}
      onMessageSubmit={handleMessageSubmit}
      onStartCall={startCall}
      onJoinCall={joinCall}
      onEndCall={endCall}
      onToggleMute={handleToggleMute}
      onToggleVideo={handleToggleVideo}
    />
  );
}
