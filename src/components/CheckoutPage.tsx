"use client";

import convertToSubcurrency from "@/lib/convertToSubCurrency";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js";
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

  useEffect(() => {
    fetch("http://localhost:3000/api/payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setErrorMessage("Card number element not found. Please try again.");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
      },
    });

    if (error) {
      setErrorMessage(error.message || "Payment failed. Please try again.");
    } else {
      await fetch("http://localhost:3000/api/subs", {
        method: "POST",
      });
      router.push("/");
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex justify-center p-5">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">{lawyerId == "gaada" ? "Berlangganan" : "Jasa Konsultasi"}</h1>
      <p className="mb-4 text-gray-600">Total Harga: Rp.{amount}</p>

      <div className="space-y-4">
        <div>
          <label htmlFor="card-number" className="block mb-1 text-sm font-medium">
            Card Number
          </label>
          <div className="border rounded p-2">
            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="expiry" className="block mb-1 text-sm font-medium">
              Expiration Date
            </label>
            <div className="border rounded p-2">
              <CardExpiryElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="cvc" className="block mb-1 text-sm font-medium">
              CVC
            </label>
            <div className="border rounded p-2">
              <CardCvcElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

      <button type="submit" className={`mt-6 w-full btn btn-primary ${loading ? "disabled:opacity-50 disabled:animate-pulse" : ""}`} disabled={!stripe || loading}>
        {loading ? "Sedang di proses..." : "Bayar Sekarang"}
      </button>
    </form>
  );
};

export default CheckoutPage;
