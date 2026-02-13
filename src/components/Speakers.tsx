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

// --- Components ---

const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  return (
    <div className="group relative h-[400px] w-[300px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-blue-500/10">
      {/* HOVER: Background Image */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <img
          src={speaker.fullImage}
          alt={speaker.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/40 to-transparent" />
      </div>

      {/* DEFAULT: Avatar & Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-all duration-500 group-hover:justify-end group-hover:pb-8">
        <div className="mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-white/10 shadow-xl transition-all duration-500 group-hover:mb-0 group-hover:h-0 group-hover:w-0 group-hover:opacity-0">
          <img
            src={speaker.avatar}
            alt={speaker.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="transform transition-transform duration-500">
          <h3 className="mb-2 text-xl font-bold tracking-tight text-white group-hover:text-2xl">
            {speaker.name}
          </h3>
          <p className="font-medium text-blue-400 group-hover:text-blue-300">
            {speaker.role}
          </p>
        </div>
      </div>
    </div>
  );
};

const Speakers: React.FC = () => {
  // Triple the list: [Buffer Start, Real Content, Buffer End]
  // This allows infinite scrolling in both directions.
  const speakers = [...speakersData, ...speakersData, ...speakersData];
  const totalRealItems = speakersData.length;

  // Start at the beginning of the MIDDLE set (The "Real Content")
  const [currentIndex, setCurrentIndex] = useState(totalRealItems);
  const [isHovering, setIsHovering] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // --- 1. Movement Logic ---
  const updatePosition = useCallback(
    (newIndex: number) => {
      // Explicitly mark promise as ignored with void operator
      void controls.start({
        x: -newIndex * ITEM_SIZE,
        transition: { duration: 0.5, ease: "easeInOut" }, // Smooth slide
      });
    },
    [controls],
  );

  // Sync state with animation
  useEffect(() => {
    updatePosition(currentIndex);
  }, [currentIndex, updatePosition]);

  // --- 2. Navigation Logic ---
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      // If we are at the end of the buffer (last set), jump back to middle set first
      if (prevIndex >= totalRealItems * 2) {
        controls.set({ x: -totalRealItems * ITEM_SIZE }); // Instant jump
        return totalRealItems + 1;
      }
      return prevIndex + 1;
    });
  }, [totalRealItems, controls]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      // If we are at the start of the buffer (first set), jump forward to middle set first
      if (prevIndex <= totalRealItems - 1) {
        controls.set({ x: -(totalRealItems * 2 - 1) * ITEM_SIZE }); // Instant jump
        return totalRealItems * 2 - 2;
      }
      return prevIndex - 1;
    });
  }, [totalRealItems, controls]);

  // --- 3. Auto-Play Timer ---
  useEffect(() => {
    if (isHovering) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovering, handleNext]);

  return (
    <section className="relative flex min-h-[80vh] w-full flex-col justify-center overflow-hidden bg-[#020617] py-24">
      {/* --- BACKGROUND GLOWS --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 80%)",
          }}
        />
        <div className="absolute top-[-20%] left-[20%] h-[600px] w-[600px] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute right-[20%] bottom-[-20%] h-[600px] w-[600px] rounded-full bg-purple-600/5 blur-[120px]" />
      </div>

      {/* --- HEADER & CONTROLS --- */}
      <div className="relative z-10 container mx-auto mb-12 flex flex-col items-center justify-between gap-8 px-6 md:flex-row">
        <div className="max-w-2xl text-left">
          <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-blue-400 uppercase">
            Community
          </h2>
          <h3 className="text-4xl leading-tight font-bold text-white md:text-5xl">
            Meet the{" "}
            <span className="bg-blue-400 bg-clip-text text-transparent">
              Visionaries
            </span>
          </h3>
          <p className="mt-4 text-lg font-light text-gray-400">
            The influential voices who have shared their journey with us.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-white/30 hover:bg-white/10 active:scale-95"
          >
            <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
          </button>
          <button
            onClick={handleNext}
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-white/30 hover:bg-white/10 active:scale-95"
          >
            <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* --- CAROUSEL TRACK --- */}
      <div
        className="relative w-full overflow-hidden"
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Fading Gradients on Edges (Blends into bg-[#020617]) */}
        <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-12 bg-gradient-to-r from-[#020617] to-transparent lg:w-32" />
        <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-12 bg-gradient-to-l from-[#020617] to-transparent lg:w-32" />

        {/* Animated Track */}
        <motion.div
          className="flex gap-8 px-8"
          animate={controls}
          initial={{ x: -totalRealItems * ITEM_SIZE }}
          // Drag Logic for manual swiping
          drag="x"
          dragConstraints={containerRef}
          onDragEnd={(e, { offset, velocity }: PanInfo) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -10000) {
              handleNext();
            } else if (swipe > 10000) {
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
