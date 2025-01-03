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
    title: "Criminal Defense",
    desc: "Expert defense in criminal cases with proven track record",
    color: "from-[#B8860B]/10 to-[#DAA520]/10",
  },
  {
    icon: <MdBusiness className="text-5xl" />,
    title: "Corporate Law",
    desc: "Comprehensive legal solutions for your business",
    color: "from-[#B8860B]/10 to-[#DAA520]/10",
  },
  {
    icon: <MdFamilyRestroom className="text-5xl" />,
    title: "Family Law",
    desc: "Sensitive handling of family legal matters",
    color: "from-[#B8860B]/10 to-[#DAA520]/10",
  },
  {
    icon: <MdGavel className="text-5xl" />,
    title: "Civil Litigation",
    desc: "Professional representation in civil disputes",
    color: "from-[#B8860B]/10 to-[#DAA520]/10",
  },
  {
    icon: <MdRealEstateAgent className="text-5xl" />,
    title: "Real Estate Law",
    desc: "Expert guidance in property transactions",
    color: "from-[#B8860B]/10 to-[#DAA520]/10",
  },
  {
    icon: <MdAttachMoney className="text-5xl" />,
    title: "Tax Law",
    desc: "Strategic tax planning and dispute resolution",
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
            Our Legal Services
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Comprehensive legal solutions tailored to your needs
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
