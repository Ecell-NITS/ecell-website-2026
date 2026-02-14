/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  Activity,
  Rocket,
  Users,
  Calendar,
  Award,
  Building2,
} from "lucide-react";

// --- STAT COUNTER COMPONENT ---
const StatCounter: React.FC<{
  value: number;
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
}> = ({ value, label, suffix = "", icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="group cursor-default text-center">
      {icon && (
        <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500/20 md:h-10 md:w-10 md:rounded-xl">
          {React.cloneElement(icon as React.ReactElement, { size: 18 })}
        </div>
      )}
      <motion.div
        className="mb-0.5 flex items-baseline justify-center gap-0.5 text-xl font-black text-white md:mb-1 md:text-3xl"
        whileHover={{ scale: 1.05 }}
      >
        <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          {count}
        </span>
        <span className="text-sm text-blue-500 md:text-lg">{suffix}</span>
      </motion.div>
      <p className="text-[9px] font-bold tracking-[0.08em] text-gray-500 uppercase transition-colors group-hover:text-gray-400 md:text-[10px] md:tracking-[0.1em]">
        {label}
      </p>
    </div>
  );
};

// --- MAIN COMPONENT ---
const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for background glow
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // --- 3D CARD LOGIC ---
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const cardRotateX = useTransform(useSpring(cardY), [0, 400], [5, -5]);
  const cardRotateY = useTransform(useSpring(cardX), [0, 400], [-5, 5]);

  // Spotlight Position
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const handleCardInteract = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cardX.set(e.clientX - rect.left);
    cardY.set(e.clientY - rect.top);
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[#020617] py-16 md:py-24 lg:py-32"
    >
      {/* Interactive Background Glow */}
      <motion.div
        style={{ left: springX, top: springY }}
        className="pointer-events-none absolute z-0 hidden h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px] lg:block"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* --- 1. VISUAL DASHBOARD (Top on Mobile, Right on Desktop) --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="perspective-1000 order-1 w-full lg:order-2 lg:w-auto lg:flex-shrink-0"
          >
            <motion.div
              onMouseMove={handleCardInteract}
              onMouseLeave={() => {
                cardX.set(200); // Reset roughly to center
                cardY.set(200);
              }}
              style={{
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                transformStyle: "preserve-3d",
              }}
              className="group relative mx-auto w-full max-w-md"
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117]/80 shadow-2xl backdrop-blur-xl md:rounded-[2rem]">
                {/* Spotlight Gradient */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(500px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
                  }}
                />

                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 shadow-inner shadow-blue-500/20">
                      <Rocket size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Impact Analytics
                      </h3>
                      <p className="text-[10px] font-medium text-gray-500">
                        Live Ecosystem Data
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-1">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <span className="text-[9px] font-bold tracking-wider text-green-400 uppercase">
                      Live
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 p-5 md:gap-4 md:p-6">
                  {/* Event Stat */}
                  <div className="rounded-xl border border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent p-4 transition-colors hover:border-blue-500/20">
                    <StatCounter
                      value={25}
                      label="Events Hosted"
                      suffix="+"
                      icon={<Calendar />}
                    />
                  </div>

                  {/* Participants Stat */}
                  <div className="rounded-xl border border-white/5 bg-gradient-to-br from-purple-500/5 to-transparent p-4 transition-colors hover:border-purple-500/20">
                    <StatCounter
                      value={5000}
                      label="Participants"
                      suffix="+"
                      icon={<Users />}
                    />
                  </div>

                  {/* Startups Stat */}
                  <div className="rounded-xl border border-white/5 bg-gradient-to-br from-cyan-500/5 to-transparent p-4 transition-colors hover:border-cyan-500/20">
                    <StatCounter
                      value={50}
                      label="Startups"
                      suffix="+"
                      icon={<Rocket />}
                    />
                  </div>

                  {/* Sponsors Stat */}
                  <div className="rounded-xl border border-white/5 bg-gradient-to-br from-amber-500/5 to-transparent p-4 transition-colors hover:border-amber-500/20">
                    <StatCounter
                      value={30}
                      label="Partners"
                      suffix="+"
                      icon={<Building2 />}
                    />
                  </div>
                </div>

                {/* Card Footer */}
                <div className="border-t border-white/5 bg-white/[0.02] px-5 py-3 text-center">
                  <div className="inline-flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100">
                    <Award size={14} className="text-blue-400" />
                    <p className="text-[10px] text-gray-400">
                      Est. 2013 • NIT Silchar
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* --- 2. TEXT CONTENT (Bottom on Mobile, Left on Desktop) --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 w-full text-center lg:order-1 lg:w-1/2 lg:text-left"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase md:mb-6">
              <Activity size={12} />
              <span>Our Ecosystem</span>
            </div>

            <h2 className="mb-4 text-3xl font-black tracking-tighter text-white uppercase sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
              Pioneering <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                Entrepreneurship
              </span>
            </h2>

            {/* Concise Mobile Text - Fixed 'don't' to 'don&apos;t' */}
            <p className="mx-auto mb-6 block max-w-md text-sm leading-relaxed font-light text-gray-400 md:hidden">
              E-Cell NIT Silchar is a non-profit powerhouse. We don&apos;t just
              teach business; we architect ambition by providing pre-incubation,
              mentorship, and a high-octane community for students.
            </p>

            {/* Full Desktop Text */}
            <p className="mx-auto mb-8 hidden max-w-lg text-lg leading-relaxed font-light text-gray-400 md:block lg:mx-0">
              E-Cell, NIT Silchar is a non-profit powerhouse. We don&apos;t just
              teach business; we{" "}
              <strong className="font-medium text-white">
                architect ambition
              </strong>
              . By providing pre-incubation, mentorship, and a high-octane
              community, we bridge the gap between technical expertise and
              commercial viability.
            </p>

            <motion.button
              whileHover={{ x: 5 }}
              className="group mx-auto inline-flex items-center gap-2 text-sm font-bold tracking-widest text-blue-500 uppercase transition-colors hover:text-blue-400 lg:mx-0"
            >
              Explore Initiatives
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
