"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={containerRef}
      className="eic-spotify-gradient-bg relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Album Covers Background */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-20 w-20 rounded-lg opacity-10 md:h-28 md:w-28"
            style={{
              left: `${5 + i * 12}%`,
              top: `${15 + (i % 3) * 30}%`,
              backgroundImage: `url(/EIC/eic-main-poster.png)`,
              backgroundSize: "cover",
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(141_73%_42%/0.2)] blur-[120px]" />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 px-4 pt-20 text-center"
      >
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-4xl font-black tracking-tight drop-shadow-2xl sm:text-5xl md:text-7xl lg:text-8xl"
        >
          <span className="text-white drop-shadow-lg">ENTREPRENEURSHIP</span>
          <br />
          <span className="eic-glow-text text-6xl text-[hsl(141_73%_42%)] md:text-8xl lg:text-9xl">
            &
          </span>
          <br />
          <span className="text-white">INNOVATION CHALLENGE</span>
        </motion.h1>

        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 mb-6 flex items-center justify-center gap-4"
        >
          <div className="rounded-full bg-white px-6 py-2 text-lg font-bold text-black">
            26-29 JAN
          </div>
          <div className="h-0.5 w-12 bg-amber-50" />
          <span className="font-medium text-[hsl(0_0%_70%)]">E-CELL</span>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="inline-block rounded-full border border-[hsl(0_0%_20%)] bg-[hsl(0_0%_11%/0.3)] px-8 py-3 backdrop-blur-md"
        >
          <p className="text-lg font-medium text-white">
            Innovate. Compete. Conquer.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
