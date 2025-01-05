"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
    IoStar,
    IoTimeOutline,
    IoLocationOutline,
    IoSchoolOutline,
} from "react-icons/io5"
import MapSection from '../MapSection'

interface Lawyer {
    id: number
    name: string
    specialization: string
    rating: number
    reviews: number
    experience: string
    location: string
    education: string
    price: string
    availability: string
    avatar: string
    badges: string[]
    lat: number
    lng: number
}

const categories = [
    "Semua",
    "Hukum Bisnis",
    "Hukum Pidana",
    "Hukum Perdata",
    "Hukum Keluarga",
    "Hukum Properti",
    "Hak Kekayaan Intelektual"
]

export default function Booking() {
    const [selectedCategory, setSelectedCategory] = useState("Semua")
    const [lawyers] = useState<Lawyer[]>([
        {
            id: 1,
            name: "Dr. Sarah Wijaya, S.H., M.H.",
            specialization: "Hukum Bisnis",
            rating: 4.9,
            reviews: 128,
            experience: "15 tahun",
            location: "Jakarta Selatan",
            education: "Harvard Law School",
            price: "Rp 1.500.000/jam",
            availability: "Tersedia hari ini",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            badges: ["Verified", "Top Rated", "Premium"],
            lat: -6.2608,
            lng: 106.8135
        },
        {
            id: 2,
            name: "Budi Santoso, S.H., LL.M.",
            specialization: "Hukum Pidana",
            rating: 4.8,
            reviews: 96,
            experience: "12 tahun",
            location: "Jakarta Pusat",
            education: "Universitas Indonesia",
            price: "Rp 1.200.000/jam",
            availability: "Tersedia besok",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            badges: ["Verified", "Senior"],
            lat: -6.2088,
            lng: 106.8456
        },
        {
            id: 3,
            name: "Linda Kusuma, S.H.",
            specialization: "Hukum Keluarga",
            rating: 4.7,
            reviews: 84,
            experience: "8 tahun",
            location: "Jakarta Barat",
            education: "Universitas Gadjah Mada",
            price: "Rp 900.000/jam",
            availability: "Tersedia hari ini",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
            badges: ["Verified"],
            lat: -6.1751,
            lng: 106.7013
        }
    ])

    const filteredLawyers = selectedCategory === "Semua" 
        ? lawyers
        : lawyers.filter(lawyer => lawyer.specialization === selectedCategory)

    return (
        <div className="bg-slate-900 min-h-screen pb-12">
            {/* Header */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-white mb-2">
                    Konsultasi dgn Pengacara
                </h1>
                <p className="text-gray-400">
                    Pilih pengacara sesuai kebutuhan hukum Anda
                </p>
            </div>

            {/* Category Filter */}
            <div className="container mx-auto px-4 mb-8">
                <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map((category, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                                category === selectedCategory
                                    ? "bg-yellow-500 text-slate-900 font-medium"
                                    : "bg-slate-800 text-gray-400 hover:text-white"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Lawyers Grid */}
            <div className="container mx-auto px-4 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLawyers.map((lawyer, idx) => (
                        <motion.div
                            key={lawyer.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-800/80 transition-colors"
                        >
                            <div className="p-6">
                                {/* Lawyer Info */}
                                <div className="flex items-start gap-4 mb-4">
                                    <Image
                                        src={lawyer.avatar}
                                        alt={lawyer.name}
                                        width={80}
                                        height={80}
                                        className="w-20 h-20 rounded-xl object-cover"
                                        unoptimized
                                    />
                                    <div>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {lawyer.badges.map((badge, idx) => (
                                                <span 
                                                    key={idx}
                                                    className={`px-2 py-1 rounded text-xs font-medium ${
                                                        badge === "Premium" 
                                                            ? "bg-yellow-500/10 text-yellow-500"
                                                            : badge === "Top Rated"
                                                                ? "bg-green-500/10 text-green-500"
                                                                : "bg-blue-500/10 text-blue-500"
                                                    }`}
                                                >
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            {lawyer.name}
                                        </h3>
                                        <p className="text-yellow-500 text-sm">
                                            {lawyer.specialization}
                                        </p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-4 mb-4 text-sm">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <IoStar className="w-4 h-4" />
                                        <span>{lawyer.rating}</span>
                                    </div>
                                    <span className="text-gray-400">
                                        {lawyer.reviews} reviews
                                    </span>
                                </div>

                                {/* Details */}
                                <div className="space-y-2 mb-6 text-sm">
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <IoTimeOutline className="w-4 h-4 text-gray-400" />
                                        <span>{lawyer.experience} pengalaman</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <IoLocationOutline className="w-4 h-4 text-gray-400" />
                                        <span>{lawyer.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <IoSchoolOutline className="w-4 h-4 text-gray-400" />
                                        <span>{lawyer.education}</span>
                                    </div>
                                </div>

                                {/* Price & Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                                    <div>
                                        <div className="text-white font-medium">
                                            {lawyer.price}
                                        </div>
                                        <div className="text-green-500 text-sm">
                                            {lawyer.availability}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => (window as any).scrollToLawyer(lawyer.id)}
                                            className="p-2 text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-colors"
                                            title="Lihat di Map"
                                        >
                                            <IoLocationOutline className="w-6 h-6" />
                                        </button>
                                        <Link
                                            href={`/booking/${lawyer.id}`}
                                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-lg transition-colors"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Maps Section */}
            <MapSection lawyers={lawyers} />
        </div>
    )
}