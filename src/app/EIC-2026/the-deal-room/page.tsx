"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import "~/styles/eic2026.css";

export default function TheDealRoom() {
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
                The Deal Room
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
            <div className="h-full w-full bg-[url('/images/eic2026/events/deal_room.webp')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex justify-center"
            >
              <div className="eic2026-title-deed-bar">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#cee7d7]/70 uppercase">
                  ★ Luxury Property ★
                </span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-4xl font-bold sm:mb-6 sm:text-5xl md:text-7xl"
            >
              The Deal <span className="eic2026-shimmer-text italic">Room</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-base text-slate-400 sm:mb-10 sm:text-lg md:text-xl"
            >
              Strategize. Negotiate. Build Your Empire. An interactive challenge
              that tests teamwork, analytical thinking, and decision-making.
              Uncover clues, solve puzzles, and connect information — every move
              matters on the Monopoly board.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <motion.a
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(206,231,215,0.4)",
                }}
                className="rounded-lg bg-[#cee7d7] px-8 py-4 font-bold text-[#111111] shadow-lg shadow-[#cee7d7]/20"
                href="#rules"
              >
                View Rules
              </motion.a>
            </motion.div>
          </div>
        </section>

        <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: "groups", label: "Team Size", value: "4 Members" },
              { icon: "timer", label: "Time Limit", value: "15 Minutes" },
              {
                icon: "phonelink_off",
                label: "Devices",
                value: "No Phones Allowed",
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
                  d: "Each branch will be represented by one team consisting of four members.",
                },
                {
                  n: "02",
                  t: "15-Minute Sprint",
                  d: "Teams will have 15 minutes to locate clues and solve the puzzles.",
                },
                {
                  n: "03",
                  t: "No Mobile Phones",
                  d: "Mobile phones are not permitted during the activity.",
                },
                {
                  n: "04",
                  t: "Clue Exploration",
                  d: "Teams must explore the designated area or utilize the resources provided to uncover clues. These may appear as puzzles, riddles, or physical objects leading to the final solution.",
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
              The Deal Room
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
