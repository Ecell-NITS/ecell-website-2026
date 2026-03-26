/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";

// Images for the Marquee
const marqueeImages1 = [
  "/Hero/3image.webp",
  "https://res.cloudinary.com/ecell/image/upload/f_webp/v1773825423/eic_dmzcwe.jpg",
  "/Hero/1image.webp",
  "/Hero/2image.webp",
  "/Hero/4image.webp",
  "/Hero/10image.webp",
];

const marqueeImages2 = [
  "/Hero/5image.webp",
  "/Hero/6image.webp",
  "/Hero/8image.webp",
  "/Hero/11image.webp",
];

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.9]);

  // Mouse tracking for subtle parallax using MotionValues for performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform values for the grid
  const gridX = useTransform(mouseX, (value) => value);
  const gridY = useTransform(mouseY, (value) => value);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.05;
      const y = (e.clientY - window.innerHeight / 2) * 0.05;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative flex h-dvh min-h-dvh items-center justify-center overflow-hidden">
      {/* GRID LAYER: Structural Grid */}
      <motion.div
        style={{
          x: gridX,
          y: gridY,
          backgroundImage: `radial-gradient(circle, #3b82f6 0.5px, transparent 0.5px)`,
          backgroundSize: "60px 60px",
        }}
        className="pointer-events-none absolute inset-0 z-0 opacity-20 will-change-transform"
      />

      {/* MID LAYER: Interactive Stardust */}
      <div className="pointer-events-none absolute inset-[-5%] z-0">
        <StardustField count={20} />
      </div>

      {/* FRONT LAYER: Floating Motes */}
      <div className="pointer-events-none absolute inset-[-15%] z-10">
        <StarField count={15} size={3} opacity={0.6} blur={1} />
      </div>

      {/* FOREGROUND CONTENT */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-20 mx-auto flex h-full w-full flex-col items-center justify-center px-6 sm:px-8 lg:px-12 xl:px-16"
      >
        <div className="flex w-full flex-col items-center gap-[4dvh] sm:gap-12 md:gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          {/* --- LEFT COLUMN: TEXT CONTENT --- */}
          <div className="flex flex-col items-center gap-1 text-center lg:items-start lg:gap-0 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-[1.2dvh] hidden items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-[0.7dvh] text-[1.7dvh] font-semibold tracking-wider text-blue-400 uppercase backdrop-blur-sm sm:mb-4 sm:gap-2 sm:px-4 sm:py-1.5 sm:text-xs md:mb-6 md:inline-flex md:px-5 md:text-sm lg:mb-8 lg:py-2"
            >
              {/* <span className="sm:hidden">Innovation Starts Here</span> */}
              <span className="hidden sm:inline">
                The Future of Innovation Starts Here
              </span>
            </motion.div>

            <motion.div className="relative">
              <motion.h1
                initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10dvh] leading-[0.85] font-black text-white drop-shadow-[0_0_60px_rgba(37,99,235,0.25)] selection:bg-blue-500/30 sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl"
              >
                E-CELL
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.5, delay: 0.5, ease: "circOut" }}
                className="mt-2 h-0.5 w-full origin-left bg-gradient-to-r from-blue-500 via-blue-400 to-transparent sm:mt-3 lg:mt-4 lg:h-[3px]"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-[1.2dvh] mb-[1.2dvh] text-[2.6dvh] font-medium tracking-[0.12em] text-gray-400 uppercase sm:mt-4 sm:mb-3 sm:text-base sm:tracking-[0.15em] md:mt-6 md:mb-5 md:text-xl lg:mt-8 lg:mb-6 lg:text-xl xl:text-2xl"
            >
              Entrepreneurship Cell
              <br />
              <span className="font-bold tracking-normal text-blue-400">
                NIT SILCHAR
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="h-[7dvh] max-w-xs text-[2.2dvh] leading-relaxed text-gray-400/70 sm:h-16 sm:max-w-md sm:text-lg md:h-18 md:max-w-lg md:text-xl lg:max-w-lg lg:text-xl"
            >
              <TypingAnimation />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-[2.2dvh] flex w-full flex-row items-center justify-center gap-2 sm:mt-8 sm:gap-4 md:mt-10 lg:justify-start"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("events")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-[1.6dvh] shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] sm:w-auto sm:rounded-2xl sm:px-8 sm:py-3.5 md:px-10 md:py-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center justify-center gap-2 text-[2.2dvh] font-bold tracking-wide whitespace-nowrap text-white sm:text-base">
                  Recent Events
                </span>
              </button>

              <Link
                href="/about"
                className="group relative w-full overflow-hidden rounded-xl border border-white/20 bg-white/5 px-4 py-[1.6dvh] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/30 hover:bg-white/10 active:scale-[0.98] sm:w-auto sm:rounded-2xl sm:px-8 sm:py-3.5 md:px-10 md:py-4"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-[2.2dvh] font-semibold whitespace-nowrap text-white sm:text-base">
                  About Us
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: DESKTOP MARQUEE (Hidden on Mobile) --- */}
          <div className="relative hidden h-[100dvh] gap-6 overflow-hidden lg:flex">
            {/* Gradient Masks */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-[#020617] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[#020617] to-transparent" />

            {/* Column 1 - Scroll Up */}
            <div className="relative flex-1">
              <motion.div
                animate={{ y: [0, -1000] }}
                transition={{
                  repeat: Infinity,
                  duration: 30,
                  ease: "linear",
                }}
                className="flex flex-col gap-6 pt-6"
              >
                {[...marqueeImages1, ...marqueeImages1, ...marqueeImages1].map(
                  (src, i) => (
                    <div
                      key={i}
                      className="h-80 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-blue-500/5"
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
                  duration: 35,
                  ease: "linear",
                }}
                className="flex flex-col gap-6"
              >
                {[...marqueeImages2, ...marqueeImages2, ...marqueeImages2].map(
                  (src, i) => (
                    <div
                      key={i}
                      className="h-80 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-blue-500/5"
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

          {/* --- MOBILE SKEWED CAROUSEL (Visible only below lg) --- */}
          <div className="w-full shrink-0 lg:hidden">
            <MobileCarousel images={[...marqueeImages1, ...marqueeImages2]} />
          </div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 sm:bottom-8"
      >
        <button
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          className="group flex flex-col items-center gap-2"
          aria-label="Scroll down"
        >
          <span className="text-[10px] font-medium tracking-[0.3em] text-white/40 uppercase transition-colors group-hover:text-white/70 sm:text-xs">
            Scroll
          </span>
          <div className="relative h-8 w-5 rounded-full border border-white/20 transition-colors group-hover:border-white/40 sm:h-10 sm:w-6">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blue-400 sm:h-2 sm:w-2"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
};

// Mobile Skewed Carousel Component
const MobileCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = images.length;

  const next = useCallback(
    () => setActiveIndex((prev) => (prev + 1) % total),
    [total],
  );
  const prev = useCallback(
    () => setActiveIndex((prev) => (prev - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      next();
    }, 2500); // Auto-advance every 2.5 seconds
    return () => clearInterval(timer);
  }, [next, isPaused]);

  // Touch swipe handlers for manual scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  const getIndex = (offset: number) =>
    (((activeIndex + offset) % total) + total) % total;

  const cardVariants = {
    center: {
      x: "0%",
      rotateY: 0,
      scale: 1,
      zIndex: 3,
      opacity: 1,
      filter: "brightness(1)",
    },
    left: {
      x: "-72%",
      rotateY: 35,
      scale: 0.78,
      zIndex: 2,
      opacity: 0.7,
      filter: "brightness(0.5)",
    },
    right: {
      x: "72%",
      rotateY: -35,
      scale: 0.78,
      zIndex: 2,
      opacity: 0.7,
      filter: "brightness(0.5)",
    },
    farLeft: {
      x: "-120%",
      rotateY: 45,
      scale: 0.6,
      zIndex: 1,
      opacity: 0,
      filter: "brightness(0.3)",
    },
    farRight: {
      x: "120%",
      rotateY: -45,
      scale: 0.6,
      zIndex: 1,
      opacity: 0,
      filter: "brightness(0.3)",
    },
  };

  const getPosition = (imgIndex: number) => {
    const diff = (((imgIndex - activeIndex) % total) + total) % total;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === total - 1) return "left";
    if (diff === 2) return "farRight";
    return "farLeft";
  };

  return (
    <div
      className="relative mx-auto w-full max-w-md"
      style={{ perspective: "1000px" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Container with fixed aspect ratio */}
      <div className="relative mx-auto aspect-3/4 w-[48%] sm:w-[45%]">
        <AnimatePresence initial={false}>
          {/* Render 5 visible cards: far-left, left, center, right, far-right */}
          {[-2, -1, 0, 1, 2].map((offset) => {
            const imgIndex = getIndex(offset);
            const position = getPosition(imgIndex);
            return (
              <motion.div
                key={`${imgIndex}-${offset}`}
                className="absolute inset-0 overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-blue-500/10 sm:rounded-2xl"
                variants={cardVariants}
                animate={position}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  mass: 0.8,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={images[imgIndex]}
                  alt={`Event ${imgIndex + 1}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Star Field Component
interface StarFieldProps {
  count: number;
  size: number;
  opacity: number;
  blur?: number;
}

const StarField: React.FC<StarFieldProps> = ({
  count,
  size,
  opacity,
  blur = 0,
}) => {
  const stars = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        top: `${(i * 17) % 100}%`,
        left: `${(i * 23) % 100}%`,
        delay: i * 0.5,
        duration: 3 + (i % 4),
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, opacity, 0] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: size + "px",
            height: size + "px",
            backgroundColor: "white",
            borderRadius: "50%",
            filter: blur ? `blur(${blur}px)` : "none",
            boxShadow: `0 0 ${size * 2}px white`,
          }}
        />
      ))}
    </div>
  );
};

// Stardust Field Component
const StardustField: React.FC<{ count: number }> = ({ count }) => {
  const particles = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 13) % 100}%`,
        top: `${(i * 29) % 100}%`,
        size: (i % 2) + 1,
        duration: 15 + (i % 25),
        delay: -i,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            y: ["-20%", "120%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size + "px",
            height: p.size + "px",
            backgroundColor: "#60a5fa",
            borderRadius: "50%",
            boxShadow: `0 0 12px #3b82f6`,
          }}
        />
      ))}
    </div>
  );
};

// Typing Animation Component
const TypingAnimation: React.FC = () => {
  const [text, setText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const sentences = [
      "The path to a successful business career is now easier and less messy.",
      "Cultivating a culture of innovation and problem-solving.",
      "Empowering the visionaries of tomorrow, today.",
      "NIT Silchar's premier entrepreneurship hub.",
    ];

    const currentSentence = sentences[sentenceIndex];
    if (!currentSentence) return;

    const typingSpeed = isDeleting ? 25 : 55;
    const pauseDuration = isDeleting ? 100 : 3500;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentSentence.length) {
        setText(currentSentence.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setText(currentSentence.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentSentence.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else {
        setIsDeleting(false);
        setSentenceIndex((sentenceIndex + 1) % sentences.length);
        setCharIndex(0);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, sentenceIndex]);

  return (
    <span className="font-normal tracking-normal text-gray-400">
      {text}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-0.5 inline-block h-[1em] w-[2px] bg-blue-400 align-middle"
      />
    </span>
  );
};

export default Hero;
