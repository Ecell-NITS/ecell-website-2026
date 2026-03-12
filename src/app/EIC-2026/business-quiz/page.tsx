"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import "~/styles/eic2026.css";

export default function BusinessQuiz() {
  return (
    <div className="min-h-screen bg-[#111111] font-sans text-slate-100 antialiased">
      <header className="sticky top-0 z-50 w-full border-b border-[#cee7d7]/20 bg-[#111111]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-[#cee7d7]">
                quiz
              </span>
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
              className="flex items-center gap-2 rounded-lg bg-[#cee7d7] px-4 py-2 text-sm font-bold text-[#111111]"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
              Back to Events
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative w-full overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]/90" />
            <div className="h-full w-full bg-[url('/images/eic2026/events/business_quiz.webp')] bg-cover bg-center opacity-30" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center rounded-full border border-[#cee7d7]/30 bg-[#cee7d7]/10 px-3 py-1 text-xs font-bold tracking-widest text-[#cee7d7] uppercase"
            >
              Utility Property
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-4xl font-bold sm:mb-6 sm:text-5xl md:text-7xl"
            >
              Business <span className="eic2026-shimmer-text italic">Quiz</span>
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
                  d: "Questions from businesses, brands, start-ups, entrepreneurship, current affairs, etc.",
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
            <span className="material-symbols-outlined text-2xl text-[#cee7d7]">
              quiz
            </span>
            <span className="text-lg font-bold">Business Quiz</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2026 EIC Challenge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
