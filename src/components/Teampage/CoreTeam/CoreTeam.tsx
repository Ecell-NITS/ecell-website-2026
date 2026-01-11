"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { coreTeams, type CoreYear } from "@/data/coreTeam";
import TeamCard from "@/components/Teampage/TeamCard";

interface CoreTeamProps {
  year: CoreYear;
}

export default function CoreTeam({ year }: CoreTeamProps) {
  // Fixed: || -> ??
  const members = coreTeams[year] ?? [];

  return (
    <section className="relative">
      <div className="container mx-auto px-6">
        <div className="mb-24 flex flex-col items-center">
          <div className="mb-4 flex items-center gap-3 text-blue-500">
            <Users className="animate-pulse" size={20} />
            <span className="text-xs font-black tracking-[0.4em] uppercase">
              The Backbone
            </span>
          </div>
          <h2 className="text-center text-5xl leading-none font-black tracking-tighter text-white uppercase italic md:text-7xl">
            Core Team {year}
          </h2>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
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
