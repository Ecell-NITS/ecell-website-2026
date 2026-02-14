/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Quote, User } from "lucide-react";

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    name: "Mayank Yadav",
    role: "Senior Director (Products) @ Turing",
    image:
      "https://res.cloudinary.com/dp92qug2f/image/upload/v1678340666/Ecell%20website/testimonial/mayank_webp_khudax.webp",
    text: "It was nostalgic to see NIT Silchar students and faculty. I really enjoyed the candid conversation with students and the energy in the room to do something big.",
  },
  {
    id: 2,
    name: "Rohan Das",
    role: "Founder @ TechSolutions",
    image: "",
    text: "E-Cell NITS provided me with the mentorship and network I needed to take my startup from an idea to a funded reality. The ecosystem here is thriving.",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Product Manager @ Google",
    image: "",
    text: "The events and workshops are top-notch. It's the best place to learn about entrepreneurship in the region. The team's dedication is inspiring.",
  },
];

// Duplicate data for infinite scroll
const marqueeData = [
  ...testimonialsData,
  ...testimonialsData,
  ...testimonialsData,
  ...testimonialsData,
];

const TestimonialCard: React.FC<{ item: TestimonialItem }> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="glass group relative w-[280px] flex-shrink-0 overflow-hidden rounded-3xl border border-white/5 bg-[#0d1117]/40 p-6 transition-all duration-500 hover:border-blue-500/30 hover:bg-[#0d1117]/60 sm:w-[380px] sm:p-7 md:w-[480px] md:p-8 lg:w-[600px]"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
        }}
      />

      {/* Quote Icon: Scales with screen */}
      <Quote
        className="mb-4 text-blue-500/50 sm:mb-5 md:mb-6"
        size={24} // Base size (mobile)
        // We use style/transform or just accept fixed size here,
        // but lucide icons are best sized via class if supported or prop.
        // To make it responsive via prop, we can't easily, so we use wrapper or class:
        // However, lucide 'size' prop is absolute.
        // Let's use Tailwind for sizing the SVG if needed, or just keep it simple.
      />

      {/* Main Text: Scales with screen */}
      <p className="mb-6 min-h-[60px] text-sm leading-relaxed font-light text-gray-300 italic sm:text-base sm:leading-relaxed md:mb-8 md:text-lg md:leading-relaxed lg:text-xl lg:leading-relaxed">
        &quot;{item.text}&quot;
      </p>

      <div className="relative z-10 flex items-center gap-3 border-t border-white/5 pt-4 sm:gap-4 sm:pt-5 md:pt-6">
        {/* User Image/Avatar: Scales with screen */}
        <div className="h-8 w-8 overflow-hidden rounded-full border border-blue-500/20 bg-gray-900 sm:h-10 sm:w-10 md:h-12 md:w-12">
          {item.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-800">
              <User className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </div>
          )}
        </div>

        <div>
          {/* Name: Scales with screen */}
          <h4 className="text-sm font-bold text-white sm:text-base md:text-lg lg:text-xl">
            {item.name}
          </h4>
          {/* Role: Scales with screen */}
          <p className="text-[10px] font-medium tracking-wider text-blue-400 uppercase sm:text-xs md:text-sm">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#020617] py-20 md:py-24 lg:py-32">
      {/* Background Decor */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden opacity-[0.03] select-none">
        <span className="absolute top-4 right-4 text-[4rem] font-black text-white/10 sm:text-[8rem] md:top-10 md:right-10 md:text-[12rem] lg:text-[20rem]">
          QUOTES
        </span>
      </div>

      <div className="relative z-10 container mx-auto mb-10 px-4 text-center sm:mb-12 md:mb-16 md:px-6">
        <h2 className="text-3xl leading-none font-black tracking-tighter text-white uppercase sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          Success <span className="text-blue-500">Stories</span>
        </h2>
      </div>

      {/* Infinite Scroll Container */}
      <div className="mask-linear-fade relative flex overflow-hidden py-4 md:py-10">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-4 px-4 md:gap-8"
          style={{ width: "max-content" }}
        >
          {marqueeData.map((item, idx) => (
            <TestimonialCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
