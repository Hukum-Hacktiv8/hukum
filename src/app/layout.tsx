import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { startCronJobs } from "@/utils/cron";
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
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

startCronJobs();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token: RequestCookie | undefined = cookies().get("token");
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
