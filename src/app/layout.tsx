import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Hacktivist Indonesia",
  description: "Hacktivist Indonesia",
  icons: "/logo.png",
};

import { cookies } from "next/headers";
import { verifyJoseToken } from "@/utils/jwt";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token?.value) {
    const payload = await verifyJoseToken<{ id: string; email: string; username: string }>(token.value);
    console.log("payload: ", payload);
  }

  return (
    <html lang="en">
      <body className={`${lora.variable} font-lora`}>
        <Navbar token={token} />
        <div className="mt-16">{children}</div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
