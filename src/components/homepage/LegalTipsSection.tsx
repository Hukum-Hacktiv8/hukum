"use client";

import { motion } from "framer-motion";
import TipsCard from "../TipsCard";

export default function LegalTipsSection() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-lora text-white mb-4">
            Legal Tips & Insights
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Stay informed with our latest legal articles and tips
          </p>
        </motion.div>
        <TipsCard />
      </div>
    </section>
  );
}
