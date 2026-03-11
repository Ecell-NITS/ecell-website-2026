/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";
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
    <section
      id="contactus"
      className="relative overflow-hidden bg-[#020617] py-12 md:py-16 lg:py-20 xl:py-24"
    >
      {/* Section Edge Fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-[#020617] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-[#020617] to-transparent" />

      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-20 lg:flex-row">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="mb-6 text-4xl leading-none font-black tracking-tighter text-white uppercase lg:text-6xl">
              Contact <span className="text-blue-500">Us</span>
            </h2>
            <p className="mb-12 max-w-md text-lg font-light text-gray-400">
              Have a query? Thinking of collaborating? Feel free to drop a
              message and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Location",
                  text: "Startup Centre, NIT Silchar, Assam",
                },
                { icon: Mail, title: "Email", text: "ecell@nits.ac.in" },
                { icon: Phone, title: "Phone", text: "+91 6388689290" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 5 }}
                  className="glass flex items-center gap-6 rounded-2xl border border-white/5 bg-[#0d1117]/40 p-5 transition-all hover:border-blue-500/20 hover:bg-[#0d1117]/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <form
              onSubmit={handleSubmit}
              className="glass space-y-6 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 md:p-12"
            >
              <div>
                <label className="mb-2 ml-1 block text-sm font-bold text-gray-400">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-white transition-colors focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 ml-1 block text-sm font-bold text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-white transition-colors focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 ml-1 block text-sm font-bold text-gray-400">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your idea..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-white transition-colors focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-5 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-[0_10px_40px_rgba(37,99,235,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    Send Message <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
