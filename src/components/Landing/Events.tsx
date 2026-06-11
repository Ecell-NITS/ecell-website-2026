"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Events: React.FC = () => {
  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#020617] py-12 md:py-16 lg:py-20 xl:py-24"
    >
      {/* Section Edge Fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-[#020617] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-[#020617] to-transparent" />

      <div className="relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center lg:mb-12"
        >
          <h2 className="text-3xl font-black tracking-tight text-white uppercase sm:text-4xl md:text-5xl">
            ONGOING EVENTS
          </h2>

          <h3 className="mt-4 text-2xl font-bold tracking-widest text-[#5c3cff] sm:text-3xl md:text-4xl">
            RECRUITMENT 2026
          </h3>
        </motion.div>

        {/* Poster / Banner Area */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto flex w-full max-w-md justify-center overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(92,60,255,0.15)] ring-1 ring-white/10 sm:max-w-lg md:max-w-xl lg:max-w-2xl"
        >
          <img
            src="/recruitmemntposter.jpg"
            alt="Recruitment 2026"
            className="h-auto w-full object-contain"
          />
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <Link
            href="/recruitment"
            className="flex w-full items-center justify-center rounded-lg bg-[#1e293b] px-8 py-4 font-bold text-white transition-all hover:bg-[#334155] sm:w-auto"
          >
            Register Now
          </Link>
          <a
            href="/EcellRecruitmentBrochure2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-lg bg-[#1e293b] px-8 py-4 font-bold text-white transition-all hover:bg-[#334155] sm:w-auto"
          >
            Download Brochure
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
