"use client";

import convertToSubcurrency from "@/lib/convertToSubCurrency";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CheckoutPageProp = {
  amount: number;
  lawyerId: string;
  date: string;
};

const CheckoutPage = (props: CheckoutPageProp) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const amount = props?.amount;
  const lawyerId = props?.lawyerId;
  const bookDate = props?.date;

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
          }
        );
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        setErrorMessage("Failed to initialize payment. Please try again.");
      } finally {
        setIsInitializing(false);
      }
    };

    initializePayment();
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!stripe || !elements) {
        throw new Error("Stripe has not loaded yet.");
      }

      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) {
        throw new Error("Card number element not found. Please try again.");
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardNumberElement },
      });

      if (error) {
        throw new Error(error.message || "Payment failed. Please try again.");
      }

      // Payment successful
      if (lawyerId == "gaada") {
        await Promise.all([
          fetch("http://localhost:3000/api/subs", { method: "POST" }),
          fetch("http://localhost:3000/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount,
              paymentType: "subscription",
              status: "Success",
            }),
          }),
        ]);
        router.push("/");
      } else {
        await Promise.all([
          fetch("/api/roomchats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              participants: [lawyerId],
              bookDate,
            }),
          }),
          fetch("http://localhost:3000/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount,
              paymentType: "consultation",
              status: "Success",
            }),
          }),
        ]);
        router.push("/payment-success");
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-600">Mempersiapkan pembayaran...</p>
        </div>
      </div>
    );
  }

  const cardStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        fontFamily: '"Inter", sans-serif',
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "16px",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-xl mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-8">
            {lawyerId == "gaada" ? "Berlangganan" : "Jasa Konsultasi"}
          </h1>

          <div className="bg-primary/5 p-6 rounded-xl mb-8">
            <p className="text-lg text-slate-900">
              Total Pembayaran:
              <span className="ml-2 text-xl font-bold text-primary">
                Rp {amount.toLocaleString()}
              </span>
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Nomor Kartu
              </label>
              <div className="border-2 rounded-xl p-4 bg-white focus-within:border-primary transition-colors">
                <CardNumberElement options={cardStyle} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Tanggal Kadaluarsa
                </label>
                <div className="border-2 rounded-xl p-4 bg-white focus-within:border-primary transition-colors">
                  <CardExpiryElement options={cardStyle} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  CVC
                </label>
                <div className="border-2 rounded-xl p-4 bg-white focus-within:border-primary transition-colors">
                  <CardCvcElement options={cardStyle} />
                </div>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe || loading}
            className={`
              mt-8 w-full bg-primary text-white py-4 px-6 rounded-xl text-lg font-semibold
              hover:bg-primary/90 transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              ${loading ? "animate-pulse" : ""}
            `}
          >
            {loading ? "Memproses pembayaran..." : "Bayar Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
