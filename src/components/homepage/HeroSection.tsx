"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
  );
}
