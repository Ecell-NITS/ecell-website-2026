"use client";

import { motion } from "framer-motion";
import { Sparkles, Bell } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-[hsl(141_73%_42%/0.2)] blur-[100px]" />
        <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-[hsl(141_73%_42%/0.1)] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="eic-spotify-card relative overflow-hidden rounded-3xl p-8 text-center md:p-12"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(141_73%_42%/0.1)] via-transparent to-transparent" />

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-[hsl(141_73%_42%/0.2)] px-4 py-2 text-sm font-medium text-[hsl(141_73%_42%)]"
            >
              <Sparkles className="h-4 w-4" />
              EIC 2025 Successfully Concluded
            </motion.div>

            <h2 className="mb-4 text-3xl font-black text-white md:text-5xl">
              Thank You for Being Part of
              <br />
              <span className="text-[hsl(141_73%_42%)]">EIC 2025!</span>
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-[hsl(0_0%_70%)]">
              This was an incredible journey of innovation, entrepreneurship,
              and creativity. Stay tuned for EIC 2026 — bigger, bolder, and even
              more exciting!
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 rounded-full border border-[hsl(0_0%_20%/0.5)] bg-[hsl(0_0%_15%/0.5)] px-6 py-4"
              >
                <Bell className="h-5 w-5 text-[hsl(141_73%_42%)]" />
                <span className="font-medium text-white">
                  Get Ready for EIC 2026
                </span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-sm text-[hsl(0_0%_70%)]"
            >
              Follow us to be the first to know when registrations open!
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
