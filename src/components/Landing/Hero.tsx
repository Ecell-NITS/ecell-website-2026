/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// Images for the Marquee
const marqueeImages1 = [
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
];

const marqueeImages2 = [
  "https://images.unsplash.com/photo-1553877616-15280ed54817?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
];

const Hero: React.FC = () => {
  // --- ORIGINAL SCROLL ANIMATION LOGIC ---
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.95]);

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
    <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#020617] pt-20 lg:pt-0">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Grid Floor */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 80%)",
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
        />
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-20 mx-auto h-full w-full max-w-7xl px-6"
      >
        <div className="grid h-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* --- LEFT COLUMN: TEXT CONTENT --- */}
          <div className="flex flex-col items-center py-20 text-center lg:items-start lg:py-0 lg:text-left">
            <h1 className="mb-6 text-4xl leading-[1.1] font-black tracking-tighter text-white sm:text-6xl lg:text-7xl">
              E-CELL <br />
              <span className="bg-blue-400 bg-gradient-to-r bg-clip-text text-transparent">
                Entrepreneurship Cell NITS
              </span>
            </h1>

            <p className="mb-10 max-w-lg text-lg leading-relaxed font-light text-gray-400 md:text-xl">
              The premier student entrepreneurship body of NIT Silchar. We
              transform visionary concepts into scalable realities.
            </p>

            <div className="flex flex-row gap-4 sm:flex-row">
              <Link href="/events">
                <button className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-500 px-8 py-4 font-bold text-white shadow-[0_0_40px_rgba(37,99,235,0.3)] transition-all hover:scale-105">
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  <span>ONGOING EVENTS</span>
                </button>
              </Link>
              <Link href="#contactus">
                <button className="flex items-center justify-center gap-2 rounded-xl border border-white bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10">
                  <span>Will Come Later </span>
                </button>
              </Link>
            </div>
          </div>

          {/* --- RIGHT COLUMN: DESKTOP MARQUEE (Hidden on Mobile) --- */}
          {/* Changed height from fixed 600px to h-[100dvh] (Full Screen Height) */}
          <div className="relative -my-20 hidden h-[100dvh] gap-6 overflow-hidden lg:my-0 lg:flex">
            {/* Gradient Masks - Adjusted to be lighter/shorter at edges but still keeping it clean */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#020617] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-[#020617] to-transparent" />

            {/* Column 1 - Scroll Up */}
            <div className="relative flex-1">
              <motion.div
                animate={{ y: [0, -1000] }}
                transition={{
                  repeat: Infinity,
                  duration: 30, // Slower for smoother full-height scroll
                  ease: "linear",
                }}
                className="flex flex-col gap-6 pt-6"
              >
                {/* Tripled the array to ensure seamless loop on large screens */}
                {[...marqueeImages1, ...marqueeImages1, ...marqueeImages1].map(
                  (src, i) => (
                    <div
                      key={i}
                      className="h-80 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg"
                    >
                      <img
                        src={src}
                        alt="Gallery"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ),
                )}
              </motion.div>
            </div>

            {/* Column 2 - Scroll Down (Reverse) */}
            <div className="relative flex-1 pt-12">
              <motion.div
                initial={{ y: -1000 }}
                animate={{ y: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 35, // Slightly different speed for parallax feel
                  ease: "linear",
                }}
                className="flex flex-col gap-6"
              >
                {[...marqueeImages2, ...marqueeImages2, ...marqueeImages2].map(
                  (src, i) => (
                    <div
                      key={i}
                      className="h-80 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg"
                    >
                      <img
                        src={src}
                        alt="Gallery"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ),
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- MOBILE IMAGE GRID (Visible only on Mobile - Unchanged) --- */}
        <div className="mt-16 w-full px-0 pb-12 lg:hidden">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400"
                className="aspect-[3/4] w-full rounded-xl border border-white/10 object-cover"
                alt="Event"
              />
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400"
                className="aspect-video w-full rounded-xl border border-white/10 object-cover"
                alt="Team"
              />
            </div>
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400"
                className="aspect-square w-full rounded-xl border border-white/10 object-cover"
                alt="Work"
              />
              <img
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=400"
                className="aspect-[3/4] w-full rounded-xl border border-white/10 object-cover"
                alt="Seminar"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
