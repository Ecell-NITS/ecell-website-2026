"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Faculties from "@/components/Teampage/Faculties/Faculties";
import Alumni from "@/components/Teampage/Alumni/Alumni";
import CoreTeam from "@/components/Teampage/CoreTeam/CoreTeam";
import Developers from "@/components/Teampage/Developers/Developers";

// 1. Define the specific type to fix the "any" error
type CoreYear =
  | "2025-2026"
  | "2024-2025"
  | "2023-2024"
  | "2022-2023"
  | "2021-2022";

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("Faculty");
  // 2. Apply the type to useState
  const [year, setYear] = useState<CoreYear>("2025-2026");

  const tabs = ["Faculty", "Alumni", "Core Team", "Developers"];

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      {/* REMOVED <NavbarTeam /> because it is already in layout.tsx */}

      <section className="relative overflow-hidden px-6 pt-32 pb-16 md:pt-48 md:pb-32">
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/2 rounded-full bg-blue-900/20 blur-[120px]" />

        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h1 className="font-serif text-6xl leading-[0.85] font-medium tracking-tight text-white italic md:text-8xl lg:text-[7rem]">
                MEET
              </h1>

              <h1 className="ml-12 font-serif text-6xl leading-[0.85] font-medium tracking-tight text-white italic md:ml-24 md:text-8xl lg:text-[7rem]">
                OUR
              </h1>

              <div className="relative my-1 inline-block md:my-2">
                <h1 className="font-sans text-6xl leading-[0.85] font-black tracking-tighter text-blue-600 italic mix-blend-screen md:text-8xl lg:text-[7rem]">
                  EXCELLENT
                </h1>
              </div>

              <h1 className="mt-1 font-serif text-5xl leading-[0.85] font-medium tracking-tight text-white italic md:mt-2 md:text-7xl lg:text-[6rem]">
                TEAM <br className="hidden md:block" /> MEMBERS
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute top-0 right-0 bottom-0 z-0 hidden h-full w-1/2 md:block"
            >
              <div className="relative h-full w-full opacity-60 mix-blend-lighten">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#020617]/50 to-[#020617]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="sticky top-4 z-40 mb-12">
        <div className="flex justify-center">
          <div className="glass no-scrollbar flex max-w-[95vw] items-center gap-1 overflow-x-auto rounded-full border border-white/10 p-2 shadow-2xl backdrop-blur-xl md:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 md:text-base ${
                  activeTab === tab
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-blue-600"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto min-h-[50vh] px-4 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "Faculty" && <Faculties />}
            {activeTab === "Alumni" && <Alumni />}

            {activeTab === "Core Team" && (
              <div className="flex w-full flex-col items-center">
                <div className="no-scrollbar mb-8 flex max-w-[90vw] justify-center gap-2 overflow-x-auto pb-2">
                  {["2025-2026", "2024-2025", "2023-2024"].map((yr) => (
                    <button
                      key={yr}
                      // 3. Cast the string to CoreYear so TypeScript is happy
                      onClick={() => setYear(yr as CoreYear)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                        year === yr
                          ? "border-white bg-white text-black"
                          : "border-white/20 text-gray-400 hover:border-white/50"
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
                {/* 4. No "as any" needed now! */}
                <CoreTeam year={year} />
              </div>
            )}

            {activeTab === "Developers" && <Developers />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* REMOVED <Footer /> because it is already in layout.tsx */}
    </main>
  );
}
