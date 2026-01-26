"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image"; // 1. Import Next.js Image component
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";

import Faculties from "@/components/Teampage/Faculties/Faculties";
import Alumni from "@/components/Teampage/Alumni/Alumni";
import CoreTeam from "@/components/Teampage/CoreTeam/CoreTeam";
import Developers from "@/components/Teampage/Developers/Developers";
import { type CoreYear } from "@/data/coreTeam";

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
      <Navbar />
      <div className="pt-0">
        <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden border-b border-white/5 lg:flex-row lg:justify-between">
          <div className="z-10 mt-20 flex w-full flex-col items-center justify-center px-6 text-center lg:mt-0 lg:w-1/2 lg:items-start lg:py-0 lg:pl-24 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="3xl:text-[10rem] 4k:text-[12rem] my-6 flex flex-wrap justify-center gap-2 text-4xl leading-[0.85] font-black tracking-tighter text-white uppercase italic sm:gap-2.5 sm:text-5xl md:gap-3 md:text-6xl lg:justify-start lg:gap-3.5 lg:text-7xl xl:text-8xl 2xl:text-9xl">
                <span>Meet</span>
                <span>ours</span>
                <span className="text-blue-500 lg:mx-0">Excellent</span>
                <span>Team</span>
                <span>Members</span>
              </h1>
            </motion.div>
          </div>

          <div className="relative h-full w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative h-full w-full" // 2. Added relative here for Image fill
            >
              {/* 3. Replaced img with Image component */}
              <Image
                alt="Team members collaborating"
                className="object-cover brightness-50 contrast-110"
                src="https://res.cloudinary.com/ecell/image/upload/v1756636999/heroImage_krghqn.jpg"
                fill
                priority
              />
            </motion.div>

            <div className="absolute inset-0 hidden bg-gradient-to-r from-[#020617] via-transparent to-transparent lg:block" />
            <div className="absolute inset-0 block bg-gradient-to-b from-[#020617] via-transparent to-transparent lg:hidden" />
          </div>
        </section>

        <section className="relative z-[100] border-b border-white/5 bg-[#020617]/90 py-4 backdrop-blur-md">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
              <button
                onClick={() => setActiveTab("faculty")}
                className={`relative px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all sm:px-5 md:px-6 md:text-sm ${
                  activeTab === "faculty"
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="relative z-10">FACULTIES</span>
                {activeTab === "faculty" && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-full border border-blue-500/50 bg-blue-600/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab("alumni")}
                className={`relative px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all sm:px-5 md:px-6 md:text-sm ${
                  activeTab === "alumni"
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="relative z-10">ALUMNI</span>
                {activeTab === "alumni" && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-full border border-blue-500/50 bg-blue-600/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => {
                    setActiveTab("core");
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className={`relative flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all sm:px-5 md:px-6 md:text-sm ${
                    activeTab === "core"
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <span className="relative z-10">
                    CORE TEAM {selectedYear}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`relative z-[110] transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                  {activeTab === "core" && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 rounded-full border border-blue-500/50 bg-blue-600/20"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute top-full left-1/2 z-[120] mt-4 w-48 -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-[#0c1324] shadow-2xl"
                    >
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleYearSelect(year);
                          }}
                          className={`block w-full px-5 py-3 text-center text-[10px] font-bold tracking-widest transition-colors ${
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
                className={`relative px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all sm:px-5 md:px-6 md:text-sm ${
                  activeTab === "developers"
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="relative z-10">DEVELOPERS</span>
                {activeTab === "developers" && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-full border border-blue-500/50 bg-blue-600/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            </div>
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
      <Footer />
    </main>
  );
}
