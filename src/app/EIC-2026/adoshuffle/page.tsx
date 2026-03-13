"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import "~/styles/eic2026.css";

export default function AdoShuffle() {
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
              <h1 className="text-xl font-bold tracking-tight">AdoShuffle</h1>
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
            <div className="h-full w-full bg-[url('/images/eic2026/events/adoshuffle.webp')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex justify-center"
            >
              <div className="eic2026-title-deed-bar">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#cee7d7]/70 uppercase">
                  ★ Media Property ★
                </span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-4xl font-bold sm:mb-6 sm:text-5xl md:text-7xl"
            >
              Ado<span className="eic2026-shimmer-text italic">Shuffle</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-base text-slate-400 sm:mb-10 sm:text-lg md:text-xl"
            >
              Inspired by the unexpected twists of Monopoly, AdoShuffle
              challenges you to reimagine brands in completely new ways. What if
              Apple made noodles? Or Nike launched a coffee chain? Create a
              &quot;what-if&quot; ad video and poster.
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
              { icon: "groups", label: "Team Size", value: "Up to 5 Members" },
              {
                icon: "videocam",
                label: "Submit",
                value: "1 Video + 1 Poster",
              },
              {
                icon: "timer",
                label: "Video Length",
                value: "45–60 Seconds",
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
                  t: "The Concept",
                  d: "Choose a well-known brand and creatively imagine it launching a completely different product or service.",
                },
                {
                  n: "02",
                  t: "Team Size",
                  d: "A maximum of 5 members can officially register. Additional people may help with video creation.",
                },
                {
                  n: "03",
                  t: "Submission",
                  d: 'Each entry must include one advertisement video and one promotional poster showcasing the "what-if" concept.',
                },
                {
                  n: "04",
                  t: "Video Duration",
                  d: "The ad video should be 45–60 seconds long — short, clear, and engaging.",
                },
                {
                  n: "05",
                  t: "Content Standards",
                  d: "Content must be appropriate and professional. Offensive language or inappropriate content is strictly prohibited.",
                },
                {
                  n: "06",
                  t: "Closing Tagline",
                  d: "The advertisement should end with a memorable tagline that highlights the brand's new product idea.",
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
            <span className="text-lg font-bold text-slate-300">AdoShuffle</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2026 EIC Challenge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
