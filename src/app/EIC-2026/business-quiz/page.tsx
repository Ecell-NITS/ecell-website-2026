"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import "~/styles/eic2026.css";

const BRANCHES = ["CSE", "EE", "ECE", "EIE", "CE", "ME"];
const BRANCH_TO_ID: Record<string, string> = {
  CSE: "CSE",
  EE: "EE",
  ECE: "ECE",
  EIE: "EIE",
  CE: "CE",
  ME: "ME",
};

export default function BusinessQuiz() {
  const [selectedBranch, setSelectedBranch] = useState("");
  return (
    <div className="eic2026-page min-h-screen bg-[#111111] font-sans text-slate-100 antialiased">
      <header className="sticky top-0 z-50 w-full border-b border-[#cee7d7]/20 bg-[#111111]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/EIC/eic-logo1.png"
                alt="EIC Logo"
                width={36}
                height={36}
                className="rounded-md"
              />
              <h1 className="text-xl font-bold tracking-tight">
                Business Quiz
              </h1>
            </div>
            <nav className="hidden space-x-8 md:flex">
              <a
                className="text-sm font-medium hover:text-[#cee7d7]"
                href="#rules"
              >
                Rules
              </a>
            </nav>
            <Link
              href="/EIC-2026"
              className="flex shrink-0 items-center gap-1 rounded-lg bg-[#cee7d7] px-3 py-2 text-xs font-bold text-[#111111] sm:gap-2 sm:px-4 sm:text-sm"
            >
              <span className="material-symbols-outlined text-[16px] sm:text-[20px]">
                arrow_back
              </span>
              <span className="hidden sm:inline">Back to Events</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="eic2026-events-board relative w-full overflow-hidden border-b border-[#cee7d7]/10 py-28 lg:py-36">
          <div className="eic2026-corner-piece eic2026-corner-piece--tl" />
          <div className="eic2026-corner-piece eic2026-corner-piece--tr" />
          <div className="eic2026-corner-piece eic2026-corner-piece--bl" />
          <div className="eic2026-corner-piece eic2026-corner-piece--br" />

          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]/90" />
            <div className="h-full w-full bg-[url('/images/eic2026/events/business_quiz.webp')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex justify-center"
            >
              <div className="eic2026-title-deed-bar">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#cee7d7]/70 uppercase">
                  ★ Utility Property ★
                </span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-4xl font-bold sm:mb-6 sm:text-5xl md:text-7xl"
            >
              Boardroom{" "}
              <span className="eic2026-shimmer-text italic">Trivia</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-base text-slate-400 sm:mb-10 sm:text-lg md:text-xl"
            >
              Forget the luck of the dice. Your knowledge of markets, brands,
              startups, and entrepreneurship will determine how far you move on
              the board. Outsmart rival branches and prove your monopoly on
              business brilliance.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.a
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(206,231,215,0.4)",
                }}
                className="rounded-lg bg-[#cee7d7] px-8 py-4 text-center font-bold text-[#111111] shadow-lg shadow-[#cee7d7]/20 transition-all"
                href="#rules"
              >
                View Rules
              </motion.a>

              <div className="mt-4 flex w-full flex-col items-center gap-2 sm:mt-0 sm:w-auto sm:flex-row sm:gap-4">
                <select
                  aria-label="Select Branch"
                  className="w-full rounded-lg border border-[#cee7d7]/20 bg-[#111111] px-4 py-4 font-semibold text-[#cee7d7] focus:border-[#cee7d7] focus:ring-1 focus:ring-[#cee7d7] focus:outline-none sm:w-auto"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value="" disabled>
                    Select Branch
                  </option>
                  {BRANCHES.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>

                <Link
                  href={
                    selectedBranch
                      ? `/EIC-2026/register/${BRANCH_TO_ID[selectedBranch]}?event=boardroom-trivia`
                      : "#"
                  }
                  className={`w-full rounded-lg px-8 py-4 text-center font-bold transition-all sm:w-auto ${
                    selectedBranch
                      ? "bg-[#cee7d7] text-[#111111] shadow-lg shadow-[#cee7d7]/20 hover:scale-105"
                      : "cursor-not-allowed border border-[#444444] bg-[#2a2a2a] text-slate-500"
                  }`}
                  onClick={(e) => {
                    if (!selectedBranch) {
                      e.preventDefault();
                      alert("Please select a branch to register.");
                    }
                  }}
                >
                  Register Now
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: "groups", label: "Team Size", value: "4 Members" },
              {
                icon: "category",
                label: "Topics",
                value: "Markets, Brands, Startups",
              },
              {
                icon: "bolt",
                label: "Format",
                value: "Rapid Fire + Tiebreaker",
                highlight: true,
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="eic2026-monopoly-shadow flex items-center gap-4 rounded-xl border border-[#cee7d7]/20 bg-[#111111] p-6"
              >
                <div className="rounded-lg bg-[#cee7d7]/10 p-3 text-[#cee7d7]">
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">
                    {s.label}
                  </p>
                  <p
                    className={`font-bold ${s.highlight ? "text-[#cee7d7]" : ""}`}
                  >
                    {s.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-24" id="rules">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold">
              <span className="material-symbols-outlined text-[#cee7d7]">
                gavel
              </span>
              Rules of Engagement
            </h2>
            <ul className="space-y-5">
              {[
                {
                  n: "01",
                  t: "One Team Per Branch",
                  d: "Each Branch Society should send one team of 4 members to represent them.",
                },
                {
                  n: "02",
                  t: "Timed Responses",
                  d: "The host/QM will ask questions and participants must answer within a specified time limit.",
                },
                {
                  n: "03",
                  t: "No External Resources",
                  d: "Participants must avoid using external resources or electronic gadgets while answering.",
                },
                {
                  n: "04",
                  t: "Question Domains",
                  d: "Questions from businesses, brands, start-ups, entrepreneurship, current affairs, monopoly, etc.",
                },
                {
                  n: "05",
                  t: "Tiebreakers",
                  d: "In case of a tie, a sudden-death round or tiebreaker question determines the winner.",
                },
                {
                  n: "06",
                  t: "Final Decision",
                  d: "The host's decision is final in case of any disputes. Disqualification for rule violations.",
                },
              ].map((r, i) => (
                <motion.li
                  key={r.n}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <span className="text-xl font-bold text-[#cee7d7]">
                    {r.n}
                  </span>
                  <div>
                    <h4 className="mb-1 font-bold">{r.t}</h4>
                    <p className="text-slate-400">{r.d}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-[#cee7d7]/10 bg-[#111111] py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <Image
              src="/EIC/eic-logo1.png"
              alt="EIC Logo"
              width={32}
              height={32}
              className="rounded-md opacity-80"
            />
            <span className="text-lg font-bold text-slate-300">
              Boardroom Trivia
            </span>
          </div>
          <p className="text-sm text-slate-500">
            © 2026 EIC Challenge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
