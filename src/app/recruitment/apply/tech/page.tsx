"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const domains = [
  { id: "web", title: "Web Development", description: "Build responsive web applications, landing pages, and authentication systems.", available: true, href: "/recruitment/apply/tech/web" },
  { id: "ai", title: "Artificial Intelligence", description: "Work on machine learning models, NLP, and intelligent systems.", available: true, href: "/recruitment/apply/tech/ai" },
  { id: "uiux", title: "UI/UX Design", description: "Design intuitive interfaces, prototypes, and user experiences.", available: true, href: "/recruitment/apply/tech/uiux" },
];

export default function TechDomainPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-8">
      <Link href="/recruitment" className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to Overview
      </Link>
      
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="mb-16">
        <h1 className="text-4xl font-light tracking-tight text-white sm:text-5xl">Technical <span className="font-semibold text-gray-300">Domains</span></h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500 font-light">Select the engineering discipline you wish to apply for.</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-3">
        {domains.map((domain, i) => (
          <motion.div key={domain.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}>
            {domain.available ? (
              <Link href={domain.href}>
                <div className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.05]">
                  <div>
                    <h3 className="text-lg font-medium text-white">{domain.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400 font-light">{domain.description}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white transition-transform group-hover:translate-x-1">
                    Apply <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] p-8 opacity-50">
                <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-gray-400">Soon</div>
                <div>
                  <h3 className="text-lg font-medium text-white">{domain.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400 font-light">{domain.description}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
