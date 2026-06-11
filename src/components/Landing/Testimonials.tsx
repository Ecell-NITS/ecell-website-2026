/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React from "react";
import { Quote } from "lucide-react";
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
];

const Testimonials: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-16 text-center">
          <h2 className="flex flex-col items-center justify-center gap-3 text-4xl font-black tracking-tight text-white uppercase md:flex-row md:text-5xl lg:text-6xl">
            OUR{" "}
            <span className="rounded-md bg-[#5c3cff] px-4 py-1 text-white">
              TESTIMONIALS
            </span>
          </h2>
        </div>
        <div className="mx-auto max-w-5xl">
          {/* Main Card - Super Clean Minimalist (No borders/bg) */}
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start lg:gap-16">
            {/* Left Side: Image */}
            <div className="relative shrink-0 overflow-hidden rounded-full border-4 border-[#5c3cff]/20">
              <img
                src={testimonialsData[0].image}
                alt={testimonialsData[0].name}
                className="h-40 w-40 object-cover sm:h-48 sm:w-48 lg:h-56 lg:w-56"
              />
            </div>

            {/* Right Side: Quote */}
            <div className="relative w-full md:w-2/3">
              <Quote
                className="absolute -top-10 -left-6 text-[#5c3cff]/20"
                size={80}
              />
              <p className="relative z-10 mb-6 text-lg leading-relaxed font-light text-gray-300 italic sm:text-xl md:mb-8 md:text-2xl">
                &quot;{testimonialsData[0].text}&quot;
              </p>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white">
                    {testimonialsData[0].name}
                  </span>
                  <span className="text-sm font-medium text-[#5c3cff]">
                    {testimonialsData[0].role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
