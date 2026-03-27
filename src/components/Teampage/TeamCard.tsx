import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  socials?: {
    facebook?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  priority?: boolean;
  profileHref?: string;
}

export default function TeamCard({
  name,
  role,
  image,
  socials,
  priority = false,
  profileHref,
}: TeamCardProps) {
  return (
    <div className="glowing-border group relative h-full cursor-default">
      {/* Inner Card Background */}
      <div className="flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0c1324] p-5 shadow-2xl transition-all duration-500 md:p-6">
        {/* Image Container */}
        <div className="relative aspect-[4/5] w-full flex-shrink-0 overflow-hidden rounded-[2rem]">
          <Image
            src={image}
            alt={name}
            width={400}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            placeholder="empty"
            className="h-full w-full object-cover transition-all duration-1000 ease-out group-hover:scale-105"
          />
          {/* Dark Overlay that lightens on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1324] via-transparent to-transparent opacity-40 transition-opacity group-hover:opacity-20"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 pt-8 pb-4 text-center">
          <div>
            <h3 className="mb-2 text-2xl font-black tracking-tight text-white uppercase italic transition-colors group-hover:text-blue-400 md:text-3xl">
              {name}
            </h3>
            <p className="mb-6 text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase md:text-[11px]">
              {role}
            </p>
          </div>

          {/* Social Icons - Now with strict checking for "#" placeholders */}
          <div className="flex justify-center gap-6 opacity-50 transition-all duration-300 group-hover:opacity-100">
            {socials?.facebook && socials.facebook !== "#" && (
              <a href={socials.facebook} target="_blank" rel="noreferrer">
                <Facebook
                  size={18}
                  className="text-white transition-colors hover:text-blue-500"
                />
              </a>
            )}
            {socials?.linkedin && socials.linkedin !== "#" && (
              <a href={socials.linkedin} target="_blank" rel="noreferrer">
                <Linkedin
                  size={18}
                  className="text-white transition-colors hover:text-blue-400"
                />
              </a>
            )}
            {socials?.github && socials.github !== "#" && (
              <a href={socials.github} target="_blank" rel="noreferrer">
                <Github
                  size={18}
                  className="text-white transition-colors hover:text-white"
                />
              </a>
            )}
            {socials?.instagram && socials.instagram !== "#" && (
              <a href={socials.instagram} target="_blank" rel="noreferrer">
                <Instagram
                  size={18}
                  className="text-white transition-colors hover:text-pink-500"
                />
              </a>
            )}
          </div>

          {/* View Profile */}
          {profileHref && (
            <>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <Link
                href={profileHref}
                className="group/btn flex w-full items-center justify-center gap-2 py-3 text-xs font-bold tracking-[0.2em] text-gray-500 uppercase transition-all duration-300 hover:text-blue-400"
              >
                View Profile
                <ArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
