"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import AuthBackground from "@/components/Auth/AuthBackground";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: integrate password reset logic
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setIsSent(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <AuthBackground />
      <Navbar />

      <div className="flex min-h-screen items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="3xl:max-w-lg 4k:max-w-xl relative z-10 w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="mb-8 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ecelllogo.png"
              alt="E-Cell Logo"
              className="h-12 w-auto brightness-0 invert"
            />
          </Link>

          {/* Card */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10">
                      <Mail size={24} className="text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                      Forgot password?
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      No worries, we&apos;ll send you reset instructions to your
                      email address.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="group relative">
                      <Mail
                        size={16}
                        className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-blue-400"
                      />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pr-4 pl-11 text-sm text-white placeholder-gray-600 transition-all duration-300 outline-none focus:border-blue-500/40 focus:bg-blue-500/[0.03] focus:ring-1 focus:ring-blue-500/20"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="relative z-10 flex items-center gap-2">
                        {isLoading ? (
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                          <>
                            Reset Password
                            <ArrowRight
                              size={16}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white">
                    Check your email
                  </h2>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
                    We sent a password reset link to{" "}
                    <span className="font-medium text-white">{email}</span>
                  </p>

                  <button
                    onClick={() => {
                      setIsSent(false);
                      setEmail("");
                    }}
                    className="mt-6 text-xs font-medium text-gray-500 transition-colors hover:text-blue-400"
                  >
                    Didn&apos;t receive the email? Click to resend
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Back to login */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-blue-400"
            >
              <ArrowLeft size={14} />
              Back to login
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
