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
import { Sparkles, ArrowRight, Activity } from "lucide-react";

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
    <div ref={ref} className="group cursor-default">
      <motion.div
        className="mb-2 flex items-baseline gap-1 text-4xl font-black text-white md:text-5xl"
        whileHover={{ scale: 1.05, x: 5 }}
      >
        <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          {count}
        </span>
        <span className="text-2xl text-blue-500">{suffix}</span>
      </motion.div>
      <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase transition-colors group-hover:text-gray-400 md:text-sm">
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
  const cardRotateX = useTransform(useSpring(cardY), [0, 600], [10, -10]);
  const cardRotateY = useTransform(useSpring(cardX), [0, 800], [-10, 10]);

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cardX.set(e.clientX - rect.left);
    cardY.set(e.clientY - rect.top);
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

            <h2 className="mb-8 text-4xl leading-[1.1] font-black tracking-tighter text-white md:text-7xl">
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

            <div className="mx-auto mb-12 grid max-w-sm grid-cols-2 gap-8 md:gap-12 lg:mx-0">
              <StatCounter value={50} label="Active Startups" suffix="+" />
              <StatCounter value={20} label="Global Partners" suffix="+" />
            </div>

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

          {/* INTERACTIVE IMAGE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="perspective-2000 mt-12 w-full lg:mt-0 lg:w-1/2"
          >
            <motion.div
              onMouseMove={handleCardMove}
              onMouseLeave={() => {
                cardX.set(400);
                cardY.set(300);
              }}
              style={{
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative mx-auto aspect-[4/5] w-full max-w-md md:aspect-square"
            >
              {/* Main Image Glass Container */}
              <div className="glass group absolute inset-0 overflow-hidden rounded-[2.5rem] border border-white/10 p-3 shadow-2xl md:rounded-[3rem] md:p-4">
                <div className="pointer-events-none absolute inset-0 z-10 bg-blue-500/5 transition-colors group-hover:bg-blue-500/0" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
                  alt="Innovation Lab"
                  className="h-full w-full scale-105 rounded-[1.8rem] object-cover grayscale-[0.8] transition-all duration-1000 group-hover:scale-100 group-hover:grayscale-0 md:rounded-[2.2rem]"
                />
              </div>

              {/* Floating Element 1: Badge (EST 2012) */}
              <motion.div
                style={{ translateZ: "100px" }}
                className="glass absolute -top-4 -right-4 z-20 rounded-2xl border border-white/20 px-4 py-4 shadow-2xl md:-top-6 md:-right-6 md:rounded-3xl md:px-6 md:py-6"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 md:h-10 md:w-10">
                    <Sparkles className="text-white" size={16} />
                  </div>
                  <span className="text-[8px] font-black tracking-tighter text-gray-400 uppercase md:text-[10px]">
                    Est.
                  </span>
                  <span className="text-lg leading-none font-black text-white md:text-xl">
                    2012
                  </span>
                </div>
              </motion.div>

              {/* Floating Element 2: Decorative Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ translateZ: "-30px" }}
                className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full border-2 border-dashed border-blue-500/15 md:-bottom-20 md:-left-20 md:h-64 md:w-64"
              />

              {/* Floating Element 3: Text Tag */}
              <motion.div
                style={{ translateZ: "150px" }}
                className="glass absolute -right-4 bottom-8 z-20 rounded-xl border border-white/10 px-4 py-3 shadow-2xl md:-right-10 md:bottom-10 md:rounded-2xl md:px-6 md:py-4"
              >
                <p className="text-[10px] font-bold tracking-widest whitespace-nowrap text-blue-400 uppercase md:text-xs">
                  Incubating Ideas
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
