/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Code2, Users2, Rocket } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Startup\nWeekend",
    subtitle: "54 Hours to Launch",
    category: "Hackathon",
    desc: "A frenzy of business model creation, coding, designing, and market validation.",
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    icon: Rocket,
    tagGradient: "from-blue-400 to-indigo-500",
  },
  {
    id: 2,
    title: "E-Summit\n2024",
    subtitle: "The Flagship Event",
    category: "Summit",
    desc: "Bringing together industry leaders, investors, and students for a 3-day extravaganza.",
    img: "https://images.unsplash.com/photo-1475721027767-p4d29e64f925?auto=format&fit=crop&q=80&w=800",
    icon: Users2,
    tagGradient: "from-purple-400 to-pink-500",
  },
  {
    id: 3,
    title: "Techno\nBiz",
    subtitle: "Business Plan Competition",
    category: "Competition",
    desc: "Present your groundbreaking ideas to a panel of expert judges and win funding.",
    img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
    icon: Trophy,
    tagGradient: "from-amber-400 to-orange-500",
  },
  {
    id: 4,
    title: "Code\nFor Equity",
    subtitle: "Developer Challenge",
    category: "Technical",
    desc: "Solve real-world problems faced by startups and earn equity or internships.",
    img: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800",
    icon: Code2,
    tagGradient: "from-emerald-400 to-teal-500",
  },
];

const Events: React.FC = () => {
  // --- Logic from your snippet (State & Effect) ---
  const [currentEvent, setCurrentEvent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);

  // Shared Card Component for cleaner code
  const EventCard = ({
    event,
    isMobile = false,
  }: {
    event: (typeof events)[0];
    isMobile?: boolean;
  }) => (
    <div
      className={`relative flex w-full overflow-hidden rounded-[2.5rem] bg-[#020617] p-6 shadow-2xl transition-all duration-300 hover:shadow-blue-900/10 lg:p-10 ${
        isMobile
          ? "flex-col gap-6 sm:flex-row sm:items-center"
          : "h-full flex-col items-start justify-between"
      } group`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-25 transition-all duration-700 group-hover:opacity-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.img}
          alt=""
          className="h-full w-full object-cover brightness-[0.4] grayscale"
        />
        <div
          className={`absolute inset-0 ${isMobile ? "bg-gradient-to-r" : "bg-gradient-to-b"} from-[#020617] via-transparent to-[#020617]`}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 flex w-full ${isMobile ? "flex-col gap-4 sm:flex-row sm:gap-6" : "h-full flex-col justify-between"}`}
      >
        {/* Icon & Category Top */}
        <div
          className={`flex shrink-0 items-start ${isMobile ? "w-full justify-between sm:w-auto sm:flex-col sm:justify-start sm:gap-4" : "mb-8 w-full justify-between"}`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl md:h-14 md:w-14 lg:h-16 lg:w-16">
            <event.icon
              size={24}
              className="text-white opacity-80 lg:h-[26px] lg:w-[26px]"
            />
          </div>

          <span
            className={`bg-gradient-to-r text-[10px] font-black tracking-widest uppercase ${event.tagGradient} bg-clip-text text-transparent sm:text-xs ${!isMobile ? "lg:text-sm" : ""}`}
          >
            {event.category}
          </span>
        </div>

        {/* Text Information */}
        <div className={`flex flex-col ${isMobile ? "mt-2" : "mt-auto"}`}>
          <h3
            className={`leading-none font-black tracking-tight text-white ${isMobile ? "mb-2 text-2xl" : "mb-4 text-3xl lg:text-5xl"}`}
          >
            {isMobile ? event.title.replace("\n", " ") : event.title}
          </h3>

          <h4 className="mb-2 text-xs font-bold tracking-wider text-gray-400 uppercase md:text-sm">
            {event.subtitle}
          </h4>

          <div
            className={`${isMobile ? "line-clamp-3" : "line-clamp-4 lg:line-clamp-none"}`}
          >
            <p className="text-sm leading-relaxed font-medium text-gray-500 md:text-base">
              {event.desc}
            </p>
          </div>

          {!isMobile && (
            <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/10">
              →
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-transparent py-24 lg:py-40"
    >
      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl leading-none font-black tracking-tighter text-white uppercase lg:text-6xl">
              Events &<br />
              <span className="text-blue-500">Challenges</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-2 max-w-sm text-sm leading-relaxed text-gray-500"
          >
            Participate in our high-stakes challenges designed to push your
            entrepreneurial limits.
          </motion.p>
        </div>

        {/* --- DESKTOP VIEW (Grid) --- */}
        <div className="hidden gap-10 lg:grid lg:grid-cols-4">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glowing-border"
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>

        {/* --- MOBILE VIEW (Carousel - Logic from your snippet) --- */}
        <div className="relative lg:hidden">
          <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEvent}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="glowing-border w-full"
              >
                {/* Mobile Horizontal Card */}
                <EventCard event={events[currentEvent]} isMobile={true} />
              </motion.div>
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

      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -z-10 h-[600px] w-full -translate-y-1/2 rounded-full bg-blue-500/5 opacity-30 blur-[120px]" />
    </section>
  );
};

export default Events;
