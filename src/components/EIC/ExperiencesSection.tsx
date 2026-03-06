"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, User, ChevronLeft, ChevronRight } from "lucide-react";

const experiencesData = [
  {
    id: 1,
    name: "Alex Kumar",
    role: "Winner - Music Innovation Challenge",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770137527/emain_sweptn.png",
    text: "EIC 2025 was an incredible journey! The platform gave me the opportunity to showcase my musical innovation, and the mentorship I received from industry experts was priceless. This event truly transformed my perspective on entrepreneurship.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Participant - Sound Production Track",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770137561/emi_bz3gpl.png",
    text: "The energy at EIC is unmatched! Being surrounded by like-minded innovators and getting real-time feedback from seasoned professionals made me realize the power of collaboration. I'm already working on my next project!",
  },
  {
    id: 3,
    name: "Rohan Singh",
    role: "Winner - Audio Technology Track",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770137571/r1_ktxtlr.png",
    text: "What started as a crazy idea in the competition became a reality through EIC's support and guidance. The judges' feedback was constructive, and the prize money helped kickstart my venture. Grateful for this platform!",
  },
  {
    id: 4,
    name: "Anjali Patel",
    role: "Participant - Music Tech Innovation",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770137577/r2_vqgl8b.png",
    text: "EIC gave me the confidence to pursue my passion for music technology. The workshops were insightful, and the networking opportunities opened doors I didn't expect. Highly recommend this event to anyone interested in innovation!",
  },
  {
    id: 5,
    name: "Vikram Desai",
    role: "Winner - Best Innovation Award",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770137585/r3_zc0atn.png",
    text: "The judges' expertise and the event's organization were outstanding. EIC doesn't just celebrate ideas; it nurtures them. I left with not just an award, but also a network of mentors and fellow entrepreneurs to collaborate with.",
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
      className="relative overflow-hidden bg-[hsl(220_30%_4%)] py-20 md:py-32"
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
            <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-[hsl(141_73%_42%)] uppercase md:text-sm">
              Voices of Success
            </span>
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase md:text-6xl">
              Participant{" "}
              <span className="text-[hsl(141_73%_42%)]">Stories</span>
            </h2>
          </motion.div>
        </div>

        {/* Main Card */}
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="glass relative flex min-h-[500px] flex-col justify-between overflow-hidden rounded-2xl border border-[hsl(141_73%_42%/0.2)] bg-gradient-to-br from-[hsl(141_73%_42%/0.05)] to-transparent p-8 md:min-h-[550px] md:rounded-3xl md:p-12 lg:p-16"
          >
            {/* Quote Icon */}
            <Quote
              className="absolute -top-6 -right-6 text-[hsl(141_73%_42%/0.1)]"
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
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-[hsl(141_73%_42%/0.3)] md:h-20 md:w-20">
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
                      <p className="text-sm text-[hsl(141_73%_42%)] md:text-base">
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
                className="group rounded-full border border-[hsl(141_73%_42%/0.3)] bg-[hsl(141_73%_42%/0.1)] p-2 transition-colors hover:bg-[hsl(141_73%_42%/0.2)] md:p-3"
                aria-label="Previous experience"
              >
                <ChevronLeft size={20} className="text-[hsl(141_73%_42%)]" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="group rounded-full border border-[hsl(141_73%_42%/0.3)] bg-[hsl(141_73%_42%/0.1)] p-2 transition-colors hover:bg-[hsl(141_73%_42%/0.2)] md:p-3"
                aria-label="Next experience"
              >
                <ChevronRight size={20} className="text-[hsl(141_73%_42%)]" />
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
                      ? "w-8 bg-[hsl(141_73%_42%)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to experience ${idx + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <p className="text-sm text-gray-400 md:text-base">
              <span className="font-semibold text-[hsl(141_73%_42%)]">
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
