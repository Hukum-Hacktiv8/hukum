import KonsultasiConfirmCard from "@/components/konfirmasi/KonsultasiConfirmCard";

export default function KonfirmasiKonsultasi() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <div className="font-bold text-3xl mb-5">Konfirmasi Booking Anda</div>
      <div className="p-5">
        <KonsultasiConfirmCard />
      </div>
    </main>
  );
}
