"use client";

import Link from "next/link";
import Background from "@/components/Landing/Background";
import Navbar from "@/components/Landing/Navbar";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      <Background />
      <Navbar />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <p className="mt-4 p-2 text-purple-200 sm:text-lg">
            Whoops! It looks like you&apos;ve ventured into uncharted space.
          </p>
          {/* Glowing 404 Text */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 opacity-30 blur-3xl" />
            <h1 className="relative mb-2 bg-gradient-to-br from-white via-blue-100 to-slate-400 bg-clip-text text-8xl leading-none font-black text-transparent drop-shadow-2xl md:text-[12rem]">
              404
            </h1>
          </div>

          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-100 md:text-5xl">
            Lost in the Matrix
          </h2>

          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-slate-400 md:text-lg">
            The page you are looking does not exist anymore. Let&apos;s get you
            back to the main site.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-[#020617] transition-transform"
            >
              <span className="relative z-10">Return to Home</span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-200 to-slate-100 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
