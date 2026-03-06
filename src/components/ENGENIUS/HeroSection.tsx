"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <section
      ref={ref}
      id="home"
      className="engenius-blood-splatter relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[hsl(0_0%_4%)] via-[hsl(0_0%_4%/0.8)] to-[hsl(0_0%_4%)]" />
        <Image
          src="/ENGENIUS/engenius-hero.png"
          alt="ENGENIUS"
          fill
          className="object-cover object-top opacity-40"
        />
      </motion.div>

      {/* Radial glow */}
      <div className="engenius-gradient-radial absolute inset-0 z-10" />

      <motion.div
        style={{ opacity }}
        className="relative z-20 container mx-auto px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="engenius-font-heading mb-4 text-sm tracking-[0.3em] text-[hsl(0_72%_51%)] md:text-base"
        >
          E-CELL NIT SILCHAR PRESENTS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="engenius-font-display mb-2 text-6xl font-black tracking-wider text-[hsl(40_20%_95%)] md:text-8xl lg:text-9xl"
        >
          MR. <span className="engenius-glow-red text-[hsl(0_72%_51%)]">&</span>{" "}
          MS.
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="engenius-font-heading engenius-glow-red-subtle text-7xl leading-none font-bold tracking-[0.1em] text-[hsl(40_20%_95%)] md:text-9xl lg:text-[12rem]"
        >
          ENGENIUS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="engenius-font-heading mt-6 text-xl tracking-[0.2em] text-[hsl(0_72%_51%)] md:text-2xl"
        >
          3.0
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-lg font-light text-[hsl(40_20%_95%/0.7)] md:text-xl"
        >
          Unmask your entrepreneurial spirit. Five events. One ultimate
          challenge.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row"
        >
          <motion.a
            href="#events"
            className="engenius-font-heading engenius-animate-pulse-glow rounded border border-[hsl(0_72%_51%)] bg-[hsl(0_72%_51%)] px-10 py-4 text-lg tracking-wider text-[hsl(40_20%_95%)] transition-all hover:bg-[hsl(0_72%_51%/0.9)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EXPLORE EVENTS
          </motion.a>
          <motion.a
            href="#gallery"
            className="engenius-font-heading rounded border border-[hsl(40_20%_95%/0.3)] bg-transparent px-10 py-4 text-lg tracking-wider text-[hsl(40_20%_95%)] transition-all hover:border-[hsl(0_72%_51%)] hover:text-[hsl(0_72%_51%)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW GALLERY
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-[hsl(40_20%_95%/0.5)]"
        >
          <span className="engenius-font-heading text-xs tracking-widest">
            SCROLL
          </span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
