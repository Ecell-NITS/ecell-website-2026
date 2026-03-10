"use client";

import React, { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface Achievement {
  id: number;
  title: string;
  image: string;
  description: string;
  details: string;
  year: string;
  icon: string;
}

const achievementsData: Achievement[] = [
  {
    id: 1,
    title: "NEC organized by E-Cell IIT Bombay",
    image:
      "https://res.cloudinary.com/ecell/image/upload/f_webp/v1773169056/fc527954-530d-487d-bef5-a797f70f2687_jvf1h4.jpg",
    description: "Recognized for fostering 50+ successful startups",
    details:
      "The E-Cell team had the privilege to attend NEC organized by E-Cell IIT Bombay.The event provided immense exposure to entrepreneurial ecosystems, startup culture, and leadership insights. Interacting with students, founders, and organizers from across the country broadened our understanding of how impactful E-Cells operate.This experience will significantly influence the way we plan, execute, and expand our future initiatives back on campus. A step forward in our journey of building a stronger entrepreneurial community!",
    year: "2025",
    icon: "🚀",
  },
  {
    id: 2,
    title: "SIH 2025 Internal Hackathon @ NIT Silchar",
    image:
      "https://res.cloudinary.com/ecell/image/upload/f_webp/v1773169410/WhatsApp_Image_2026-03-10_at_11.51.26_PM_x2mquf.jpg",
    description: "Awarded Best Student Organization for promoting innovation",
    details:
      "The SIH 2025 Internal Hackathon @ NIT Silchar was a resounding success, bringing together bright minds to ideate and innovate. Our team organized and executed the event seamlessly, providing a platform for students to showcase their problem-solving skills and creativity. The event witnessed enthusiastic participation from across the campus, with innovative solutions presented for various challenges. This hackathon reinforced our commitment to fostering a culture of innovation and entrepreneurship at NIT Silchar.",
    year: "2025",
    icon: "💡",
  },
  {
    id: 3,
    title: "Inauguration of the DST NIDHI iTBI at NIT Silchar",
    image:
      "https://res.cloudinary.com/ecell/image/upload/f_webp/v1773169511/WhatsApp_Image_2026-03-10_at_11.56.20_PM_vtqofq.jpg",
    description:
      "A milestone event for the entrepreneurial community at NIT Silchar",
    details:
      "The inauguration of the DST NIDHI iTBI at NIT Silchar represents a major step towards strengthening the startup ecosystem on campus. The initiative will support aspiring entrepreneurs by offering resources, mentorship, and opportunities to convert innovative ideas into successful startups.",
    year: "2025",
    icon: "🌍",
  },
  {
    id: 4,
    title: "SIH 2024 Internal Hackathon @ NIT Silchar",
    image:
      "https://res.cloudinary.com/ecell/image/upload/f_webp/v1773169726/563897b1-97bf-442d-8a32-f2b63c716f7d_krq7h1.jpg",
    description: "Awarded Best Student Organization for promoting innovation",
    details:
      "The SIH 2024 Internal Hackathon @ NIT Silchar was a resounding success, bringing together bright minds to ideate and innovate. Our team organized and executed the event seamlessly, providing a platform for students to showcase their problem-solving skills and creativity. The event witnessed enthusiastic participation from across the campus, with innovative solutions presented for various challenges. This hackathon reinforced our commitment to fostering a culture of innovation and entrepreneurship at NIT Silchar.",
    year: "2024",
    icon: "🎯",
  },
  {
    id: 5,
    title: "Incandescence 2024: Website Development by ECELL Technical Team",
    image:
      "https://res.cloudinary.com/ecell/image/upload/f_webp/v1773169823/623791156_18065741165259519_1790089148149832160_n_w6lwvb.jpg",
    description:
      "Showcased technical expertise and commitment to supporting the institute's flagship events",
    details:
      "The ECELL Technical Team successfully developed the official website for Incandescence 2024, the annual cultural festival of NIT Silchar. The website served as a comprehensive platform for event information, registration, and engagement, reaching thousands of students and participants. This project showcased our team's technical expertise and commitment to supporting the institute's flagship events.",
    year: "2024",
    icon: "🔬",
  },
];

const Achievements: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth = scrollRef.current.scrollWidth;
      const itemWidth = scrollWidth / achievementsData.length;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(Math.max(index, 0), achievementsData.length - 1));
    }
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#020617] py-12 md:py-16 lg:py-20">
        {/* Background Blobs */}
        <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-green-600/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px]" />

        <div className="relative z-10 container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            {/* Heading */}
            <div className="mb-16 flex flex-col items-center text-center md:mb-20 lg:mb-24">
              <h2 className="mb-6 text-4xl font-black tracking-tighter text-white uppercase italic sm:text-5xl md:text-6xl lg:text-7xl">
                Our <span className="text-blue-500">Contributions</span>
              </h2>
              <div className="mx-auto mb-8 h-1.5 w-24 rounded-full bg-blue-600" />
              <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-gray-500">
                Over the years, E-Cell NIT Silchar has made significant strides
                in fostering entrepreneurship and innovation. Here are some of
                our proudest achievements that highlight our impact on the
                startup ecosystem.
              </p>
            </div>
          </motion.div>

          {/* Achievements Grid / Horizontal Scroll */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="scrollbar-hide mx-auto flex max-w-7xl snap-x snap-mandatory gap-8 overflow-x-auto pb-6 md:grid md:grid-cols-2 md:pb-0 lg:grid-cols-3"
          >
            {achievementsData.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedAchievement(achievement)}
                className="group min-w-[85vw] cursor-pointer snap-center md:min-w-0"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-blue-500/30 hover:bg-white/[0.05]">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-600/20 to-transparent">
                    <Image
                      src={achievement.image}
                      alt={achievement.title}
                      width={500}
                      height={300}
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4 rounded-lg border border-blue-500/30 bg-blue-600/20 px-3 py-1 text-xs font-bold text-blue-300 backdrop-blur-sm">
                      {achievement.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-black text-white transition-colors group-hover:text-blue-400">
                      {achievement.title}
                    </h3>

                    {/* Click Indicator */}
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                      <span>VIEW DETAILS</span>
                      <motion.svg
                        className="h-3 w-3"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M9 5l7 7-7 7"
                        />
                      </motion.svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicators (Mobile) */}
          <div className="mt-4 flex justify-center gap-2 md:hidden">
            {achievementsData.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-8 bg-blue-500"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal - rendered via portal to document.body to escape all stacking contexts */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedAchievement && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedAchievement(null)}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0c1324] shadow-2xl"
                >
                  <button
                    onClick={() => setSelectedAchievement(null)}
                    className="absolute top-4 right-4 z-50 float-right mr-4 rounded-full bg-black p-2 text-white transition-all hover:bg-red-500/20 hover:text-red-500"
                  >
                    <X size={24} />
                  </button>

                  {/* Modal Content */}
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-blue-600/20 to-transparent md:h-auto md:w-1/2">
                      <Image
                        src={selectedAchievement.image}
                        alt={selectedAchievement.title}
                        width={600}
                        height={400}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1324] via-transparent to-transparent md:hidden" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-10">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="rounded-lg border border-blue-500/30 bg-blue-600/20 px-3 py-1 text-xs font-bold text-blue-300 backdrop-blur-sm">
                          {selectedAchievement.year}
                        </div>
                      </div>

                      <h2 className="mb-4 text-3xl font-black text-white">
                        {selectedAchievement.title}
                      </h2>

                      <div className="mb-6 h-1 w-12 rounded-full bg-blue-600" />

                      <p className="mb-6 text-base leading-relaxed text-gray-300">
                        {selectedAchievement.details}
                      </p>

                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => setSelectedAchievement(null)}
                        className="w-fit rounded-lg border border-blue-500/30 bg-blue-600/20 px-6 py-2 text-sm font-bold text-blue-400 transition-all hover:bg-blue-600/40"
                      >
                        Close
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default Achievements;
