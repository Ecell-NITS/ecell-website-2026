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
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#020617] py-20">
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
        <div className="absolute top-[20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
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

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* --- LEFT COLUMN: TEXT CONTENT --- */}
          <div className="flex flex-col gap-6 text-justify text-[16px] leading-relaxed font-light text-gray-400 md:text-[18px] lg:col-span-8">
            <p>
              It is with immense pride and a profound sense of responsibility
              that I have taken up the role of Director at NIT Silchar. Nestled
              in the vibrant and culturally rich landscape of Assam, NIT Silchar
              embodies the spirit of the region, serving as a cornerstone of
              academic excellence and innovation for nearly five decades. The
              Institute has played a pivotal role in transforming the
              educational and technological landscape of Assam and the entire
              North East, fostering talent that drives regional and national
              progress.
            </p>

            <p>
              At NIT Silchar, we are committed to nurturing 21st-century skills
              through a dynamic blend of rigorous academics, cutting-edge
              research, and industry-aligned training. Our curriculum, enriched
              with internships and experiential learning, prepares students to
              thrive in the era of Industry 4.0, empowering them to contribute
              meaningfully to society and the global workforce. The
              Institute&apos;s legacy of bridging the unique challenges of North
              East India—through advancements in infrastructure, sustainable
              technologies, and community-driven solutions—continues to inspire
              our vision.
            </p>

            <p>
              Our research ecosystem, supported by various Departments and
              Centres, is dedicated to addressing regional and global
              priorities, including Artificial Intelligence, renewable energy,
              environmental conservation, and climate-resilient technologies
              tailored to the North East&apos;s unique ecosystem. By embedding
              entrepreneurship and startup initiatives within our academic
              framework, we aim to catalyze innovation, enabling students and
              researchers to translate ideas into impactful solutions for the
              region and beyond.
            </p>

            <p>
              As NIT Silchar stands at a transformative juncture, our
              aspirations are reflected in our quest of excellence in the
              National Institutional Ranking Framework (NIRF) and beyond. I call
              upon our students, faculty, alumni, and stakeholders to unite in
              this journey, leveraging the rich heritage and resilient spirit of
              North East India to elevate NIT Silchar to new heights on the
              national and international stage.
            </p>
          </div>

          {/* --- RIGHT COLUMN: IMAGE CARD --- */}
          <div className="flex w-full justify-center lg:col-span-4 lg:justify-end">
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
                {/* Gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#020617] to-transparent opacity-60" />
              </div>

              {/* Nameplate */}
              <div className="px-2 pt-6 pb-2 text-center lg:text-left">
                <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">
                  Prof. Dilip Kumar Baidya
                </h3>
                <p className="text-sm leading-tight font-medium text-blue-400 md:text-base">
                  Director, <br /> National Institute of Technology Silchar
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DirectorsMessage;
