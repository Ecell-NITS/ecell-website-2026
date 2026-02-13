/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- FAQ ITEM COMPONENT ---
const FaqItem = ({ q, a }: { q: string; a: string | React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-6 text-left focus:outline-none"
      >
        <span
          className={`text-lg font-medium transition-colors duration-300 ${
            isOpen ? "text-blue-400" : "text-gray-200 group-hover:text-white"
          }`}
        >
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-300 group-hover:text-blue-400 ${
            isOpen ? "rotate-180 text-blue-400" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pr-4 pb-6 text-base leading-relaxed font-light text-gray-400">
              {typeof a === "string" ? <p>{a}</p> : a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN SECTION COMPONENT ---
export default function FaqSection() {
  // Mouse tracking for background parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

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

  return (
    <section className="relative w-full overflow-hidden bg-[#020617] py-24">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Grid Floor */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 80%)",
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
        />
        {/* Ambient Glows */}
        <div className="absolute top-[10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-3">
          {/* --- LEFT COLUMN: HEADER --- */}
          <div className="lg:col-span-1">
            <h2 className="mb-6 border-l-4 border-blue-500 pl-6 text-3xl font-black tracking-tight text-white md:text-5xl">
              Frequently <br /> asked questions
            </h2>
            <p className="pl-6 text-lg leading-relaxed font-light text-gray-400 lg:pl-0">
              Haven&apos;t found what you&apos;re looking for? <br />
              <a
                href="#contactus"
                className="text-blue-400 underline transition-colors hover:text-blue-300"
              >
                Contact us
              </a>
              .
            </p>
          </div>

          {/* --- RIGHT COLUMN: QUESTIONS LIST --- */}
          <div className="lg:col-span-2">
            <div className="">
              {faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
