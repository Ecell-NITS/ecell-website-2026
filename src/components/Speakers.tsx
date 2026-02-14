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
    name: "Bhavish Aggarwal",
    role: "Co-founder, OLA",
    avatar:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400",
    fullImage:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Ritesh Agarwal",
    role: "Founder, OYO Rooms",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    fullImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Byju Raveendran",
    role: "Co-founder, Byju's",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    fullImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Vani Kola",
    role: "MD, Kalaari Capital",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    fullImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    name: "Kunal Shah",
    role: "Founder, Cred",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    fullImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    name: "Falguni Nayar",
    role: "CEO, Nykaa",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    fullImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
  },
];

// --- Constants ---
const CARD_WIDTH = 300;
const GAP = 32;
const ITEM_SIZE = CARD_WIDTH + GAP;

// --- Sub-Component ---
const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  return (
    <div className="group relative h-[420px] w-[300px] flex-shrink-0 cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)]">
      {/* 1. HOVER STATE: Full Background Image */}
      <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <img
          src={speaker.fullImage}
          alt={speaker.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
      </div>

      {/* 2. DEFAULT STATE: Avatar & Text */}
      <div className="absolute inset-0 z-10 flex flex-col p-6 transition-all duration-500">
        {/* Top: Avatar (Fades out on hover) */}
        <div className="flex flex-1 items-center justify-center transition-all duration-500 group-hover:-translate-y-4 group-hover:opacity-0">
          <div className="relative h-32 w-32 rounded-full border-4 border-blue-500/20 p-1 shadow-2xl">
            <div className="h-full w-full overflow-hidden rounded-full bg-gray-800">
              <img
                src={speaker.avatar}
                alt={speaker.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom: Text Info (Slides down on hover) */}
        <div className="text-center transition-all duration-500 group-hover:translate-y-0 group-hover:text-left">
          <h3 className="text-2xl font-bold text-white drop-shadow-md transition-all duration-300 group-hover:text-3xl">
            {speaker.name}
          </h3>
          <p className="mt-2 text-sm font-medium tracking-wide text-blue-400 uppercase group-hover:text-blue-300">
            {speaker.role}
          </p>

          {/* Extra Info visible only on hover */}
          <div className="h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:mt-4 group-hover:h-auto group-hover:opacity-100">
            <p className="line-clamp-3 text-xs leading-relaxed text-gray-300">
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

  // --- Animation Logic ---
  const animateToPosition = useCallback(
    (index: number) => {
      void controls.start({
        x: -index * ITEM_SIZE,
        transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }, // Smooth fluid easing
      });
    },
    [controls],
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
        controls.set({ x: -totalRealItems * ITEM_SIZE });
        // Then animate to the next item
        return totalRealItems + 1;
      }
      return prev + 1;
    });
  }, [totalRealItems, controls]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      // If we are at the start of Real Content
      if (prev <= totalRealItems) {
        // Instantly jump to the start of Buffer 2
        controls.set({ x: -totalRealItems * 2 * ITEM_SIZE });
        // Then animate to the previous item
        return totalRealItems * 2 - 1;
      }
      return prev - 1;
    });
  }, [totalRealItems, controls]);

  // --- Auto-Play ---
  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(handleNext, 3000);
    return () => clearInterval(timer);
  }, [isHovering, handleNext]);

  return (
    <section className="relative w-full overflow-hidden bg-[#020617] py-20 md:py-32">
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
      <div className="relative z-10 container mx-auto mb-16 px-6">
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
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-blue-500/10 active:scale-95"
            >
              <ChevronLeft className="h-6 w-6 text-white transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-blue-500/10 active:scale-95"
            >
              <ChevronRight className="h-6 w-6 text-white transition-transform group-hover:translate-x-0.5" />
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
        {/* Gradient Masks (Fade edges) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[#020617] to-transparent lg:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[#020617] to-transparent lg:w-32" />

        {/* Draggable Track */}
        <motion.div
          className="flex gap-8 pl-8 md:pl-[calc(50vw-150px)]" // Start centering logic
          animate={controls}
          initial={{ x: -totalRealItems * ITEM_SIZE }}
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
