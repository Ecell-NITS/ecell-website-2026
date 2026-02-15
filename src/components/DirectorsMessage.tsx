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
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#020617] py-16 md:py-24 lg:py-32">
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
        className="relative z-20 mx-auto h-full w-full max-w-7xl px-6"
      >
        <h2 className="mb-12 border-l-4 border-blue-500 pl-6 text-3xl font-black tracking-tight text-white md:text-5xl">
          Director&apos;s Message
        </h2>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-16">
          {/* --- 1. DIRECTOR CARD (Order: 1st on Mobile, 2nd on Desktop) --- */}
          <div className="order-1 flex w-full justify-center lg:order-2 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <motion.div
              style={{ y }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/5 bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                  alt="Prof. Dilip Kumar Baidya"
                  className="h-full w-full object-cover object-top opacity-90 transition-transform duration-700 hover:scale-105 hover:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020617] to-transparent opacity-80" />
              </div>

              {/* Nameplate */}
              <div className="px-2 pt-6 pb-2 text-center lg:text-left">
                <h3 className="mb-2 text-2xl font-bold text-white">
                  Prof. Dilip Kumar Baidya
                </h3>
                <p className="text-base leading-tight font-medium text-blue-400">
                  Director, <br /> National Institute of Technology Silchar
                </p>
              </div>
            </motion.div>
          </div>

          {/* --- 2. TEXT CONTENT (Order: 2nd on Mobile, 1st on Desktop) --- */}
          <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-7 lg:col-start-1 lg:row-start-1">
            {/* A. TEXT FOR MOBILE (< 768px) - Short & Concise */}
            <div className="block md:hidden">
              <p className="text-justify text-[15px] leading-relaxed font-light text-gray-400">
                It is with immense pride that I serve as the Director of NIT
                Silchar. Nestled in the vibrant landscape of Assam, our
                Institute has been a cornerstone of academic excellence for
                nearly five decades. We are deeply committed to nurturing
                21st-century skills through rigorous academics and innovation,
                preparing our students to thrive in Industry 4.0. Together, let
                us leverage our rich heritage to elevate NIT Silchar to new
                heights on the national and global stage.
              </p>
            </div>

            {/* B. TEXT FOR DESKTOP (>= 768px) - Full Detail */}
            <div className="hidden flex-col gap-6 md:flex">
              <p className="text-justify text-lg leading-relaxed font-light text-gray-400">
                It is with immense pride and a profound sense of responsibility
                that I have taken up the role of Director at NIT Silchar.
                Nestled in the vibrant and culturally rich landscape of Assam,
                NIT Silchar embodies the spirit of the region, serving as a
                cornerstone of academic excellence and innovation for nearly
                five decades. The Institute has played a pivotal role in
                transforming the educational and technological landscape of
                Assam and the entire North East, fostering talent that drives
                regional and national progress.
              </p>

              <p className="text-justify text-lg leading-relaxed font-light text-gray-400">
                At NIT Silchar, we are committed to nurturing 21st-century
                skills through a dynamic blend of rigorous academics,
                cutting-edge research, and industry-aligned training. Our
                curriculum, enriched with internships and experiential learning,
                prepares students to thrive in the era of Industry 4.0,
                empowering them to contribute meaningfully to society and the
                global workforce.
              </p>

              <p className="text-justify text-lg leading-relaxed font-light text-gray-400">
                Our research ecosystem is dedicated to addressing regional and
                global priorities, including Artificial Intelligence, renewable
                energy, and climate-resilient technologies. By embedding
                entrepreneurship within our academic framework, we aim to
                catalyze innovation, enabling students to translate ideas into
                impactful solutions.
              </p>

              <p className="text-justify text-lg leading-relaxed font-light text-gray-400">
                As NIT Silchar stands at a transformative juncture, I call upon
                our students, faculty, alumni, and stakeholders to unite in this
                journey, leveraging the rich heritage and resilient spirit of
                North East India to elevate NIT Silchar to new heights on the
                national and international stage.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DirectorsMessage;
