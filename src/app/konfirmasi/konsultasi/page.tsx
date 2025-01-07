import KonsultasiConfirmCard from "@/components/konfirmasi/KonsultasiConfirmCard";

export default function KonfirmasiKonsultasi() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-slate-900 mb-8">
            Konfirmasi Konsultasi
          </h1>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <KonsultasiConfirmCard />
          </div>
        </div>
      </div>
    </main>
  );
}
