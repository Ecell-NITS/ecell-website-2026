"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Pillar {
  name: string;
  role: string;
  desc: string;
  img: string;
}

const pillarsData: Pillar[] = [
  {
    name: "Prof. Rahul Dev Misra",
    role: "IIC President, NIT Silchar",
    desc: "Professor in the mechanical engineering department and the president of IIC, NIT Silchar. He is the backbone of the innovation ecosystem.",
    img: "https://res.cloudinary.com/ecell/image/upload/v1756627441/IMG_174134284467cac87c778b1_kzqtmj.jpg",
  },
  {
    name: "Dr. Wasim Arif",
    role: "Convener IIC, NIT Silchar",
    desc: "Associate professor in the department of ECE and faculty advisor at E-Cell. A guiding support and visionary for the organization.",
    img: "https://res.cloudinary.com/dw3n9vflw/image/upload/v1767025863/WasimArifSir-d33400e4_qmpii4.jpg",
  },
  {
    name: "Dr. A.B. Deoghare",
    role: "Asso Prof, Mechanical Engg",
    desc: "Associate professor in the department of mechanical engineering and supports E-Cell organization as a primary faculty advisor.",
    img: "https://res.cloudinary.com/dfriijrmr/image/upload/v1677474386/GalleryPage/Orientation%202022-2023/IMG_1558_vjql6g.jpg",
  },
];

export default function PillarsSection() {
  const [activePillar, setActivePillar] = useState(0);
  const pillarRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (pillarRef.current) {
      const scrollLeft = pillarRef.current.scrollLeft;
      const scrollWidth = pillarRef.current.scrollWidth;
      const itemWidth = scrollWidth / pillarsData.length;
      const index = Math.round(scrollLeft / itemWidth);
      setActivePillar(Math.min(Math.max(index, 0), pillarsData.length - 1));
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-950/20 py-12 md:py-16 lg:py-20">
      {/* Background text */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10 select-none">
        <span className="absolute -top-10 -left-20 text-[20rem] font-black text-white/5">
          GUIDANCE
        </span>
        <span className="absolute -right-20 -bottom-20 rotate-12 text-[20rem] font-black text-white/5">
          VISION
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Heading */}
        <div className="mb-16 flex flex-col items-center text-center md:mb-20 lg:mb-24">
          <h2 className="mb-6 text-4xl font-black tracking-tighter text-white uppercase italic sm:text-5xl md:text-6xl lg:text-7xl">
            The <span className="text-blue-500">Pillars</span>
          </h2>
          <div className="mx-auto mb-8 h-1.5 w-24 rounded-full bg-blue-600" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-gray-500">
            Meet the visionaries and faculty mentors who provide the strategic
            backbone and unwavering support for E-Cell&apos;s exponential
            growth.
          </p>
        </div>

        {/* Pillars Cards */}
        <div
          ref={pillarRef}
          onScroll={handleScroll}
          className="scrollbar-hide flex snap-x snap-mandatory gap-10 overflow-x-auto pb-6 md:grid md:grid-cols-3 md:pb-0 lg:gap-16"
        >
          {pillarsData.map((person, i) => (
            <div
              key={person.name}
              className="group relative w-full min-w-[85vw] snap-center md:min-w-0"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex h-full flex-col items-center rounded-[3rem] border border-white/10 p-8 text-center transition-all duration-500 group-hover:bg-white/[0.04] hover:border-blue-500/30 md:p-12"
              >
                {/* Image */}
                <div
                  className="relative mb-10 aspect-square w-44"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <div className="absolute inset-0 scale-110 rounded-full border-2 border-blue-500/20 transition-transform duration-700 group-hover:scale-125" />
                  <div className="absolute inset-0 scale-125 rounded-full border border-blue-500/10 opacity-50 transition-transform duration-1000 group-hover:scale-150" />

                  <div className="relative z-10 h-full w-full overflow-hidden rounded-full border-4 border-white/5 shadow-2xl">
                    <Image
                      src={person.img}
                      alt={person.name}
                      width={176}
                      height={176}
                      sizes="176px"
                      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                    />
                  </div>
                </div>

                {/* Text */}
                <div style={{ transform: "translateZ(30px)" }}>
                  <h3 className="mb-2 text-2xl font-black tracking-tight text-white transition-colors group-hover:text-blue-400">
                    {person.name}
                  </h3>

                  <p className="mb-6 inline-block rounded-full bg-blue-500/5 px-4 py-1 text-xs font-black tracking-[0.2em] text-blue-500 uppercase">
                    {person.role}
                  </p>

                  <p className="px-4 text-sm leading-relaxed font-light text-gray-400 italic">
                    &quot;{person.desc}&quot;
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Pillars Indicators (Mobile) */}
        <div className="mt-4 flex justify-center gap-2 md:hidden">
          {pillarsData.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activePillar
                  ? "w-8 bg-blue-500"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
