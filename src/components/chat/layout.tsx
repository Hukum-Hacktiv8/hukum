"use client";

import { useState, useRef, useEffect } from "react";
import { collection, addDoc, query, onSnapshot, orderBy, where, getDocs } from "firebase/firestore";
import { IonIcon } from "@ionic/react";
import { sendOutline, videocamOutline, callOutline, micOutline, micOffOutline, videocamOffOutline, closeCircleOutline } from "ionicons/icons";
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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

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
    const chatroom = await findChatRoomInFirestroe(clientId, contact.id);
    if (chatroom) {
      setRoomId(chatroom.id);
      setSelectedContact(contact);
      const q = query(collection(db, "chat-rooms", chatroom.id, "messages"), orderBy("timestamp", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
        setMessages(msgs);
      });
      return unsubscribe;
    }
  };

  const findChatRoomInFirestroe = async (clientId: string, contactId: string) => {
    const chatroomsRef = collection(db, "chat-rooms");
    const q = query(chatroomsRef, where("participants", "array-contains", clientId));

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

    console.log(roomId);
    console.log(newMessage);

    await addDoc(collection(db, "chat-rooms", roomId, "messages"), {
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    });
    setNewMessage("");
  };

  const startCall = async () => {
    const pc = createPeerConnection();
    const id = await createRoom(pc);
    setPeerConnection(pc);
    setRoomId(id);
    alert(`Room ID: ${id}`);
    setVideoCall({ ...videoCall, isActive: true });
    await startMedia(pc);
  };

  const joinCall = async () => {
    const id = prompt("Enter Room ID");
    if (!id) return;
    const pc = createPeerConnection();
    await joinRoom(pc, id.trim());
    setPeerConnection(pc);
    setRoomId(id);
    setVideoCall({ ...videoCall, isActive: true });
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
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };
  };

  const endCall = () => {
    peerConnection?.close();
    setPeerConnection(null);
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

  return <ChatUI contacts={contacts} selectedContact={selectedContact} messages={messages} newMessage={newMessage} videoCall={videoCall} localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef} messagesEndRef={messagesEndRef} onContactSelect={handleContactSelection} onMessageChange={(msg) => setNewMessage(msg)} onMessageSubmit={handleMessageSubmit} onStartCall={startCall} onJoinCall={joinCall} onEndCall={endCall} onToggleMute={handleToggleMute} onToggleVideo={handleToggleVideo} />;
}
