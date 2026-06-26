"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";

export default function OtherTeamsFormPage() {
  return (
    <div className="mx-auto max-w-lg px-4 pt-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 backdrop-blur-xl"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <Lock className="h-7 w-7 text-gray-400" />
        </div>
        <h2 className="text-2xl font-light text-white">Registration Closed</h2>
        <p className="mt-4 text-sm font-light text-gray-400">
          Applications for Non-Technical teams are no longer being accepted.
          Thank you for your interest.
        </p>
        <Link
          href="/recruitment"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-gray-300"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Overview
        </Link>
      </motion.div>
    </div>
  );
}
