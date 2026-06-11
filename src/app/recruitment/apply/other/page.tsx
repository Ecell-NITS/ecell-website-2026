"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import FormField, {
  inputClassName,
  textareaClassName,
} from "@/components/Recruitment/FormField";
import WordCounter from "@/components/Recruitment/WordCounter";

const TEAMS = [
  "Marketing Team",
  "Design Team",
  "Videography Team",
  "Publicity Team",
  "Content Team",
  "Curation X Startup Team",
  "Event Management Team",
  "Collaboration and Outreach Team",
];

export default function OtherTeamsFormPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    scholarId: "",
    branch: "",
    whatsappNumber: "",
    instituteEmail: "",
    whyJoinECell: "",
    teamSelection: [] as string[],
    pastContributions: "",
    otherClubs: "",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ecell_other_draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, string>;
        setForm((prev) => ({ ...prev, ...parsed }));
        if (parsed.email) {
          api
            .get<{
              data: { applications: { type: string; status: string }[] };
            }>(
              `/api/recruitment/my-applications?email=${encodeURIComponent(parsed.email)}`,
            )
            .then((res) => {
              const otherApp = res.data.data.applications.find(
                (a) => a.type === "OTHER",
              );
              if (otherApp?.status === "SUBMITTED") setAlreadySubmitted(true);
            })
            .catch((err) => console.error(err));
        }
      } catch {}
    } else if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        instituteEmail: prev.instituteEmail || user.email || "",
      }));
    }
  }, [user]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("ecell_other_draft", JSON.stringify(form));
  }, [form]);

  const update = (key: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };
  const toggleTeam = (team: string) => {
    setForm((prev) => {
      const sel = prev.teamSelection.includes(team)
        ? prev.teamSelection.filter((t) => t !== team)
        : [...prev.teamSelection, team];
      return { ...prev, teamSelection: sel };
    });
    setErrors((prev) => ({ ...prev, teamSelection: "" }));
  };
  const wordCount = (str: string) =>
    str.trim() ? str.trim().split(/\s+/).length : 0;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    if (!form.scholarId.trim()) e.scholarId = "Required";
    if (!form.branch.trim()) e.branch = "Required";
    if (!form.whatsappNumber.trim()) e.whatsappNumber = "Required";
    else if (!/^\d{10}$/.test(form.whatsappNumber))
      e.whatsappNumber = "Invalid 10-digit number";
    if (!form.instituteEmail.trim()) e.instituteEmail = "Required";
    if (!form.whyJoinECell.trim()) e.whyJoinECell = "Required";
    else if (wordCount(form.whyJoinECell) > 80)
      e.whyJoinECell = "Max 80 words allowed";
    if (form.teamSelection.length === 0)
      e.teamSelection = "Select at least one team";
    if (form.pastContributions && wordCount(form.pastContributions) > 250)
      e.pastContributions = "Max 250 words allowed";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await api.post("/api/recruitment/apply/other/submit", form);
      localStorage.removeItem("ecell_other_draft");
      toast.success("Application submitted!");
      router.push(
        `/recruitment/success?teams=${encodeURIComponent(form.teamSelection.join(","))}`,
      );
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message ?? "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (alreadySubmitted) {
    return (
      <div className="mx-auto max-w-lg px-4 pt-16 text-center">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 backdrop-blur-xl">
          <h2 className="text-2xl font-light text-white">
            Application Received
          </h2>
          <p className="mt-4 text-sm font-light text-gray-400">
            You have already submitted your application for Management &
            Creatives.
          </p>
          <Link
            href="/recruitment"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pt-8 pb-24 sm:px-6">
      <Link
        href="/recruitment"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Overview
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
          Management{" "}
          <span className="font-semibold text-gray-300">& Creatives</span>
        </h1>
        <p className="mt-3 text-sm font-light text-gray-500">
          Provide your information and select your desired teams.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-12 space-y-6"
      >
        <FormField label="Full Name" required error={errors.name}>
          <input
            className={inputClassName}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jane Doe"
          />
        </FormField>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Email Address" required error={errors.email}>
            <input
              type="email"
              className={inputClassName}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="jane@example.com"
            />
          </FormField>
          <FormField
            label="Institute Email ID"
            required
            error={errors.instituteEmail}
          >
            <input
              type="email"
              className={inputClassName}
              value={form.instituteEmail}
              onChange={(e) => update("instituteEmail", e.target.value)}
              placeholder="yourname@nits.ac.in"
            />
          </FormField>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Scholar ID" required error={errors.scholarId}>
            <input
              className={inputClassName}
              value={form.scholarId}
              onChange={(e) => update("scholarId", e.target.value)}
              placeholder="e.g., 2412048"
            />
          </FormField>
          <FormField
            label="WhatsApp Number"
            required
            error={errors.whatsappNumber}
          >
            <input
              className={inputClassName}
              value={form.whatsappNumber}
              onChange={(e) =>
                update(
                  "whatsappNumber",
                  e.target.value.replace(/\D/g, "").slice(0, 10),
                )
              }
              placeholder="10-digit number"
              maxLength={10}
            />
          </FormField>
        </div>

        <FormField label="Branch" required error={errors.branch}>
          <input
            className={inputClassName}
            value={form.branch}
            onChange={(e) => update("branch", e.target.value)}
            placeholder="e.g., Computer Science and Engineering"
          />
        </FormField>

        <FormField
          label="Why do you want to join E-Cell?"
          required
          error={errors.whyJoinECell}
        >
          <textarea
            className={textareaClassName}
            rows={4}
            value={form.whyJoinECell}
            onChange={(e) => update("whyJoinECell", e.target.value)}
            placeholder="Briefly share your motivation..."
          />
          <div className="mt-1.5 flex justify-end">
            <WordCounter text={form.whyJoinECell} maxWords={80} />
          </div>
        </FormField>

        <FormField label="Select Team(s)" required error={errors.teamSelection}>
          <div className="mt-3 flex flex-wrap gap-3">
            {TEAMS.map((team) => {
              const sel = form.teamSelection.includes(team);
              return (
                <button
                  key={team}
                  type="button"
                  onClick={() => toggleTeam(team)}
                  className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-[14px] font-medium transition-all duration-300 ${
                    sel
                      ? "border-blue-500 bg-blue-500/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/30 hover:bg-white/[0.05] hover:text-gray-200"
                  }`}
                >
                  {team}
                  {sel && (
                    <svg
                      className="h-4 w-4 text-blue-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </FormField>

        <FormField
          label="Past Contributions to E-Cell"
          hint="Optional (Within 250 words)"
          error={errors.pastContributions}
        >
          <textarea
            className={textareaClassName}
            rows={4}
            value={form.pastContributions}
            onChange={(e) => update("pastContributions", e.target.value)}
            placeholder="Describe any past contributions..."
          />
          <div className="mt-1.5 flex justify-end">
            <WordCounter text={form.pastContributions} maxWords={250} />
          </div>
        </FormField>

        <FormField label="Other Clubs/Societies" hint="Optional">
          <textarea
            className={textareaClassName}
            rows={2}
            value={form.otherClubs}
            onChange={(e) => update("otherClubs", e.target.value)}
            placeholder="e.g., Coding Club, GDSC, etc."
          />
        </FormField>

        <div className="pt-8">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-medium text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-[1.01] hover:bg-gray-100 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit Application"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
