/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Rocket, Lightbulb, Store } from "lucide-react";

// --- CUSTOMIZED EVENTS DATA FOR E-CELL NIT SILCHAR ---
const events = [
  {
    id: 1,
    title: "Srijan\nE-Summit",
    subtitle: "The Flagship Entrepreneurship Summit",
    category: "Flagship",
    desc: "North East India's premier entrepreneurship summit featuring keynote sessions, panel discussions, and competitions like 'Pitch Please' to ignite the startup spirit.",
    img: "https://images.unsplash.com/photo-1544531696-2813a7415856?auto=format&fit=crop&q=80&w=800",
    icon: Rocket,
    tagGradient: "from-blue-400 to-indigo-500",
  },
  {
    id: 2,
    title: "Empressario\nModule",
    subtitle: "Annual Entrepreneurship Module",
    category: "Competition",
    desc: "A test of managerial finesse and business acumen. Features high-stakes events like 'Business Hackathon' and 'IPL Auction' during Tecnoesis.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    icon: Trophy,
    tagGradient: "from-purple-400 to-pink-500",
  },
  {
    id: 3,
    title: "EnGenius\n2025",
    subtitle: "Exclusive Freshers' Event",
    category: "Freshers",
    desc: "The ultimate welcome for the new batch! Events like 'Pitchboxing' and 'Bech Ke Dikhao' introduce freshers to the world of innovation and sales.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    icon: Lightbulb,
    tagGradient: "from-amber-400 to-orange-500",
  },
  {
    id: 4,
    title: "Startup\nExpo",
    subtitle: "Innovation Showcase",
    category: "Exhibition",
    desc: "A platform for emerging startups to showcase their products to investors and industry leaders, facilitating networking and funding opportunities.",
    img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
    icon: Store,
    tagGradient: "from-emerald-400 to-teal-500",
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

      {/* Background Image (Subtle) */}
      <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.img}
          alt=""
          className="h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-[#0d1117]/80" />
      </div>

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
        <div className={`flex flex-col ${isMobile ? "mt-2" : "mt-auto"}`}>
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

          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-500 transition-all group-hover:gap-3 group-hover:text-blue-400">
            <span>Explore Details</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Events: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState(0);

  useEffect(() => {
    if (!events.length) return;
    const timer = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);

  // Use nullish coalescing to prevent potential issues
  const safeCurrentEvent = events[currentEvent] ?? events[0];

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#020617] py-24 lg:py-32"
    >
      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-20">
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
        <div className="relative lg:hidden">
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
