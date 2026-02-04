"use client";

import { motion } from "framer-motion";
import { Rocket, Sparkles } from "lucide-react";

const ConclusionSection = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_20%_6%)] via-[hsl(220_18%_10%)] to-[hsl(220_20%_6%)]" />

      {/* Decorative glow */}
      <div
        className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-20"
        style={{
          background:
            "radial-gradient(circle, hsl(38 95% 55% / 0.25) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[hsl(38_95%_55%)] to-[hsl(35_85%_42%)] p-4"
          >
            <Rocket className="h-8 w-8 text-[hsl(220_20%_6%)]" />
          </motion.div>

          <h2 className="empresario-font-display mb-6 text-4xl font-bold text-[hsl(210_20%_95%)] md:text-5xl lg:text-6xl">
            Ready to{" "}
            <span className="empresario-text-gradient-gold">Unleash</span> Your
            Potential?
          </h2>

          <p className="empresario-font-body mb-8 text-lg text-[hsl(210_20%_95%/0.7)]">
            Join hundreds of aspiring entrepreneurs at EMPRESARIO 2026. Connect,
            compete, and create the future of business innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.a
              href="#events"
              className="empresario-font-body inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[hsl(38_95%_55%)] to-[hsl(35_85%_42%)] px-8 py-4 text-sm font-semibold tracking-wider text-[hsl(220_20%_6%)] uppercase"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-4 w-4" />
              Explore Events
            </motion.a>
          </div>

          {/* Event dates reminder */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 inline-flex items-center gap-3 rounded-full border border-[hsl(38_95%_55%/0.2)] bg-[hsl(220_18%_10%/0.8)] px-6 py-3"
          >
            <span className="empresario-font-body text-sm text-[hsl(210_20%_95%/0.6)]">
              Mark your calendars:
            </span>
            <span className="empresario-font-display font-bold text-[hsl(38_95%_55%)]">
              16th - 18th January 2026
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConclusionSection;
