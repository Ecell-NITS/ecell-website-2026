"use client";

import { motion } from "framer-motion";

const sponsors = [
  {
    name: "TechFlow",
    logo: "https://placehold.co/200x80/1a1a1a/white?text=TechFlow",
  },
  {
    name: "InnovateLabs",
    logo: "https://placehold.co/200x80/1a1a1a/white?text=InnovateLabs",
  },
  {
    name: "FutureVentures",
    logo: "https://placehold.co/200x80/1a1a1a/white?text=FutureVentures",
  },
  {
    name: "SparkCapital",
    logo: "https://placehold.co/200x80/1a1a1a/white?text=SparkCapital",
  },
  {
    name: "NebulaSystems",
    logo: "https://placehold.co/200x80/1a1a1a/white?text=NebulaSystems",
  },
  {
    name: "QuantumLeap",
    logo: "https://placehold.co/200x80/1a1a1a/white?text=QuantumLeap",
  },
  {
    name: "AetherDynamics",
    logo: "https://placehold.co/200x80/1a1a1a/white?text=AetherDynamics",
  },
  {
    name: "StellarSoft",
    logo: "https://placehold.co/200x80/1a1a1a/white?text=StellarSoft",
  },
];

const SponsorsSection = () => {
  return (
    <section
      id="sponsors"
      className="relative overflow-hidden border-y border-[hsl(0_0%_100%/0.05)] bg-[hsl(0_0%_0%/0.2)] py-24"
    >
      <div className="container mx-auto mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="engenius-font-heading mb-2 block tracking-[0.2em] text-[hsl(0_72%_51%)] uppercase">
            Our Supporters
          </span>
          <h2 className="engenius-font-display text-4xl text-[hsl(40_20%_95%)] md:text-5xl">
            OFFICIAL{" "}
            <span className="engenius-text-gradient-blood">PARTNERS</span>
          </h2>
        </motion.div>
      </div>

      <div className="engenius-mask-gradient-x relative flex overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-16 pr-16"
        >
          {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
            <div
              key={`${sponsor.name}-${index}`}
              className="group relative flex-shrink-0"
            >
              <div className="absolute -inset-4 rounded-full bg-[hsl(0_72%_51%/0.05)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-12 w-auto opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-16"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[hsl(0_0%_4%)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[hsl(0_0%_4%)] to-transparent" />
    </section>
  );
};

export default SponsorsSection;
