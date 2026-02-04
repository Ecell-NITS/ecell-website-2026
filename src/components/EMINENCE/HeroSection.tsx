"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import LightningEffect from "./LightningEffect";
import ParticleField from "./ParticleField";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Deep dark background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(222, 50%, 2%) 0%, hsl(222, 50%, 4%) 30%, hsl(225, 55%, 6%) 100%)",
        }}
      />

      {/* Storm clouds effect */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% -20%, hsl(220, 60%, 15%) 0%, transparent 60%)",
        }}
      />

      {/* Fog/mist overlay */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, hsl(215 90% 40% / 0.2) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Triangle background effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="h-0 w-0 opacity-8"
          style={{
            borderLeft: "280px solid transparent",
            borderRight: "280px solid transparent",
            borderBottom: "485px solid hsl(215, 90%, 40%)",
            filter: "blur(2px)",
          }}
          animate={{
            opacity: [0.04, 0.1, 0.04],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <LightningEffect />
      <ParticleField />

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto max-w-5xl px-4 text-center"
      >
        {/* Event Completed Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(195_100%_50%/0.3)] bg-[hsl(195_100%_50%/0.1)] px-4 py-1.5 text-[hsl(195_100%_50%)]">
            <Sparkles className="h-3 w-3" />
            <span className="eminence-font-display text-sm tracking-wider uppercase">
              Successfully Concluded
            </span>
          </div>
        </motion.div>

        {/* E-Cell branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <span className="eminence-font-display text-sm tracking-[0.3em] text-[hsl(195_100%_50%/0.8)] uppercase md:text-base">
            E-Cell NIT Silchar Presents
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="eminence-font-display eminence-text-glow mb-6 text-6xl font-black tracking-wider md:text-8xl lg:text-9xl"
        >
          <span className="eminence-animate-flicker bg-gradient-to-b from-[hsl(40_20%_95%)] via-[hsl(40_20%_95%)] to-[hsl(195_100%_50%)] bg-clip-text text-transparent">
            EMINENCE
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="eminence-font-body mb-4 text-xl tracking-wide text-[hsl(40_20%_95%/0.8)] md:text-2xl lg:text-3xl"
        >
          Where Vision Meets Capital
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="eminence-font-body mb-8 text-base text-[hsl(40_20%_95%/0.6)] italic md:text-lg"
        >
          &ldquo;The Bermuda Triangle of Entrepreneurship&rdquo;
        </motion.p>

        {/* Explore CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#events"
            className="eminence-font-display rounded-lg bg-gradient-to-r from-[hsl(195_100%_50%)] to-[hsl(190_100%_42%)] px-10 py-4 text-lg tracking-wider text-[hsl(220_30%_6%)] uppercase"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Events
          </motion.a>
          <motion.a
            href="#gallery"
            className="eminence-font-display rounded-lg border border-[hsl(195_100%_50%/0.5)] px-10 py-4 text-lg tracking-wider text-[hsl(195_100%_50%)] uppercase transition-colors hover:bg-[hsl(195_100%_50%/0.1)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Gallery
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-[hsl(40_20%_95%/0.5)]">
          <span className="eminence-font-display text-xs tracking-widest">
            SCROLL
          </span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
