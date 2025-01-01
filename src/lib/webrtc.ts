import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// STUN Server
export const configuration: RTCConfiguration = {
  iceServers: [{ urls: "stun:stun1.l.google.com:19302" }, { urls: "stun:stun2.l.google.com:19302" }],
};

// Create Peer Connection
export const createPeerConnection = (): RTCPeerConnection => {
  const peerConnection = new RTCPeerConnection(configuration);
  return peerConnection;
};

//Create Room
export const createRoom = async (peerConnection: RTCPeerConnection, roomId: string): Promise<string> => {
  const roomRef = doc(collection(db, "video-rooms"), roomId);
  await setDoc(roomRef, {});

  const callerCandidatesCollection = collection(db, `video-rooms/${roomId}/callerCandidates`);

  peerConnection.addEventListener("icecandidate", async (event) => {
    if (event.candidate) {
      console.log("Caller ICE Candidate:", event.candidate);
      await addDoc(callerCandidatesCollection, event.candidate.toJSON());
    }
  });

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  await updateDoc(roomRef, {
    offer: {
      sdp: offer.sdp,
      type: offer.type,
    },
  });

  onSnapshot(roomRef, (snapshot) => {
    const data = snapshot.data();
    if (data?.answer && !peerConnection.currentRemoteDescription) {
      const answer = new RTCSessionDescription(data?.answer);
      peerConnection.setRemoteDescription(answer);
    }
  });

  return roomId;
};

//Join Room
export const joinRoom = async (peerConnection: RTCPeerConnection, roomId: string): Promise<string> => {
  const roomRef = doc(db, "video-rooms", roomId);
  const roomSnapshot = await getDoc(roomRef);

  if (roomSnapshot?.exists()) {
    const roomData = roomSnapshot.data();
    const offer = roomData?.offer;

    if (offer) {
      const offerDescription = new RTCSessionDescription(offer);
      await peerConnection.setRemoteDescription(offerDescription);
    }

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    await updateDoc(roomRef, {
      answer: {
        type: answer.type,
        sdp: answer.sdp,
      },
    });
  } else {
    return `Room ${roomId} not found`;
  }

  const calleeCandidatesCollection = collection(db, `video-rooms/${roomId}/calleeCandidates`);
  peerConnection.addEventListener("icecandidate", async (event) => {
    if (event.candidate) {
      console.log("Callee ICE Candidate:", event.candidate);
      await addDoc(calleeCandidatesCollection, event?.candidate?.toJSON());
    }
  });

  onSnapshot(collection(db, `video-rooms/${roomId}/callerCandidates`), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change?.doc?.data());
        peerConnection.addIceCandidate(candidate);
      }
    });
  });

  return roomId;
};
