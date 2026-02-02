"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const posters = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770062256/bd_aulph0.png",
    title: "Board of Directors",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770062726/ad_red8c1.png",
    title: "Ad-O-Venture",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770062272/bb_cmtfrh.png",
    title: "Business Beats",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770062262/cr_pdxn35.png",
    title: "Campus Rewired",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770062250/ee_unkr0p.png",
    title: "Entrepreneur's Escape",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770063363/eic_y3w5pc.png",
    title: "EIC Main Event",
  },
];

const PosterMarquee = () => {
  const duplicatedPosters = [...posters, ...posters];

  return (
    <section className="relative overflow-hidden py-16">
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
          Events Playlist
        </h2>
        <p className="font-medium text-[hsl(141_73%_42%)]">
          Now Streaming at E-Cell
        </p>
      </motion.div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Fade Edges */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-32 bg-gradient-to-r from-[hsl(0_0%_7%)] to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32 bg-gradient-to-l from-[hsl(0_0%_7%)] to-transparent" />

        {/* Marquee Track */}
        <div className="eic-marquee-track flex w-max gap-6">
          {duplicatedPosters.map((poster, index) => (
            <motion.div
              key={`${poster.id}-${index}`}
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

                {/* Image */}
                <Image
                  src={poster.src}
                  alt={poster.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:blur-[1px] group-hover:brightness-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_7%/0.8)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Title on hover */}
                <div className="absolute right-0 bottom-0 left-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                  <p className="text-center text-sm font-semibold text-white">
                    {poster.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PosterMarquee;
