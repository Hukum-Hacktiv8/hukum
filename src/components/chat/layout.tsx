"use client"

import { useState, useRef, useEffect } from "react"
import { IonIcon } from '@ionic/react'
import Image from "next/image"
import { 
    sendOutline, 
    attachOutline,
    ellipsisVerticalOutline,
    searchOutline,
    personCircleOutline,
    videocamOutline,
    micOutline,
    micOffOutline,
    videocamOffOutline,
    callOutline,
    closeCircleOutline
} from 'ionicons/icons'

interface Message {
    id: number
    text: string
    sender: 'user' | 'lawyer'
    timestamp: Date
}

interface Contact {
    id: number
    name: string
    role: string
    lastMessage: string
    lastMessageTime: string
    unread: number
    isOnline: boolean
    avatar?: string
}

interface VideoCallState {
    isActive: boolean
    isMuted: boolean
    isVideoOn: boolean
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    const [videoCall, setVideoCall] = useState<VideoCallState>({
        isActive: false,
        isMuted: false,
        isVideoOn: true
    })
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const contacts: Contact[] = [
        {
            id: 1,
            name: "Ahmad Lawyer",
            role: "Pengacara Pidana",
            lastMessage: "Baik pak, akan saya proses",
            lastMessageTime: "10:30",
            unread: 2,
            isOnline: true
        },
        {
            id: 2,
            name: "Siti Lawyer",
            role: "Pengacara Perdata",
            lastMessage: "Dokumennya sudah lengkap",
            lastMessageTime: "Kemarin",
            unread: 0,
            isOnline: false
        },
        // ... more contacts
    ]

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault()
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                {
                    id: Date.now(),
                    text: newMessage,
                    sender: 'user',
                    timestamp: new Date()
                }
            ])
            setNewMessage("")
        }
    }

    const renderVideoCall = () => {
        if (!selectedContact) return null

        return (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                <div className="relative w-full max-w-6xl aspect-video grid grid-cols-2 gap-4 p-4">
                    <div className="relative bg-[#1a4b69] rounded-xl overflow-hidden">
                        <video 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-lg font-medium">{selectedContact.name}</h3>
                            <p className="text-sm opacity-80">{selectedContact.role}</p>
                        </div>
                    </div>

                    <div className="relative bg-[#1a4b69] rounded-xl overflow-hidden">
                        <video 
                            className="w-full h-full object-cover mirror"
                        />
                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-lg font-medium">You</h3>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#1a4b69]/60 backdrop-blur-sm p-4 rounded-full">
                        <button 
                            onClick={() => setVideoCall(prev => ({ ...prev, isMuted: !prev.isMuted }))}
                            className={`p-4 rounded-full transition-colors ${
                                videoCall.isMuted ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20'
                            }`}
                        >
                            <IonIcon
                                icon={videoCall.isMuted ? micOffOutline : micOutline}
                                className="text-white text-xl"
                            />
                        </button>

                        <button 
                            onClick={() => setVideoCall(prev => ({ ...prev, isVideoOn: !prev.isVideoOn }))}
                            className={`p-4 rounded-full transition-colors ${
                                !videoCall.isVideoOn ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20'
                            }`}
                        >
                            <IonIcon
                                icon={videoCall.isVideoOn ? videocamOutline : videocamOffOutline}
                                className="text-white text-xl"
                            />
                        </button>

                        <button 
                            onClick={() => setVideoCall(prev => ({ ...prev, isActive: false }))}
                            className="p-4 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                        >
                            <IonIcon
                                icon={closeCircleOutline}
                                className="text-white text-xl"
                            />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const renderChatHeader = () => {
        if (!selectedContact) return null

        return (
            <div className="p-4 bg-[#1a4b69]/80 backdrop-blur-sm border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {selectedContact.avatar ? (
                        <Image
                            src={selectedContact.avatar}
                            alt={selectedContact.name}
                            className="w-10 h-10 rounded-full"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <IonIcon
                                icon={personCircleOutline}
                                className="text-xl text-white"
                            />
                        </div>
                    )}
                    <div>
                        <h2 className="font-medium text-white">
                            {selectedContact.name}
                        </h2>
                        <p className="text-sm text-white/60">
                            {selectedContact.isOnline ? 'Online' : 'Offline'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setVideoCall(prev => ({ ...prev, isActive: true }))}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <IonIcon
                            icon={videocamOutline}
                            className="text-white text-xl"
                        />
                    </button>
                    <button 
                        onClick={() => setVideoCall(prev => ({ ...prev, isActive: true }))}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <IonIcon
                            icon={callOutline}
                            className="text-white text-xl"
                        />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <IonIcon
                            icon={ellipsisVerticalOutline}
                            className="text-white text-xl"
                        />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-screen pt-16 bg-gradient-to-br from-[#1a4b69] to-[#1a3f69]">
            {/* Contacts Sidebar */}
            <div className="w-80 bg-[#1a4b69]/60 backdrop-blur-sm border-r border-white/10">
                <div className="p-4">
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Cari chat..."
                            className="w-full bg-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <IonIcon
                            icon={searchOutline}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
                        />
                    </div>

                    <div className="space-y-2">
                        {contacts.map(contact => (
                            <div
                                key={contact.id}
                                onClick={() => setSelectedContact(contact)}
                                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                    selectedContact?.id === contact.id 
                                        ? 'bg-white/20' 
                                        : 'hover:bg-white/10'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        {contact.avatar ? (
                                            <Image
                                                src={contact.avatar}
                                                alt={contact.name}
                                                className="w-12 h-12 rounded-full"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                                <IonIcon
                                                    icon={personCircleOutline}
                                                    className="text-2xl text-white"
                                                />
                                            </div>
                                        )}
                                        {contact.isOnline && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a4b69]" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium text-white">
                                                {contact.name}
                                            </h3>
                                            <span className="text-xs text-white/60">
                                                {contact.lastMessageTime}
                                            </span>
                                        </div>
                                        <p className="text-sm text-white/60">
                                            {contact.role}
                                        </p>
                                        <p className="text-sm text-white/80 truncate">
                                            {contact.lastMessage}
                                        </p>
                                    </div>
                                    {contact.unread > 0 && (
                                        <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {contact.unread}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedContact ? (
                    <>
                        {renderChatHeader()}
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map(message => (
                                <div
                                    key={message.id}
                                    className={`flex ${
                                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-lg p-3 ${
                                            message.sender === 'user'
                                                ? 'bg-blue-600/80 text-white'
                                                : 'bg-white/10 text-white'
                                        }`}
                                    >
                                        <p>{message.text}</p>
                                        <span className="text-xs opacity-60 mt-1 block">
                                            {message.timestamp.toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <form onSubmit={handleSend} className="p-4 bg-[#1a4b69]/80 backdrop-blur-sm border-t border-white/10">
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <IonIcon
                                        icon={attachOutline}
                                        className="text-white text-xl"
                                    />
                                </button>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Ketik pesan..."
                                    className="flex-1 bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="p-2 bg-blue-600/80 hover:bg-blue-700/80 rounded-full transition-colors"
                                >
                                    <IonIcon
                                        icon={sendOutline}
                                        className="text-white text-xl"
                                    />
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-white/60">
                        Pilih kontak untuk memulai chat
                    </div>
                )}
            </div>

            {/* Render video call UI when active */}
            {videoCall.isActive && renderVideoCall()}
        </div>
    )
}