"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import {
  MdSecurity,
  MdBusiness,
  MdFamilyRestroom,
  MdGavel,
  MdRealEstateAgent,
  MdAttachMoney,
} from "react-icons/md";

const services = [
  {
    icon: <MdSecurity className="text-5xl" />,
    title: "Hukum Pidana",
    desc: "Pembelaan ahli dalam kasus pidana dengan rekam jejak terbukti",
    color: "from-[#B8860B]/10 to-[#DAA520]/10",
  },
  {
    icon: <MdBusiness className="text-5xl" />,
    title: "Hukum Perusahaan",
    desc: "Solusi hukum menyeluruh untuk bisnis Anda",
    color: "from-[#B8860B]/10 to-[#DAA520]/10",
  },
  {
    icon: <MdFamilyRestroom className="text-5xl" />,
    title: "Hukum Keluarga",
    desc: "Pemrosesan yang sensitif terkait hukum keluarga",
    color: "from-[#B8860B]/10 to-[#DAA520]/10",
  },
  {
    icon: <MdGavel className="text-5xl" />,
    title: "Litigasi Hukum",
    desc: "Representasi profesional dalam perselisihan hukum",
    color: "from-[#B8860B]/10 to-[#DAA520]/10",
  },
  {
    icon: <MdRealEstateAgent className="text-5xl" />,
    title: "Hukum Tanah",
    desc: "Panduan ahli dalam transaksi properti",
    color: "from-[#B8860B]/10 to-[#DAA520]/10",
  },
  {
    icon: <MdAttachMoney className="text-5xl" />,
    title: "Hukum Pajak",
    desc: "Perencanaan pajak strategis dan penyelesaian perselisihan",
    color: "from-[#B8860B]/10 to-[#DAA520]/10",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-slate-900 relative">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-lora text-[#DAA520] mb-4">
            Layanan Hukum Kami
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Solusi hukum menyeluruh yang disesuaikan dengan kebutuhan Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-slate-800/50 border border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-all group"
            >
              <div className="text-[#DAA520] mb-4 transform group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-white/70 mb-6">{service.desc}</p>
              <button className="text-[#DAA520] group-hover:text-[#FFD700] flex items-center gap-2">
                Learn More{" "}
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
