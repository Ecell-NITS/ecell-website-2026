import Image from "next/image";
import Link from "next/link";
import {
  Linkedin,
  Building2,
  GraduationCap,
  ChevronLeft,
  ExternalLink,
  Quote,
  Lightbulb,
  Award,
  MapPin,
  Trophy,
  Star,
  Newspaper,
} from "lucide-react";
import React from "react";
import type { AlumniMember, AlumniMilestone } from "@/data/alumni";

interface AlumniProfileProps {
  member: AlumniMember;
}

const milestoneIcons: Record<string, React.ElementType> = {
  "Personal Awards": Trophy,
  "Company Awards": Star,
  "Media Recognition": Newspaper,
};

export default function AlumniProfile({ member }: AlumniProfileProps) {
  const nameParts = member.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const hasLinkedIn =
    member.linkdln && member.linkdln !== "#" && member.linkdln.length > 1;

  return (
    <div className="relative min-h-screen bg-[#020617]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient mesh */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />
        </div>

        <div className="relative container mx-auto px-5 pt-24 pb-12 sm:px-6 sm:pt-28 md:pt-32">
          <div className="mx-auto max-w-5xl">
            {/* Back Button */}
            <Link
              href="/alumni"
              className="group/back mb-8 hidden items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white sm:mb-10 sm:inline-flex sm:gap-3 sm:px-5 sm:py-2 sm:text-sm"
            >
              <ChevronLeft
                size={16}
                className="transition-transform duration-300 group-hover/back:-translate-x-0.5"
              />
              Back to Alumni
            </Link>

            <div className="flex flex-col items-start gap-6 sm:gap-8 md:gap-10 lg:flex-row lg:items-center xl:gap-16">
              {/* Profile Image */}
              <div className="relative w-full flex-shrink-0 sm:w-auto">
                <div className="relative mt-2 aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:aspect-auto sm:h-[320px] sm:w-[260px] md:h-[400px] md:w-[320px] lg:mt-0 xl:h-[420px] xl:w-[340px]">
                  <Image
                    src={
                      member.image2 ?? member.image ?? "/placeholder-alumni.png"
                    }
                    alt={member.name}
                    width={320}
                    height={400}
                    className="h-full w-full object-cover"
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 260px, 320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent" />
                </div>
                {/* Glow ring */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[0_0_40px_rgba(37,99,235,0.15)] ring-1 ring-blue-500/20" />
              </div>

              {/* Hero Content */}
              <div className="flex w-full flex-1 flex-col items-start text-left">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-blue-400 uppercase sm:px-4 sm:py-1.5 sm:text-xs">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                  NIT Silchar Alumni
                </div>

                <h1 className="mb-4 text-4xl leading-none font-black tracking-tighter text-white uppercase italic sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem]">
                  {firstName}
                  {lastName && (
                    <>
                      <span className="sm:hidden">&nbsp;</span>
                      <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent sm:block">
                        {lastName}
                      </span>
                    </>
                  )}
                </h1>

                <p className="mb-6 text-sm font-medium text-gray-300 sm:mb-8 sm:text-base md:text-lg xl:text-xl">
                  {member.rank}
                </p>

                <div className="mb-8 flex w-full flex-wrap justify-start gap-3 text-xs text-gray-400 sm:gap-4 sm:text-sm md:gap-5">
                  <span className="flex items-center gap-1.5">
                    <Building2 size={14} className="text-blue-400" />
                    {member.rank.split(",").pop()?.trim() ?? member.rank}
                  </span>
                  {member.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-blue-400" />
                      {member.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <GraduationCap size={14} className="text-blue-400" />
                    {member.education ?? "NIT Silchar"}
                  </span>
                </div>

                {hasLinkedIn && (
                  <div className="flex w-full flex-wrap justify-start gap-3 sm:gap-4">
                    <a
                      href={member.linkdln}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-600/20 px-5 py-2.5 text-sm font-semibold text-blue-300 transition-all hover:border-blue-400 hover:bg-blue-600/30 hover:text-white"
                    >
                      <Linkedin size={16} />
                      LinkedIn
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Main Content */}
      <div className="container mx-auto px-5 py-10 sm:px-6 sm:py-14 lg:py-20">
        <div className="mx-auto max-w-5xl space-y-12 sm:space-y-16 lg:space-y-20 xl:space-y-24">
          {/* Startups Section */}
          {member.startups && member.startups.length > 0 && (
            <section>
              <SectionHeader icon={Building2} label="Startups" />
              <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 md:grid-cols-2 lg:gap-8">
                {member.startups.map((startup, i) => (
                  <div
                    key={startup.name}
                    className="group relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c1324] to-[#0a0f1e] p-8 transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative">
                      <div
                        className={`mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase ${
                          i === 0
                            ? "bg-blue-500/15 text-blue-400"
                            : "bg-indigo-500/15 text-indigo-400"
                        }`}
                      >
                        {startup.tag}
                      </div>
                      <h3 className="mb-4 text-xl font-black tracking-tight text-white uppercase italic sm:text-2xl lg:text-3xl">
                        {startup.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-300">
                        {startup.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Entrepreneurial Journey */}
          {member.journey && member.journey.length > 0 && (
            <section>
              <SectionHeader icon={Lightbulb} label="Entrepreneurial Journey" />
              <div className="mt-6 space-y-4 rounded-2xl border border-white/8 bg-[#0c1324]/60 p-6 backdrop-blur-sm sm:mt-8 sm:space-y-5 sm:rounded-3xl sm:p-8 md:p-10">
                {member.journey.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-gray-300 md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}

                {member.journeyQuote && (
                  <>
                    <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                    <blockquote className="mt-6 border-l-2 border-blue-500 pl-6 italic">
                      <p className="text-base leading-relaxed font-semibold text-white md:text-lg">
                        &ldquo;{member.journeyQuote}&rdquo;
                      </p>
                    </blockquote>
                  </>
                )}
              </div>
            </section>
          )}

          {/* About Section (shown when no journey is provided) */}
          {(!member.journey || member.journey.length === 0) && (
            <section>
              <SectionHeader icon={Quote} label="About" />
              <div className="mt-6 space-y-4 rounded-2xl border border-white/8 bg-[#0c1324]/60 p-6 backdrop-blur-sm sm:mt-8 sm:space-y-5 sm:rounded-3xl sm:p-8 md:p-10">
                <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                  {member.content}
                </p>
              </div>
            </section>
          )}

          {/* Key Milestones */}
          {member.milestones && member.milestones.length > 0 && (
            <section>
              <SectionHeader icon={Award} label="Key Milestones" />
              <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 md:grid-cols-3 lg:gap-8">
                {member.milestones.map((milestone: AlumniMilestone) => {
                  const MIcon = milestoneIcons[milestone.label] ?? Award;
                  return (
                    <div
                      key={milestone.label}
                      className="group rounded-3xl border border-white/8 bg-[#0c1324]/60 p-7 transition-all duration-300 hover:border-blue-500/25 hover:bg-[#0c1324]"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                          <MIcon size={18} />
                        </div>
                        <h4 className="text-sm font-bold tracking-wider text-white uppercase">
                          {milestone.label}
                        </h4>
                      </div>
                      <ul className="space-y-2.5">
                        {milestone.items.map((item: string) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-xs leading-relaxed text-gray-400"
                          >
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-blue-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Advice for Students */}
          {member.advice && member.advice.length > 0 && (
            <section>
              <SectionHeader
                icon={GraduationCap}
                label="Advice for Students & Young Innovators"
              />
              <div className="mt-6 space-y-4 sm:mt-8">
                {member.advice.map((text, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border border-white/6 bg-[#0c1324]/40 px-5 py-5 transition-all hover:border-blue-500/20 hover:bg-[#0c1324]/70 sm:gap-6 sm:px-7 sm:py-6"
                  >
                    <span className="flex-shrink-0 text-3xl font-black tracking-tighter text-blue-600/50 italic sm:text-4xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-2 text-sm leading-relaxed text-gray-300 md:text-base">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Connect Section */}
          {hasLinkedIn && (
            <section className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-[#0c1324]/80 to-indigo-600/10 p-8 text-center sm:rounded-3xl sm:p-10 md:p-12">
              <h3 className="mb-3 text-xl font-black tracking-tight text-white uppercase italic sm:text-2xl md:text-3xl">
                Connect with {firstName}
              </h3>
              <p className="mx-auto mb-8 max-w-lg text-sm text-gray-400">
                Follow their journey and reach out if you&apos;re a student or
                young founder looking for inspiration.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={member.linkdln}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-blue-500/40 bg-blue-600/25 px-7 py-3 text-sm font-bold text-blue-300 transition-all hover:border-blue-400/60 hover:bg-blue-600/40 hover:text-white"
                >
                  <Linkedin size={16} />
                  LinkedIn Profile
                </a>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper component
function SectionHeader({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 sm:h-10 sm:w-10 sm:rounded-2xl">
        <Icon size={16} className="sm:hidden" />
        <Icon size={18} className="hidden sm:block" />
      </div>
      <h2 className="text-lg font-black tracking-tight text-white uppercase italic sm:text-xl md:text-2xl">
        {label}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}
