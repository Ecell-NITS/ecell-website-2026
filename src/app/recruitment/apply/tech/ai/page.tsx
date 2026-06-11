"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import FormField, { inputClassName } from "@/components/Recruitment/FormField";
import ErrorPopup from "@/components/Recruitment/ErrorPopup";

export default function TechAIFormPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", scholarId: "", whatsappNumber: "", resumeLink: "", githubProfileLink: "" });

  useEffect(() => {
    const saved = localStorage.getItem("ecell_tech_ai_draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setForm((prev) => ({ ...prev, ...parsed }));
        if (parsed.email) {
          api.get(`/api/recruitment/my-applications?email=${encodeURIComponent(parsed.email)}`)
            .then((res) => {
              const techApp = res.data.data.applications.find((a: { type: string }) => a.type === "TECH");
              if (techApp?.status === "SUBMITTED") setAlreadySubmitted(true);
            }).catch(() => {});
        }
      } catch {}
    } else if (user) {
      setForm((prev) => ({ ...prev, name: prev.name || user.name || "", email: prev.email || user.email || "" }));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("ecell_tech_ai_draft", JSON.stringify(form));
  }, [form]);

  const update = (key: string, value: string) => { setForm((prev) => ({ ...prev, [key]: value })); setErrors((prev) => ({ ...prev, [key]: "" })); };
  const isValidUrl = (url: string) => { try { new URL(url); return true; } catch { return false; } };

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    if (!form.scholarId.trim()) e.scholarId = "Required";
    if (!form.whatsappNumber.trim()) e.whatsappNumber = "Required";
    else if (!/^\d{10}$/.test(form.whatsappNumber)) e.whatsappNumber = "Invalid 10-digit number";
    if (!form.resumeLink.trim()) e.resumeLink = "Required";
    else if (!isValidUrl(form.resumeLink)) e.resumeLink = "Invalid URL";
    if (!form.githubProfileLink.trim()) e.githubProfileLink = "Required";
    else if (!isValidUrl(form.githubProfileLink)) e.githubProfileLink = "Invalid URL";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep1()) return;
    setIsSubmitting(true);
    try {
      const payload = { ...form, techDomain: "AI", domainOfPriorProject: "N/A" };
      await api.post("/api/recruitment/apply/tech/submit", payload);
      localStorage.removeItem("ecell_tech_ai_draft");
      router.push("/recruitment/success?type=TECH&teams=Artificial Intelligence");
    } catch (err: unknown) { 
      const error = err as { response?: { data?: { message?: string } } }; 
      setErrorMessage(error.response?.data?.message || "Failed to submit");
      setShowErrorPopup(true);
    }
    finally { setIsSubmitting(false); }
  };

  if (alreadySubmitted) {
    return (<div className="mx-auto max-w-lg px-4 pt-16 text-center"><div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 backdrop-blur-xl">
      <h2 className="text-2xl font-light text-white">Application Received</h2>
      <p className="mt-4 text-sm font-light text-gray-400">You have already submitted your Tech application. We will be in touch soon.</p>
      <Link href="/recruitment" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors"><ArrowLeft className="h-4 w-4" /> Return to Overview</Link>
    </div></div>);
  }

  const slideVariants = { enter: (d: number) => ({ x: d > 0 ? 30 : -30, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d: number) => ({ x: d < 0 ? 30 : -30, opacity: 0 }) };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-8 pb-24">
      <Link href="/recruitment/apply/tech" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"><ArrowLeft className="h-4 w-4" /> Domains</Link>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <h1 className="text-3xl font-light tracking-tight text-white sm:text-4xl">Artificial Intelligence</h1>
        <p className="mt-3 text-sm font-light text-gray-500">Provide your information to apply for the AI tech team.</p>
      </motion.div>
      <div className="relative mt-12">
        <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5, ease: "easeOut" }} className="space-y-6">
          <FormField label="Full Name" required error={errors.name}><input className={inputClassName} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" /></FormField>
          <FormField label="Email Address" required error={errors.email}><input type="email" className={inputClassName} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@example.com" /></FormField>
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="Scholar" required error={errors.scholarId}><input className={inputClassName} value={form.scholarId} onChange={(e) => update("scholarId", e.target.value)} placeholder="e.g., 2412048" /></FormField>
            <FormField label="wa number" required error={errors.whatsappNumber}><input className={inputClassName} value={form.whatsappNumber} onChange={(e) => update("whatsappNumber", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit number" maxLength={10} /></FormField>
          </div>
          <FormField label="Resume" required hint="Viewable URL" error={errors.resumeLink}><input className={inputClassName} value={form.resumeLink} onChange={(e) => update("resumeLink", e.target.value)} placeholder="https://..." /></FormField>
          <FormField label="Github Link" required error={errors.githubProfileLink}><input className={inputClassName} value={form.githubProfileLink} onChange={(e) => update("githubProfileLink", e.target.value)} placeholder="https://github.com/..." /></FormField>
          
          <div className="flex flex-col gap-4 pt-8">
            <button onClick={handleSubmit} disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-[15px] font-medium text-black transition-all hover:bg-gray-100 hover:scale-[1.01] shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50">
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit Application"} <ArrowRight className="h-5 w-5" />
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
