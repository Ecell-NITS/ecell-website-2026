"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  "/ENGENIUS/shark-tank.png",
  "/ENGENIUS/ceo-roleplay.png",
  "/ENGENIUS/pitch-boxing.png",
  "/ENGENIUS/bech-ke-dikhao.png",
  "/ENGENIUS/what-if.png",
  "/ENGENIUS/engenius-hero.png",
];

const Marquee = ({
  direction = "left",
  speed = 20,
}: {
  direction?: "left" | "right";
  speed?: number;
}) => {
  return (
    <div className="engenius-mask-gradient-x flex overflow-hidden whitespace-nowrap">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        className="flex gap-8 py-8"
      >
        {[...galleryImages, ...galleryImages, ...galleryImages].map(
          (src, index) => (
            <div
              key={index}
              className="group relative h-[200px] w-[300px] flex-shrink-0 overflow-hidden rounded-xl border border-[hsl(0_0%_100%/0.1)] transition-colors hover:border-[hsl(0_72%_51%/0.5)] md:h-[250px] md:w-[400px]"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="transform object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ),
        )}
      </motion.div>
    </div>
  );
};

const GallerySection = () => {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[hsl(0_0%_4%)] py-24"
    >
      <div className="container mx-auto mb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="engenius-font-heading mb-2 block tracking-[0.2em] text-[hsl(0_72%_51%)] uppercase">
            Capturing Moments
          </span>
          <h2 className="engenius-font-display text-4xl text-[hsl(40_20%_95%)] md:text-6xl">
            EVENT <span className="engenius-text-gradient-blood">GALLERY</span>
          </h2>
        </motion.div>
      </div>

      <div className="space-y-8">
        <Marquee direction="left" speed={50} />
        <Marquee direction="right" speed={60} />
      </div>

      {/* Gradient Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[hsl(0_0%_4%)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[hsl(0_0%_4%)] to-transparent" />
    </section>
  );
};

export default GallerySection;
