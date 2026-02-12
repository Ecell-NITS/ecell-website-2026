"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { AlumniMember } from "@/data/alumni";
import TeamCard from "@/components/Teampage/TeamCard";

const AlumniModal = dynamic(() => import("./AlumniModal"), {
  ssr: false,
});

interface AlumniGridProps {
  alumni: AlumniMember[];
}

export default function AlumniGrid({ alumni }: AlumniGridProps) {
  const [activeId, setActiveId] = useState<number | null>(null);

  const openModal = useCallback((id: number) => {
    setActiveId(id);
  }, []);

  const closeModal = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {alumni.map((member, index) => (
          <div
            key={member.id}
            onClick={() => openModal(member.id)}
            className="translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards] cursor-pointer opacity-0"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <TeamCard
              name={member.name}
              role={member.rank}
              image={member.image ?? ""}
              socials={{
                facebook: member.fb,
                linkedin: member.linkdln,
                github: member.git,
              }}
              priority={index < 3}
            />
          </div>
        ))}
      </div>

      <AlumniModal activeId={activeId} onClose={closeModal} />
    </>
  );
}
