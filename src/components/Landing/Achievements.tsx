"use client";

import React, { useState, useRef } from "react";
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
      "https://instagram.fgau4-1.fna.fbcdn.net/v/t51.82787-15/625386221_18327507529217970_5781265715188957704_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=MzgyNTkyMTE0MTg0OTA3MzI0MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTA4MC5zZHIuQzMifQ%3D%3D&_nc_ohc=sJFNRxP7674Q7kNvwHb7CvH&_nc_oc=Adn2Y3qm-XpuQVgeVM1s6uyUOK-jQ5xMWf1g9kP7wofSlccr8GDeRtyMBaLzq6ekdjA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fgau4-1.fna&_nc_gid=aKVbWZ3-0MKAecq3bjbWMA&oh=00_Aftahcver-_3-1a0vAfg4A3wwiHlW-lSUMsbr4HwVd6bjA&oe=698E719A",
    description: "Recognized for fostering 50+ successful startups",
    details:
      "E-Cell NIT Silchar has been recognized as one of the best startup ecosystems in the Northeast region, having successfully incubated and mentored over 50 startups. Our comprehensive support system includes mentorship from industry experts, funding opportunities, and access to a network of investors.",
    year: "2026",
    icon: "🚀",
  },
  {
    id: 2,
    title: "SIH 2025 Internal Hackathon @ NIT Silchar",
    image:
      "https://scontent.fgau4-1.fna.fbcdn.net/v/t39.30808-6/549730864_1381445740651551_3029566534367371637_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Vmd73bviBakQ7kNvwFSruwM&_nc_oc=AdnNmYJXa5Mq1MuQiVV1WLYrH1XZiC22M-xJVqwAzWtSMJAvi2fiT4sRCTQJDj9uN1A&_nc_zt=23&_nc_ht=scontent.fgau4-1.fna&_nc_gid=y2INeFLMG3MMmlQs6ykUPg&oh=00_AftFDxqapmTXFEUEPX2t9VG4X7bDM8ElSpr9zc4xF-ozZw&oe=698E5ABD",
    description: "Awarded Best Student Organization for promoting innovation",
    details:
      "This prestigious award acknowledges our continuous efforts in promoting innovation and entrepreneurship among the student community. Through workshops, hackathons, and mentorship programs, we've created an environment where ideas flourish and innovation thrives.",
    year: "2025",
    icon: "💡",
  },
  {
    id: 3,
    title: "Global Partnership Network",
    image:
      "https://res.cloudinary.com/ecell/image/upload/v1756636999/network_c7k2dj.jpg",
    description:
      "Established partnerships with 20+ international organizations",
    details:
      "We have successfully established strategic partnerships with over 20 global organizations including renowned incubators, venture capital firms, and tech companies. These partnerships provide our startups with international exposure, funding opportunities, and mentorship from industry leaders.",
    year: "2023",
    icon: "🌍",
  },
  {
    id: 4,
    title: "Community Impact Award",
    image:
      "https://res.cloudinary.com/ecell/image/upload/v1756636999/community_b9l4fg.jpg",
    description: "Making positive impact on 1000+ lives",
    details:
      "Through our various initiatives, workshops, and events, we have directly impacted over 1000 students and entrepreneurs. Our mentorship programs, skill development workshops, and networking events have helped countless individuals start their entrepreneurial journey with confidence.",
    year: "2024",
    icon: "🎯",
  },
  {
    id: 5,
    title: "Research & Development Hub",
    image:
      "https://res.cloudinary.com/ecell/image/upload/v1756636999/research_d2m3kl.jpg",
    description: "Leading R&D initiatives for tech-enabled solutions",
    details:
      "E-Cell has become a hub for research and development, focusing on creating tech-enabled solutions for real-world problems. Our R&D projects have contributed to sustainable development goals and created innovative solutions in sectors like healthcare, agriculture, and education.",
    year: "2024",
    icon: "🔬",
  },
  {
    id: 6,
    title: "Funding Success",
    image:
      "https://res.cloudinary.com/ecell/image/upload/v1756636999/funding_e4n5op.jpg",
    description: "Successfully facilitated 30+ crores in startup funding",
    details:
      "Our startups have collectively raised over 30 crores in funding from various sources including angel investors, venture capital firms, and government grants. This demonstrates the quality and viability of the startups we incubate and the trust the investment community places in our ecosystem.",
    year: "2024",
    icon: "💰",
  },
];

const Achievements: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth = scrollRef.current.scrollWidth;
      const itemWidth = scrollWidth / achievementsData.length;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(Math.max(index, 0), achievementsData.length - 1));
    }
  };

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
                    className="absolute top-4 right-4 z-50 float-right mr-4 rounded-full bg-black p-2 transition-all hover:bg-red-500/20 hover:text-red-500"
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
