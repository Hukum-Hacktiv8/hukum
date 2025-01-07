"use client";

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import { useSearchParams } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function BillingPage() {
  // ! ini hardcode
  // const searchParams = useSearchParams();

  const lawyerId = "gaada";
  const date = "gaada";
  const amount = 299000;

  if (!lawyerId || !date) return null;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Subscription</h1>
              <h2 className="text-xl mt-2">Pembayaran</h2>
            </div>
            <div className="flex justify-center mb-6">
              <p className="mr-5">Total Harga:</p>
              <p className="font-bold">Rp.{amount}</p>
            </div>
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubcurrency(amount),
                currency: "idr",
              }}>
              <CheckoutPage amount={amount} lawyerId={lawyerId} date={date} />
            </Elements>
          </div>
        </div>
      </div>
    </main>
  );
}
