"use client";

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function BillingPage() {
  // ! ini hardcode
  const searchParams = useSearchParams();

  const lawyerId = "gaada";
  const date = "gaada";
  const amount = 299000;

  if (!lawyerId || !date) return null;

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(amount),
              currency: "idr",
            }}
          >
            <CheckoutPage amount={amount} lawyerId={lawyerId} date={date} />
          </Elements>
        </div>
      </div>
    </main>
  );
}
