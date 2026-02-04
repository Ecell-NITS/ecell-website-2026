"use client";

import { motion } from "framer-motion";
import { Target, Users, Lightbulb, Trophy } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Participants" },
  { icon: Lightbulb, value: "50+", label: "Startups Pitched" },
  { icon: Trophy, value: "₹50K+", label: "Prize Pool" },
  { icon: Target, value: "5", label: "Events" },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="engenius-noise-overlay relative overflow-hidden bg-[hsl(0_0%_7%)] py-32"
    >
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <span className="engenius-font-heading text-sm tracking-[0.3em] text-[hsl(0_72%_51%)] uppercase">
                About The Event
              </span>
              <h2 className="engenius-font-display mt-4 text-5xl leading-tight text-[hsl(40_20%_95%)] md:text-7xl">
                UNLEASH YOUR
                <br />
                <span className="engenius-text-gradient-blood engenius-glow-red">
                  ENTREPRENEURIAL
                </span>
                <br />
                SPIRIT
              </h2>
            </div>

            <p className="text-lg leading-relaxed text-[hsl(0_0%_60%)]">
              EnGenius 3.0 is the flagship entrepreneurship event by E-Cell NIT
              Silchar, designed to ignite the entrepreneurial spirit in young
              minds. Experience a three-day journey of innovation, creativity,
              and business acumen through our carefully curated events.
            </p>

            <p className="text-lg leading-relaxed text-[hsl(0_0%_60%)]">
              From pitching to investors in Shark Tank NITS to roleplaying as
              CEOs, from boxing with pitches to selling the unsellable -
              EnGenius 3.0 offers something for every aspiring entrepreneur.
            </p>

            <motion.a
              href="#events"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="engenius-font-heading engenius-border-glow inline-block rounded-lg bg-gradient-to-r from-[hsl(0_72%_51%)] to-[hsl(0_72%_35%)] px-8 py-4 text-lg tracking-wider text-[hsl(40_20%_95%)] transition-all duration-300 hover:shadow-[0_0_30px_hsla(0,72%,51%,0.5)]"
            >
              Explore All Events
            </motion.a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl border border-[hsl(0_0%_18%)] bg-[hsl(0_0%_12%/0.5)] p-8 backdrop-blur-sm transition-all duration-300 hover:border-[hsl(0_72%_51%/0.5)]"
              >
                <div className="engenius-gradient-radial absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <stat.icon className="mb-4 h-10 w-10 text-[hsl(0_72%_51%)]" />
                <div className="engenius-font-display mb-2 text-5xl text-[hsl(40_20%_95%)]">
                  {stat.value}
                </div>
                <div className="engenius-font-heading text-sm tracking-wider text-[hsl(0_0%_60%)] uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="engenius-gradient-radial pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2" />
    </section>
  );
};

export default AboutSection;
