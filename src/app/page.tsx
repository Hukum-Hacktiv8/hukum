"use client";

import { FaComments } from "react-icons/fa";
import { motion } from "framer-motion";
import WaveDivider from "@/components/wave-divider";
import HeroSection from "@/components/homepage/HeroSection";
import StatsSection from "@/components/homepage/StatsSection";
import ServicesSection from "@/components/homepage/ServicesSection";
import LegalTipsSection from "@/components/homepage/LegalTipsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <motion.a
        href="/chats"
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-[#1a4b69] to-[#1a3f69] p-4 rounded-full shadow-lg hover:from-[#153d57] hover:to-[#153557] transition-all duration-300"
      >
        <FaComments className="text-white text-2xl" />
      </motion.a>

      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <LegalTipsSection />

      <div className="bg-slate-900">
        <WaveDivider />
      </div>
    </main>
  );
}
