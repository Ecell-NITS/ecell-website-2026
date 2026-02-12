/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, User } from "lucide-react";
// --- Data Logic (Derived from the logic request) ---
const testimonialsData = [
  {
    id: 1,
    name: "Mayank Yadav",
    role: "Senior Director (Products) @ Turing",
    image:
      "https://res.cloudinary.com/dp92qug2f/image/upload/v1678340666/Ecell%20website/testimonial/mayank_webp_khudax.webp",
    text: "It was nostalgic to see NIT Silchar students and faculty. I really enjoyed the candid conversation with students and the energy in the room to do something big. Would love to come back soon and work towards building a solid entrepreneurial ecosystem in the campus.",
  },
  {
    id: 2,
    name: "Rohan Das",
    role: "Founder @ TechSolutions",
    image: "",
    text: "E-Cell NITS provided me with the mentorship and network I needed to take my startup from an idea to a funded reality. The ecosystem here is thriving and genuinely supportive of new ideas.",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Product Manager @ Google",
    image: "",
    text: "The events and workshops are top-notch. It's the best place to learn about entrepreneurship in the region. The team's dedication to fostering innovation is truly inspiring.",
  },
];

const Testimonials: React.FC = () => {
  // --- State Logic (From the second snippet) ---
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Auto-Rotation Logic (From the second snippet) ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 8000); // Rotates every 8 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-40">
      {/* Background Decor */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden opacity-[0.03] select-none">
        <span className="absolute top-0 left-10 text-[20rem] font-black">
          QUOTES
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl leading-none font-black tracking-tighter text-white uppercase lg:text-6xl">
            Testimonials
          </h2>
        </div>
        <div className="mx-auto max-w-5xl">
          {/* Main Card */}
          <div className="glass flex min-h-[400px] items-center rounded-[3rem] border border-white/10 p-8 md:min-h-[500px] md:p-12 lg:p-20">
            {/* AnimatePresence handles the smooth fading switch between data */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex w-full flex-col items-center gap-12 md:flex-row"
              >
                {/* Left Side: Image & Name */}
                <div className="relative mb-6 flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-4 border-blue-500/20 bg-gray-900">
                  {testimonialsData[currentIndex].image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={testimonialsData[currentIndex].image}
                      alt={testimonialsData[currentIndex].name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    /* Fallback if no image is provided */
                    <User size={64} className="text-blue-500/40" />
                  )}
                </div>

                {/* Right Side: Quote */}
                <div className="relative md:w-2/3">
                  <Quote
                    className="absolute -top-10 -left-6 text-blue-500/20"
                    size={80}
                  />
                  <p className="relative z-10 mb-6 text-lg leading-relaxed font-light text-gray-300 italic sm:text-xl md:mb-10 md:text-2xl lg:text-3xl">
                    &quot;{testimonialsData[currentIndex].text}&quot;
                  </p>

                  <div className="mt-8 flex items-center justify-between">
                    {/* Decorative Line */}
                    <div className="h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />

                    {/* Navigation Dots (Logic added to UI) */}
                    <div className="flex gap-2">
                      {testimonialsData.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === currentIndex
                              ? "w-8 bg-blue-500"
                              : "w-2 bg-white/20 hover:bg-white/40"
                          }`}
                          aria-label={`Go to testimonial ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
