import KonsultasiConfirmCard from "@/components/konfirmasi/KonsultasiConfirmCard";

export default function KonfirmasiKonsultasi() {
  return (
    <main className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-white mb-8">
            Konfirmasi Konsultasi
          </h1>
          <KonsultasiConfirmCard />
        </div>
      </div>
    </main>
  );
}
