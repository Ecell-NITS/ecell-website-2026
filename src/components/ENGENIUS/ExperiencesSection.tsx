"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const experiencesData = [
  {
    id: 1,
    name: "Ishaan Sharma",
    role: "Winner - Shark Tank Challenge",
    image:
      "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.56_qpxgkx",
    text: "ENGENIUS isn't just an orientation—it's a baptism by fire! The Shark Tank challenge was intense, but in the best way. I learned more about pitching and entrepreneurship in a few hours than I would have in weeks. This event set the tone for my entire entrepreneurial journey!",
  },
  {
    id: 2,
    name: "Divya Reddy",
    role: "Participant - CEO Roleplay Track",
    image:
      "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.56_2_ixazyv",
    text: "The CEO roleplay at ENGENIUS made me step into the shoes of real business leaders. It was challenging, thrilling, and exactly what I needed as a fresher. The mentors' insights about decision-making and leadership were goldmine of knowledge!",
  },
  {
    id: 3,
    name: "Arjun Kapoor",
    role: "Winner - Mr. EnGenius",
    image:
      "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.56_1_tggvsz",
    text: "ENGENIUS gave me the confidence to take the stage and showcase my entrepreneurial vision. The judging was fair, the energy was electric, and the entire experience made me realize I'm not just a fresher—I'm a potential entrepreneur in the making!",
  },
  {
    id: 4,
    name: "Priya Mishra",
    role: "Participant - Pitch Boxing Track",
    image:
      "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.53_1_yhxhf8",
    text: "Pitch Boxing was my favorite—it taught me how to think on my feet and defend my ideas under pressure. The friendly competition with peers made everyone level up. ENGENIUS creates this amazing ecosystem where freshers feel inspired, not intimidated!",
  },
  {
    id: 5,
    name: "Rohan Singh",
    role: "Winner - Miss EnGenius",
    image:
      "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.53_osmp8m",
    text: "What makes ENGENIUS special is that it's not just about competition—it's about community. Winning the Mr./Ms. ENGENIUS title was an honor, but more importantly, I found my entrepreneurial family here. This is just the beginning of my journey!",
  },
];

const ExperiencesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experiencesData.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex(
      (prev) => (prev - 1 + experiencesData.length) % experiencesData.length,
    );
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % experiencesData.length);
  };

  const handleDotClick = (index: number) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  return (
    <section
      id="experiences"
      className="relative overflow-hidden bg-[hsl(0_0%_4%)] py-20 md:py-32"
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden opacity-[0.03] select-none">
        <span className="absolute top-0 left-10 text-[20rem] font-black">
          EXPERIENCES
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-16 text-center md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-[hsl(0_72%_51%)] uppercase md:text-sm">
              Voices of Innovation
            </span>
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase md:text-6xl">
              Participant{" "}
              <span className="engenius-text-gradient-blood">Stories</span>
            </h2>
          </motion.div>
        </div>

        {/* Main Card */}
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="engenius-glass relative flex min-h-[500px] flex-col justify-between overflow-hidden rounded-2xl border border-[hsl(0_72%_51%/0.2)] bg-gradient-to-br from-[hsl(0_72%_51%/0.05)] to-transparent p-8 backdrop-blur-md md:min-h-[550px] md:rounded-3xl md:p-12 lg:p-16"
          >
            {/* Quote Icon */}
            <Quote
              className="absolute -top-6 -right-6 text-[hsl(0_72%_51%/0.1)]"
              size={120}
            />

            <AnimatePresence mode="wait">
              {experiencesData[currentIndex] && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 flex h-full flex-col justify-between"
                >
                  {/* Quote Text */}
                  <p className="mb-8 text-lg leading-relaxed font-light text-gray-200 italic md:mb-12 md:text-2xl lg:text-3xl">
                    &quot;{experiencesData[currentIndex]?.text}&quot;
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-[hsl(0_72%_51%/0.3)] md:h-20 md:w-20">
                      <img
                        src={experiencesData[currentIndex]?.image || ""}
                        alt={experiencesData[currentIndex]?.name || ""}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-bold text-white md:text-xl">
                        {experiencesData[currentIndex]?.name}
                      </h3>
                      <p className="text-sm text-[hsl(0_72%_51%)] md:text-base">
                        {experiencesData[currentIndex]?.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between gap-4 md:mt-12">
            {/* Navigation Buttons */}
            <div className="flex gap-2 md:gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="group rounded-full border border-[hsl(0_72%_51%/0.3)] bg-[hsl(0_72%_51%/0.1)] p-2 transition-colors hover:bg-[hsl(0_72%_51%/0.2)] md:p-3"
                aria-label="Previous experience"
              >
                <ChevronLeft size={20} className="text-[hsl(0_72%_51%)]" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="group rounded-full border border-[hsl(0_72%_51%/0.3)] bg-[hsl(0_72%_51%/0.1)] p-2 transition-colors hover:bg-[hsl(0_72%_51%/0.2)] md:p-3"
                aria-label="Next experience"
              >
                <ChevronRight size={20} className="text-[hsl(0_72%_51%)]" />
              </motion.button>
            </div>

            {/* Indicator Dots */}
            <div className="flex gap-2 md:gap-3">
              {experiencesData.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-[hsl(0_72%_51%)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to experience ${idx + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <p className="text-sm text-gray-400 md:text-base">
              <span className="font-semibold text-[hsl(0_72%_51%)]">
                {currentIndex + 1}
              </span>
              /{experiencesData.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
