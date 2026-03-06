"use client";

import { motion } from "framer-motion";
import { Bell, Sparkles } from "lucide-react";

const ConclusionSection = () => {
  return (
    <section className="relative overflow-hidden px-4 py-24">
      <div className="relative z-10 container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] border border-[hsl(195_100%_50%/0.2)] bg-[hsl(220_30%_6%/0.5)] p-8 text-center backdrop-blur-xl md:p-16"
        >
          {/* Background Effects */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, hsla(195, 100%, 50%, 0.15) 0%, transparent 70%)",
            }}
          />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[hsl(195_100%_50%/0.15)] blur-[100px]" />

          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[hsl(195_100%_50%/0.3)] bg-[hsl(195_100%_50%/0.1)] px-4 py-1.5 text-[hsl(195_100%_50%)]">
            <Sparkles className="h-3 w-3" />
            <span className="eminence-font-display text-sm tracking-wider uppercase">
              Eminence 2025 Successfully Concluded
            </span>
          </div>

          {/* Title */}
          <h2 className="eminence-font-display mb-6 text-4xl leading-tight text-[hsl(40_20%_95%)] md:text-6xl">
            Thank You for Being Part of <br />
            <span className="eminence-text-gradient-electric">EMINENCE!</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[hsl(40_20%_95%/0.6)] md:text-xl">
            This was an incredible journey through the Bermuda Triangle of
            Entrepreneurship. Your ideas disappeared and reappeared stronger!
            Stay tuned for EMINENCE 2026 — where even more visionary ideas will
            meet capital.
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group eminence-font-display mb-8 inline-flex items-center gap-3 rounded-full border border-[hsl(195_100%_50%/0.2)] bg-[hsl(220_30%_8%)] px-8 py-4 tracking-wider text-[hsl(40_20%_95%)] transition-all hover:border-[hsl(195_100%_50%/0.4)] hover:bg-[hsl(220_30%_10%)] hover:shadow-[0_0_30px_hsla(195,100%,50%,0.15)]"
          >
            <Bell className="h-4 w-4 text-[hsl(195_100%_50%)] transition-transform group-hover:rotate-12" />
            <span>Get Ready for EMINENCE 2026</span>
          </motion.button>

          {/* Footer Text */}
          <p className="text-sm text-[hsl(40_20%_95%/0.4)]">
            Follow us to be the first to know when registrations open!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ConclusionSection;
