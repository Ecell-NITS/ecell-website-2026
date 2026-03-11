/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, useAnimation, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Types ---
type Speaker = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  fullImage: string;
};

// --- Data ---
const speakersData: Speaker[] = [
  {
    id: 1,
    name: "Sabyasachi Mukherjee",
    role: "Business Leader ",
    avatar:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120356/sabyasachi-mukherjee_jctz1s.png",
    fullImage:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120356/sabyasachi-mukherjee_jctz1s.png",
  },
  {
    id: 2,
    name: "Vivek Poddar ",
    role: "Industry Expert & Entrepreneur",
    avatar:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120354/vivek-podder_jjv9p6.jpg",
    fullImage:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120354/vivek-podder_jjv9p6.jpg",
  },
  {
    id: 3,
    name: "Utkarsh Bhatt",
    role: " Co-Founder, Roghaari",
    avatar:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120357/utkarsh_bhatt_t2nfz6.jpg",
    fullImage:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120357/utkarsh_bhatt_t2nfz6.jpg",
  },
  {
    id: 4,
    name: "Pushkar Raj Thakur",
    role: "CEO & Founder at coursedes learning solution pvt ltd.",
    avatar:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120352/pushkar-raj_wbyigi.jpg",
    fullImage:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120352/pushkar-raj_wbyigi.jpg",
  },
  {
    id: 5,
    name: "Shantanu Jain",
    role: "Co-Founder at Readon.in",
    avatar:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120347/shantanu_jain_ib5t6g.jpg",
    fullImage:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120347/shantanu_jain_ib5t6g.jpg",
  },
  {
    id: 6,
    name: "Sankar Bora",
    role: "Founder & COO at DEALSHARE.IN",
    avatar:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120346/sankar_bora_dxfjgk.jpg",
    fullImage:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120346/sankar_bora_dxfjgk.jpg",
  },
  {
    id: 7,
    name: "Global Rashid",
    role: "Internet marketer on youtube",
    avatar:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120347/global_rashid_axbqma.jpg",
    fullImage:
      "https://res.cloudinary.com/dipid77bz/image/upload/f_webp/v1773120347/global_rashid_axbqma.jpg",
  },
];

// --- Constants ---
// We will calculate ITEM_SIZE dynamically based on screen width since we are making items responsive.
// Instead of hardcoded constants, we'll use a hook to track the size of the cards.

// --- Sub-Component ---
const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  return (
    <div className="group relative h-[320px] w-[220px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] sm:h-[350px] sm:w-[240px] md:h-[380px] md:w-[260px] md:rounded-3xl lg:h-[420px] lg:w-[300px]">
      {/* 1. HOVER STATE: Full Background Image */}
      <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <img
          src={speaker.fullImage}
          alt={speaker.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          draggable={false}
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
      </div>

      {/* 2. DEFAULT STATE: Avatar & Text */}
      <div className="absolute inset-0 z-10 flex flex-col p-4 transition-all duration-500 md:p-6">
        {/* Top: Avatar (Fades out on hover) */}
        <div className="flex flex-1 items-center justify-center transition-all duration-500 group-hover:-translate-y-4 group-hover:opacity-0">
          <div className="relative h-32 w-32 rounded-full border-4 border-blue-500/20 p-1 shadow-2xl sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-50 lg:w-50">
            <div className="h-full w-full overflow-hidden rounded-full bg-gray-800">
              <img
                src={speaker.avatar}
                alt={speaker.name}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Bottom: Text Info (Slides down on hover) */}
        <div className="text-center transition-all duration-500 group-hover:translate-y-0 group-hover:text-left">
          <h3 className="text-xl font-bold text-white drop-shadow-md transition-all duration-300 group-hover:text-2xl sm:text-2xl lg:group-hover:text-3xl">
            {speaker.name}
          </h3>
          <p className="mt-1 text-xs font-medium tracking-wide text-blue-400 uppercase group-hover:text-blue-300 sm:mt-2 md:text-sm">
            {speaker.role}
          </p>

          {/* Extra Info visible only on hover */}
          <div className="h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:mt-2 group-hover:h-auto group-hover:opacity-100 md:group-hover:mt-4">
            <p className="line-clamp-3 text-[10px] leading-relaxed text-gray-300 sm:text-xs">
              Visionary leader transforming the industry with innovation and
              resilience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Speakers: React.FC = () => {
  // Triple the list to create a buffer for infinite scrolling
  // [Buffer 1] [Real Content] [Buffer 2]
  const speakers = [...speakersData, ...speakersData, ...speakersData];
  const totalRealItems = speakersData.length;

  // Start at the beginning of the "Real Content" (Middle set)
  const [currentIndex, setCurrentIndex] = useState(totalRealItems);
  const [isHovering, setIsHovering] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const [itemSize, setItemSize] = useState(0);

  // Calculate dynamic item size on load and resize
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      // Breakpoints: mobile < 640px < sm < 768px < md < 1024px < lg
      // w-[220px] gap-4 (16px) => 236
      // sm:w-[240px] sm:gap-6 (24px) => 264
      // md:w-[260px] md:gap-7 (28px) => 288
      // lg:w-[300px] lg:gap-8 (32px) => 332
      if (width >= 1024) setItemSize(300 + 32);
      else if (width >= 768) setItemSize(260 + 28);
      else if (width >= 640) setItemSize(240 + 24);
      else setItemSize(220 + 16);
    };

    updateSize(); // Initial call
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // --- Animation Logic ---
  const animateToPosition = useCallback(
    (index: number) => {
      // Don't animate until itemSize is calculated
      if (itemSize === 0) return;
      void controls.start({
        x: -index * itemSize,
        transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }, // Smooth fluid easing
      });
    },
    [controls, itemSize],
  );

  useEffect(() => {
    animateToPosition(currentIndex);
  }, [currentIndex, animateToPosition]);

  // --- Navigation Handlers with "Pre-Jump" Infinite Logic ---
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      // If we are at the start of the 3rd set (Buffer 2)
      // Visually this is identical to the start of 2nd set (Real Content)
      if (prev >= totalRealItems * 2) {
        // Instantly jump back to the start of Real Content
        controls.set({ x: -totalRealItems * itemSize });
        // Then animate to the next item
        return totalRealItems + 1;
      }
      return prev + 1;
    });
  }, [totalRealItems, controls, itemSize]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      // If we are at the start of Real Content
      if (prev <= totalRealItems) {
        // Instantly jump to the start of Buffer 2
        controls.set({ x: -totalRealItems * 2 * itemSize });
        // Then animate to the previous item
        return totalRealItems * 2 - 1;
      }
      return prev - 1;
    });
  }, [totalRealItems, controls, itemSize]);

  // --- Auto-Play ---
  useEffect(() => {
    if (isHovering || itemSize === 0) return;
    const timer = setInterval(handleNext, 3000);
    return () => clearInterval(timer);
  }, [isHovering, handleNext, itemSize]);

  return (
    <section className="relative w-full overflow-hidden bg-[#020617] py-12 md:py-16 lg:py-20 xl:py-24">
      {/* Section Edge Fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-[#020617] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-[#020617] to-transparent" />

      {/* --- BACKGROUND LAYERS --- */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, #3b82f6 0.5px, transparent 0.5px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[120px]" />

      {/* --- HEADER --- */}
      <div className="relative z-10 mx-auto px-6 sm:mb-4 sm:px-8 md:mb-8 lg:mb-12 lg:px-12 xl:mb-16 xl:px-16">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="mb-3 text-sm font-bold tracking-[0.2em] text-blue-400 uppercase">
              Community
            </h2>
            <h3 className="text-4xl leading-tight font-black text-white md:text-5xl lg:text-6xl">
              Meet the{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Visionaries
              </span>
            </h3>
            <p className="mt-4 text-lg font-light text-gray-400">
              The influential voices who have shared their journey with us.
            </p>
          </div>

          {/* Controls */}
          <div className="mt-0 flex justify-center gap-4">
            <button
              onClick={handlePrev}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-blue-500/10 active:scale-95 sm:h-12 sm:w-12"
            >
              <ChevronLeft className="h-5 w-5 text-white transition-transform group-hover:-translate-x-0.5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={handleNext}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-blue-500/10 active:scale-95 sm:h-12 sm:w-12"
            >
              <ChevronRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-0.5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* --- CAROUSEL TRACK --- */}
      <div
        className="relative w-full overflow-hidden py-10" // Added vertical padding for hover effects
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Gradient Masks (Fade edges — hidden on mobile) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden bg-linear-to-r from-[#020617] to-transparent lg:block lg:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden bg-linear-to-l from-[#020617] to-transparent lg:block lg:w-32" />

        {/* Draggable Track */}
        <motion.div
          className="flex gap-4 pl-4 sm:gap-6 sm:pl-8 md:gap-7 md:pl-[calc(50vw-130px)] lg:gap-8 lg:pl-[calc(50vw-150px)]" // Start centering logic adjusted slightly for mobile offsets
          animate={controls}
          initial={{ x: itemSize ? -totalRealItems * itemSize : 0 }}
          drag="x"
          dragConstraints={containerRef}
          onDragEnd={(e, { offset, velocity }: PanInfo) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -100) {
              handleNext();
            } else if (swipe > 100) {
              handlePrev();
            }
          }}
          style={{ width: "max-content", cursor: "grab" }}
          whileTap={{ cursor: "grabbing" }}
        >
          {speakers.map((speaker, idx) => (
            <SpeakerCard key={`${speaker.id}-${idx}`} speaker={speaker} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Speakers;
