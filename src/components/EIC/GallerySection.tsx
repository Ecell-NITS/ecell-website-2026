"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078309/a5_l5p6ep.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078310/a7_jnqfxe.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078310/a3_yvhglc.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078309/a2_jaoiq2.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1772994031/a1_b15ivc.jpg",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773078308/a4_tmyctl.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082116/a9_mvw8v9.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082115/a12_bn6gwq.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082115/a8_eqfham.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082115/a13_nggba1.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082115/a10_zvgkyj.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082115/a11_r68o1u.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082114/a15_knkz3t.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082114/a14_yra40r.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082114/a18_wqal82.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082113/a19_qc4jhl.webp",
  "https://res.cloudinary.com/dsaaxuphe/image/upload/v1773082113/a20_scmy0r.webp",
];

const Marquee = ({
  direction = "left",
  speed = 20,
}: {
  direction?: "left" | "right";
  speed?: number;
}) => {
  return (
    <div className="eic-mask-gradient-x flex overflow-hidden whitespace-nowrap">
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
              className="group relative h-50 w-75 shrink-0 overflow-hidden rounded-xl border border-[hsl(141_73%_42%/0.1)] transition-colors hover:border-[hsl(141_73%_42%/0.5)] md:h-62.5 md:w-100"
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
          <span className="eic-font-display mb-2 block tracking-[0.2em] text-[hsl(141_73%_42%)] uppercase">
            Capturing Moments
          </span>
          <h2 className="eic-font-display text-4xl text-[hsl(40_20%_95%)] md:text-6xl">
            EVENT <span className="eic-text-gradient">GALLERY</span>
          </h2>
        </motion.div>
      </div>

      <div className="space-y-8">
        <Marquee direction="left" speed={100} />
        <Marquee direction="right" speed={100} />
      </div>

      {/* Gradient Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[hsl(220_30%_4%)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[hsl(220_30%_4%)] to-transparent" />
    </section>
  );
};

export default GallerySection;
