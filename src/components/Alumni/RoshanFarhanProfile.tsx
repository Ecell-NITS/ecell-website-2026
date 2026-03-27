import Image from "next/image";
import Link from "next/link";
import {
  Linkedin,
  MapPin,
  Building2,
  GraduationCap,
  Award,
  Lightbulb,
  Newspaper,
  ChevronLeft,
  ExternalLink,
  Trophy,
  Star,
} from "lucide-react";
import React from "react";

export default function RoshanFarhanProfile() {
  const milestones = [
    {
      icon: Trophy,
      label: "Personal Awards",
      items: [
        "RCEP Tech 35 Under 35 (Global)",
        "Economic Times Young Leader",
        "World Economic Forum Global Shaper",
        "Top 50 MBA Graduates in India",
        "TEDx Speaker & Industry Thought Leader on AI, Technology and Startups",
      ],
    },
    {
      icon: Star,
      label: "Company Awards",
      items: [
        "MyriadAI: Best Emerging AI Startup 2025 — LetsVenture",
        "Gobillion: Best Social Commerce Startup 2023 — Entrepreneur India",
        "Gobillion: Best Consumer Tech Startup 2022 — Entrepreneur India",
      ],
    },
    {
      icon: Newspaper,
      label: "Media Recognition",
      items: [
        "Bloomberg US",
        "Associated Press",
        "Tech in Asia",
        "Times of India",
        "The Economic Times",
        "Entrepreneur India",
        "Financial Express",
        "Business Standard",
        "YourStory",
        "Inc42",
      ],
    },
  ];

  const adviceItems = [
    {
      number: "01",
      text: "Start and launch fast — clarity comes from action, not planning.",
    },
    {
      number: "02",
      text: "Build resilience early. Markets change, funding cycles change — your conviction must not.",
    },
    {
      number: "03",
      text: "Think global from Day 1. Your ambition should not be limited by geography.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#020617]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient mesh */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />
        </div>

        <div className="relative container mx-auto px-6 pt-28 pb-12">
          {/* Back Button */}
          <Link
            href="/alumni"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
          >
            <ChevronLeft size={16} />
            Back to Alumni
          </Link>

          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dnvhl9pru/image/upload/v1676307970/E-Cell%20Alumni/Modal%20Cards/RoshanFarhanSir_qhsqzk.jpg"
                  alt="Roshan Farhan"
                  width={320}
                  height={400}
                  className="h-[320px] w-[260px] object-cover md:h-[400px] md:w-[320px]"
                  priority
                  sizes="(max-width: 768px) 260px, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent" />
              </div>
              {/* Glow ring */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[0_0_40px_rgba(37,99,235,0.15)] ring-1 ring-blue-500/20" />
            </div>

            {/* Hero Content */}
            <div className="flex-1">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-400 uppercase">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                NIT Silchar Alumni
              </div>

              <h1 className="mb-4 text-5xl leading-none font-black tracking-tighter text-white uppercase italic md:text-6xl lg:text-7xl">
                Roshan
                <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Farhan
                </span>
              </h1>

              <p className="mb-6 text-base font-medium text-gray-300 md:text-lg">
                YC Founder · 2x Founder/CEO · Angel Investor · Startup Advisor ·
                ex Management Consultant
              </p>

              <div className="mb-8 flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Building2 size={14} className="text-blue-400" />
                  MyriadAI &amp; Gobillion (YC S21)
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-blue-400" />
                  Bangalore, India · San Francisco, CA
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-blue-400" />
                  NIT Silchar · IIM Shillong
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/roshanfarhan/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-600/20 px-5 py-2.5 text-sm font-semibold text-blue-300 transition-all hover:border-blue-400 hover:bg-blue-600/30 hover:text-white"
                >
                  <Linkedin size={16} />
                  LinkedIn
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-14">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* Startups Section */}
          <section>
            <SectionHeader icon={Building2} label="Startups" />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {/* MyriadAI */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c1324] to-[#0a0f1e] p-8 transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold tracking-widest text-blue-400 uppercase">
                    Current · 2024
                  </div>
                  <h3 className="mb-4 text-2xl font-black tracking-tight text-white uppercase italic">
                    MyriadAI
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300">
                    MyriadAI is the{" "}
                    <span className="font-semibold text-white">
                      Palantir for Conversational AI
                    </span>{" "}
                    — an enterprise-grade Conversational AI platform which helps
                    global companies build &amp; deploy intelligent AI agents
                    across voice, WhatsApp, and more. Partnering with leading
                    enterprises &amp; AI leaders to automate sales and customer
                    support workflows. Mission: make enterprise AI practical,
                    ROI-driven, and scalable.
                  </p>
                </div>
              </div>

              {/* Gobillion */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c1324] to-[#0a0f1e] p-8 transition-all duration-500 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-bold tracking-widest text-indigo-400 uppercase">
                    YC S21 · 2020
                  </div>
                  <h3 className="mb-4 text-2xl font-black tracking-tight text-white uppercase italic">
                    Gobillion
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300">
                    India&apos;s leading social commerce platform for Tier 2+
                    cities. Selected for{" "}
                    <span className="font-semibold text-white">
                      Y Combinator (YC S21)
                    </span>
                    , raised funding from YC + top global VCs. Built
                    &ldquo;Gobillion Shopping Rooms&rdquo; and pioneered Group
                    Buying for groceries in India — scaling to become one of the
                    fastest-growing e-commerce companies in its segment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Entrepreneurial Journey */}
          <section>
            <SectionHeader icon={Lightbulb} label="Entrepreneurial Journey" />
            <div className="mt-8 space-y-5 rounded-3xl border border-white/8 bg-[#0c1324]/60 p-8 backdrop-blur-sm md:p-10">
              <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                I grew up in Guwahati, Assam — far from the startup ecosystems
                usually associated with tech or venture capital. My early
                upbringing, along with my education at NIT Silchar (B.Tech,
                Computer Science &amp; Engineering) and MBA from IIM Shillong,
                shaped both my character and ambition.
              </p>
              <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                NIT Silchar was deeply transformative for me. I founded and led
                AIESEC at NITS, served as General Secretary of CSE, and headed
                campus initiatives like Incandescence and Tecnoesis. At IIM
                Shillong, leading the Student Council and launching new
                initiatives strengthened my confidence in driving impact at
                scale.
              </p>
              <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                I pursued my career in Management Consulting at Deloitte, EY,
                and Accenture — advising Fortune 500 companies on strategy and
                transformation. While rewarding, I had an innate urge to build
                something of my own.
              </p>
              <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                In January 2020, I took a leap of faith and left my rewarding
                corporate career to pursue entrepreneurship. Early months were
                very difficult — no ecosystem support, limited connections, no
                stable income, and a global pandemic. But I kept pushing
                forward.
              </p>
              <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                In 2021,{" "}
                <span className="font-semibold text-white">
                  Gobillion was selected into Y Combinator (YC S21)
                </span>
                . YC changed my life — I had the privilege of being mentored by
                top global investors &amp; founders in Silicon Valley and being
                part of a global ecosystem. Later in 2024, I founded MyriadAI to
                help global enterprises adopt AI at scale.
              </p>
              <blockquote className="mt-6 border-l-2 border-blue-500 pl-6 italic">
                <p className="text-base leading-relaxed font-semibold text-white md:text-lg">
                  &ldquo;Global tech companies can be built from anywhere —
                  including the classrooms and hostels of NIT Silchar — and
                  ambition should never be limited by geography or
                  background.&rdquo;
                </p>
              </blockquote>
            </div>
          </section>

          {/* Key Milestones */}
          <section>
            <SectionHeader icon={Award} label="Key Milestones" />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {milestones.map((milestone) => (
                <div
                  key={milestone.label}
                  className="group rounded-3xl border border-white/8 bg-[#0c1324]/60 p-7 transition-all duration-300 hover:border-blue-500/25 hover:bg-[#0c1324]"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                      <milestone.icon size={18} />
                    </div>
                    <h4 className="text-sm font-bold tracking-wider text-white uppercase">
                      {milestone.label}
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {milestone.items.map((item) => (
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
              ))}
            </div>
          </section>

          {/* Advice for Students */}
          <section>
            <SectionHeader
              icon={GraduationCap}
              label="Advice for Students & Young Innovators"
            />
            <div className="mt-8 space-y-4">
              {adviceItems.map((item) => (
                <div
                  key={item.number}
                  className="flex items-start gap-6 rounded-2xl border border-white/6 bg-[#0c1324]/40 px-7 py-6 transition-all hover:border-blue-500/20 hover:bg-[#0c1324]/70"
                >
                  <span className="flex-shrink-0 text-4xl font-black tracking-tighter text-blue-600/50 italic">
                    {item.number}
                  </span>
                  <p className="pt-2 text-sm leading-relaxed text-gray-300 md:text-base">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Connect Section */}
          <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-[#0c1324]/80 to-indigo-600/10 p-10 text-center">
            <h3 className="mb-3 text-2xl font-black tracking-tight text-white uppercase italic md:text-3xl">
              Connect with Roshan
            </h3>
            <p className="mx-auto mb-8 max-w-lg text-sm text-gray-400">
              Follow his journey building enterprise AI at scale, and reach out
              if you&apos;re a student or young founder looking for inspiration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/roshanfarhan/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl border border-blue-500/40 bg-blue-600/25 px-7 py-3 text-sm font-bold text-blue-300 transition-all hover:border-blue-400/60 hover:bg-blue-600/40 hover:text-white"
              >
                <Linkedin size={16} />
                LinkedIn Profile
              </a>
            </div>
          </section>
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
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
        <Icon size={18} />
      </div>
      <h2 className="text-xl font-black tracking-tight text-white uppercase italic md:text-2xl">
        {label}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}
