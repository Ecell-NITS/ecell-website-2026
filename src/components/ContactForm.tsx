/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";

const ContactForm: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="contactus"
      className="relative overflow-hidden bg-[#020617] py-32"
    >
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
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
            <div
              onMouseMove={handleMouseMove}
              className="glass group relative space-y-6 rounded-[2.5rem] border border-white/5 bg-[#0d1117]/40 p-8 md:p-12"
            >
              {/* Spotlight */}
              <div
                className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.05), transparent 40%)`,
                }}
              />

              <div className="relative z-10 space-y-6">
                <div>
                  <label className="mb-2 ml-1 block text-xs font-bold tracking-widest text-gray-500 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder-gray-600 transition-colors focus:border-blue-500/50 focus:bg-white/10 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 ml-1 block text-xs font-bold tracking-widest text-gray-500 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder-gray-600 transition-colors focus:border-blue-500/50 focus:bg-white/10 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 ml-1 block text-xs font-bold tracking-widest text-gray-500 uppercase">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your idea..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder-gray-600 transition-colors focus:border-blue-500/50 focus:bg-white/10 focus:outline-none"
                  />
                </div>
                <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-5 font-bold text-white transition-all hover:scale-[1.02] hover:bg-blue-700 hover:shadow-[0_10px_40px_rgba(37,99,235,0.3)] active:scale-[0.98]">
                  Send Message <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
