/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  BrainCircuit,
  UsersRound,
  Megaphone,
  Unlock,
} from "lucide-react";
import Link from "next/link";

// --- CUSTOMIZED EVENTS DATA FOR E-CELL NIT SILCHAR ---
const events = [
  {
    id: 1,
    title: "Campus Capitalist",
    subtitle: "21st March • Seminar Hall",
    category: "Pitch Deck",
    desc: "Pitch real campus solutions using your branch expertise. Step onto the board and build your entrepreneurial empire by solving real-world problems. Strategy is your weapon.",
    icon: Building2,
    tagGradient: "from-red-500 to-red-700",
    href: "/EIC-2026/campus-capitalist",
  },
  {
    id: 2,
    title: "Boardroom Trivia",
    subtitle: "22nd March • New Gallery",
    category: "Business Quiz",
    desc: "Test your knowledge of markets, brands & startups. Navigate through clues and riddles in this high-stakes trivia hunt where every correct answer brings you closer to victory.",
    icon: BrainCircuit,
    tagGradient: "from-blue-500 to-blue-700",
    href: "/EIC-2026/boardroom-trivia",
  },
  {
    id: 3,
    title: "Chairman's Conclave",
    subtitle: "20th March • New Gallery",
    category: "Group Discussion",
    desc: "High-stakes group discussion as corporate tycoons. A silent grid where words fall silent and only your moves speak. Manage your points, tokens, and decisions wisely.",
    icon: UsersRound,
    tagGradient: "from-amber-500 to-orange-700",
    href: "/EIC-2026/chairmans-conclave",
  },
  {
    id: 4,
    title: "AdoShuffle",
    subtitle: "Online Event",
    category: "Creative Marketing",
    desc: "Reimagine famous brands with wild what-if concepts. Teams will create engaging promotional strategies for assigned brands, showcasing their marketing creativity.",
    icon: Megaphone,
    tagGradient: "from-emerald-500 to-teal-700",
    href: "/EIC-2026/adoshuffle",
  },
  {
    id: 5,
    title: "The Deal Room",
    subtitle: "21st March • Startup Centre",
    category: "Strategy & Puzzles",
    desc: "Solve puzzles, uncover clues, and build your empire. Sharp decisions and bold moves are required to outthink the competition in this high-end property challenge.",
    icon: Unlock,
    tagGradient: "from-purple-500 to-fuchsia-700",
    href: "/EIC-2026/the-deal-room",
  },
];

const EventCard = ({
  event,
  isMobile = false,
}: {
  event: (typeof events)[0];
  isMobile?: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  if (!event) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const title = event.title || "Event";
  const displayTitle = isMobile ? title.replace("\n", " ") : title;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`glass group relative flex w-full overflow-hidden rounded-[2rem] border border-white/5 bg-[#0d1117]/40 p-8 shadow-2xl transition-all duration-500 hover:bg-[#0d1117]/60 ${
        isMobile
          ? "flex-col gap-6 sm:flex-row sm:items-center"
          : "h-full flex-col items-start justify-between"
      }`}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 flex w-full ${isMobile ? "flex-col gap-4 sm:flex-row sm:gap-6" : "h-full flex-col justify-between"}`}
      >
        {/* Icon & Category Top */}
        <div
          className={`flex shrink-0 items-start ${isMobile ? "w-full justify-between sm:w-auto sm:flex-col sm:justify-start sm:gap-4" : "mb-8 w-full justify-between"}`}
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner backdrop-blur-xl md:h-14 md:w-14"
          >
            <event.icon size={22} className="text-white opacity-90" />
          </motion.div>

          <span
            className={`bg-gradient-to-r text-[10px] font-black tracking-widest uppercase ${event.tagGradient} bg-clip-text text-transparent sm:text-xs ${!isMobile ? "lg:text-xs" : ""}`}
          >
            {event.category}
          </span>
        </div>

        {/* Text Information */}
        <div className={`flex flex-1 flex-col ${isMobile ? "mt-2" : "mt-0"}`}>
          <h3
            className={`leading-none font-black tracking-tight whitespace-pre-line text-white transition-colors group-hover:text-blue-100 ${isMobile ? "mb-2 text-2xl" : "mb-3 text-3xl"}`}
          >
            {displayTitle}
          </h3>

          <h4 className="mb-3 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            {event.subtitle}
          </h4>

          <div
            className={`${isMobile ? "line-clamp-3" : "line-clamp-4 lg:line-clamp-none"}`}
          >
            <p className="text-sm leading-relaxed font-light text-gray-400 transition-colors group-hover:text-gray-300">
              {event.desc}
            </p>
          </div>

          <Link
            href={event.href}
            className="mt-auto flex items-center gap-2 pt-6 text-xs font-bold text-blue-500 transition-all group-hover:gap-3 group-hover:text-blue-400"
          >
            <span>Explore Details</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Events: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Use nullish coalescing to prevent potential issues
  const safeCurrentEvent = events[currentEvent] ?? events[0];

  const nextEvent = useCallback(
    () => setCurrentEvent((prev) => (prev + 1) % events.length),
    [],
  );
  const prevEvent = useCallback(
    () => setCurrentEvent((prev) => (prev - 1 + events.length) % events.length),
    [],
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextEvent();
    }, 2500); // Auto-advance every 2.5 seconds
    return () => clearInterval(timer);
  }, [nextEvent, isPaused]);

  // Touch swipe handlers for manual mobile navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextEvent();
      else prevEvent();
    }
  };

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#020617] py-12 md:py-16 lg:py-20 xl:py-24"
    >
      {/* Section Edge Fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-[#020617] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-[#020617] to-transparent" />

      <div className="relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl leading-none font-black tracking-tighter text-white uppercase lg:text-6xl">
              Events &<br />
              <span className="text-blue-500">Initiatives</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-2 max-w-sm text-sm leading-relaxed font-light text-gray-500"
          >
            Participate in our high-stakes challenges designed to push your
            entrepreneurial limits and foster innovation.
          </motion.p>
        </div>

        {/* --- DESKTOP VIEW (Grid) --- */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-4">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, type: "spring" }}
              className="h-full"
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>

        {/* --- MOBILE VIEW (Carousel) --- */}
        <div
          className="relative lg:hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
              {safeCurrentEvent && (
                <motion.div
                  key={safeCurrentEvent.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <EventCard event={safeCurrentEvent} isMobile={true} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="mt-8 flex justify-center gap-3">
            {events.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentEvent(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentEvent
                    ? "w-8 bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                    : "w-1.5 bg-white/20"
                }`}
                aria-label={`Go to event ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
