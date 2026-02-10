"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Filter, ChevronDown } from "lucide-react";
import { YEARS, EVENTS } from "@/data/gallery";

interface GalleryFiltersProps {
  selectedYear: string;
  selectedEvent: string;
  onYearChange: (year: string) => void;
  onEventChange: (event: string) => void;
}

export default function GalleryFilters({
  selectedYear,
  selectedEvent,
  onYearChange,
  onEventChange,
}: GalleryFiltersProps) {
  const [yearOpen, setYearOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const yearRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (yearRef.current && !yearRef.current.contains(e.target as Node))
        setYearOpen(false);
      if (eventRef.current && !eventRef.current.contains(e.target as Node))
        setEventOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="3xl:gap-16 3xl:py-16 4k:gap-20 4k:py-20 flex flex-col items-center justify-center gap-6 px-4 py-12 sm:flex-row sm:gap-10"
    >
      {/* Year Filter */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={13} />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
            Sort by Year
          </span>
        </div>
        <div ref={yearRef} className="relative">
          <button
            onClick={() => {
              setYearOpen(!yearOpen);
              setEventOpen(false);
            }}
            className="3xl:w-72 3xl:py-4 3xl:text-sm 4k:w-80 4k:py-5 4k:text-base flex w-56 items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-semibold tracking-wider text-gray-300 uppercase backdrop-blur-sm transition-all hover:border-blue-500/30 hover:bg-blue-500/5"
          >
            <span>{selectedYear || "Select Year"}</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${yearOpen ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {yearOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0c1324] shadow-2xl"
              >
                <button
                  onClick={() => {
                    onYearChange("");
                    setYearOpen(false);
                  }}
                  className={`block w-full px-5 py-3 text-left text-[11px] font-semibold tracking-wider transition-colors ${
                    !selectedYear
                      ? "bg-blue-600/20 text-blue-400"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  ALL YEARS
                </button>
                {YEARS.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => {
                      onYearChange(yr);
                      setYearOpen(false);
                    }}
                    className={`block w-full px-5 py-3 text-left text-[11px] font-semibold tracking-wider transition-colors ${
                      selectedYear === yr
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Event Filter */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-gray-500">
          <Filter size={13} />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
            Sort by Events
          </span>
        </div>
        <div ref={eventRef} className="relative">
          <button
            onClick={() => {
              setEventOpen(!eventOpen);
              setYearOpen(false);
            }}
            className="3xl:w-72 3xl:py-4 3xl:text-sm 4k:w-80 4k:py-5 4k:text-base flex w-56 items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-semibold tracking-wider text-gray-300 uppercase backdrop-blur-sm transition-all hover:border-blue-500/30 hover:bg-blue-500/5"
          >
            <span>{selectedEvent || "Select Events"}</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${eventOpen ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {eventOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0c1324] shadow-2xl"
              >
                <button
                  onClick={() => {
                    onEventChange("");
                    setEventOpen(false);
                  }}
                  className={`block w-full px-5 py-3 text-left text-[11px] font-semibold tracking-wider transition-colors ${
                    !selectedEvent
                      ? "bg-blue-600/20 text-blue-400"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  ALL EVENTS
                </button>
                {EVENTS.map((ev) => (
                  <button
                    key={ev}
                    onClick={() => {
                      onEventChange(ev);
                      setEventOpen(false);
                    }}
                    className={`block w-full px-5 py-3 text-left text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                      selectedEvent === ev
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {ev}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
