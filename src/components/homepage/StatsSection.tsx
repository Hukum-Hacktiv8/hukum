"use client";

import { motion } from "framer-motion";
import { FaBalanceScale, FaGavel, FaHandshake } from "react-icons/fa";

const stats = [
  { number: "500+", text: "Cases Won", icon: <FaGavel /> },
  { number: "15+", text: "Years Experience", icon: <FaBalanceScale /> },
  { number: "1000+", text: "Happy Clients", icon: <FaHandshake /> },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-all group"
          >
            <div className="text-[#DAA520] mb-4 flex justify-center text-4xl">
              {stat.icon}
            </div>
            <motion.h3 className="text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-transparent bg-clip-text mb-2">
              {stat.number}
            </motion.h3>
            <p className="text-white/80 text-lg">{stat.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
