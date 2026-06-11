/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const DirectorsMessage: React.FC = () => {
  // --- SCROLL ANIMATION LOGIC ---
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Mouse tracking for subtle parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#020617] py-12 md:py-16 lg:py-20 xl:py-24">
      {/* Section Edge Fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-[#020617] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-[#020617] to-transparent" />

      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #3b82f6 0.5px, transparent 0.5px)`,
            backgroundSize: "40px 40px",
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
        />
        <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-blue-600/20 blur-[100px] md:h-[500px] md:w-[500px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-purple-600/20 blur-[100px] md:h-[500px] md:w-[500px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-20 mx-auto h-full w-full px-6 sm:px-8 lg:px-12 xl:px-16"
      >
        {/* --- HEADER --- */}
        <div className="relative z-10 mx-auto mb-12 px-6 text-center lg:mb-16">
          <h2 className="flex flex-col items-center justify-center gap-3 text-4xl font-black uppercase tracking-tight text-white md:flex-row md:text-5xl lg:text-6xl">
            DIRECTOR'S <span className="rounded-md bg-[#5c3cff] px-4 py-1 text-white">MESSAGE</span>
          </h2>
        </div>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-16">
          {/* --- 1. DIRECTOR CARD (Order: 1st on Mobile, 2nd on Desktop) --- */}
          <div className="order-1 flex w-full justify-center lg:order-2 lg:col-span-5 lg:col-start-10 lg:justify-end">
            <motion.div
              style={{ y }}
              className="group w-full max-w-sm rounded-3xl border border-white/5 bg-[#060B19] p-4 shadow-[0_0_40px_-10px_rgba(92,60,255,0.2)] transition-all duration-500 hover:border-[#5c3cff]/50"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/5 bg-gray-900">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/30 via-[#020617]/50 to-[#020617] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <img
                  src="https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773118283/Screenshot_2026-03-10_at_10.20.48_AM_sybcxy.png"
                  alt="Prof. Dilip Kumar Baidya"
                  className="relative z-10 h-full w-full object-cover object-top opacity-90 transition-transform duration-700 hover:scale-105 hover:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
              </div>

              {/* Nameplate */}
              <div className="px-2 pt-6 pb-2 text-center lg:text-left transition-transform duration-500 group-hover:translate-y-[-2px]">
                <h3 className="mb-2 text-2xl font-bold text-[#5c3cff] drop-shadow-md">
                  Prof. Dilip Kumar Baidya
                </h3>
                <p className="text-base leading-tight font-semibold text-[#5c3cff] drop-shadow-sm">
                  Director, <br /> National Institute of Technology Silchar
                </p>
              </div>
            </motion.div>
          </div>
          {/* --- 2. TEXT CONTENT (Order: 2nd on Mobile, 1st on Desktop) --- */}
          <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-7 lg:col-start-1 lg:row-start-1">
            {/* TEXT FOR DESKTOP & MOBILE */}
            <div className="flex flex-col gap-6 md:flex lg:gap-8">
              <p className="text-justify text-[15px] leading-relaxed font-light text-gray-300 md:text-lg lg:text-xl xl:text-2xl xl:leading-[1.7]">
                It is with immense pride and a profound sense of responsibility
                that I serve as the Director at NIT Silchar.
                Nestled in the vibrant and culturally rich landscape of Assam,
                NIT Silchar embodies the spirit of the region, serving as a
                cornerstone of academic excellence and innovation.
                We are committed to nurturing not only skilled
                engineers but visionary leaders who can transform ideas into
                impactful ventures. I strongly encourage our students to explore
                entrepreneurial opportunities and contribute towards building
                sustainable solutions for society.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DirectorsMessage;
