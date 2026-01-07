/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React from "react";
import { motion } from "framer-motion";

const Partners: React.FC = () => {
  const partners = [
    {
      name: "ED Times",
      url: "https://res.cloudinary.com/dp92qug2f/image/upload/v1685354010/Ecell%20website/edtimes_logo_bhl4ec.webp",
    },
    {
      name: "Payzaql",
      url: "https://res.cloudinary.com/draptrzrc/image/upload/v1707558984/Payzaql.webp",
    },
    {
      name: "Cubelelo",
      url: "https://res.cloudinary.com/dp92qug2f/image/upload/v1676989598/collaboration-ecell/Cubeleloresized_jimc2g.png",
    },
    {
      name: "Black Marble",
      url: "https://res.cloudinary.com/dp92qug2f/image/upload/v1676990266/collaboration-ecell/blackmarble00_q3mowc.png",
    },
    {
      name: "GFG",
      url: "https://res.cloudinary.com/dp92qug2f/image/upload/v1676990589/collaboration-ecell/gfgre_xzhxha.png",
    },
    {
      name: "Assam StartUp",
      url: "https://res.cloudinary.com/dp92qug2f/image/upload/v1676990737/collaboration-ecell/assamStartUpres_n2fbxv.png",
    },
  ];

  // Double the list for seamless infinite scroll
  const marqueeItems = [...partners, ...partners];

  return (
    <section className="overflow-hidden border-y border-white/5 bg-gray-950/20 py-24">
      <div className="container mx-auto mb-16 px-6">
        <h3 className="text-center text-xs font-bold tracking-[0.4em] text-gray-500 uppercase">
          Trusted Partners & Collaborators
        </h3>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: [0, -100 * partners.length] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-20 px-10 whitespace-nowrap"
        >
          {marqueeItems.map((partner, i) => (
            <div
              key={i}
              className="flex h-16 w-40 cursor-pointer items-center justify-center opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:w-56"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.url}
                alt={partner.name}
                className="h-full w-auto object-contain brightness-0 invert"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto mt-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass group relative mx-auto max-w-4xl rounded-[3rem] border border-white/10 p-10"
        >
          <div className="absolute inset-0 rounded-[3rem] bg-blue-500/5 blur-xl transition-colors group-hover:bg-blue-500/10" />
          <p className="relative text-center text-lg leading-relaxed text-gray-400 italic">
            &quot;We are incredibly fortunate to have{" "}
            <span className="font-semibold text-blue-400">ED Times</span> as our
            sponsor. Their platform&apos;s unique take on youth culture and news
            is unparalleled. We extend our heartfelt gratitude for their
            unwavering support in making our vision a reality.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
