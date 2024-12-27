import type { Metadata } from "next";
import { Lora } from 'next/font/google'
import "./globals.css";
import Navbar from "@/components/navbar";

const lora = Lora({ 
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-lora'
})

export const metadata: Metadata = {
    title: "Hacktivist Indonesia",
    description: "Hacktivist Indonesia",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${lora.variable} font-lora`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
