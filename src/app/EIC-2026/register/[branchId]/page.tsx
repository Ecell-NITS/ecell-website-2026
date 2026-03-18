"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ArrowLeft,
  CircleCheck,
  CircleAlert,
  X,
  Gavel,
  Gamepad2,
  Ban,
  Users,
  ClipboardPen,
  Trash2,
  ShieldCheck,
  Mail,
  Lock,
  UserCheck,
  Plus,
  Calendar,
} from "lucide-react";
import "~/styles/eic2026.css";

/* ─── Removed Obscured Branch ID → Branch mapping ─── */

const BRANCH_FULL_NAMES: Record<string, string> = {
  CSE: "Computer Science & Engineering",
  EE: "Electrical Engineering",
  ECE: "Electronics & Communication Engineering",
  EIE: "Electronics & Instrumentation Engineering",
  CE: "Civil Engineering",
  ME: "Mechanical Engineering",
};

/* ─── Permitted Emails per Branch ─── */
const PERMITTED_EMAILS: Record<string, string[]> = {
  CSE: [
    "kartika.jauhari28@gmail.com",
    "soumyaranjandash005@gmail.com",
    "dasbishal1717@gmail.com",
  ],
  EE: [
    "connectwithshreyash@gmail.com",
    "rra863872@gmail.com",
    "himapahi38@gmail.com",
  ],
  ECE: [
    "koustubhmishra2003@gmail.com",
    "tejeshpandey30@gmail.com",
    "ahironsharma08@gmail.com",
  ],
  EIE: [
    "agrimagoel30@gmail.com",
    "anmol.s.sahoo@gmail.com",
    "bishaldad1717@gmail.com",
  ],
  CE: [
    "prabhatrai1204@gmail.com",
    "mgogoi080203@gmail.com",
    "atulboi222@gmail.com",
  ],
  ME: [
    "k.saksham2022@gmail.com",
    "k.saksham2022@gmail.com",
    "dasnarayan1717@gmail.com",
  ],
};

/* ─── Event Definitions ─── */
interface EventDef {
  id: string;
  name: string;
  apiPath: string;
  color: string;
  icon: string;
  propertyType: string;
  description: string;
  minMembers: number;
  maxMembers: number;
  rules: string[];
  rounds: { title: string; points: string[] }[];
}

const EVENTS: EventDef[] = [
  {
    id: "chairmans-conclave",
    name: "Chairman's Conclave",
    apiPath: "/api/chairmans-conclave",
    color: "#b45309",
    icon: "forum",
    propertyType: "Boardroom Property",
    description:
      "Take your seat in a high-stakes Group Discussion, where strategy, negotiation, and bold ideas decide who builds the next business empire.",
    minMembers: 2,
    maxMembers: 2,
    rules: [
      "Each branch sends exactly 2 representatives.",
      "Participants are assigned strategic roles — CEO, CFO, CTO, and others.",
      "Negotiate, strategize, and collaborate to solve a critical business challenge.",
      "The problem statement is revealed on the day of the event.",
      "Top 6 participants from Round 1 advance to the final round.",
    ],
    rounds: [
      {
        title: "Round 1 — The Chance Card Move",
        points: [
          "12 participants (2 from each branch) step onto the board as the company's Board of Directors.",
          "Participants are assigned strategic roles and discuss to solve a business challenge.",
          "Problem statement revealed on event day.",
        ],
      },
      {
        title: "Round 2 — The Final Move",
        points: [
          "Top 6 advance. A new discussion topic is revealed on the spot.",
          "Present your strongest strategies and arguments to dominate the board.",
        ],
      },
    ],
  },
  {
    id: "boardroom-trivia",
    name: "Boardroom Trivia",
    apiPath: "/api/stakes-business",
    color: "#1e40af",
    icon: "quiz",
    propertyType: "Utility Property",
    description:
      "Test your knowledge of markets, brands & startups in this fast-paced business quiz where only the sharpest minds survive.",
    minMembers: 4,
    maxMembers: 4,
    rules: [
      "Each branch sends exactly 4 members as a team.",
      "The quiz covers markets, brands, startups, and business strategy.",
      "Multiple rounds of increasing difficulty.",
      "Team collaboration is key — every member counts.",
      "Fastest correct answers earn bonus points.",
    ],
    rounds: [
      {
        title: "Round 1 — Qualifying Round",
        points: [
          "Teams answer rapid-fire questions on business fundamentals.",
          "Top scoring teams advance to the next round.",
        ],
      },
      {
        title: "Round 2 — The Grand Finale",
        points: [
          "Buzzer-round style with advanced business questions.",
          "Strategic wagering and risk-reward mechanics.",
        ],
      },
    ],
  },
  {
    id: "campus-capitalist",
    name: "Campus Capitalist",
    apiPath: "/api/campus-capitalist",
    color: "#991b1b",
    icon: "real_estate_agent",
    propertyType: "Premium Property",
    description:
      "Pitch real campus solutions using your branch expertise. Build, present, and defend your business model to a panel of judges.",
    minMembers: 3,
    maxMembers: 5,
    rules: [
      "Each branch sends 3 to 5 members.",
      "Teams pitch innovative campus-based business ideas.",
      "Solutions must leverage your branch's technical expertise.",
      "Presentations judged on feasibility, innovation, and delivery.",
      "Q&A session follows each pitch.",
    ],
    rounds: [
      {
        title: "Round 1 — Ideation Pitch",
        points: [
          "Teams present their campus business model.",
          "Judges evaluate innovation, feasibility, and market potential.",
        ],
      },
      {
        title: "Round 2 — Shark Tank",
        points: [
          "Shortlisted teams face intense Q&A from the panel.",
          "Defend your financials, strategy, and scalability.",
        ],
      },
    ],
  },
  {
    id: "ado-shuffle",
    name: "AdoShuffle",
    apiPath: "/api/ado-shuffle",
    color: "#166534",
    icon: "campaign",
    propertyType: "Media Property",
    description:
      "Reimagine famous brands with wild what-if concepts. Create unconventional ad campaigns that break the mould.",
    minMembers: 5,
    maxMembers: 5,
    rules: [
      "Each branch sends exactly 5 members.",
      "Teams reimagine iconic brand campaigns with creative twists.",
      "Presentations can include skits, posters, or digital content.",
      "Creativity, humour, and brand understanding are key criteria.",
      "Time limits apply for each presentation.",
    ],
    rounds: [
      {
        title: "Round 1 — Brand Remix",
        points: [
          "Teams are assigned brands and must create alternative ad campaigns.",
          "Present your creative vision to the judges.",
        ],
      },
      {
        title: "Round 2 — The Wild Card",
        points: [
          "Surprise brand + scenario combination revealed on the spot.",
          "Quick-fire creative pitches under time pressure.",
        ],
      },
    ],
  },
  {
    id: "dealroom-escape",
    name: "The Deal Room",
    apiPath: "/api/dealroom-escape",
    color: "#6b21a8",
    icon: "lock_open",
    propertyType: "Luxury Property",
    description:
      "Solve puzzles, uncover clues, and negotiate your way through a business escape room. Build your empire one deal at a time.",
    minMembers: 4,
    maxMembers: 4,
    rules: [
      "Each branch sends exactly 4 members.",
      "Teams navigate through puzzle-based business challenges.",
      "Clues involve financial analysis, market research, and strategy.",
      "Time-bound — fastest team to escape wins.",
      "Communication and teamwork are essential.",
    ],
    rounds: [
      {
        title: "Round 1 — The Locked Room",
        points: [
          "Teams solve interconnected business puzzles to escape.",
          "Each clue unlocks the next layer of the challenge.",
        ],
      },
      {
        title: "Round 2 — The Final Deal",
        points: [
          "Top teams negotiate a final high-stakes business deal.",
          "Strategy, speed, and persuasion determine the winner.",
        ],
      },
    ],
  },
];

/* ─── API Base URL ─── */
const API_BASE = (
  process.env.NEXT_PUBLIC_EIC_API_URL ?? "http://localhost:4000"
).replace(/\/+$/, "");

/* ─── Types ─── */
interface Member {
  name: string;
  year: number;
  phone: string;
}

/* ─── Toast Component ─── */
function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: "-50%", scale: 0.9 }}
      animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
      exit={{ opacity: 0, y: 50, x: "-50%", scale: 0.9 }}
      className={`eic2026-reg-toast ${type === "success" ? "eic2026-reg-toast--success" : "eic2026-reg-toast--error"}`}
    >
      {type === "success" ? (
        <CircleCheck size={20} />
      ) : (
        <CircleAlert size={20} />
      )}
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-auto opacity-60 hover:opacity-100"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
}

/* ─── Rules Modal ─── */
function RulesModal({
  event,
  onClose,
}: {
  event: EventDef;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="eic2026-reg-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="eic2026-reg-modal"
      >
        {/* Header */}
        <div
          className="eic2026-reg-modal-header"
          style={{ backgroundColor: event.color }}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80">
                {event.propertyType}
              </span>
              <h3 className="text-xl font-black">{event.name}</h3>
            </div>
            <button
              onClick={onClose}
              className="flex size-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="eic2026-reg-modal-body">
          {/* General Rules */}
          <div className="mb-6">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-[#cee7d7] uppercase">
              <Gavel size={16} />
              Rules
            </h4>
            <ul className="space-y-2">
              {event.rules.map((rule, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm leading-relaxed text-slate-300"
                >
                  <span className="mt-0.5 text-[#cee7d7]">•</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Rounds */}
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-[#cee7d7] uppercase">
              <Gamepad2 size={16} />
              Rounds
            </h4>
            <div className="space-y-4">
              {event.rounds.map((round, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-[#cee7d7]/10 bg-[#111111]/50 p-4"
                >
                  <h5 className="mb-2 text-sm font-bold text-white">
                    {round.title}
                  </h5>
                  <ul className="space-y-1">
                    {round.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-xs leading-relaxed text-slate-400"
                      >
                        <span className="text-[#cee7d7]/50">—</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Team size note */}
          <div className="mt-6 rounded-lg border border-[#cee7d7]/20 bg-[#cee7d7]/5 p-3 text-center">
            <span className="text-xs font-bold text-[#cee7d7]">
              Team Size:{" "}
              {event.minMembers === event.maxMembers
                ? `Exactly ${event.minMembers} member${event.minMembers > 1 ? "s" : ""}`
                : `${event.minMembers} – ${event.maxMembers} members`}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function RegisterPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const branchId = params.branchId as string;
  const branch = branchId ? branchId.toUpperCase() : "";

  /* ─── State ─── */
  const initialEvent = searchParams.get("event") ?? "";
  const [selectedEvent, setSelectedEvent] = useState<string>(initialEvent);
  const [contactEmail, setContactEmail] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [showRules, setShowRules] = useState(false);

  /* OTP state */
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);

  /* Submit state */
  const [submitting, setSubmitting] = useState(false);

  /* Toast state */
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  /* Validation errors */
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentEvent = useMemo(
    () => EVENTS.find((e) => e.id === selectedEvent),
    [selectedEvent],
  );

  /* ─── Initialize members when event changes ─── */
  useEffect(() => {
    if (!currentEvent) {
      setMembers([]);
      return;
    }
    const initial: Member[] = Array.from(
      { length: currentEvent.minMembers },
      () => ({
        name: "",
        year: 1,
        phone: "",
      }),
    );
    setMembers(initial);
    setOtpSent(false);
    setOtpValue("");
    setOtpVerified(false);
    setErrors({});
  }, [currentEvent]);

  /* ─── OTP Cooldown Timer ─── */
  useEffect(() => {
    if (otpCooldown <= 0) return;
    const timer = setInterval(() => {
      setOtpCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCooldown]);

  /* ─── Member handlers ─── */
  const updateMember = useCallback(
    (index: number, field: keyof Member, value: string | number) => {
      setMembers((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index]!, [field]: value };
        return updated;
      });
      setErrors((prev) => {
        const key = `member_${index}_${field}`;
        if (prev[key]) {
          const next = { ...prev };
          delete next[key];
          return next;
        }
        return prev;
      });
    },
    [],
  );

  const addMember = useCallback(() => {
    if (!currentEvent || members.length >= currentEvent.maxMembers) return;
    setMembers((prev) => [...prev, { name: "", year: 1, phone: "" }]);
  }, [currentEvent, members.length, branch]);

  const removeMember = useCallback(
    (index: number) => {
      if (!currentEvent || members.length <= currentEvent.minMembers) return;
      setMembers((prev) => prev.filter((_, i) => i !== index));
    },
    [currentEvent, members.length],
  );

  /* ─── Validation ─── */
  const validate = useCallback((): boolean => {
    const errs: Record<string, string> = {};

    if (!contactEmail.trim()) {
      errs.contactEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      errs.contactEmail = "Invalid email address";
    } else if (
      branch &&
      !PERMITTED_EMAILS[branch]?.includes(contactEmail.trim().toLowerCase())
    ) {
      errs.contactEmail = "Email does not have permission";
    }

    const phones = new Set<string>();
    members.forEach((m, i) => {
      if (!m.name || m.name.trim().length < 2) {
        errs[`member_${i}_name`] = "Name must be at least 2 characters";
      }
      if (m.phone?.length !== 10 || !/^[0-9]+$/.test(m.phone)) {
        errs[`member_${i}_phone`] = "Phone must be exactly 10 digits";
      } else if (phones.has(m.phone)) {
        errs[`member_${i}_phone`] = "Duplicate phone number";
      } else {
        phones.add(m.phone);
      }
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [contactEmail, members, branch]);

  /* ─── Send OTP ─── */
  const handleSendOTP = useCallback(async () => {
    if (!contactEmail.trim()) {
      setErrors((prev) => ({ ...prev, contactEmail: "Enter email first" }));
      return;
    }
    const normalizedEmail = contactEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setErrors((prev) => ({
        ...prev,
        contactEmail: "Invalid email address",
      }));
      return;
    }
    if (branch && !PERMITTED_EMAILS[branch]?.includes(normalizedEmail)) {
      setErrors((prev) => ({
        ...prev,
        contactEmail: "Email does not have permission",
      }));
      setToast({
        message: "Email does not have permission for this branch",
        type: "error",
      });
      return;
    }

    setOtpLoading(true);
    try {
      const res = await fetch(`${API_BASE}/verification/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: contactEmail.trim().toLowerCase() }),
      });
      const data = (await res.json()) as { message: string };
      if (res.ok) {
        setOtpSent(true);
        setOtpCooldown(60);
        setToast({ message: "OTP sent to your email!", type: "success" });
      } else {
        setToast({
          message: data.message || "Failed to send OTP",
          type: "error",
        });
      }
    } catch {
      setToast({ message: "Network error. Please try again.", type: "error" });
    } finally {
      setOtpLoading(false);
    }
  }, [contactEmail, branch]);

  /* ─── Verify OTP ─── */
  const handleVerifyOTP = useCallback(async () => {
    if (!otpValue.trim()) return;
    setOtpLoading(true);
    try {
      const res = await fetch(`${API_BASE}/verification/verifyOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: contactEmail.trim().toLowerCase(),
          otp: otpValue.trim(),
        }),
      });
      const data = (await res.json()) as { message: string };
      if (res.ok) {
        setOtpVerified(true);
        setToast({ message: "Email verified successfully!", type: "success" });
      } else {
        setToast({
          message: data.message || "OTP verification failed",
          type: "error",
        });
      }
    } catch {
      setToast({ message: "Network error. Please try again.", type: "error" });
    } finally {
      setOtpLoading(false);
    }
  }, [contactEmail, otpValue]);

  /* ─── Submit Registration ─── */
  const handleSubmit = useCallback(async () => {
    if (!currentEvent || !branch || !otpVerified) return;
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}${currentEvent.apiPath}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branch,
          contactEmail: contactEmail.trim().toLowerCase(),
          members: members.map((m) => ({
            name: m.name.trim(),
            year: m.year,
            phone: m.phone.trim(),
          })),
        }),
      });
      const data = (await res.json()) as { message: string };
      if (res.ok) {
        setToast({
          message:
            data.message ||
            "Registration successful! Check your email for more details.",
          type: "success",
        });

        // Reset form details on success
        setContactEmail("");
        setOtpSent(false);
        setOtpValue("");
        setOtpVerified(false);
        setErrors({});
        setMembers(
          Array.from({ length: currentEvent.minMembers }, () => ({
            name: "",
            year: 1,
            phone: "",
          })),
        );
      } else {
        setToast({
          message: data.message || "Registration failed",
          type: "error",
        });
      }
    } catch {
      setToast({ message: "Network error. Please try again.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  }, [currentEvent, branch, otpVerified, validate, contactEmail, members]);

  /* ═══ INVALID BRANCH ═══ */
  if (!branch || !BRANCH_FULL_NAMES[branch]) {
    return (
      <div className="eic2026-page flex min-h-screen flex-col items-center justify-center bg-[#111111] text-slate-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Ban className="mx-auto mb-4 text-red-400" size={60} />
          <h1 className="mb-2 text-3xl font-black">
            Invalid Registration Link
          </h1>
          <p className="mb-8 text-slate-400">
            This registration link is not valid. Please use the link shared with
            your branch.
          </p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-xl bg-[#cee7d7] px-6 py-3 font-bold text-[#111111]"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </motion.div>
      </div>
    );
  }

  /* ═══ MAIN RENDER ═══ */
  return (
    <div className="eic2026-page min-h-screen bg-[#111111] font-sans text-slate-100 antialiased">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Rules Modal */}
      <AnimatePresence>
        {showRules && currentEvent && (
          <RulesModal
            event={currentEvent}
            onClose={() => setShowRules(false)}
          />
        )}
      </AnimatePresence>

      {/* ═══ HEADER ═══ */}
      <header className="sticky top-0 z-50 w-full border-b border-[#cee7d7]/20 bg-[#111111]/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/EIC/eic-logo1.png"
                alt="EIC Logo"
                width={36}
                height={36}
                className="rounded-md"
              />
              <div>
                <h3 className="text-base font-bold tracking-tight sm:text-lg">
                  Registration
                </h3>
                <p className="text-[10px] font-bold tracking-widest text-[#cee7d7]/60 uppercase">
                  {branch} — {BRANCH_FULL_NAMES[branch]}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.back()}
              className="flex shrink-0 items-center gap-1 rounded-lg bg-[#cee7d7] px-3 py-2 text-xs font-bold text-[#111111] sm:gap-2 sm:px-4 sm:text-sm"
            >
              <ArrowLeft size={16} className="sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Back</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="eic2026-events-board relative border-b border-[#cee7d7]/10 py-16 sm:py-20">
        <div className="eic2026-corner-piece eic2026-corner-piece--tl" />
        <div className="eic2026-corner-piece eic2026-corner-piece--tr" />
        <div className="eic2026-corner-piece eic2026-corner-piece--bl" />
        <div className="eic2026-corner-piece eic2026-corner-piece--br" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex justify-center"
          >
            <div className="eic2026-title-deed-bar">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#cee7d7]/70 uppercase">
                ★ Branch Registration ★
              </span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-3 text-3xl font-black sm:text-4xl md:text-5xl"
          >
            Register for <span className="eic2026-shimmer-text">{branch}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-xl text-sm text-slate-400 sm:text-base"
          >
            {BRANCH_FULL_NAMES[branch]} — Select an event below and register
            your team for EIC 2026.
          </motion.p>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        {/* Event Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-400 uppercase">
            Select Event
          </label>
          <div className="relative">
            <select
              id="event-select"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="eic2026-reg-select w-full"
            >
              <option value="">— Choose an event to register for —</option>
              {EVENTS.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Event Info + Rules Button */}
        <AnimatePresence mode="wait">
          {currentEvent && (
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <div className="eic2026-reg-event-card">
                <div
                  className="eic2026-reg-event-card-band"
                  style={{ backgroundColor: currentEvent.color }}
                >
                  <span className="material-symbols-outlined text-xl text-white">
                    {currentEvent.icon}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">
                      {currentEvent.propertyType}
                    </span>
                    <h3 className="text-base font-black text-white sm:text-lg">
                      {currentEvent.name}
                    </h3>
                  </div>
                </div>
                <div className="px-5 py-4 sm:px-6">
                  <p className="mb-4 text-sm leading-relaxed text-slate-300">
                    {currentEvent.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#cee7d7]/20 bg-[#cee7d7]/5 px-3 py-1 text-xs font-bold text-[#cee7d7]">
                      <Users size={14} />
                      {currentEvent.minMembers === currentEvent.maxMembers
                        ? `${currentEvent.minMembers} Members`
                        : `${currentEvent.minMembers}–${currentEvent.maxMembers} Members`}
                    </span>
                    <button
                      onClick={() => setShowRules(true)}
                      className="eic2026-reg-btn-outline inline-flex items-center gap-1 text-xs"
                    >
                      <Gavel size={14} />
                      View Rules
                    </button>
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className="eic2026-reg-card">
                  <div className="eic2026-reg-card-header">
                    <ClipboardPen size={18} className="text-[#cee7d7]" />
                    <h3 className="text-sm font-bold tracking-wide uppercase">
                      Registration Form
                    </h3>
                  </div>

                  <div className="p-5 sm:p-6">
                    {/* Contact Email */}
                    <div className="mb-6">
                      <label className="mb-1.5 block text-xs font-bold tracking-widest text-slate-400 uppercase">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        value={contactEmail}
                        onChange={(e) => {
                          setContactEmail(e.target.value);
                          if (otpVerified) {
                            setOtpVerified(false);
                            setOtpSent(false);
                            setOtpValue("");
                          }
                          setErrors((prev) => {
                            if (prev.contactEmail) {
                              const next = { ...prev };
                              delete next.contactEmail;
                              return next;
                            }
                            return prev;
                          });
                        }}
                        placeholder="team-lead@nitsilchar.ac.in"
                        className={`eic2026-reg-input w-full ${errors.contactEmail ? "eic2026-reg-input--error" : ""}`}
                      />
                      {errors.contactEmail && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.contactEmail}
                        </p>
                      )}
                    </div>

                    {/* Members */}
                    <div className="mb-6">
                      <div className="mb-3 flex items-center justify-between">
                        <label className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                          Team Members ({members.length}
                          {currentEvent.minMembers !== currentEvent.maxMembers
                            ? ` / max ${currentEvent.maxMembers}`
                            : ""}
                          )
                        </label>
                        {currentEvent.minMembers !== currentEvent.maxMembers &&
                          members.length < currentEvent.maxMembers && (
                            <button
                              type="button"
                              onClick={addMember}
                              className="inline-flex items-center gap-1 rounded-lg border border-[#cee7d7]/20 bg-[#cee7d7]/5 px-3 py-1 text-xs font-bold text-[#cee7d7] transition-colors hover:bg-[#cee7d7]/10"
                            >
                              <Plus size={14} />
                              Add Member
                            </button>
                          )}
                      </div>

                      <div className="space-y-4">
                        {members.map((member, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="eic2026-reg-member-card"
                          >
                            <div className="mb-3 flex items-center justify-between">
                              <span className="text-xs font-bold text-[#cee7d7]/60">
                                Member {index + 1}
                              </span>
                              {currentEvent.minMembers !==
                                currentEvent.maxMembers &&
                                members.length > currentEvent.minMembers && (
                                  <button
                                    type="button"
                                    onClick={() => removeMember(index)}
                                    className="flex items-center gap-1 text-xs text-red-400/60 transition-colors hover:text-red-400"
                                  >
                                    <Trash2 size={14} />
                                    Remove
                                  </button>
                                )}
                            </div>
                            <div className="grid gap-3 sm:grid-cols-3">
                              {/* Name */}
                              <div>
                                <input
                                  type="text"
                                  value={member.name}
                                  onChange={(e) =>
                                    updateMember(index, "name", e.target.value)
                                  }
                                  placeholder="Full Name"
                                  className={`eic2026-reg-input w-full ${errors[`member_${index}_name`] ? "eic2026-reg-input--error" : ""}`}
                                />
                                {errors[`member_${index}_name`] && (
                                  <p className="mt-1 text-[10px] text-red-400">
                                    {errors[`member_${index}_name`]}
                                  </p>
                                )}
                              </div>
                              {/* Year */}
                              <div>
                                <select
                                  value={member.year}
                                  onChange={(e) =>
                                    updateMember(
                                      index,
                                      "year",
                                      parseInt(e.target.value),
                                    )
                                  }
                                  className="eic2026-reg-select w-full"
                                >
                                  <option value={1}>1st Year</option>
                                  <option value={2}>2nd Year</option>
                                  <option value={3}>3rd Year</option>
                                  <option value={4}>4th Year</option>
                                </select>
                              </div>
                              {/* Phone */}
                              <div>
                                <input
                                  type="tel"
                                  value={member.phone}
                                  onChange={(e) => {
                                    const val = e.target.value
                                      .replace(/\D/g, "")
                                      .slice(0, 10);
                                    updateMember(index, "phone", val);
                                  }}
                                  placeholder="10-digit Phone"
                                  maxLength={10}
                                  className={`eic2026-reg-input w-full ${errors[`member_${index}_phone`] ? "eic2026-reg-input--error" : ""}`}
                                />
                                {errors[`member_${index}_phone`] && (
                                  <p className="mt-1 text-[10px] text-red-400">
                                    {errors[`member_${index}_phone`]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* ─── OTP Verification ─── */}
                    <div className="eic2026-reg-otp-section">
                      <h4 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 uppercase">
                        <ShieldCheck size={14} className="text-[#cee7d7]" />
                        Email Verification
                      </h4>

                      {!otpVerified ? (
                        <div className="space-y-3">
                          {!otpSent ? (
                            <button
                              type="button"
                              onClick={handleSendOTP}
                              disabled={otpLoading || !contactEmail.trim()}
                              className="eic2026-reg-btn-outline w-full disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {otpLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                  <span className="eic2026-reg-spinner" />
                                  Sending...
                                </span>
                              ) : (
                                <span className="flex items-center justify-center gap-2">
                                  <Mail size={14} />
                                  Send OTP to Email
                                </span>
                              )}
                            </button>
                          ) : (
                            <>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  id="otp-input"
                                  value={otpValue}
                                  onChange={(e) => {
                                    const val = e.target.value
                                      .replace(/\D/g, "")
                                      .slice(0, 6);
                                    setOtpValue(val);
                                  }}
                                  placeholder="Enter 6-digit OTP"
                                  maxLength={6}
                                  className="eic2026-reg-input flex-1"
                                />
                                <button
                                  type="button"
                                  onClick={handleVerifyOTP}
                                  disabled={otpLoading || otpValue.length < 6}
                                  className="eic2026-reg-btn shrink-0 px-4 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                  {otpLoading ? (
                                    <span className="eic2026-reg-spinner" />
                                  ) : (
                                    "Verify"
                                  )}
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={handleSendOTP}
                                disabled={otpCooldown > 0 || otpLoading}
                                className="text-xs text-[#cee7d7]/60 transition-colors hover:text-[#cee7d7] disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                {otpCooldown > 0
                                  ? `Resend OTP in ${otpCooldown}s`
                                  : "Resend OTP"}
                              </button>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3">
                          <CircleCheck size={18} className="text-green-400" />
                          <span className="text-sm font-medium text-green-300">
                            Email verified successfully
                          </span>
                        </div>
                      )}
                    </div>

                    {/* ─── Submit Button ─── */}
                    <div className="mt-6">
                      <button
                        type="button"
                        id="register-btn"
                        onClick={handleSubmit}
                        disabled={!otpVerified || submitting}
                        className="eic2026-reg-btn w-full py-4 text-base font-black disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {submitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="eic2026-reg-spinner" />
                            Registering...
                          </span>
                        ) : !otpVerified ? (
                          <span className="flex items-center justify-center gap-2">
                            <Lock size={18} />
                            Verify Email to Register
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <UserCheck size={18} />
                            Register for {currentEvent.name}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="py-20 text-center"
          >
            <Calendar className="mx-auto mb-4 text-[#cee7d7]/20" size={56} />
            <p className="text-sm text-slate-500">
              Select an event above to begin registration
            </p>
          </motion.div>
        )}
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[#cee7d7]/10 bg-[#111111] py-10">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Image
              src="/EIC/eic-logo1.png"
              alt="EIC Logo"
              width={28}
              height={28}
              className="rounded-md opacity-80"
            />
            <span className="text-sm font-bold text-slate-300">
              EIC 2026 — Registration
            </span>
          </div>
          <p className="text-xs text-slate-500">
            © 2026 E-Cell NIT Silchar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
