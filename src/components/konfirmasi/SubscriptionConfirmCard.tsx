"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function KonsultasiConfirmCard() {
  const searchParamsData = new URLSearchParams(window.location.search);
  const router = useRouter();

  const interval = searchParamsData.get("interval");
  const time = searchParamsData.get("time");
  const date = searchParamsData.get("date");

  router.refresh();

  return (
    <main className="">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Lawyer"
            className="h-96 rounded-lg p-5"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Subscription (Monthly)</h2>
          <p>Lawyer Name</p>
          <p>{date}</p>
          <p>{time}</p>
          <p>{interval}</p>
          <p>30 minutes chat</p>
          <p>Rp. 50,000</p>
          <div className="card-actions justify-center mt-10">
            <Link href="/billing-subscription">
              <button className="btn btn-primary">Lanjut ke pembayaran</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
