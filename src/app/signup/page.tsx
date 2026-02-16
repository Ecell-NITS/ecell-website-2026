/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  KeyRound,
} from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import AuthBackground from "@/components/Auth/AuthBackground";
import GoogleButton from "@/components/Auth/GoogleButton";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import axios from "axios";

type Step = "details" | "otp";

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<Step>("details");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailChecking, setEmailChecking] = useState(false);

  const handleEmailBlur = async () => {
    if (!email) return;
    setEmailChecking(true);

    try {
      const res = await api.post<{ exists: boolean }>("/auth/checkEmail", {
        email: email.trim().toLowerCase(),
      });

      if (res.data.exists) {
        setEmailError("Email already registered");
      } else {
        setEmailError("");
      }
    } catch {
      setEmailError("");
    } finally {
      setEmailChecking(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await api.post("/auth/send-otp", {
        email: email.trim().toLowerCase(),
      });
      toast.success("OTP sent to your email");
      setStep("otp");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          (err.response?.data as { message?: string } | undefined)?.message ??
          "Failed to send OTP";
        toast.error(message);
      } else {
        toast.error("Failed to send OTP");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/auth/register", {
        name: fullName,
        email: email.trim().toLowerCase(),
        password,
        otp,
      });

      const { accessToken, user } = res.data.data;
      login(user, accessToken);
      toast.success("Account created successfully 🎉");
      router.push("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          (err.response?.data as { message?: string } | undefined)?.message ??
          "Registration failed";
        toast.error(message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Registration failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await api.post("/auth/send-otp", {
        email: email.trim().toLowerCase(),
      });
      toast.success("OTP resent to your email");
    } catch {
      toast.error("Failed to resend OTP");
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
              {step === "details" ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                      Create your account
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                      Join the E-Cell community and start your journey
                    </p>
                  </div>

                  {/* Google */}
                  <GoogleButton label="Sign up with Google" />

                  {/* Divider */}
                  <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[11px] font-semibold tracking-widest text-gray-600 uppercase">
                      or
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    {/* Full Name */}
                    <div className="group relative">
                      <User
                        size={16}
                        className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-blue-400"
                      />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pr-4 pl-11 text-sm text-white placeholder-gray-600 transition-all duration-300 outline-none focus:border-blue-500/40 focus:bg-blue-500/[0.03] focus:ring-1 focus:ring-blue-500/20"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <div className="group relative">
                        <Mail
                          size={16}
                          className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-blue-400"
                        />
                        <input
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={handleEmailBlur}
                          required
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pr-10 pl-11 text-sm text-white placeholder-gray-600 transition-all duration-300 outline-none focus:border-blue-500/40 focus:bg-blue-500/[0.03] focus:ring-1 focus:ring-blue-500/20"
                        />
                        {emailChecking && (
                          <div className="absolute top-1/2 right-4 -translate-y-1/2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-blue-400" />
                          </div>
                        )}
                      </div>
                      {emailError && (
                        <p className="mt-1 text-sm text-red-400">
                          {emailError}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="group relative">
                      <Lock
                        size={16}
                        className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-blue-400"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pr-11 pl-11 text-sm text-white placeholder-gray-600 transition-all duration-300 outline-none focus:border-blue-500/40 focus:bg-blue-500/[0.03] focus:ring-1 focus:ring-blue-500/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-600 transition-colors hover:text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="group relative">
                      <Lock
                        size={16}
                        className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-blue-400"
                      />
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pr-11 pl-11 text-sm text-white placeholder-gray-600 transition-all duration-300 outline-none focus:border-blue-500/40 focus:bg-blue-500/[0.03] focus:ring-1 focus:ring-blue-500/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-600 transition-colors hover:text-gray-400"
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {/* Submit */}
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
                            Continue
                            <ArrowRight
                              size={16}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </span>
                    </button>
                  </form>

                  {/* Terms */}
                  <p className="mt-6 text-center text-[11px] leading-relaxed text-gray-600">
                    By signing up, you agree to our{" "}
                    <span className="cursor-pointer text-blue-400/80 transition-colors hover:text-blue-400">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="cursor-pointer text-blue-400/80 transition-colors hover:text-blue-400">
                      Privacy Policy
                    </span>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* OTP Header */}
                  <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10">
                      <KeyRound size={24} className="text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                      Verify your email
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                      We sent a 6-digit code to{" "}
                      <span className="font-medium text-white">{email}</span>
                    </p>
                  </div>

                  {/* OTP Form */}
                  <form
                    onSubmit={handleVerifyAndRegister}
                    className="space-y-4"
                  >
                    <div className="group relative">
                      <KeyRound
                        size={16}
                        className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-blue-400"
                      />
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        required
                        maxLength={6}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pr-4 pl-11 text-center text-lg font-bold tracking-[0.5em] text-white placeholder-gray-600 transition-all duration-300 outline-none focus:border-blue-500/40 focus:bg-blue-500/[0.03] focus:ring-1 focus:ring-blue-500/20"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || otp.length !== 6}
                      className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="relative z-10 flex items-center gap-2">
                        {isLoading ? (
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                          <>
                            Verify & Create Account
                            <ArrowRight
                              size={16}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </span>
                    </button>
                  </form>

                  <div className="mt-6 flex flex-col items-center gap-3">
                    <button
                      onClick={handleResendOtp}
                      className="text-xs font-medium text-gray-500 transition-colors hover:text-blue-400"
                    >
                      Didn&apos;t receive the code? Resend
                    </button>
                    <button
                      onClick={() => setStep("details")}
                      className="text-xs font-medium text-gray-500 transition-colors hover:text-blue-400"
                    >
                      ← Back to details
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-400 transition-colors hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
