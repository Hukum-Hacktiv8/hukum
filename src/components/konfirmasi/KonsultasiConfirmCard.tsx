"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function KonsultasiConfirmCard() {
  const searchParamsData = useSearchParams();
  const router = useRouter();

  const time = searchParamsData.get("time");
  const date = searchParamsData.get("date");
  const lawyer = searchParamsData.get("lawyer");
  const amount = searchParamsData.get("total");

  const handleSubmit = async () => {
    router.push(`/billing-konsultasi?lawyer=${lawyer}&date=${date}&amount=${amount}`);
  };

  return (
    <main className="">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <Image src="https://images.pexels.com/photos/6077519/pexels-photo-6077519.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Law-Konsultasi" width={96} height={96} className="h-96 rounded-lg p-5" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Jasa Konsultasi (One-time)</h2>
          <p>{lawyer}</p>
          <p>{date}</p>
          <p>{time}</p>
          <p>{amount}</p>
          <div className="card-actions justify-center mt-10">
            <button onClick={handleSubmit} className="btn btn-primary">
              Lanjut ke pembayaran
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
