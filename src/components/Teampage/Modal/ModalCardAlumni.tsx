"use client";

import Image from "next/image";
import { alumniData, type AlumniMember } from "@/data/alumni";

interface ModalCardAlumniProps {
  dataid: number;
}

export default function ModalCardAlumni({ dataid }: ModalCardAlumniProps) {
  const member = alumniData.find((item: AlumniMember) => item.id === dataid);

  if (!member) {
    return <p className="py-4 text-center text-red-400">Data not found.</p>;
  }

  return (
    <div className="flex flex-col items-start gap-8 md:flex-row">
      {/* Image Section */}
      <div className="w-full flex-shrink-0 md:w-1/3">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 shadow-lg md:aspect-square">
          {member.image2 ? (
            <Image
              src={member.image2}
              alt={member.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-800 text-gray-500">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex w-full flex-col gap-4 md:w-2/3">
        <div>
          <h2 className="mb-2 text-3xl font-black tracking-tighter text-white uppercase italic md:text-4xl">
            {member.name}
          </h2>
          <p className="text-xs font-bold tracking-[0.2em] text-blue-400 uppercase md:text-sm">
            {member.rank}
          </p>
        </div>

        <div className="my-2 h-px w-full bg-gradient-to-r from-white/20 to-transparent" />

        <p className="text-sm leading-relaxed font-light text-gray-300 md:text-base">
          {member.content}
        </p>
      </div>
    </div>
  );
}
