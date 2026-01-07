/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Rocket, Target, Lightbulb, TrendingUp, Users } from "lucide-react";

const timelineData = [
  {
    id: 1,
    title: "Orientation",
    icon: Users,
    desc: "Welcoming the new batches and introducing the entrepreneurial world of NIT Silchar.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "EIC Challenge",
    icon: Target,
    desc: "The annual Entrepreneurship & Innovation Challenge that tests grit and creativity.",
    color: "from-purple-500 to-indigo-400",
  },
  {
    id: 3,
    title: "Srijan Summit",
    icon: Lightbulb,
    desc: "Our flagship summit featuring speakers, workshops, and networking with industry titans.",
    color: "from-amber-500 to-orange-400",
  },
  {
    id: 4,
    title: "Empressario",
    icon: Rocket,
    desc: "The module where startups pitch, compete, and gain visibility within the regional ecosystem.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    id: 5,
    title: "Incubation",
    icon: TrendingUp,
    desc: "Full support for pre-selected startups through IIC to scale their business models.",
    color: "from-rose-500 to-pink-400",
  },
];

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gray-950/20 py-40"
    >
      <div className="container mx-auto px-6">
        <div className="mb-24 text-center">
          <h2 className="mb-6 text-5xl font-black tracking-tighter text-white uppercase italic">
            The Roadmap
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-gray-500">
            A step-by-step journey from ideation to incubation, nurturing the
            entrepreneurs of the future.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical line background */}
          <div className="absolute top-0 bottom-0 left-[39px] w-[2px] -translate-x-1/2 bg-white/5 md:left-1/2" />

          {/* Animated progress line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute top-0 bottom-0 left-[39px] z-10 w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] md:left-1/2"
          />

          <div className="relative z-20 flex flex-col gap-24">
            {timelineData.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex items-center gap-10 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Content Side */}
                <div className="group flex-1 md:pr-20 md:text-right">
                  <div
                    className={`glass rounded-3xl border border-white/5 p-8 transition-all duration-500 group-hover:border-blue-500/20 group-hover:bg-white/5 ${i % 2 !== 0 ? "md:pr-8 md:pl-20 md:text-left" : ""}`}
                  >
                    <h4 className="mb-3 text-2xl font-black text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Icon Circle */}
                <div className="glass relative z-30 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border-2 border-white/10 bg-gray-900 shadow-2xl transition-transform group-hover:scale-110">
                  <div
                    className={`absolute inset-1 rounded-full bg-gradient-to-br ${item.color} opacity-10 transition-opacity group-hover:opacity-20`}
                  />
                  <item.icon
                    className="text-gray-300 transition-colors group-hover:text-white"
                    size={30}
                  />
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    0{i + 1}
                  </div>
                </div>

                {/* Empty Side for Desktop alignment */}
                <div className="hidden flex-1 pl-20 md:flex" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
