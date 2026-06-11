"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";

export const WHATSAPP_LINKS: Record<string, string> = {
  "Content Team": "https://chat.whatsapp.com/JeCUs8HzOc6L9anGKr3f6I",
  "Collaboration and Outreach Team": "https://chat.whatsapp.com/Dc8Pexw1yhCFEeoZh3ZHEn",
  "Curation X Startup Team": "https://chat.whatsapp.com/JTxF7HNShWXBRv6Al4hXAa",
  "Marketing Team": "https://chat.whatsapp.com/LW1DR3Weep5CYhqojcj9N7",
  "Publicity Team": "https://chat.whatsapp.com/C4r6RglmohoEZpQf16ZdPY",
  "Design Team": "https://chat.whatsapp.com/CyaYm2AcUVcLKzPJvQ8iao",
  "Event Management Team": "https://chat.whatsapp.com/LjQiecGgYSy7YYGn0PrVFB",
  "Videography Team": "https://chat.whatsapp.com/D8GT8YkKvKaFvHo6cvx5Dc",
  "Tech": "https://chat.whatsapp.com/DD2XXKBK1jLKbD4zfwNpfM?s=cl&p=i&ilr=2",
};

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const teamsParam = searchParams.get("teams");
  
  let selectedTeams: string[] = [];
  if (type === "TECH") {
    selectedTeams = ["Tech"];
  } else if (teamsParam) {
    selectedTeams = teamsParam.split(",");
  } else {
    selectedTeams = ["Tech"]; // fallback
  }

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative z-10 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm"
        >
          <CheckCircle2 className="h-12 w-12 text-blue-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-4xl font-light tracking-tight text-white sm:text-5xl"
        >
          Application Submitted
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-base font-light leading-relaxed text-gray-400 sm:text-lg"
        >
          Thank you for applying to E-Cell NIT Silchar. We will review your application and get back to you soon.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-sm text-gray-500"
        >
          A confirmation email has been sent to your inbox.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col gap-3"
        >
          {selectedTeams.map((team, idx) => {
            const link = WHATSAPP_LINKS[team] || WHATSAPP_LINKS["Tech"];
            const btnText = team === "Tech" ? "Join Tech WhatsApp Group" : `Join ${team} Group`;
            return (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group mx-auto flex w-full max-w-md items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 text-[15px] font-medium text-black transition-all hover:bg-gray-100 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                <svg className="h-5 w-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {btnText}
                <ExternalLink className="h-4 w-4 text-gray-500 transition-colors group-hover:text-black" />
              </a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex justify-center"
        >
          <Link
            href="/recruitment"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Recruitment
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 text-center text-white">Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
