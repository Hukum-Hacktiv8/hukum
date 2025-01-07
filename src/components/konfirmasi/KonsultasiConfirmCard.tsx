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
    router.push(
      `/billing-konsultasi?lawyer=${lawyer}&date=${date}&amount=${amount}`
    );
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="relative h-[400px]">
          <Image
            src="https://images.pexels.com/photos/6077519/pexels-photo-6077519.jpeg"
            alt="Law-Konsultasi"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Jasa Konsultasi (One-time)
            </h2>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Lawyer:</span>
                <span className="font-medium">{lawyer}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Tanggal:</span>
                <span className="font-medium">{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Waktu:</span>
                <span className="font-medium">{time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Biaya:</span>
                <span className="font-medium">Rp {amount}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-white py-3 px-6 rounded-xl hover:bg-primary/90 transition-colors"
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}
