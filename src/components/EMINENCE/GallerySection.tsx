"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078809/s3_qebais.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078807/s2_1_qnrihv.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078804/s6_cmgjwd.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078804/s7_ttgyda.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078803/s8_etzzi8.webp",

  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773079248/s16_nou7k3.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773079245/s18_dlusn7.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773079244/s19_x8rkmv.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773079243/s20_hkmxpg.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773079243/s21_uvtevo.webp",
];

const Marquee = ({
  direction = "left",
  speed = 20,
}: {
  direction?: "left" | "right";
  speed?: number;
}) => {
  return (
    <div className="eminence-mask-gradient-x flex overflow-hidden whitespace-nowrap">
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
              className="group relative h-50 w-75 shrink-0 overflow-hidden rounded-xl border border-[hsl(195_100%_50%/0.1)] transition-colors hover:border-[hsl(195_100%_50%/0.5)] md:h-62.5 md:w-100"
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
      className="relative overflow-hidden bg-[hsl(220_30%_4%)] py-24"
    >
      <div className="container mx-auto mb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="eminence-font-display mb-2 block tracking-[0.2em] text-[hsl(195_100%_50%)] uppercase">
            Capturing Moments
          </span>
          <h2 className="eminence-font-display text-4xl text-[hsl(40_20%_95%)] md:text-6xl">
            EVENT{" "}
            <span className="eminence-text-gradient-electric">GALLERY</span>
          </h2>
        </motion.div>
      </div>

      <div className="space-y-8">
        <Marquee direction="left" speed={50} />
        <Marquee direction="right" speed={60} />
      </div>

      {/* Gradient Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[hsl(220_30%_4%)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[hsl(220_30%_4%)] to-transparent" />
    </section>
  );
};

export default GallerySection;
