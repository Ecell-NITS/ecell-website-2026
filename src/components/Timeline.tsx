/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Rocket, Trophy, Lightbulb, Mic2, Store } from "lucide-react";

const timelineData = [
  {
    id: 1,
    title: "EnGenius 2025",
    icon: Lightbulb,
    desc: "The journey begins! An exclusive event to welcome freshers into the world of entrepreneurship with fun activities.",
    date: "24",
    month: "Aug",
    year: "2025",
  },
  {
    id: 2,
    title: "E-Cell Orientation",
    icon: Rocket,
    desc: "Official induction of new members. Unveiling the roadmap for the year and assigning roles to the new cohort.",
    date: "10",
    month: "Sep",
    year: "2025",
  },
  {
    id: 3,
    title: "Empressario Module",
    icon: Trophy,
    desc: "The Entrepreneurial module of Tecnoesis. High-stakes competitions like 'B-Plan' and 'IPL Auction'.",
    date: "02",
    month: "Feb",
    year: "2026",
  },
  {
    id: 4,
    title: "Srijan: E-Summit",
    icon: Mic2,
    desc: "North East's largest Entrepreneurship Summit. Keynote speakers, panel discussions, and investors converge.",
    date: "14",
    month: "Apr",
    year: "2026",
  },
  {
    id: 5,
    title: "Startup Expo",
    icon: Store,
    desc: "Grand finale showcasing the most innovative startups from the region to investors and the public.",
    date: "16",
    month: "Apr",
    year: "2026",
  },
];

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#020617] py-32 font-sans"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="mb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-4xl font-black tracking-tight text-white md:text-5xl"
          >
            Annual <span className="text-blue-500">Timeline</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm font-semibold tracking-widest text-gray-500 uppercase"
          >
            From Orientation to The Grand Summit
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Vertical Lines */}
          <div className="absolute top-0 bottom-0 left-8 w-[2px] -translate-x-1/2 bg-white/10 md:left-1/2" />

          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute top-0 bottom-0 left-8 z-10 w-[2px] -translate-x-1/2 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] md:left-1/2"
          />

          <div className="relative z-20 flex flex-col gap-16">
            {timelineData.map((item, i) => {
              const isEven = i % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-8 md:gap-0 ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  } relative`}
                >
                  {/* Empty space for desktop alignment */}
                  <div className="hidden flex-1 md:block" />

                  {/* Center Dot */}
                  <div className="absolute top-1/2 left-8 z-30 box-content h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#020617] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] md:left-1/2"></div>

                  {/* Card Content */}
                  <div
                    className={`flex-1 pl-16 md:pl-0 ${isEven ? "md:pr-16" : "md:pl-16"}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group relative flex overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                    >
                      {/* Connector Line (Desktop Only) */}
                      <div
                        className={`absolute top-1/2 hidden h-[2px] w-16 -translate-y-1/2 bg-white/10 md:block ${isEven ? "-right-16" : "-left-16"} `}
                      />

                      {/* Content Section */}
                      <div className="flex-1 p-6 md:p-8">
                        <div className="mb-3 flex items-center gap-4">
                          <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-2 text-blue-400 transition-colors duration-300 group-hover:bg-blue-500 group-hover:text-white">
                            <item.icon size={20} />
                          </div>
                          <h3 className="text-xl leading-tight font-bold text-white transition-colors group-hover:text-blue-200">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm leading-relaxed font-light text-gray-400">
                          {item.desc}
                        </p>
                      </div>

                      {/* Date Section */}
                      <div className="relative z-20 flex w-24 flex-col items-center justify-center border-l border-white/10 bg-white/5 p-2 transition-colors group-hover:bg-blue-600/10">
                        <span className="text-xs font-bold text-gray-500 uppercase group-hover:text-blue-300">
                          {item.month}
                        </span>
                        <span className="my-1 text-3xl leading-none font-black text-white">
                          {item.date}
                        </span>
                        <span className="text-[10px] font-bold text-gray-600 group-hover:text-blue-300">
                          {item.year}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
