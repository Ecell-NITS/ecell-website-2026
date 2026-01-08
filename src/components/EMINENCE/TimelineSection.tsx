"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timelineData = [
  { day: 1, date: "11th April", event: "E-Questa", time: "6:30 PM" },
  {
    day: 2,
    date: "12th April",
    event: "E-Hack + Investor's Gambit",
    time: "10:00 AM",
  },
  { day: 3, date: "13th April", event: "Founders × Funders", time: "10:00 AM" },
];

const TimelineSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <section ref={ref} id="timeline" className="relative overflow-hidden py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, hsl(195 100% 50% / 0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="eminence-font-display eminence-glow-subtle mb-4 text-4xl font-bold md:text-6xl">
            TIMELINE
          </h2>
          <p className="text-[hsl(40_20%_95%/0.6)]">
            Three days. Infinite possibilities.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          {/* Animated line */}
          <div className="absolute top-0 bottom-0 left-8 w-px bg-[hsl(195_100%_50%/0.2)] md:left-1/2">
            <motion.div
              className="w-full origin-top bg-[hsl(195_100%_50%)]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline items */}
          {timelineData.map((item, index) => (
            <motion.div
              key={item.day}
              className={`relative mb-16 flex items-center gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Dot */}
              <motion.div
                className="absolute left-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-[hsl(195_100%_50%)] md:left-1/2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.2 }}
              >
                <div className="absolute inset-0 animate-ping rounded-full bg-[hsl(195_100%_50%)] opacity-50" />
              </motion.div>

              {/* Content */}
              <div
                className={`ml-20 md:ml-0 md:w-5/12 ${
                  index % 2 === 0
                    ? "md:pr-12 md:text-right"
                    : "md:pl-12 md:text-left"
                }`}
              >
                <motion.div
                  className="eminence-card-electric inline-block rounded-xl p-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="mb-2 flex items-center gap-4">
                    <span className="eminence-font-display text-4xl font-bold text-[hsl(195_100%_50%)]">
                      Day {item.day}
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-[hsl(40_20%_95%/0.6)]">
                    {item.date}
                  </p>
                  <h3 className="eminence-font-display mb-1 text-xl font-semibold text-[hsl(40_20%_95%)]">
                    {item.event}
                  </h3>
                  <p className="text-sm text-[hsl(195_100%_50%/0.8)]">
                    {item.time}
                  </p>
                </motion.div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
