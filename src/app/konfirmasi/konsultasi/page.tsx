import KonsultasiConfirmCard from "@/components/konfirmasi/KonsultasiConfirmCard";

export default function KonfirmasiKonsultasi() {
  return (
    <>
      <div className="flex justify-center items-center p-20">
        <div className="font-bold p-5">Konfirmasi Booking Anda</div>
      </div>
      <div>
        <KonsultasiConfirmCard />
      </div>
    </>
  );
}
