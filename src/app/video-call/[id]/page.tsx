"use client";

import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { createPeerConnection, createRoom, joinRoom } from "@/lib/webrtc";

const VideoCallId = () => {
  const params = useParams();
  const id = params.id;
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [videoRoomId, setVideoRoomId] = useState<string | null>(null);

  const startCall = async () => {
    if (!peerConnection) return;

    const id = await createRoom(peerConnection);

    setVideoRoomId(id);

    console.log("Room ID:", id);
  };

  const joinCall = async () => {
    if (!peerConnection) return;

    if (Array.isArray(id)) return;

    if (!peerConnection) {
      console.error("Peer connection is not initialized.");
      return;
    }

    await joinRoom(peerConnection, id);
    console.log("Joined Room ID:", id);
  };

  const startMedia = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
      console.log("INI LOCACL VIDEO ELEMENT :", localVideoRef.current);
    } else {
      console.log("LOCAL VIDEO GAADA BOY");
    }

    const pc = createPeerConnection();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    setPeerConnection(pc);
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
  };

  return (
    <div className="container">
      <h1 className="title">Video Call</h1>
      <p className="description">Start a video call or join an existing one by entering the Room ID.</p>
      <div className="video-container">
        <video ref={localVideoRef} autoPlay muted playsInline className="video" />
        <video ref={remoteVideoRef} autoPlay playsInline className="video" />
      </div>
      <div className="button-group">
        <button className="button" onClick={startMedia}>
          Start Media
        </button>
        <button className="button" onClick={startCall} disabled={!peerConnection}>
          Create Room
        </button>
        <button className="button" onClick={joinCall} disabled={!peerConnection}>
          Join Room
        </button>
        <button className="button" onClick={endCall} disabled={!peerConnection}>
          End Call
        </button>
      </div>
      {videoRoomId && (
        <p className="room-id">
          Room ID: <strong>{videoRoomId}</strong>
        </p>
      )}
      <style jsx>{`
        .container {
          text-align: center;
          padding: 2rem;
          font-family: Arial, sans-serif;
        }
        .title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .description {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: #555;
        }
        .video-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .video {
          width: 300px;
          height: 200px;
          background: #000;
          border: 1px solid #ccc;
        }
        .button-group {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        .button {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 0.8rem 1.2rem;
          font-size: 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .button:hover:not(:disabled) {
          background-color: #005bb5;
        }
        .room-id {
          font-size: 1rem;
          color: #333;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default VideoCallId;
