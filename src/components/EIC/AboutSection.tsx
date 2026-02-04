"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, Sparkles, Trophy, Users } from "lucide-react";
import { useRef } from "react";

const stats = [
  { icon: Clock, value: "4", label: "Days of Innovation" },
  { icon: Users, value: "500+", label: "Expected Participants" },
  { icon: Trophy, value: "5", label: "Exciting Events" },
  { icon: Sparkles, value: "₹50K+", label: "Prize Pool" },
];

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative overflow-hidden py-24"
    >
      <motion.div style={{ opacity }} className="mx-auto max-w-6xl px-4">
        {/* About Content */}
        <div className="mb-20 grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="h-8 w-1 rounded-full bg-[hsl(141_73%_42%)]" />
              <span className="text-sm font-medium tracking-widest text-[hsl(141_73%_42%)] uppercase">
                About EIC
              </span>
            </div>
            <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
              Where Ideas
              <span className="text-[hsl(141_73%_42%)]"> Hit Play</span>
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-[hsl(0_0%_70%)]">
              The Entrepreneurship & Innovation Challenge is NIT Silchar&apos;s
              flagship entrepreneurship event, organized by E-Cell. Like your
              favorite playlist that keeps you motivated, EIC brings together
              the best minds to innovate, compete, and conquer.
            </p>
            <p className="leading-relaxed text-[hsl(0_0%_70%)]">
              This year&apos;s Spotify-themed edition features five unique
              &quot;tracks&quot; of events, each designed to test different
              aspects of your entrepreneurial spirit. From strategic thinking to
              creative problem-solving, EIC 2025 is your stage to shine.
            </p>
          </motion.div>

          {/* 3D Album Stack */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="eic-perspective-1000 relative"
          >
            <div className="relative mx-auto h-80 w-80">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 overflow-hidden rounded-xl border border-[hsl(0_0%_20%)] bg-gradient-to-br from-[hsl(0_0%_11%)] to-[hsl(0_0%_15%)]"
                  style={{
                    zIndex: 3 - i,
                    transform: `rotateY(${i * 5}deg) rotateX(${i * 2}deg) translateZ(${-i * 20}px)`,
                  }}
                  animate={{
                    rotateY: [i * 5, i * 5 + 5, i * 5],
                    rotateX: [i * 2, i * 2 + 2, i * 2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[hsl(141_73%_42%/0.2)] to-transparent" />
                  <div className="absolute right-4 bottom-4 left-4">
                    <div className="mb-2 h-2 rounded-full bg-[hsl(0_0%_15%)]">
                      <div className="h-full w-2/3 rounded-full bg-[hsl(141_73%_42%)]" />
                    </div>
                    <p className="text-xs text-[hsl(0_0%_70%)]">
                      Now playing: EIC 2025
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="eic-spotify-card rounded-xl p-6 text-center"
            >
              <stat.icon className="mx-auto mb-4 h-8 w-8 text-[hsl(141_73%_42%)]" />
              <p className="mb-1 text-3xl font-black text-white">
                {stat.value}
              </p>
              <p className="text-sm text-[hsl(0_0%_70%)]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
