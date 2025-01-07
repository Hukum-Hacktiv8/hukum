"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function SubscriptionConfirmCard() {
  const searchParamsData = useSearchParams();
  const router = useRouter();

  // const interval = searchParamsData.get("interval");
  const time = searchParamsData.get("time");
  const date = searchParamsData.get("date");
  const lawyer = searchParamsData.get("lawyer");

  const handleSubmit = async () => {
    router.push(`/billing-subscription?lawyer=${lawyer}&date=${date}`);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="relative h-[400px]">
          <Image src="https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg" alt="Law-Subscription" fill className="object-cover" />
        </div>
        <div className="p-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Jasa Langganan (Monthly)
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Lawyer:</span>
                <span className="font-medium text-gray-500">{lawyer}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Tanggal:</span>
                <span className="font-medium text-gray-500">{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Waktu:</span>
                <span className="font-medium text-gray-500">{time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Durasi:</span>
                <span className="font-medium text-gray-500">1 Bulan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Biaya:</span>
                <span className="font-medium text-gray-500">Rp 299,000</span>
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
    </div>
  );
}
