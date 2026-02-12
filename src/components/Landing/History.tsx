"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  icon: string;
  milestone: string;
}

const timelineData: TimelineEvent[] = [
  {
    year: 2012,
    title: "Establishment",
    description:
      "E-Cell was founded with a vision to nurture entrepreneurial minds",
    icon: "🌱",
    milestone: "Journey Begins",
  },
  {
    year: 2014,
    title: "First Startup Incubation",
    description:
      "Incubated our first batch of startup ideas with dedicated mentorship",
    icon: "🚀",
    milestone: "First Launch",
  },
  {
    year: 2016,
    title: "Campus Recognition",
    description:
      "Gained official recognition as a top student organization on campus",
    icon: "🏆",
    milestone: "Campus Leaders",
  },
  {
    year: 2018,
    title: "Regional Expansion",
    description:
      "Expanded network beyond campus with regional partnership programs",
    icon: "🌐",
    milestone: "Growth Phase",
  },
  {
    year: 2020,
    title: "Digital Transformation",
    description:
      "Adapted to digital landscape with online events and virtual mentorships",
    icon: "💻",
    milestone: "Going Digital",
  },
  {
    year: 2022,
    title: "National Recognition",
    description:
      "Achieved national level recognition in startup ecosystem development",
    icon: "⭐",
    milestone: "National Stage",
  },
  {
    year: 2023,
    title: "Global Partnerships",
    description:
      "Established partnerships with 20+ international organizations and investors",
    icon: "🤝",
    milestone: "Going Global",
  },
  {
    year: 2024,
    title: "30 Crores Milestone",
    description:
      "E-Cell startups collectively raised over 30 crores in funding",
    icon: "💰",
    milestone: "Success Story",
  },
  {
    year: 2025,
    title: "Future Vision",
    description:
      "Continuing to build the next generation of innovations and entrepreneurs",
    icon: "🔮",
    milestone: "Onwards",
  },
];

const History: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#020617] to-[#0c1324] py-12 md:py-16 lg:py-20">
      {/* Background Effects */}
      <div className="absolute top-20 left-1/3 -z-10 h-[300px] w-[600px] rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="absolute right-1/4 bottom-20 -z-10 h-[300px] w-[600px] rounded-full bg-blue-600/5 blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="mb-16 flex flex-col items-center text-center md:mb-20 lg:mb-24">
            <h2 className="mb-6 text-4xl font-black tracking-tighter text-white uppercase italic sm:text-5xl md:text-6xl lg:text-7xl">
              Our <span className="text-blue-500">History</span>
            </h2>
            <div className="mx-auto mb-8 h-1.5 w-24 rounded-full bg-blue-600" />
            <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-gray-500">
              From humble beginnings to a thriving ecosystem, our journey is
              marked by milestones, challenges, and triumphs that have shaped us
              into the vibrant community we are today.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="mx-auto max-w-5xl">
          {/* Timeline Container */}
          <div className="relative">
            {/* Center Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-1 -translate-x-1/2 transform bg-gradient-to-b from-blue-600/50 via-blue-600/50 to-blue-600/50" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineData.map((event, idx) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex gap-8 ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/30 hover:bg-white/[0.05]"
                    >
                      <div className="mb-3 inline-block rounded-lg border border-blue-500/30 bg-blue-600/20 px-3 py-1 text-xs font-bold text-blue-300">
                        {event.year}
                      </div>

                      <h3 className="mb-2 text-xl font-black text-white transition-colors group-hover:text-blue-400">
                        {event.title}
                      </h3>

                      <p className="mb-4 text-sm text-gray-400">
                        {event.description}
                      </p>

                      <div className="inline-block rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-600/20 px-3 py-1 text-xs font-bold text-blue-300">
                        {event.milestone}
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="flex w-full items-start justify-center pt-2 md:w-auto md:justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: idx * 0.15,
                        type: "spring",
                        bounce: 0.5,
                      }}
                      viewport={{ once: true }}
                      className="relative flex h-16 w-16 items-center justify-center"
                    >
                      {/* Pulsing Ring */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.1,
                        }}
                        className="absolute inset-0 rounded-full border-2 border-blue-500/30 bg-blue-600/10"
                      />

                      {/* Main Dot */}
                      <div className="relative z-10 h-8 w-8 rounded-full border-4 border-[#0c1324] bg-gradient-to-r from-blue-600 to-blue-600 shadow-lg shadow-blue-600/50">
                        <div className="absolute inset-1 rounded-full bg-[#0c1324]/80" />
                        <div className="flex h-full w-full items-center justify-center text-lg">
                          {event.icon}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* End Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="border-gradient-to-r mt-20 rounded-2xl border bg-gradient-to-r from-blue-500/30 from-blue-600/10 to-blue-500/30 to-blue-600/10 p-8 text-center backdrop-blur-sm"
          >
            <p className="text-xl font-black text-white">
              The Future Awaits{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
                Exceptional Entrepreneurs
              </span>
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Our journey continues as we build an ecosystem where innovation
              thrives and dreams become reality
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default History;
