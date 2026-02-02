"use client";

import { motion } from "framer-motion";
import TeamCard from "@/components/Teampage/TeamCard";
import { juniorDevelopers } from "@/data/developers";
import type { Developer } from "@/data/developers";

export default function JuniorDevelopers() {
  return (
    <section className="relative">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col items-center sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
          <h2 className="3xl:text-8xl 4k:text-9xl text-center text-3xl leading-none font-black tracking-tighter text-white uppercase italic sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Junior Developers
          </h2>
          <div className="mt-6 h-1 w-24 rounded-full bg-blue-600 opacity-50 shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {juniorDevelopers.map((dev: Developer) => (
            <motion.div
              key={dev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Fixed: || -> ?? */}
              <TeamCard
                name={dev.name}
                role={dev.rank}
                image={dev.image ?? ""}
                socials={{
                  facebook: dev.fb,
                  linkedin: dev.linkedln,
                  github: dev.git,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
