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

  // Quadruple the list for seamless infinite scroll on wide screens
  const marqueeItems = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#020617] py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 container mx-auto mb-8 px-6 text-center sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16">
        <p className="mt-4 text-xs font-bold tracking-[0.4em] text-gray-500 uppercase">
          Trusted Partners & Collaborators
        </p>
      </div>

      <div className="mask-linear-fade relative flex overflow-hidden">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex min-w-max items-center gap-20 px-4"
        >
          {marqueeItems.map((partner, i) => (
            <div
              key={i}
              className="group flex cursor-pointer items-center gap-4 transition-all duration-500 hover:opacity-100 lg:opacity-40"
            >
              <div className="h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-white/5 p-2 md:h-16 md:w-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.url}
                  alt={partner.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="md:text-md text-xs font-bold tracking-widest text-white/50 uppercase transition-colors group-hover:text-white sm:text-sm lg:text-lg xl:text-xl">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* <div className="relative z-10 container mx-auto mt-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass group relative mx-auto max-w-4xl overflow-hidden rounded-[3rem] border border-white/10 p-10"
        >
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative z-10">
            <div className="mb-6 flex justify-center">
              <div className="h-1 w-20 rounded-full bg-blue-500 opacity-30" />
            </div>
            <p className="relative text-center text-lg leading-relaxed font-light text-gray-400 italic">
              &quot;We are incredibly fortunate to have{" "}
              <span className="font-semibold text-white not-italic">
                ED Times
              </span>{" "}
              as our sponsor. Their platform&apos;s unique take on youth culture
              and news is unparalleled. We extend our heartfelt gratitude for
              their unwavering support in making our vision a reality.&quot;
            </p>
          </div>
        </motion.div>
      </div> */}
    </section>
  );
};

export default Partners;
