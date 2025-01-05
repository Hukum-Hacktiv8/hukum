"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { IoSend, IoAttach, IoVideocam, IoSearch, IoFilter } from "react-icons/io5"
import VideoCallModal from "../VideoCallModal"

interface Message {
    id: number
    sender: "user" | "lawyer"
    text: string
    timestamp: string
    status?: "sent" | "delivered" | "read"
}

interface Lawyer {
    id: number
    name: string
    specialization: string
    avatar: string
    isOnline: boolean
    lastMessage: string
    lastMessageTime: string
    unreadCount: number
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const [isVideoCallActive, setIsVideoCallActive] = useState(false)
    
    // Dummy lawyers data
    const lawyers: Lawyer[] = [
        {
            id: 1,
            name: "Adv. Sarah Wijaya, S.H., M.H.",
            specialization: "Hukum Bisnis & Kontrak",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            isOnline: true,
            lastMessage: "Baik, silakan jelaskan lebih detail masalahnya",
            lastMessageTime: "09:31",
            unreadCount: 0
        },
        {
            id: 2,
            name: "Adv. Budi Santoso, S.H.",
            specialization: "Hukum Pidana",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            isOnline: true,
            lastMessage: "Kasus ini perlu bukti tambahan",
            lastMessageTime: "Kemarin",
            unreadCount: 2
        },
        {
            id: 3,
            name: "Adv. Linda Kusuma, S.H., LL.M.",
            specialization: "Hukum Properti",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            isOnline: false,
            lastMessage: "Saya akan review dokumennya",
            lastMessageTime: "2 hari lalu",
            unreadCount: 0
        }
    ]

    useEffect(() => {
        // Set lawyer pertama sbg default
        setSelectedLawyer(lawyers[0])
        
        // Set dummy messages
        setMessages([
            {
                id: 1,
                sender: "lawyer",
                text: "Selamat datang! Ada yg bisa saya bantu terkait masalah hukum Anda?",
                timestamp: "09:30",
                status: "read"
            },
            {
                id: 2, 
                sender: "user",
                text: "Saya ada pertanyaan ttg kontrak bisnis",
                timestamp: "09:31",
                status: "read"
            },
            {
                id: 3,
                sender: "lawyer", 
                text: "Baik, silakan jelaskan lebih detail masalahnya",
                timestamp: "09:31",
                status: "read"
            }
        ])
    }, [])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = () => {
        if (!newMessage.trim()) return

        const newMsg: Message = {
            id: messages.length + 1,
            sender: "user",
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sent"
        }

        setMessages(prev => [...prev, newMsg])
        setNewMessage("")
    }

    const filteredLawyers = lawyers.filter(lawyer => 
        lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="container mx-auto px-4">
            <div className="flex h-[calc(100vh-4rem)] bg-slate-900 rounded-lg overflow-hidden">
                {/* Sidebar - tambah shadow utk pemisah */}
                <div className="w-80 border-r border-slate-800 flex flex-col shadow-lg">
                    {/* Search & Filter */}
                    <div className="p-6 border-b border-slate-800">
                        <div className="relative mb-4">
                            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari lawyer..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                            />
                        </div>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                            <IoFilter className="w-5 h-5" />
                            <span>Filter</span>
                        </button>
                    </div>

                    {/* Lawyers List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {filteredLawyers.map((lawyer) => (
                            <button
                                key={lawyer.id}
                                onClick={() => setSelectedLawyer(lawyer)}
                                className={`w-full text-left flex items-start gap-4 p-3 hover:bg-slate-800 transition-colors rounded-xl ${
                                    selectedLawyer?.id === lawyer.id ? "bg-slate-800" : ""
                                }`}
                            >
                                {/* Avatar Container */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <Image
                                            src={lawyer.avatar}
                                            alt={lawyer.name}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    {lawyer.isOnline && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
                                    )}
                                </div>

                                {/* Content Container */}
                                <div className="flex-1 min-w-0">
                                    {/* Top Row */}
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="font-medium text-sm text-white">
                                                {lawyer.name}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {lawyer.specialization}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-500 shrink-0">
                                            {lawyer.lastMessageTime}
                                        </span>
                                    </div>
                                    
                                    {/* Last Message */}
                                    <p className="text-xs text-gray-500 truncate mt-1">
                                        {lawyer.lastMessage}
                                        {lawyer.unreadCount > 0 && (
                                            <span className="inline-flex items-center justify-center ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5">
                                                {lawyer.unreadCount}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Container */}
                {selectedLawyer ? (
                    <div className="flex-1 flex flex-col">
                        {/* Chat Header - increase padding */}
                        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Image
                                        src={selectedLawyer.avatar}
                                        alt={selectedLawyer.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover"
                                        unoptimized
                                    />
                                    {selectedLawyer.isOnline && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">{selectedLawyer.name}</h3>
                                    <p className="text-sm text-gray-400">{selectedLawyer.specialization}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsVideoCallActive(true)} 
                                className="p-2 text-gray-400 hover:text-white"
                            >
                                <IoVideocam className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Chat Messages - increase padding */}
                        <div 
                            ref={chatContainerRef}
                            className="flex-1 overflow-y-auto p-6 space-y-4"
                        >
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                                        msg.sender === "user" 
                                            ? "bg-blue-500 text-white rounded-br-none" 
                                            : "bg-slate-800 text-white rounded-bl-none"
                                    }`}>
                                        <p>{msg.text}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-xs opacity-70">{msg.timestamp}</span>
                                            {msg.sender === "user" && msg.status && (
                                                <span className="text-xs opacity-70">✓{msg.status === "read" ? "✓" : ""}</span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Chat Input - increase padding */}
                        <div className="p-6 border-t border-slate-800 bg-slate-900">
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-gray-400 hover:text-white">
                                    <IoAttach className="w-6 h-6" />
                                </button>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ketik pesan..."
                                    className="flex-1 bg-slate-800 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                                />
                                <button 
                                    onClick={handleSend}
                                    disabled={!newMessage.trim()}
                                    className={`p-2 rounded-lg ${
                                        newMessage.trim() 
                                            ? "text-white bg-blue-500 hover:bg-blue-600" 
                                            : "text-gray-400 bg-slate-800"
                                    }`}
                                >
                                    <IoSend className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        Pilih lawyer utk mulai chat
                    </div>
                )}
            </div>

            {/* Video Call Modal */}
            {selectedLawyer && (
                <VideoCallModal
                    isOpen={isVideoCallActive}
                    onClose={() => setIsVideoCallActive(false)}
                    lawyer={selectedLawyer}
                />
            )}
        </div>
    )
}