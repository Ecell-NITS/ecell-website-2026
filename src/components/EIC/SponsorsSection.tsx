"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const sponsors = [
  { id: 1, name: "Sponsor 1" },
  { id: 2, name: "Sponsor 2" },
  { id: 3, name: "Sponsor 3" },
  { id: 4, name: "Sponsor 4" },
  { id: 5, name: "Sponsor 5" },
  { id: 6, name: "Sponsor 6" },
  { id: 7, name: "Sponsor 7" },
  { id: 8, name: "Sponsor 8" },
];

const SponsorsSection = () => {
  const duplicatedSponsors = [...sponsors, ...sponsors];

  return (
    <section id="sponsors" className="relative overflow-hidden py-16">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(141_73%_42%/0.05)] to-transparent" />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 px-4 text-center"
      >
        <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
          Our Sponsors
        </h2>
        <p className="flex items-center justify-center gap-2 font-medium text-[hsl(141_73%_42%)]">
          <Sparkles className="h-4 w-4" />
          Powered by Innovation
          <Sparkles className="h-4 w-4" />
        </p>
      </motion.div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Fade Edges */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-32 bg-gradient-to-r from-[hsl(0_0%_7%)] to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32 bg-gradient-to-l from-[hsl(0_0%_7%)] to-transparent" />

        {/* Marquee Track */}
        <div className="eic-marquee-track flex w-max gap-6">
          {duplicatedSponsors.map((sponsor, index) => (
            <motion.div
              key={`${sponsor.id}-${index}`}
              whileHover={{ scale: 1.08, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative flex-shrink-0"
            >
              <div className="relative h-48 w-48 overflow-hidden rounded-xl md:h-56 md:w-56">
                {/* Glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "0 0 40px hsla(141, 76%, 48%, 0.5), inset 0 0 20px hsla(141, 76%, 48%, 0.1)",
                  }}
                />

                {/* Card Background */}
                <div className="flex h-full w-full items-center justify-center border border-[hsl(0_0%_20%/0.3)] bg-gradient-to-br from-[hsl(0_0%_11%/0.8)] to-[hsl(0_0%_7%/0.6)] transition-all duration-500 group-hover:border-[hsl(141_73%_42%/0.4)]">
                  {/* Sponsor Logo Placeholder */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-[hsl(141_73%_42%/0.2)] bg-gradient-to-br from-[hsl(141_73%_42%/0.2)] to-[hsl(141_73%_42%/0.05)] text-2xl font-bold text-[hsl(141_73%_42%/0.6)] transition-colors duration-300 group-hover:text-[hsl(141_73%_42%)]">
                      {sponsor.name.charAt(0)}
                    </div>
                    <span className="text-sm text-[hsl(0_0%_70%)] transition-colors duration-300 group-hover:text-white">
                      {sponsor.name}
                    </span>
                  </div>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(141_73%_42%/0.1)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
