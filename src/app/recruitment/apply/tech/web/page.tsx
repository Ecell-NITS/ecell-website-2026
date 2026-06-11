"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import FormField, { inputClassName } from "@/components/Recruitment/FormField";
import ErrorPopup from "@/components/Recruitment/ErrorPopup";

export default function TechWebFormPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    scholarId: "",
    whatsappNumber: "",
    domainOfPriorProject: "",
    resumeLink: "",
    githubProfileLink: "",
    taskPreviewLink: "",
    taskGithubRepoLink: "",
    taskSelection: "",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ecell_tech_draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, string>;
        setForm((prev) => ({ ...prev, ...parsed }));
        if (parsed.email) {
          // Check backend if already submitted
          api
            .get<{
              data: { applications: { type: string; status: string }[] };
            }>(
              `/api/recruitment/my-applications?email=${encodeURIComponent(parsed.email)}`,
            )
            .then((res) => {
              const techApp = res.data.data.applications.find(
                (a) => a.type === "TECH",
              );
              if (techApp?.status === "SUBMITTED") setAlreadySubmitted(true);
            })
            .catch((err) => console.error(err));
        }
      } catch {}
    } else if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("ecell_tech_draft", JSON.stringify(form));
  }, [form]);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    if (!form.scholarId.trim()) e.scholarId = "Required";
    if (!form.whatsappNumber.trim()) e.whatsappNumber = "Required";
    else if (!/^\d{10}$/.test(form.whatsappNumber))
      e.whatsappNumber = "Invalid 10-digit number";
    if (!form.resumeLink.trim()) e.resumeLink = "Required";
    else if (!isValidUrl(form.resumeLink)) e.resumeLink = "Invalid URL";
    if (!form.githubProfileLink.trim()) e.githubProfileLink = "Required";
    else if (!isValidUrl(form.githubProfileLink))
      e.githubProfileLink = "Invalid URL";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep1()) return;
    setIsSubmitting(true);
    try {
      // Since tasks are removed, we submit directly without empty task fields
      const payload: Record<string, string | undefined> = {
        ...form,
        techDomain: "WEB",
      };
      if (!payload.taskPreviewLink) delete payload.taskPreviewLink;
      if (!payload.taskGithubRepoLink) delete payload.taskGithubRepoLink;
      if (!payload.taskSelection) delete payload.taskSelection;

      await api.post("/api/recruitment/apply/tech/submit", payload);
      localStorage.removeItem("ecell_tech_draft");
      router.push("/recruitment/success?type=TECH&teams=Web Development");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setErrorMessage(error.response?.data?.message ?? "Failed to submit");
      setShowErrorPopup(true);
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
            You have already submitted your Tech application. We will be in
            touch soon.
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

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? 30 : -30, opacity: 0 }),
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pt-8 pb-24 sm:px-6">
      <Link
        href="/recruitment/apply/tech"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Domains
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
          Web Development
        </h1>
        <p className="mt-3 text-sm font-light text-gray-500">
          Provide your information to apply for the tech team.
        </p>
      </motion.div>
      <div className="relative mt-12">
        <motion.div
          key="step1"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <FormField label="Full Name" required error={errors.name}>
            <input
              className={inputClassName}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Jane Doe"
            />
          </FormField>
          <FormField label="Email Address" required error={errors.email}>
            <input
              type="email"
              className={inputClassName}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="jane@example.com"
            />
          </FormField>
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
          <FormField label="Domain of Prior Project" hint="Optional">
            <input
              className={inputClassName}
              value={form.domainOfPriorProject}
              onChange={(e) => update("domainOfPriorProject", e.target.value)}
              placeholder="e.g. Web Dev, App Dev, UI/UX"
            />
          </FormField>
          <FormField
            label="Resume Link"
            required
            hint="Viewable URL"
            error={errors.resumeLink}
          >
            <input
              className={inputClassName}
              value={form.resumeLink}
              onChange={(e) => update("resumeLink", e.target.value)}
              placeholder="https://..."
            />
          </FormField>
          <FormField
            label="GitHub Profile Link"
            required
            error={errors.githubProfileLink}
          >
            <input
              className={inputClassName}
              value={form.githubProfileLink}
              onChange={(e) => update("githubProfileLink", e.target.value)}
              placeholder="https://github.com/..."
            />
          </FormField>

          <div className="flex flex-col gap-4 pt-8">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-[15px] font-medium text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-[1.01] hover:bg-gray-100 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Submit Application"
              )}{" "}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      <ErrorPopup
        isOpen={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        message={errorMessage}
      />
    </div>
  );
}
