"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import AuthBackground from "@/components/Auth/AuthBackground";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

type Step = "EMAIL" | "RESET";

type ForgotPasswordResponse = {
  exists: boolean;
};

type ApiErrorResponse = {
  message?: string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // RESET PASSWORD
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/auth/reset-password", {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        newPassword,
      });

      toast.success("Password reset successful");
      router.push("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        toast.error(
          err.response?.data?.message ?? "Something went wrong"
        );
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // SEND OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    try {
      const check = await api.post<ForgotPasswordResponse>(
        "/auth/checkEmail",
        { email: normalizedEmail }
      );

      if (!check.data.exists) {
        toast.error("No account found with this email");
        return;
      }

      await api.post("/auth/forgot-password", {
        email: normalizedEmail,
      });

      toast.success("OTP sent successfully");
      setStep("RESET");
    } catch (err: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        toast.error(
          err.response?.data?.message ?? "Something went wrong"
        );
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <AuthBackground />
      <Navbar />

      <div className="flex min-h-screen items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          <Link href="/" className="mb-8 flex justify-center">
            <Image
              src="/ecelllogo.png"
              alt="E-Cell Logo"
              width={120}
              height={48}
              className="h-12 w-auto brightness-0 invert"
              priority
            />
          </Link>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              {step === "EMAIL" && (
                <motion.div key="email">
                  <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10">
                      <Mail className="text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-bold">Forgot password?</h1>
                  </div>

                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-xl bg-white/[0.03] px-4 py-3 outline-none"
                    />

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-xl bg-blue-600 py-3 font-bold disabled:opacity-60"
                    >
                      {isLoading ? "Sending..." : "Send OTP"}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === "RESET" && (
                <motion.div key="reset">
                  <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
                      <CheckCircle className="text-green-400" />
                    </div>
                    <h2 className="text-xl font-bold">Reset Password</h2>
                  </div>

                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <input
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="w-full rounded-xl bg-white/[0.03] px-4 py-3 outline-none"
                    />

                    <input
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full rounded-xl bg-white/[0.03] px-4 py-3 outline-none"
                    />

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-xl bg-green-600 py-3 font-bold disabled:opacity-60"
                    >
                      {isLoading ? "Updating..." : "Reset Password"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm text-gray-500"
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
