"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="relative overflow-hidden py-32">
      {/* Torn paper top edge - cyan accent */}
      <div className="eminence-torn-edge-bottom absolute top-0 right-0 left-0 z-10 h-16 bg-[hsl(195_100%_50%)]" />

      <div className="relative z-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          {/* Section title */}
          <motion.div
            className="mb-12 flex items-center gap-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(195_100%_50%)] to-transparent" />
            <h2 className="eminence-font-display eminence-glow-subtle text-4xl font-bold md:text-5xl">
              ABOUT
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(195_100%_50%)] to-transparent" />
          </motion.div>

          {/* Content card */}
          <motion.div
            className="eminence-card-electric relative rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Decorative corner elements */}
            <div className="absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2 border-[hsl(195_100%_50%/0.5)]" />
            <div className="absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2 border-[hsl(195_100%_50%/0.5)]" />
            <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-[hsl(195_100%_50%/0.5)]" />
            <div className="absolute right-4 bottom-4 h-8 w-8 border-r-2 border-b-2 border-[hsl(195_100%_50%/0.5)]" />

            <motion.h3
              className="eminence-font-display mb-6 text-2xl text-[hsl(195_100%_50%)] md:text-3xl"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              The Bermuda Triangle of Entrepreneurship
            </motion.h3>

            <motion.p
              className="mb-6 text-lg text-[hsl(40_20%_95%/0.6)] italic"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              &ldquo;Where Ideas Disappear to Reappear Stronger&rdquo;
            </motion.p>

            <div className="space-y-4 leading-relaxed text-[hsl(40_20%_95%/0.8)]">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                Eminence is E-Cell NIT Silchar&apos;s most mystifying and
                intellectually thrilling event, often hailed as the Bermuda
                Triangle of Entrepreneurship.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9 }}
              >
                Just like the mysteries of the triangle, participants enter with
                raw ideas, uncertainties, and questions — only to emerge with
                sharper strategies, bolder visions, and renewed entrepreneurial
                confidence.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1 }}
              >
                It blends case studies, real-world problem solving,
                brainstorming challenges, and unconventional business scenarios
                that test wit, creativity, and resilience.
              </motion.p>

              <motion.p
                className="pt-4 text-lg font-medium text-[hsl(195_100%_50%)]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.1 }}
              >
                In short, Eminence is where the ordinary disappears and the
                extraordinary emerges.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Torn paper bottom edge */}
      <div className="eminence-torn-edge-top absolute right-0 bottom-0 left-0 z-10 h-16 bg-[hsl(195_100%_50%)]" />
    </section>
  );
};

export default AboutSection;
