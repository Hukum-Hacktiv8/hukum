import { IonIcon } from "@ionic/react";
import { sendOutline, videocamOutline, callOutline, micOutline, micOffOutline, videocamOffOutline, closeCircleOutline } from "ionicons/icons";

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

interface ChatUIProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  messages: Message[];
  newMessage: string;
  videoCall: VideoCallState;
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onContactSelect: (contact: Contact) => void;
  onMessageChange: (message: string) => void;
  onMessageSubmit: (e: React.FormEvent) => void;
  onStartCall: () => void;
  onJoinCall: () => void;
  onEndCall: () => void;
  onToggleMute: () => void;
  onToggleVideo: () => void;
}

export default function ChatUI({ contacts, selectedContact, messages, newMessage, videoCall, localVideoRef, remoteVideoRef, messagesEndRef, onContactSelect, onMessageChange, onMessageSubmit, onStartCall, onJoinCall, onEndCall, onToggleMute, onToggleVideo }: ChatUIProps) {
  const renderVideoCall = () => {
    if (!videoCall.isActive) return null;

    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <div className="relative w-full max-w-6xl h-[500px] grid grid-cols-2 gap-4 p-4">
          {/* Local Video */}
          <div className="relative bg-[#1a4b69] rounded-xl overflow-hidden flex items-center justify-center">
            <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-medium">You</h3>
            </div>
          </div>

          {/* Remote Video */}
          <div className="relative bg-[#1a4b69] rounded-xl overflow-hidden flex items-center justify-center">
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-medium">{selectedContact?.name}</h3>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#1a4b69]/60 backdrop-blur-sm p-4 rounded-full">
            <button onClick={onToggleMute} className={`p-4 rounded-full transition-colors ${videoCall.isMuted ? "bg-red-500" : "bg-white/10 hover:bg-white/20"}`}>
              <IonIcon icon={videoCall.isMuted ? micOffOutline : micOutline} className="text-white text-xl" />
            </button>

            <button onClick={onToggleVideo} className={`p-4 rounded-full transition-colors ${!videoCall.isVideoOn ? "bg-red-500" : "bg-white/10 hover:bg-white/20"}`}>
              <IonIcon icon={videoCall.isVideoOn ? videocamOutline : videocamOffOutline} className="text-white text-xl" />
            </button>

            <button onClick={onEndCall} className="p-4 bg-red-500 rounded-full hover:bg-red-600 transition-colors">
              <IonIcon icon={closeCircleOutline} className="text-white text-xl" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen pt-16 bg-gradient-to-br from-[#1a4b69] to-[#1a3f69]">
      <div className="w-80 bg-[#1a4b69]/60 backdrop-blur-sm border-r border-white/10">
        <div className="p-4">
          <h3 className="text-white mb-2">Contacts</h3>
          {contacts?.map((contact) => (
            <div key={contact.id} onClick={() => onContactSelect(contact)} className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedContact?.id === contact.id ? "bg-white/20" : "hover:bg-white/10"}`}>
              <h3 className="text-white">{contact.name}</h3>
              <p className="text-sm text-white/60">{contact.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            <div className="p-4 bg-[#1a4b69]/80 backdrop-blur-sm border-b border-white/10 flex justify-between">
              <div>
                <h3 className="text-white">{selectedContact.name}</h3>
                <p className="text-sm text-white/60">{selectedContact.role}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={onStartCall} className="p-2 bg-blue-600 text-white rounded-lg">
                  <IonIcon icon={videocamOutline} className="text-xl" /> Start Call
                </button>
                <button onClick={onJoinCall} className="p-2 bg-green-600 text-white rounded-lg">
                  <IonIcon icon={callOutline} className="text-xl" /> Join Call
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-lg p-3 ${message.sender === "user" ? "bg-blue-600/80 text-white" : "bg-white/10 text-white"}`}>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={onMessageSubmit} className="p-4 bg-[#1a4b69]/80 backdrop-blur-sm border-t border-white/10">
              <div className="flex gap-2">
                <input type="text" value={newMessage} onChange={(e) => onMessageChange(e.target.value)} placeholder="Type a message..." className="flex-1 bg-white/10 rounded-lg px-4 py-2 text-white" />
                <button type="submit" className="p-2 bg-blue-600/80 rounded-full">
                  <IonIcon icon={sendOutline} className="text-white text-xl" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/60">Select a contact to start chatting</div>
        )}
      </div>
      {renderVideoCall()}
    </div>
  );
}
