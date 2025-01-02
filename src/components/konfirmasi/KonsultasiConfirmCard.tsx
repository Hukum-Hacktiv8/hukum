"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function KonsultasiConfirmCard() {
  const searchParamsData = useSearchParams();
  const router = useRouter();

  const interval = searchParamsData.get("interval");
  const time = searchParamsData.get("time");
  const date = searchParamsData.get("date");
  const lawyer = searchParamsData.get("lawyer");

  const handleSubmit = async () => {
    router.push("/billing-konsultasi");
  };

  return (
    <main className="">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://images.pexels.com/photos/6077519/pexels-photo-6077519.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Law-Konsultasi"
            className="h-96 rounded-lg p-5"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Jasa Konsultasi (One-time)</h2>
          <p>{lawyer}</p>
          <p>{date}</p>
          <p>{time}</p>
          <p>{interval}</p>
          <p>30 minutes chat</p>
          <p>Rp. 50,000</p>
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
