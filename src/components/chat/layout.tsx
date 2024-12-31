"use client";

import { useState, useRef, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createPeerConnection, createRoom, joinRoom } from "@/lib/webrtc";
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

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [videoCall, setVideoCall] = useState<VideoCallState>({
    isActive: false,
    isMuted: false,
    isVideoOn: true,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);

  const contacts: Contact[] = [
    { id: "1", name: "Ahmad Lawyer", role: "Pengacara Pidana", isOnline: true },
    { id: "2", name: "Siti Lawyer", role: "Pengacara Perdata", isOnline: false },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinChatRoom = (roomId: string) => {
    const q = query(
      collection(db, "chat-rooms", roomId, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(msgs);
    });
    return unsubscribe;
  };

  const handleContactSelection = (contact: Contact) => {
    setSelectedContact(contact);
    if (contact.id) {
      joinChatRoom(contact.id);
      setRoomId(contact.id);
    }
  };

  const sendMessage = async () => {
    if (!roomId || !newMessage.trim()) return;
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
      if (remoteVideoRef.current)
        remoteVideoRef.current.srcObject = event.streams[0];
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
