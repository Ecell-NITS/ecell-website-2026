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
import { ArrowRight, Activity, Rocket } from "lucide-react";

const StatCounter: React.FC<{
  value: number;
  label: string;
  suffix?: string;
}> = ({ value, label, suffix = "" }) => {
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
      <motion.div
        className="mb-1 flex items-baseline justify-center gap-1 text-2xl font-black text-white sm:text-3xl"
        whileHover={{ scale: 1.05 }}
      >
        <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          {count}
        </span>
        <span className="text-xl text-blue-500">{suffix}</span>
      </motion.div>
      <p className="text-[10px] font-bold tracking-[0.1em] text-gray-500 uppercase transition-colors group-hover:text-gray-400">
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
      className="relative overflow-hidden bg-[#020617] py-24 md:py-32"
    >
      {/* Interactive Background Glow */}
      <motion.div
        style={{
          left: springX,
          top: springY,
        }}
        className="pointer-events-none absolute z-0 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[120px] lg:block"
      />

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col items-center gap-20 lg:flex-row lg:gap-24">
          {/* TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full text-center lg:w-1/2 lg:text-left"
          >
            <div className="glass mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase">
              <Activity size={14} />
              Our Ecosystem
            </div>

            <h2 className="mb-8 text-4xl leading-none font-black tracking-tighter text-white uppercase lg:text-6xl">
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

            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed font-light text-gray-400 md:text-xl lg:mx-0">
              E-Cell, NIT Silchar is a non-profit powerhouse. We don&apos;t just
              teach business; we{" "}
              <span className="font-medium text-white">architect ambition</span>
              . By providing pre-incubation, mentorship, and a high-octane
              community.
            </p>

            <motion.button
              whileHover={{ x: 10 }}
              className="group flex items-center justify-center gap-3 text-sm font-bold tracking-widest text-blue-500 uppercase lg:justify-start"
            >
              Explore our mission
              <span className="relative h-[2px] w-8 bg-blue-500/30 transition-all duration-300 group-hover:w-12">
                <ArrowRight size={16} className="absolute -top-2 -right-2" />
              </span>
            </motion.button>
          </motion.div>

          {/* INTERACTIVE IMAGE CARD (Sleek Glass Panel) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="perspective-2000 mt-12 w-full lg:mt-0 lg:w-1/2"
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
              className="group relative mx-auto aspect-[4/5] w-full max-w-md md:aspect-square"
            >
              {/* Main Container */}
              <div className="glass absolute inset-0 overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0d1117]/40 shadow-2xl backdrop-blur-xl">
                {/* Spotlight Effect */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
                  }}
                />

                {/* Window Header (Minimal) */}
                <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-6 py-5">
                  <div className="flex gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="ml-auto font-mono text-[10px] text-gray-600 uppercase">
                    System Active
                  </div>
                </div>

                {/* Content: Abstract Map */}
                <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-6">
                  {/* Central Hub */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(59,130,246,0)",
                          "0 0 40px rgba(59,130,246,0.2)",
                          "0 0 20px rgba(59,130,246,0)",
                        ],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="flex h-20 w-20 rotate-45 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-900/10 backdrop-blur-md"
                    >
                      <Rocket size={32} className="-rotate-45 text-blue-400" />
                    </motion.div>

                    <div className="mt-8 text-center">
                      <h3 className="text-2xl font-black tracking-tight text-white">
                        Launchpad
                      </h3>
                      <p className="mt-1 font-mono text-xs text-blue-400">
                        INCUBATION_PROTOCOL_V2
                      </p>
                    </div>
                  </div>

                  {/* Minimal Orbit */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 40,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="pointer-events-none absolute inset-0 z-0"
                  >
                    <div className="absolute top-1/2 left-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/5" />
                  </motion.div>
                </div>
              </div>

              {/* Floating Element: Stats Box (Slide In from Right) */}
              <motion.div
                style={{ translateZ: "50px" }}
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                className="glass absolute -right-4 bottom-10 z-20 rounded-3xl border border-white/10 bg-[#0d1117]/80 px-8 py-6 shadow-2xl backdrop-blur-xl md:-right-10"
              >
                <div className="flex items-center gap-10">
                  <StatCounter value={50} label="Startups" suffix="+" />
                  <div className="h-10 w-[1px] bg-white/10"></div>
                  <StatCounter value={20} label="Partners" suffix="+" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
