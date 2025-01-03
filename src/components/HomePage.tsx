"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FaBalanceScale, FaGavel, FaHandshake, FaArrowRight, FaComments } from "react-icons/fa";
import { MdSecurity, MdBusiness, MdFamilyRestroom, MdGavel, MdRealEstateAgent, MdAttachMoney } from "react-icons/md";
import TipsCard from "./TipsCard";
import WaveDivider from "./wave-divider";
import { useRef } from "react";

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

export default function HomePage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <main className="min-h-screen">
      <motion.a
        href="/chats"
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-[#1a4b69] to-[#1a3f69] p-4 rounded-full shadow-lg hover:from-[#153d57] hover:to-[#153557] transition-all duration-300"
      >
        <FaComments className="text-white text-2xl" />
      </motion.a>

      <section ref={targetRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#B8860B]/20 to-black/50 z-10" />
        <motion.div
          style={{
            scale: videoScale,
            opacity: videoOpacity,
          }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/dngm0voif/video/upload/v1735297045/Skyscraper_Building_City_Urban_4K_Free_HD_Stock_Footage_-_No_Copyright_Skyscraper_Building_sky_xufzgo.mp4" />
          </video>
        </motion.div>
        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              {...motionProps}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-6xl md:text-7xl font-lora mb-6 leading-tight">
                <span className="text-white">Protecting Your Rights,</span>
                <br />
                <span className="bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] text-transparent bg-clip-text">
                  Securing Your Future
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                With over 15 years of experience, we provide expert legal
                solutions tailored to your unique situation.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#B8860B] to-[#DAA520] hover:from-[#DAA520] hover:to-[#B8860B] rounded-lg text-white text-lg shadow-lg shadow-[#B8860B]/20 transition-all duration-300"
              >
                Free Consultation
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "500+", text: "Cases Won", icon: <FaGavel /> },
            {
              number: "15+",
              text: "Years Experience",
              icon: <FaBalanceScale />,
            },
            { number: "1000+", text: "Happy Clients", icon: <FaHandshake /> },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              {...motionProps}
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

      <section className="py-20 bg-slate-900 relative">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
        <div className="container mx-auto px-4 relative">
          <motion.div {...motionProps} className="text-center mb-16">
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
                {...motionProps}
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
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div {...motionProps} className="text-center mb-16">
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

      <div className="bg-slate-900">
        <WaveDivider />
      </div>
    </main>
  );
}
