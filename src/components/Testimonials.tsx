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
// Since cards are wider now, we don't need as many copies to fill the width,
// but keeping 4 sets ensures smooth scrolling on huge monitors.
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
      // CHANGED: w-[350px] -> w-[320px] md:w-[600px]
      // This makes it wider on desktop to fill space, but keeps it contained on mobile.
      className="glass group relative w-[320px] flex-shrink-0 overflow-hidden rounded-3xl border border-white/5 bg-[#0d1117]/40 p-8 transition-all duration-500 hover:border-blue-500/30 hover:bg-[#0d1117]/60 md:w-[600px]"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
        }}
      />

      <Quote className="mb-6 text-blue-500/50" size={32} />

      <p className="mb-8 min-h-[60px] text-sm leading-relaxed font-light text-gray-300 italic md:text-lg">
        &quot;{item.text}&quot;
      </p>

      <div className="relative z-10 flex items-center gap-4 border-t border-white/5 pt-6">
        <div className="h-10 w-10 overflow-hidden rounded-full border border-blue-500/20 bg-gray-900">
          {item.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-800">
              <User size={16} className="text-blue-400" />
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{item.name}</h4>
          <p className="text-[10px] font-medium tracking-wider text-blue-400 uppercase">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#020617] py-32">
      {/* Background Decor */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden opacity-[0.03] select-none">
        <span className="absolute top-10 right-10 text-[10rem] font-black text-white/10 lg:text-[20rem]">
          QUOTES
        </span>
      </div>

      <div className="relative z-10 container mx-auto mb-16 px-6 text-center">
        <h2 className="text-4xl leading-none font-black tracking-tighter text-white uppercase lg:text-6xl">
          Success <span className="text-blue-500">Stories</span>
        </h2>
      </div>

      {/* Infinite Scroll Container */}
      <div className="mask-linear-fade relative flex overflow-hidden py-10">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{
            duration: 50, // Slightly faster duration since the track is longer now
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-8 px-4" // Increased gap slightly
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
