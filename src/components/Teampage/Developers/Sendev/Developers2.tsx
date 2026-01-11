"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import TeamCard from "@/components/Teampage/TeamCard";
import { seniorDevelopers } from "@/data/developers";
import type { Developer } from "@/data/developers";

export default function SeniorDevelopers() {
  return (
    <section className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="mb-24 flex flex-col items-center">
          <div className="mb-4 flex items-center gap-3 text-blue-500">
            <Sparkles className="animate-pulse" size={20} />
            <span className="text-xs font-black tracking-[0.4em] uppercase">
              The Core Architects
            </span>
          </div>

          <h2 className="text-center text-5xl leading-none font-black tracking-tighter text-white uppercase italic md:text-7xl">
            Senior Developers
          </h2>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {seniorDevelopers.map((dev: Developer) => (
            // Fixed: || -> ??
            <TeamCard
              key={dev.id}
              name={dev.name}
              role={dev.rank}
              image={dev.image ?? ""}
              socials={{
                facebook: dev.fb,
                linkedin: dev.linkedln,
                github: dev.git,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
