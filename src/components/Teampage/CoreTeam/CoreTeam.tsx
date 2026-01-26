"use client";

import { motion } from "framer-motion";
import { coreTeam2025_2026 } from "@/data/coreTeam/2025-2026";
import { coreTeam2024_2025 } from "@/data/coreTeam/2024-2025";
import { coreTeam2023_2024 } from "@/data/coreTeam/2023-2024";
import { coreTeam2022_2023 } from "@/data/coreTeam/2022-2023";
import { coreTeam2021_2022 } from "@/data/coreTeam/2021-2022";
import { type CoreYear } from "@/data/coreTeam";
import TeamCard from "@/components/Teampage/TeamCard";

interface CoreTeamProps {
  year: CoreYear;
}

export default function CoreTeam({ year }: CoreTeamProps) {
  const getYearData = () => {
    switch (year) {
      case "2025-2026":
        return coreTeam2025_2026;
      case "2024-2025":
        return coreTeam2024_2025;
      case "2023-2024":
        return coreTeam2023_2024;
      case "2022-2023":
        return coreTeam2022_2023;
      case "2021-2022":
        return coreTeam2021_2022;
      default:
        return [];
    }
  };

  const members = [...getYearData()].sort((a, b) => a.id - b.id);

  return (
    <section className="relative py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col items-center sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
          <h2 className="3xl:text-8xl 4k:text-9xl text-center text-3xl leading-none font-black tracking-tighter text-white uppercase italic sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Core Team {year}
          </h2>
          <div className="mt-6 h-1 w-24 rounded-full bg-blue-600 opacity-50 shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Fixed: || -> ?? */}
              <TeamCard
                name={member.name}
                role={member.rank}
                image={member.image ?? ""}
                socials={{
                  facebook: member.fb,
                  linkedin: member.linkedln,
                  github: member.git,
                  instagram: member.insta,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
