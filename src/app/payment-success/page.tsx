import Link from "next/link";

export default function PaymentSuccess({ searchParams: { amount } }: { searchParams: { amount: string } }) {
  return (
    <main className="flex justify-center p-20">
      <div className="card bg-base-100 w-96 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title">Terima kasih!</h2>
          <p>pembayaran anda telah berhasil Rp.{amount}</p>
          <div className="card-actions justify-center p-5">
            <Link href="/tanda-tangan">
              <button className="btn btn-primary"> Continue </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
