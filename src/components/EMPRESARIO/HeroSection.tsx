"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, TrendingUp, Users } from "lucide-react";

const heroStats = [
  { icon: TrendingUp, label: "Events", value: "5" },
  { icon: Users, label: "Participants", value: "500+" },
];

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/ecell/image/upload/v1762153685/heroImage_yxzllr.webp')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_20%_6%/0.7)] via-[hsl(220_20%_6%/0.5)] to-[hsl(220_20%_6%/0.9)]" />

      {/* Animated gradient accents */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, hsl(38 95% 55% / 0.12) 0%, transparent 50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 70% 80%, hsl(210 60% 50% / 0.15) 0%, transparent 50%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto max-w-5xl px-4 text-center"
      >
        {/* E-Cell branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="empresario-font-body text-sm tracking-[0.3em] text-[hsl(38_95%_55%/0.9)] uppercase md:text-base">
            E-Cell NIT Silchar Presents
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="empresario-font-display empresario-text-glow mb-4 text-6xl font-black tracking-wider md:text-8xl lg:text-9xl"
        >
          <span className="bg-gradient-to-b from-[hsl(38_95%_65%)] via-[hsl(38_95%_55%)] to-[hsl(35_85%_42%)] bg-clip-text text-transparent">
            EMPRESARIO
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="empresario-font-body mb-2 text-lg tracking-wide text-[hsl(210_20%_95%/0.8)] md:text-xl"
        >
          The Entrepreneurship Module of
        </motion.p>

        {/* Tagline */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="empresario-font-display mb-8 text-3xl font-bold text-[hsl(210_20%_95%)] md:text-4xl lg:text-5xl"
        >
          Tecnoesis 2026
        </motion.h3>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <motion.button
            onClick={() => scrollToSection("#about")}
            className="empresario-font-body rounded-full bg-gradient-to-r from-[hsl(38_95%_55%)] to-[hsl(35_85%_42%)] px-8 py-3 text-sm font-semibold tracking-wider text-[hsl(220_20%_6%)] uppercase"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About Empresario
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("#events")}
            className="empresario-font-body rounded-full border border-[hsl(38_95%_55%/0.5)] px-8 py-3 text-sm font-semibold tracking-wider text-[hsl(38_95%_55%)] uppercase transition-colors hover:bg-[hsl(38_95%_55%/0.1)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Events
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-[hsl(38_95%_55%/0.2)] bg-[hsl(220_20%_6%/0.6)] px-5 py-3 backdrop-blur-sm"
            >
              <stat.icon className="h-5 w-5 text-[hsl(38_95%_55%)]" />
              <div className="text-left">
                <div className="empresario-font-display text-xl font-bold text-[hsl(210_20%_95%)]">
                  {stat.value}
                </div>
                <div className="empresario-font-body text-xs text-[hsl(210_20%_95%/0.6)]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-[hsl(210_20%_95%/0.5)]">
          <span className="empresario-font-body text-xs tracking-widest">
            SCROLL
          </span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
