"use client";

import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_20%_6%)] via-[hsl(220_18%_8%)] to-[hsl(220_20%_6%)]" />

      {/* Decorative gradient */}
      <div
        className="absolute top-0 left-1/2 h-full w-1/2 -translate-x-1/2 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(38 95% 55% / 0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          {/* Section Header */}
          <div className="mb-12 text-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="empresario-font-body mb-4 block text-sm tracking-[0.2em] text-[hsl(38_95%_55%)] uppercase"
            >
              About The Event
            </motion.span>
            <h2 className="empresario-font-display text-4xl font-bold text-[hsl(210_20%_95%)] md:text-6xl">
              About{" "}
              <span className="empresario-text-gradient-gold">EMPRESARIO</span>
            </h2>
          </div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl border border-[hsl(38_95%_55%/0.2)] bg-[hsl(220_18%_10%/0.8)] p-8 backdrop-blur-sm md:p-12"
          >
            <p className="empresario-font-body mb-6 text-lg leading-relaxed text-[hsl(40_20%_95%/0.85)]">
              <span className="font-semibold text-[hsl(45_100%_60%)]">
                EMPRESARIO
              </span>
              , the flagship entrepreneurial challenge of E-Cell NIT Silchar is
              back, a space where ideas begin as individual points and gradually
              connect, like elements on a grid, forming something greater than
              the sum of their parts. It&apos;s not just a competition;
              it&apos;s an environment for thinkers, builders, and dreamers who
              believe every idea has a place, it just needs the right alignment.
            </p>

            <div className="mb-6 space-y-3 text-[hsl(210_20%_95%/0.8)]">
              <p className="empresario-font-body text-lg italic">
                Here, every pitch is a piece of the puzzle.
              </p>
              <p className="empresario-font-body text-lg italic">
                Every challenge shifts your perspective.
              </p>
              <p className="empresario-font-body text-lg italic">
                Every conversation draws a new line on your canvas.
              </p>
            </div>

            <div className="mb-6 rounded-xl border border-[hsl(38_95%_55%/0.2)] bg-[hsl(38_95%_55%/0.1)] p-6">
              <p className="empresario-font-body text-lg text-[hsl(210_20%_95%/0.9)]">
                <span className="font-semibold">Pitch.</span>{" "}
                <span className="font-semibold">Compete.</span>{" "}
                <span className="font-semibold">Collaborate.</span>
              </p>
              <p className="empresario-font-body mt-2 text-[hsl(210_20%_95%/0.8)]">
                Find your pattern. Build your framework. And grow into the
                entrepreneur you aspire to be.
              </p>
            </div>

            {/* Date highlight */}
            <div className="text-center">
              <span className="empresario-font-display inline-block rounded-full bg-gradient-to-r from-[hsl(38_95%_55%)] to-[hsl(35_85%_42%)] px-8 py-3 text-lg font-bold text-[hsl(220_20%_6%)]">
                16th - 18th January
              </span>
              <p className="empresario-font-body mt-4 text-sm text-[hsl(210_20%_95%/0.6)]">
                Unleash your entrepreneurial spirit.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
