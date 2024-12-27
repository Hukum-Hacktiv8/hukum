import Link from "next/link";

export default function KonsultasiCard() {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Ada masalah hukum?</h2>
          <p>
            Dapatkan saran dari konsultan hukum berpengalaman, mulai dari Rp
            50.000
          </p>
          <div className="card-actions justify-end">
            <Link href="/chat">
              <button className="btn btn-primary">Konsultasi Sekarang</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
