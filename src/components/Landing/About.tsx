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
        <div className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500/20 sm:mb-2 sm:h-9 sm:w-9 sm:rounded-xl md:h-10 md:w-10">
          {icon}
        </div>
      )}
      <motion.div
        className="mb-0.5 flex items-baseline justify-center gap-0.5 text-xl font-black text-white sm:mb-1 sm:text-2xl md:text-3xl"
        whileHover={{ scale: 1.05 }}
      >
        <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          {count}
        </span>
        <span className="text-sm text-blue-500 sm:text-base md:text-lg">
          {suffix}
        </span>
      </motion.div>
      <p className="text-[8px] font-bold tracking-[0.08em] text-gray-500 uppercase transition-colors group-hover:text-gray-400 sm:text-[9px] sm:tracking-[0.1em] md:text-[10px]">
        {label}
      </p>
    </div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse interaction
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Image Card Tilt Logic
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const cardRotateX = useTransform(useSpring(cardY), [0, 600], [5, -5]);
  const cardRotateY = useTransform(useSpring(cardX), [0, 800], [-5, 5]);

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cardX.set(e.clientX - rect.left);
    cardY.set(e.clientY - rect.top);
  };

  // Spotlight Logic for the main card
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const handleSpotlightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
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
      className="relative overflow-hidden bg-[#020617] pt-16 sm:pt-20 md:pt-24 lg:pt-32"
    >
      {/* Interactive Background Glow */}
      <motion.div
        style={{
          left: springX,
          top: springY,
        }}
        className="pointer-events-none absolute z-0 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[120px] lg:block"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-10 md:gap-16 lg:flex-row lg:justify-between lg:gap-12">
          {/* TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full text-center lg:w-1/2 lg:text-left"
          >
            <div className="glass mb-4 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-blue-400 uppercase sm:mb-5 sm:gap-2 sm:px-4 sm:py-1.5 sm:text-[10px] sm:tracking-[0.3em] md:mb-6">
              <Activity size={12} className="sm:h-3.5 sm:w-3.5" />
              Our Ecosystem
            </div>

            <h2 className="mb-4 text-3xl leading-none font-black tracking-tighter text-white uppercase sm:mb-6 sm:text-4xl md:mb-8 md:text-5xl lg:text-6xl">
              Pioneering <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent">
                  Entrepreneurship
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute -bottom-2 left-0 -z-10 h-2 rounded-full bg-blue-600/20"
                />
              </span>
            </h2>

            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed font-light text-gray-400 sm:mb-8 sm:max-w-lg sm:text-base md:mb-10 md:max-w-xl md:text-lg lg:mx-0 lg:text-xl">
              E-Cell, NIT Silchar is a non-profit powerhouse. We don&apos;t just
              teach business; we{" "}
              <span className="font-medium text-white">architect ambition</span>
              . By providing pre-incubation, mentorship, and a high-octane
              community.
            </p>

            <motion.button
              whileHover={{ x: 10 }}
              className="group mx-auto flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-blue-500 uppercase sm:gap-3 sm:text-sm lg:mx-0 lg:justify-start"
            >
              Our Initiatives
              <span className="relative h-[2px] w-6 transition-all duration-300 group-hover:w-10 sm:w-8 sm:group-hover:w-12">
                <ArrowRight size={16} className="absolute -top-2" />
              </span>
            </motion.button>
          </motion.div>

          {/* INTERACTIVE ANALYTICS DASHBOARD */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="perspective-2000 w-full lg:w-auto lg:flex-shrink-0"
          >
            <motion.div
              onMouseMove={(e) => {
                handleCardMove(e);
                handleSpotlightMove(e);
              }}
              onMouseLeave={() => {
                cardX.set(400);
                cardY.set(300);
              }}
              style={{
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                transformStyle: "preserve-3d",
              }}
              className="group relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg"
            >
              {/* Main Container */}
              <div className="glass overflow-hidden rounded-2xl border border-white/5 bg-[#0d1117]/60 shadow-2xl backdrop-blur-xl sm:rounded-[1.5rem] md:rounded-[2rem]">
                {/* Spotlight Effect */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
                  }}
                />

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(59,130,246,0)",
                          "0 0 20px rgba(59,130,246,0.3)",
                          "0 0 10px rgba(59,130,246,0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 sm:h-9 sm:w-9 sm:rounded-xl md:h-10 md:w-10"
                    >
                      <Rocket
                        size={16}
                        className="text-blue-400 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5"
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-xs font-bold text-white sm:text-sm">
                        Our Analytics
                      </h3>
                      <p className="text-[8px] text-gray-500 sm:text-[10px]">
                        Real-time Impact Metrics
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 sm:h-2 sm:w-2"></span>
                    <span className="text-[8px] font-medium text-green-400 sm:text-[10px]">
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2.5 p-4 sm:gap-3 sm:p-5 md:gap-4 md:p-6">
                  {/* Events Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-xl border border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent p-3 transition-colors hover:border-blue-500/20 sm:rounded-2xl sm:p-4"
                  >
                    <StatCounter
                      value={25}
                      label="Events Hosted"
                      suffix="+"
                      icon={<Calendar size={18} />}
                    />
                  </motion.div>

                  {/* Participants Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-xl border border-white/5 bg-gradient-to-br from-purple-500/5 to-transparent p-3 transition-colors hover:border-purple-500/20 sm:rounded-2xl sm:p-4"
                  >
                    <StatCounter
                      value={5000}
                      label="Participants"
                      suffix="+"
                      icon={<Users size={18} />}
                    />
                  </motion.div>

                  {/* Startups Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-xl border border-white/5 bg-gradient-to-br from-cyan-500/5 to-transparent p-3 transition-colors hover:border-cyan-500/20 sm:rounded-2xl sm:p-4"
                  >
                    <StatCounter
                      value={50}
                      label="Startups Incubated"
                      suffix="+"
                      icon={<Rocket size={18} />}
                    />
                  </motion.div>

                  {/* Sponsors Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-xl border border-white/5 bg-gradient-to-br from-amber-500/5 to-transparent p-3 transition-colors hover:border-amber-500/20 sm:rounded-2xl sm:p-4"
                  >
                    <StatCounter
                      value={30}
                      label="Sponsors"
                      suffix="+"
                      icon={<Building2 size={18} />}
                    />
                  </motion.div>
                </div>

                {/* Bottom Section - Establishment */}
                <div className="border-t border-white/5 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 px-4 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/10 sm:h-7 sm:w-7 sm:rounded-lg md:h-8 md:w-8">
                      <Award
                        size={12}
                        className="text-blue-400 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-semibold text-white sm:text-xs">
                        Established 2015
                      </p>
                      <p className="text-[8px] text-gray-500 sm:text-[10px]">
                        NIT Silchar, Assam
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge
              <motion.div
                style={{ translateZ: "60px" }}
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                className="absolute -top-4 -right-4 z-20 rounded-2xl border border-white/10 bg-[#0d1117]/90 px-4 py-3 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-1.5">
                    <Activity size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">₹2Cr+</p>
                    <p className="text-[9px] text-gray-500">Funding Raised</p>
                  </div>
                </div>
              </motion.div> */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
