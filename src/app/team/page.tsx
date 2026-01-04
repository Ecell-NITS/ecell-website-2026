"use client";

import { useState, useRef, useEffect } from "react";

import Faculties from "@/components/Teampage/Faculties/Faculties";
import Alumni from "@/components/Teampage/Alumni/Alumni";
import CoreTeam from "@/components/Teampage/CoreTeam/CoreTeam";
import Developers from "@/components/Teampage/Developers/Developers";

import { FaCaretDown } from "react-icons/fa";
import type { CoreYear } from "@/data/coreTeam";

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<
    "faculty" | "alumni" | "core" | "developers"
  >("faculty");
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
    <main className="relative flex min-h-screen flex-col">
      <section className="team-hero">
        <h1 className="team-hero-title">Our Team</h1>
      </section>

      <section className="team-content flex-grow">
        <div className="team-section-container">
          <div className="team-tabs relative mt-8 mb-16 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <button
              className={`team-tab ${activeTab === "faculty" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("faculty");
                setIsDropdownOpen(false);
              }}
            >
              Faculties
            </button>

            <button
              className={`team-tab ${activeTab === "alumni" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("alumni");
                setIsDropdownOpen(false);
              }}
            >
              Alumni
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                className={`team-tab flex items-center gap-2 ${activeTab === "core" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("core");
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                CORE TEAM {selectedYear}
                <FaCaretDown
                  size={16}
                  className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="animate-in fade-in slide-in-from-top-2 absolute top-full left-0 z-50 mt-3 w-48 overflow-hidden rounded-lg bg-white py-2 shadow-xl duration-200">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleYearSelect(year);
                      }}
                      className={`block w-full px-5 py-3 text-left font-sans text-sm font-bold transition-colors ${
                        selectedYear === year
                          ? "bg-gray-100 text-black"
                          : "text-gray-600 hover:bg-gray-50 hover:text-black"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className={`team-tab ${activeTab === "developers" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("developers");
                setIsDropdownOpen(false);
              }}
            >
              Developers
            </button>
          </div>

          <div className="animate-in fade-in zoom-in min-h-[400px] duration-300">
            {activeTab === "faculty" && <Faculties />}
            {activeTab === "alumni" && <Alumni />}
            {activeTab === "core" && <CoreTeam year={selectedYear} />}
            {activeTab === "developers" && <Developers />}
          </div>
        </div>
      </section>
    </main>
  );
}
