/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

// --- Data ---
const faqs = [
  {
    q: "What is the purpose of E-Cell NIT Silchar?",
    a: "E-Cell NIT Silchar is a non-profit student organization dedicated to promoting the spirit of entrepreneurship. We help students turn their ideas into reality by providing mentorship, incubation support, and resources through our Start-Up Centre.",
  },
  {
    q: "How can I join E-Cell NIT Silchar?",
    a: "We conduct annual recruitment drives, typically at the beginning of the academic session for freshers (EnGenius). We also occasionally open lateral entry for specific roles. Keep an eye on our social media handles for recruitment announcements.",
  },
  {
    q: "What is Srijan?",
    a: "Srijan is our flagship annual Entrepreneurship Summit (E-Summit). It features keynote sessions by industry leaders, pitching competitions, workshops, and networking opportunities designed to foster innovation among students across India.",
  },
  {
    q: "Does E-Cell provide funding for startups?",
    a: 'Yes, we facilitate funding opportunities through our Incubation Centre. We connect promising student startups with angel investors, venture capitalists, and government grants during events like "Pitch Please" and our Incubation drives.',
  },
  {
    q: "Can I participate in events if I am not from NIT Silchar?",
    a: "Absolutely! Most of our flagship events, including Srijan and Empressario (our module in Tecnoesis), are open to students from colleges across India. We encourage diverse participation to build a broader network.",
  },
  {
    q: "What is Empressario?",
    a: "Empressario is the annual entrepreneurship module organized by E-Cell during Tecnoesis (the technical fest of NIT Silchar). It includes competitions like business model pitching, case studies, and managerial challenges.",
  },
  {
    q: "Do you offer internships?",
    a: "Yes, we facilitate internship opportunities for students by connecting them with the startups incubated at our centre. We also partner with external companies to provide internship drives during our events.",
  },
];

// --- COMPONENTS ---

const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  return (
    <motion.div
      initial={false}
      className={`border-b border-white/5 transition-colors duration-300 ${
        isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between px-4 py-6 text-left focus:outline-none sm:px-6"
      >
        <span
          className={`text-base font-medium transition-colors duration-300 sm:text-lg ${
            isOpen ? "text-blue-400" : "text-gray-200 group-hover:text-white"
          }`}
        >
          {question}
        </span>
        <div
          className={`ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300 ${
            isOpen
              ? "rotate-180 border-blue-500 bg-blue-500/10 text-blue-400"
              : "text-gray-500"
          }`}
        >
          <ChevronDown size={18} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-4 pb-8 sm:px-6">
              <p className="text-base leading-relaxed font-light text-gray-400 sm:text-lg">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full overflow-hidden bg-[#020617] py-20 md:py-32">
      {/* --- BACKGROUND LAYERS --- */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #3b82f6 0.5px, transparent 0.5px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient Glows */}
      <div className="pointer-events-none absolute top-0 left-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] translate-x-1/2 translate-y-1/2 rounded-full bg-purple-600/10 blur-[120px]" />

      {/* Large Background Text */}
      <div className="pointer-events-none absolute top-10 right-0 overflow-hidden opacity-[0.03] select-none">
        <span className="text-[8rem] font-black text-white/10 sm:text-[12rem] md:text-[15rem]">
          FAQ
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          {/* --- LEFT COLUMN: HEADER (Sticky on Desktop) --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase"
              >
                <MessageCircleQuestion size={14} />
                <span>Support</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl"
              >
                Frequently <br />
                <span className="text-blue-500">Asked Questions</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-8 text-lg leading-relaxed font-light text-gray-400"
              >
                Can&apos;t find the answer you&apos;re looking for? Reach out to
                our support team.
              </motion.p>

              <motion.a
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                href="#contact"
                className="group inline-flex items-center gap-2 text-base font-semibold text-white transition-colors hover:text-blue-400"
              >
                <span className="border-b border-blue-500 pb-0.5">
                  Contact Support
                </span>
                <ChevronDown className="h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </div>
          </div>

          {/* --- RIGHT COLUMN: QUESTIONS LIST --- */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
            >
              {faqs.map((faq, i) => (
                <FaqItem
                  key={i}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
