import Link from "next/link";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Pembayaran Berhasil!
          </h2>
          <p className="text-slate-600 mb-8">
            Terima kasih atas pembayarannya. Silakan lanjutkan untuk
            menandatangani dokumen.
          </p>

          <Link href="/tanda-tangan">
            <button className="w-full bg-primary text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-all">
              Lanjut ke Tanda Tangan
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
