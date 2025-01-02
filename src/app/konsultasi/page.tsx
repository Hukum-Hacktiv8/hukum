"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function KonsultasiPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const router = useRouter();

  function handleBooking() {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time for your booking.");
      return;
    }

    // const lawyerId = "676d906bab88bd555d8103ab";
    // const lawyerId = "6774f0beadcd850b98b70412"; // ID user dgn username : user2
    const lawyerId = "6774f0beadcd850b98b70412"; // ID user dgn username : user2

    // ! kelvin payment

    //if (!data ){
    //   throw "payment fai"
    // }
    fetch("http://localhost:3000/api/roomchats", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        participants: [lawyerId],
      }),
    }).then(() => {
      router.push("/chats");
    });
  }

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl flex lg:flex-row flex-col p-20">
        <figure className="flex justify-center items-center lg:w-1/3 w-full">
          <img src="https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Doctor" className="object-cover rounded-lg lg:w-80 lg:h-96 w-64 h-80" />
        </figure>
        <div className="card-body lg:w-2/3 w-full">
          <h2 className="card-title text-2xl font-bold">Dr. Andria Pratama</h2>
          <p className="text-lg font-medium text-gray-600">Ph.D - Ahli Hukum (4 Years)</p>
          <p className="text-md text-gray-600 mt-4">Dr. Andria Pratama adalah seorang pakar hukum yang berpengalaman luas dalam memberikan konsultasi hukum profesional. Ia meraih gelar Sarjana Hukum (SH) dari Universitas Gadjah Mada dengan predikat cum laude dan melanjutkan studi Magister Hukum (MH) di Universitas Leiden, Belanda, dengan spesialisasi Hukum Bisnis Internasional. Selain itu, Dr. Andria juga menyelesaikan program Doktoral (Ph.D.) di Universitas Melbourne dengan fokus penelitian pada arbitrase internasional. Sebagai konsultan hukum bersertifikat, ia aktif membantu individu maupun perusahaan dalam menyelesaikan permasalahan hukum yang kompleks, dengan pendekatan yang profesional dan solutif.</p>
          <p className="font-semibold text-lg mt-4">
            Appointment Fee: <span className="text-primary">Rp. 50,000</span>
          </p>
          <div className="mt-6">
            <p className="font-semibold mb-2">Booking Slots:</p>
            <div className="flex flex-wrap gap-4 mb-4">
              {["Wed 3", "Thu 4", "Fri 5", "Sat 6", "Sun 7", "Mon 8", "Tue 9"].map((day) => (
                <button key={day} onClick={() => setSelectedDate(day)} className={`btn btn-outline rounded-full px-4 py-1 text-sm font-medium ${selectedDate === day ? "btn-primary text-white" : ""}`}>
                  {day}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {["05:00 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"].map((time) => (
                <button key={time} onClick={() => setSelectedTime(time)} className={`btn btn-outline rounded-full px-4 py-1 text-sm font-medium ${selectedTime === time ? "btn-primary text-white" : ""}`}>
                  {time}
                </button>
              ))}
            </div>
          </div>
          <div className="card-actions justify-end mt-6">
            <button className="btn btn-primary px-6" onClick={handleBooking}>
              Book an Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
