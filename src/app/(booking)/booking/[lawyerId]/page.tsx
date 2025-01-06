"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IoStar, IoTimeOutline, IoLocationOutline, IoSchoolOutline, IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface TimeSlot {
  time: string;
  available: boolean;
  bookedDuration?: number; // Durasi booking jika slot sudah dibooking
}

export default function BookingDetail({ params }: { params: { lawyerId: string } }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number>(1);

  const lawyerId = params?.lawyerId;
  const router = useRouter();

  // Handle duration change & reset selected time
  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
    setSelectedTime(""); // Reset selected time krn durasi berubah
  };

  // Dummy lawyer data
  const lawyer = {
    id: 1,
    name: "Dr. Sarah Wijaya, S.H., M.H.",
    specialization: "Hukum Bisnis",
    rating: 4.9,
    reviews: 128,
    experience: "15 tahun",
    location: "Jakarta Selatan",
    education: "Harvard Law School",
    price: 1500000,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    badges: ["Verified", "Top Rated", "Premium"],
  };

  // Update generateTimeSlots berdasarkan durasi yg dipilih
  const generateTimeSlots = () => {
    // Dummy bookings (nanti dari API)
    const existingBookings = [
      { time: "10:00", duration: 3 }, // Ada yg book jam 10 selama 3 jam
      { time: "14:00", duration: 2 }, // Ada yg book jam 14 selama 2 jam
    ];

    const slots: TimeSlot[] = [{ time: "09:00", available: true }];

    // Check overlapping bookings
    existingBookings.forEach((booking) => {
      const bookingStart = parseInt(booking.time.split(":")[0]);

      // Block slots yg overlap dgn existing booking
      slots.forEach((slot) => {
        const slotHour = parseInt(slot.time.split(":")[0]);

        // Slot dalam range booking yg ada
        if (slotHour >= bookingStart && slotHour < bookingStart + booking.duration) {
          slot.available = false;
          slot.bookedDuration = booking.duration;
        }
      });
    });

    // Check if selected duration will overlap with next bookings
    if (selectedDuration > 1) {
      slots.forEach((slot, idx) => {
        if (slot.available) {
          const slotHour = parseInt(slot.time.split(":")[0]);

          // Check next slots based on selected duration
          for (let i = 1; i < selectedDuration; i++) {
            const nextSlot = slots.find((s) => parseInt(s.time.split(":")[0]) === slotHour + i);

            // If any next slot is booked/unavailable, current slot becomes unavailable
            if (!nextSlot || !nextSlot.available) {
              slot.available = false;
              break;
            }
          }
        }
      });
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Generate calendar dates
  const getDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(date);
  };

  const isDateSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !lawyerId) {
      alert("Please make sure you have a date, lawyer and time selected.");
      return;
    }

    const searchParamsData = new URLSearchParams();
    searchParamsData.append("time", selectedTime);
    searchParamsData.append("date", selectedDate.toLocaleDateString("en-CA"));
    searchParamsData.append("lawyer", lawyerId);
    searchParamsData.append("total", lawyer.price.toLocaleString("id-ID"));

    router.push(`/konfirmasi/konsultasi?${searchParamsData.toString()}`);
  };

  return (
    <div className="bg-slate-900 min-h-screen pb-12">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/booking" className="inline-flex items-center gap-2 text-gray-400 hover:text-white">
          <IoChevronBack className="w-5 h-5" />
          <span>Kembali ke Daftar Lawyer</span>
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-8">
          {/* Booking Form */}
          <div className="col-span-12 lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800 rounded-xl overflow-hidden">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white mb-6">Book Consultation</h1>

                {/* Calendar */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-white mb-4">Pilih Tanggal</h2>
                  <div className="text-sm text-gray-400 mb-3">
                    {new Intl.DateTimeFormat("id-ID", {
                      month: "long",
                      year: "numeric",
                    }).format(selectedDate)}
                  </div>
                  <div className="flex overflow-x-auto hide-scrollbar gap-3 px-1 py-2">
                    {getDates().map((date, idx) => (
                      <button key={idx} onClick={() => setSelectedDate(date)} className={`flex-shrink-0 flex flex-col items-center p-4 rounded-xl transition-colors ${isDateSelected(date) ? "bg-yellow-500 text-slate-900" : "bg-slate-700 text-gray-300 hover:bg-slate-600"}`} style={{ minWidth: "100px" }}>
                        <span className="text-sm font-medium">{formatDate(date)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots - Updated */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-white mb-4">Pilih Waktu</h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {timeSlots.map((slot, idx) => (
                      <button key={idx} disabled={!slot.available} onClick={() => setSelectedTime(slot.time)} className={`p-3 rounded-lg text-center transition-colors ${!slot.available ? "bg-slate-700/50 text-gray-500 cursor-not-allowed relative group" : selectedTime === slot.time ? "bg-yellow-500 text-slate-900" : "bg-slate-700 text-gray-300 hover:bg-slate-600"}`}>
                        {slot.time}
                        {/* Show booked duration tooltip */}
                        {!slot.available && slot.bookedDuration && <span className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-slate-600 rounded">Booked for {slot.bookedDuration}h</span>}
                      </button>
                    ))}
                  </div>
                  {selectedDuration > 1 && <p className="mt-3 text-sm text-gray-400">*Menampilkan slot yg tersedia utk durasi {selectedDuration} jam</p>}
                </div>

                {/* Summary - Only show if all selections are made */}
                {selectedDate && selectedTime && selectedDuration && (
                  <div className="bg-slate-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Ringkasan Booking</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-300">
                        <span>Tanggal & Waktu</span>
                        <span className="text-white">
                          {formatDate(selectedDate)} • {selectedTime}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Harga per Konsultasi</span>
                        <span className="text-white">Rp {lawyer.price.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="pt-3 border-t border-slate-600">
                        <div className="flex justify-between text-white font-semibold">
                          <span>Total</span>
                          <span>Rp {lawyer.price.toLocaleString("id-ID")}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 
                    font-semibold rounded-lg transition-colors"
                      onClick={handleBooking}
                    >
                      Konfirmasi Booking
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Lawyer Info Sidebar */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <Image src={lawyer.avatar} alt={lawyer.name} width={80} height={80} className="w-20 h-20 rounded-xl object-cover" unoptimized />
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {lawyer.badges.map((badge, idx) => (
                      <span key={idx} className={`px-2 py-1 rounded text-xs font-medium ${badge === "Premium" ? "bg-yellow-500/10 text-yellow-500" : badge === "Top Rated" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}`}>
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{lawyer.name}</h3>
                  <p className="text-yellow-500 text-sm">{lawyer.specialization}</p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
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
                <div className="flex items-center gap-2 text-yellow-500">
                  <IoStar className="w-4 h-4" />
                  <span>
                    {lawyer.rating} ({lawyer.reviews} reviews)
                  </span>
                </div>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
