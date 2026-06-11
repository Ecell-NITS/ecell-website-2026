"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.95]);

  const floatingImages = [
    {
      src: "/landing1.jpg",
      alt: "Team collaboration",
      className:
        "absolute top-[10%] left-[5%] w-32 h-48 sm:w-48 sm:h-64 rounded-2xl object-cover shadow-2xl hidden md:block",
      delay: 0.2,
      initialX: -400,
      initialY: -100,
      yRange: [0, -10, 0],
    },
    {
      src: "/landing2.jpeg",
      alt: "Meeting",
      className:
        "absolute bottom-[20%] left-[8%] w-40 h-32 sm:w-56 sm:h-40 rounded-2xl object-cover shadow-2xl hidden md:block",
      delay: 0.4,
      initialX: -400,
      initialY: 100,
      yRange: [0, 8, 0],
    },
    {
      src: "/landing3.jpeg",
      alt: "Design UI",
      className:
        "absolute top-[15%] right-[8%] w-36 h-36 sm:w-52 sm:h-52 rounded-full object-cover shadow-2xl hidden md:block",
      delay: 0.6,
      initialX: 400,
      initialY: -100,
      yRange: [0, -8, 0],
    },
    {
      src: "/landing4.jpeg",
      alt: "Laptop work",
      className:
        "absolute bottom-[15%] right-[5%] w-36 h-48 sm:w-48 sm:h-64 rounded-2xl object-cover shadow-2xl hidden md:block",
      delay: 0.8,
      initialX: 400,
      initialY: 100,
      yRange: [0, 10, 0],
    },
  ];

  const marqueeItems = [
    "25+ EVENTS HOSTED",
    "5000+ PARTICIPANTS",
    "50+ STARTUPS",
    "30+ PARTNERS",
  ];

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#020617] pt-20">
      {/* Subtle Ambient Glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      {/* Floating Images (Desktop only for clutter-free mobile) */}
      <div className="pointer-events-none absolute inset-0 z-10 mx-auto max-w-7xl">
        {floatingImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0.8,
              x: img.initialX,
              y: img.initialY,
            }}
            animate={{
              opacity: 0.8,
              scale: 1,
              x: 0,
              y: img.yRange,
            }}
            transition={{
              opacity: { duration: 1.5, delay: img.delay, ease: "easeOut" },
              scale: { duration: 1.5, delay: img.delay, ease: "easeOut" },
              x: { duration: 1.5, delay: img.delay, ease: "backOut" },
              y: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: img.delay + 1.5,
              },
            }}
            className={img.className}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="rounded-inherit pointer-events-auto h-full w-full cursor-pointer border border-white/10 object-cover shadow-[0_0_30px_rgba(92,60,255,0.15)] transition-all duration-500"
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-20 mx-auto mb-16 flex w-full max-w-4xl flex-col items-center px-6 text-center sm:px-8"
      >
        {/* Main Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl font-medium tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Empowering Dreams,
          <br /> Building the{" "}
          <span className="relative whitespace-nowrap">
            Future
            <svg
              className="absolute -bottom-1 left-0 w-full drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] md:-bottom-3"
              viewBox="0 0 200 30"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M 5 25 Q 100 5 195 25"
                stroke="#8b5cf6"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-8 max-w-2xl text-lg leading-relaxed font-light text-gray-400 sm:text-xl"
        >
          Our philosophy is simple; nurture innovative minds, foster
          entrepreneurial spirit, and give you the resources to do your best
          work.
        </motion.p>

        {/* Down Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-gray-500 transition-colors hover:text-white"
            aria-label="Scroll down"
          >
            <ArrowDown size={32} strokeWidth={1} className="animate-bounce" />
          </button>
        </motion.div>
      </motion.div>

      {/* Marquee Bottom Bar */}
      <div className="absolute bottom-0 left-0 z-30 flex w-full overflow-hidden bg-[#7c3aed] py-3 sm:py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex w-max"
        >
          {/* Render 2 identical blocks to create seamless infinite scroll */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-around gap-8 px-4 sm:gap-16 sm:px-8"
            >
              {marqueeItems.map((text, j) => (
                <React.Fragment key={j}>
                  <span className="text-xl font-black tracking-widest text-white sm:text-2xl">
                    {text}
                  </span>
                  <span className="text-xl font-bold text-white/50 sm:text-2xl">
                    |
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
