"use client";

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function BillingPage() {
  const amount = 50000;
  return (
    <main className="flex justify-center p-10">
      <div className="  card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <Image src="https://images.pexels.com/photos/4427506/pexels-photo-4427506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Lawyer3" className="rounded-xl h-40" />
        </figure>
        <div className=" flex justify-center align-center text-center px-10 pt-10 text-5xl font-bold">Jasa Konsultasi</div>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Pembayaran</h2>
        </div>
        <div className="flex justify-center">
          <p className="mr-5">Total Harga:</p>
          <p className="font-bold">Rp.{amount}</p>
        </div>
        <div className="p-5">
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(amount),
              currency: "idr",
            }}>
            <CheckoutPage amount={amount} />
          </Elements>
        </div>
      </div>
    </main>
  );
}
