/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/api/query/send", { name, email, message });
      toast.success(
        "Message sent successfully! We'll get back to you soon. 📩",
      );
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string; error?: string } };
      };
      toast.error(
        error.response?.data?.message ??
          error.response?.data?.error ??
          "Failed to send message. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contactus" className="relative bg-[#020617] py-16 md:py-24">
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[400px] opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        {/* Title Block */}
        <div className="mb-16 flex justify-center lg:mb-24">
          <div className="flex text-4xl font-black tracking-tight uppercase md:text-5xl lg:text-7xl">
            <span className="bg-white px-5 py-2 text-black md:px-6 md:py-3">
              CONTACT
            </span>
            <span className="bg-[#5c3cff] px-5 py-2 text-white md:px-6 md:py-3">
              US
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
          {/* Left Side: Text */}
          <div className="lg:w-1/2 lg:pr-8">
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Let&apos;s Connect!
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-300 sm:text-xl lg:text-[22px]">
              Have questions, ideas, or want to collaborate with{" "}
              <span className="font-bold text-white">E-CELL NITS</span>?<br />
              Reach out to us and our team will get back to you as soon as
              possible.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-gray-300 sm:text-xl lg:text-[22px]">
              📞 8136099500, 7002431874
              <br />
              ✉️ ecell@nits.ac.in
            </p>
            <p className="text-lg font-light text-gray-400 italic sm:text-xl lg:text-[22px]">
              We love hearing from passionate entrepreneurs, students, and
              partners!
            </p>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-1/2">
            <div className="rounded-3xl border border-white/10 bg-[#121212] p-6 shadow-[0_0_40px_-10px_rgba(92,60,255,0.15)] sm:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/5 bg-[#2A2A2A] px-5 py-4 text-white placeholder-gray-400 transition-colors focus:border-[#5c3cff] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/5 bg-[#2A2A2A] px-5 py-4 text-white placeholder-gray-400 transition-colors focus:border-[#5c3cff] focus:outline-none"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full resize-none rounded-xl border border-white/5 bg-[#2A2A2A] px-5 py-4 text-white placeholder-gray-400 transition-colors focus:border-[#5c3cff] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 w-full rounded-xl bg-[#5c3cff] py-4 text-center font-bold text-white transition-colors hover:bg-[#4a30cc] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
