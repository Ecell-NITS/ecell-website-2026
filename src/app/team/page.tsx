"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image"; // 1. Import Next.js Image component

import Faculties from "@/components/Teampage/Faculties/Faculties";
import Alumni from "@/components/Teampage/Alumni/Alumni";
import CoreTeam from "@/components/Teampage/CoreTeam/CoreTeam";
import Developers from "@/components/Teampage/Developers/Developers";

type CoreYear =
  | "2025-2026"
  | "2024-2025"
  | "2023-2024"
  | "2022-2023"
  | "2021-2022";

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<
    "faculty" | "alumni" | "core" | "developers"
  >("developers");
  const [selectedYear, setSelectedYear] = useState<CoreYear>("2025-2026");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const years: CoreYear[] = [
    "2025-2026",
    "2024-2025",
    "2023-2024",
    "2022-2023",
    "2021-2022",
  ];

  const handleYearSelect = (year: CoreYear) => {
    setSelectedYear(year);
    setActiveTab("core");
    setIsDropdownOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <div className="pt-24">
        <section className="relative flex min-h-[500px] flex-col items-center justify-between overflow-hidden border-b border-white/5 lg:flex-row">
          <div className="z-10 w-full px-12 py-12 text-center lg:w-1/2 lg:px-24 lg:py-0 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-6 text-6xl leading-[0.85] font-black tracking-tighter text-white uppercase italic md:text-9xl">
                Meet our <br />
                <span className="text-blue-500">Excellent</span> <br />
                Team Members
              </h1>
            </motion.div>
          </div>

          <div className="relative h-[400px] w-full lg:h-[700px] lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative h-full w-full" // 2. Added relative here for Image fill
            >
              {/* 3. Replaced img with Image component */}
              <Image
                alt="Team members collaborating"
                className="object-cover brightness-50 contrast-110"
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200"
                fill
                priority
              />
            </motion.div>

            <div className="absolute inset-0 hidden bg-gradient-to-r from-[#020617] via-transparent to-transparent lg:block" />
            <div className="absolute inset-0 block bg-gradient-to-t from-[#020617] via-transparent to-transparent lg:hidden" />
          </div>
        </section>

        <section className="sticky top-20 z-40 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
          <div className="container mx-auto flex flex-wrap items-center justify-center gap-6 px-6 py-8 md:gap-16">
            <button
              onClick={() => setActiveTab("faculty")}
              className={`relative py-2 text-[12px] font-black tracking-widest uppercase transition-all md:text-[14px] ${
                activeTab === "faculty"
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              FACULTIES
              {activeTab === "faculty" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute right-0 bottom-0 left-0 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab("alumni")}
              className={`relative py-2 text-[12px] font-black tracking-widest uppercase transition-all md:text-[14px] ${
                activeTab === "alumni"
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              ALUMNI
              {activeTab === "alumni" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute right-0 bottom-0 left-0 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                />
              )}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  setActiveTab("core");
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className={`relative flex items-center gap-2 py-2 text-[12px] font-black tracking-widest uppercase transition-all md:text-[14px] ${
                  activeTab === "core"
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span>CORE TEAM {selectedYear}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
                {activeTab === "core" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute right-0 bottom-0 left-0 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                  />
                )}
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 z-50 mt-4 w-48 -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-[#0c1324] shadow-2xl"
                  >
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleYearSelect(year);
                        }}
                        className={`block w-full px-5 py-3 text-center text-xs font-bold tracking-widest transition-colors ${
                          selectedYear === year
                            ? "bg-blue-600/20 text-blue-400"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setActiveTab("developers")}
              className={`relative py-2 text-[12px] font-black tracking-widest uppercase transition-all md:text-[14px] ${
                activeTab === "developers"
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              DEVELOPERS
              {activeTab === "developers" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute right-0 bottom-0 left-0 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                />
              )}
            </button>
          </div>
        </section>

        <section className="min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "faculty" && <Faculties />}
              {activeTab === "alumni" && <Alumni />}
              {activeTab === "core" && <CoreTeam year={selectedYear} />}
              {activeTab === "developers" && <Developers />}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
