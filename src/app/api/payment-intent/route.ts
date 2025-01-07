import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "idr",
      automatic_payment_methods: { enabled: true },
    });
    // console.log(paymentIntent, "p");
    // console.log(amount, "aaaaaaaa");
    // console.log(paymentIntent.client_secret, "client_secret");
    
    

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      {
        status: 200,
        // message: "Success pembayaran konsultasi",
      }
    );
  } catch (error) {
    console.error("Internal Error:", error);

    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
