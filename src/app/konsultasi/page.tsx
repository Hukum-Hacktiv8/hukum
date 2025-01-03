"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

type Lawyer = {
  id: string;
  name: string;
  image: string;
  bio: string;
  fee: number;
};
type CalendarProps = {
  mode: "single";
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  className?: string;
};

async function fetchLawyer(): Promise<Lawyer[]> {
  const response = await fetch("http://localhost:3001/lawyers");
  const responseJson = await response.json();

  return responseJson;
}

export default function KonsultasiPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedInterval, setSelectedInterval] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  // const [date, setDate] = useState(new Date());
  const [date, setDate] = useState<Date | undefined>(undefined);

  const searchParamsData = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    async function getLawyers() {
      try {
        const fetchedLawyers = await fetchLawyer();
        setLawyers(fetchedLawyers);
      } catch (error) {
        console.error("Error fetching lawyers:", error);
      }
    }
    getLawyers();
  }, []);
  // console.log(lawyers, "<<< line 85");

  function handleBooking() {
    if (!date || !selectedTime) {
      alert("Please select a date and time for your booking.");
      return;
    }

    // const lawyerId = "676d906bab88bd555d8103ab";
    // const lawyerId = "6774f0beadcd850b98b70412"; // ID user dgn username : user2
    const lawyerId = "6774f0beadcd850b98b70412"; // ID user dgn username : user2

    // ! kenny dan grace after payment bikin function untuk status pembayaran
    //  todo: ambil status pembayaran midtrans
    // todo:

    //if (!data ){
    //   throw "payment failed"
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
      const searchParamsData = new URLSearchParams();
      searchParamsData.append("interval", selectedInterval);
      searchParamsData.append("time", selectedTime);
      searchParamsData.append("date", date.toDateString());
      searchParamsData.append("lawyer", selectedLawyer);

      // searchParamsData = ?interval=[value]&time=[value]&date=[value]
      if (selectedInterval === "One-time") {
        router.push(`/konfirmasi/konsultasi?${searchParamsData.toString()}`);
      }

      if (selectedInterval === "Monthly") {
        router.push(`/konfirmasi/subscription?${searchParamsData.toString()}`);
      }

      // router.push("/chats");
    });
  }
  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl flex lg:flex-row flex-col p-20">
        <div>
          {lawyers.length > 0 ? (
            lawyers.map((lawyer) => (
              <div key={lawyer.id}>
                <figure className="flex justify-center items-center lg:w-1/3 w-full">
                  <img
                    src={lawyer.image}
                    alt="Photo"
                    className="object-cover rounded-lg lg:w-80 lg:h-96 w-64 h-80"
                  />
                </figure>
                <div className="card-body lg:w-2/3 w-full">
                  <h2 className="card-title text-2xl font-bold">
                    {lawyer.name}
                  </h2>

                  <p className="text-md text-gray-600 mt-4">{lawyer.bio}</p>
                  <p className="font-semibold text-lg mt-4">
                    Appointment Fee:{" "}
                    <span className="text-primary">Rp. 50,000</span>
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold mb-2">Booking Slots:</p>
                    <div className="flex flex-wrap gap-4 mb-4">
                      {["One-time", "Monthly"].map((interval) => (
                        <button
                          key={interval}
                          onClick={() => setSelectedInterval(interval)}
                          className={`btn px-4 py-1 text-sm font-medium ${
                            selectedInterval === interval
                              ? "btn-primary text-white"
                              : ""
                          }`}
                        >
                          {interval}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {["09:00", "18:00"].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`btn px-4 py-1 text-sm font-medium ${
                            selectedTime === time
                              ? "btn-primary text-white"
                              : ""
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-6">
                    <button
                      className="btn btn-primary px-6"
                      onClick={handleBooking}
                    >
                      Book an Appointment
                    </button>
                  </div>
                </div>

                {/* <button onClick={() => setSelectedLawyer(lawyer.id)}>
                  Select
                </button> */}
              </div>
            ))
          ) : (
            <p>Loading lawyers...</p>
          )}
        </div>
      </div>
    </>
  );
}
