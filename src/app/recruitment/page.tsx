"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

export default function RecruitmentPage() {
  const { user } = useAuth();
  const [techApp, setTechApp] = useState<{ status: string } | null>(null);
  const [otherApp, setOtherApp] = useState<{ status: string } | null>(null);

  useEffect(() => {
    if (user?.email) {
      api
        .get<{ data: { applications: { type: string; status: string }[] } }>(
          `/api/recruitment/my-applications?email=${encodeURIComponent(user.email)}`,
        )
        .then((res) => {
          const apps = res.data.data.applications;
          setTechApp(apps.find((a) => a.type === "TECH") ?? null);
          setOtherApp(apps.find((a) => a.type === "OTHER") ?? null);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      {/* Hero */}
      <div className="pt-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-widest text-gray-400 uppercase backdrop-blur-md">
            Recruitment 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="mt-8 text-5xl font-light tracking-tight text-white sm:text-7xl"
        >
          Shape the <br />
          <span className="font-semibold text-gray-300">
            Entrepreneurial Future
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed font-light text-gray-500 sm:text-base"
        >
          Join E-Cell NIT Silchar. Select your discipline, complete the
          application, and begin your journey with us.
        </motion.p>
      </div>

      {/* Path Selection Cards */}
      <div className="relative mt-24 grid gap-6 sm:grid-cols-2">
        {/* Tech Team Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Link href="/recruitment/apply/tech">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.05]">
              <div>
                <h2 className="text-2xl font-medium tracking-tight text-white">
                  Technical Domain
                </h2>
                <p className="mt-3 text-sm leading-relaxed font-light text-gray-400">
                  Web Development, Artificial Intelligence, and UI/UX Design.
                </p>
                {techApp && (
                  <div className="mt-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${techApp.status === "SUBMITTED" ? "bg-white" : "bg-gray-500"}`}
                      />
                      {techApp.status === "SUBMITTED"
                        ? "Submitted"
                        : "Draft Saved"}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-12 flex items-center gap-2 text-sm font-medium text-white transition-transform group-hover:translate-x-1">
                {techApp?.status === "SUBMITTED"
                  ? "View Application"
                  : techApp?.status === "DRAFT"
                    ? "Continue Application"
                    : "Apply Now"}
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Other Teams Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link href="/recruitment/apply/other">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.05]">
              <div>
                <h2 className="text-2xl font-medium tracking-tight text-white">
                  Non Technical
                </h2>
                <p className="mt-3 text-sm leading-relaxed font-light text-gray-400">
                  Management & Creatives (Marketing, Design, Videography,
                  Content, Events, and PR).
                </p>
                {otherApp && (
                  <div className="mt-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      Submitted
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-12 flex items-center gap-2 text-sm font-medium text-white transition-transform group-hover:translate-x-1">
                {otherApp?.status === "SUBMITTED"
                  ? "View Application"
                  : "Apply Now"}
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-20 text-center"
      >
        <p className="text-xs tracking-widest text-gray-600 uppercase">
          Applications are reviewed on a rolling basis
        </p>
      </motion.div>
    </div>
  );
}
