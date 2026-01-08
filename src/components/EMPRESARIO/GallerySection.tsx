"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  // 2022-2023 Empresario events
  "https://res.cloudinary.com/dfriijrmr/image/upload/v1678297818/GalleryPage/Emprassario%202022-23/WhatsApp_Image_2022-11-16_at_7.52.20_AM_asucfg.jpg",
  "https://res.cloudinary.com/dfriijrmr/image/upload/v1678297818/GalleryPage/Emprassario%202022-23/WhatsApp_Image_2022-11-20_at_11.43.03_AM_grnx2j.jpg",
  "https://res.cloudinary.com/dfriijrmr/image/upload/v1678297818/GalleryPage/Emprassario%202022-23/WhatsApp_Image_2022-11-20_at_11.43.06_AM_bkovkg.jpg",
  "https://res.cloudinary.com/dfriijrmr/image/upload/v1678297818/GalleryPage/Emprassario%202022-23/WhatsApp_Image_2022-11-20_at_11.43.05_AM_kfcxb3.jpg",
  // 2023-2024 Empresario events
  "https://res.cloudinary.com/sahincloudinary/image/upload/f_auto,q_auto/v1/Ecell/Events/empresario/wbkxymi0kisgsnesqeqz",
  "https://res.cloudinary.com/sahincloudinary/image/upload/f_auto,q_auto/v1/Ecell/Events/empresario/Emp1",
  "https://res.cloudinary.com/sahincloudinary/image/upload/f_auto,q_auto/v1/Ecell/Events/empresario/Emp2",
  "https://res.cloudinary.com/sahincloudinary/image/upload/f_auto,q_auto/v1/Ecell/Events/empresario/Emp13",
  "https://res.cloudinary.com/sahincloudinary/image/upload/v1711132568/Ecell/Events/empresario/Emp4.webp",
  "https://res.cloudinary.com/sahincloudinary/image/upload/v1711132375/Ecell/Events/empresario/Emp3.webp",
  // 2024-2025 Empresario events
  "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.56_qpxgkx",
  "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.56_2_ixazyv",
  "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.56_1_tggvsz",
  "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.53_1_yhxhf8",
  "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.53_osmp8m",
  "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.54_njqxmn",
  "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.49.16_a9vnlr",
  "https://res.cloudinary.com/diu8ohkcn/image/upload/WhatsApp_Image_2025-06-05_at_23.38.54_1_l9ki4k",
];

const Marquee = ({
  direction = "left",
  speed = 40,
}: {
  direction?: "left" | "right";
  speed?: number;
}) => {
  return (
    <div className="empresario-mask-gradient-x flex overflow-hidden whitespace-nowrap">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        className="flex gap-6 py-4"
      >
        {[...galleryImages, ...galleryImages].map((src, index) => (
          <div
            key={index}
            className="group relative h-[180px] w-[280px] flex-shrink-0 overflow-hidden rounded-xl border border-[hsl(38_95%_55%/0.15)] transition-all duration-300 hover:border-[hsl(38_95%_55%/0.4)] md:h-[220px] md:w-[350px]"
          >
            <Image
              src={src}
              alt={`Empresario event ${(index % galleryImages.length) + 1}`}
              fill
              className="transform object-cover transition-all duration-500 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_20%_6%/0.6)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const GallerySection = () => {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[hsl(220_20%_6%)] py-24"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_18%_8%)] via-[hsl(220_20%_6%)] to-[hsl(220_18%_8%)]" />

      <div className="relative z-10 container mx-auto mb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="empresario-font-body mb-2 block tracking-[0.2em] text-[hsl(38_95%_55%)] uppercase">
            Previous Events
          </span>
          <h2 className="empresario-font-display text-4xl text-[hsl(210_20%_95%)] md:text-6xl">
            Event <span className="empresario-text-gradient-gold">Gallery</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative z-10 space-y-6">
        <Marquee direction="left" speed={50} />
        <Marquee direction="right" speed={60} />
      </div>

      {/* Gradient Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-gradient-to-r from-[hsl(220_20%_6%)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-gradient-to-l from-[hsl(220_20%_6%)] to-transparent" />
    </section>
  );
};

export default GallerySection;
