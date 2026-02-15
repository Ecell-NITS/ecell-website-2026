/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Rocket,
  Trophy,
  Lightbulb,
  Mic2,
  Store,
  CalendarClock,
} from "lucide-react";

// --- Types ---
interface TimelineItem {
  id: number;
  title: string;
  icon: React.ElementType;
  desc: string;
  date: string;
  month: string;
  year: string;
}

// --- Data ---
const timelineData: TimelineItem[] = [
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
      className="relative min-h-screen overflow-hidden bg-[#020617] py-20 md:py-32"
    >
      {/* --- BACKGROUND LAYERS --- */}

      {/* Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #3b82f6 0.5px, transparent 0.5px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 left-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />

      {/* Large Background Text */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden opacity-[0.03] select-none">
        <span className="absolute top-20 left-10 text-[6rem] font-black text-white/10 sm:text-[10rem] md:text-[15rem] lg:text-[20rem]">
          EVENTS
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* --- HEADER --- */}
        <div className="mb-20 text-center md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase"
          >
            <CalendarClock size={14} />
            <span>Mark Your Calendars</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Annual <span className="text-blue-500">Timeline</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-gray-400 sm:text-lg"
          >
            From Orientation to The Grand Summit, join us on a year-long journey
            of innovation and entrepreneurship.
          </motion.p>
        </div>

        {/* --- TIMELINE CONTAINER --- */}
        <div className="relative mx-auto max-w-6xl">
          {/* Vertical Guide Line (Gray) */}
          <div className="absolute top-0 bottom-0 left-8 w-[2px] -translate-x-1/2 bg-white/5 md:left-1/2" />

          {/* Animated Progress Line (Blue) */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute top-0 bottom-0 left-8 z-10 w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] md:left-1/2"
          />

          <div className="relative z-20 flex flex-col gap-12 md:gap-24">
            {timelineData.map((item, i) => {
              const isEven = i % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-8 md:gap-0 ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  } relative`}
                >
                  {/* Spacer for Desktop Alignment (Creating the zig-zag) */}
                  <div className="hidden flex-1 md:block" />

                  {/* Center Dot */}
                  <div className="absolute top-1/2 left-8 z-30 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#020617] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] md:left-1/2 md:h-10 md:w-10">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  </div>

                  {/* Card Content Wrapper */}
                  <div
                    className={`flex-1 pl-20 md:pl-0 ${isEven ? "md:pr-20" : "md:pl-20"}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group relative flex overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-blue-500/10"
                    >
                      {/* Connector Line (Desktop Only) */}
                      <div
                        className={`absolute top-1/2 hidden h-[1px] w-20 -translate-y-1/2 bg-gradient-to-r from-blue-500/50 to-transparent md:block ${isEven ? "-right-20 rotate-180" : "-left-20"} `}
                      />

                      {/* Main Content */}
                      <div className="flex-1 p-6 sm:p-8">
                        <div className="mb-4 flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white sm:h-12 sm:w-12">
                            <item.icon size={20} className="sm:h-6 sm:w-6" />
                          </div>
                          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-blue-200 sm:text-xl md:text-2xl">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm leading-relaxed font-light text-gray-400 sm:text-base">
                          {item.desc}
                        </p>
                      </div>

                      {/* Date Tab */}
                      <div className="relative z-20 flex w-20 min-w-[5rem] flex-col items-center justify-center border-l border-white/5 bg-white/[0.02] p-2 transition-colors group-hover:bg-blue-600/20 sm:w-24 sm:min-w-[6rem]">
                        <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase group-hover:text-blue-300 sm:text-xs">
                          {item.month}
                        </span>
                        <span className="my-1 text-2xl font-black text-white sm:text-3xl">
                          {item.date}
                        </span>
                        <span className="text-[10px] font-bold text-gray-600 group-hover:text-blue-300">
                          {item.year}
                        </span>
                      </div>

                      {/* Hover Highlight Overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
