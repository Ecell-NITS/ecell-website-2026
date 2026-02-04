"use client";

import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section id="register" className="relative overflow-hidden py-32">
      {/* Background with torn edges */}
      <div className="eminence-torn-edge-top eminence-torn-edge-bottom absolute inset-0 bg-[hsl(195_100%_50%)]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="eminence-font-display mb-6 text-4xl font-black text-[hsl(220_30%_6%)] md:text-6xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            READY TO ENTER THE TRIANGLE?
          </motion.h2>

          <motion.p
            className="mx-auto mb-10 max-w-xl text-lg text-[hsl(220_30%_6%/0.8)] md:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Join us for three days of intense entrepreneurial challenges. Where
            ideas disappear to reappear stronger.
          </motion.p>

          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="eminence-font-display rounded-lg bg-[hsl(220_30%_6%)] px-10 py-4 text-lg tracking-wider text-[hsl(195_100%_50%)] uppercase transition-colors hover:bg-[hsl(40_20%_95%)] hover:text-[hsl(220_30%_6%)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.button>

            <motion.button
              className="eminence-font-display rounded-lg border-2 border-[hsl(220_30%_6%)] px-10 py-4 text-lg tracking-wider text-[hsl(220_30%_6%)] uppercase transition-colors hover:bg-[hsl(220_30%_6%/0.1)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative triangles */}
      <motion.div
        className="absolute top-10 left-10 h-0 w-0 opacity-20"
        style={{
          borderLeft: "30px solid transparent",
          borderRight: "30px solid transparent",
          borderBottom: "52px solid hsl(220, 30%, 6%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-10 bottom-10 h-0 w-0 opacity-20"
        style={{
          borderLeft: "40px solid transparent",
          borderRight: "40px solid transparent",
          borderBottom: "69px solid hsl(220, 30%, 6%)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
};

export default CTASection;
