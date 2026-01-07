/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";

const ContactForm: React.FC = () => {
  return (
    <section className="bg-gray-950/40 py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-20 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="mb-6 text-5xl font-extrabold tracking-tight text-white uppercase">
              Contact <span className="text-blue-500">Us</span>
            </h2>
            <p className="mb-12 text-lg text-gray-400">
              Have a query? Thinking of collaborating? Feel free to drop a
              message and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="glass flex h-14 w-14 items-center justify-center rounded-2xl text-blue-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Location</h4>
                  <p className="text-sm text-gray-500">
                    Startup Centre, NIT Silchar, Assam
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="glass flex h-14 w-14 items-center justify-center rounded-2xl text-blue-500">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Email</h4>
                  <p className="text-sm text-gray-500">ecell@nits.ac.in</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="glass flex h-14 w-14 items-center justify-center rounded-2xl text-blue-500">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Phone</h4>
                  <p className="text-sm text-gray-500">+91 6388689290</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <form className="glass space-y-6 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 md:p-12">
              <div>
                <label className="mb-2 ml-1 block text-sm font-bold text-gray-400">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
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
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-white transition-colors focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-5 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-[0_10px_40px_rgba(37,99,235,0.3)]">
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
