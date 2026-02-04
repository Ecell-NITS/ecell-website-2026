"use client";

import { motion } from "framer-motion";

interface EventCardProps {
  title: string;
  subtitle: string;
  description: string;
  venue: string;
  index: number;
  rules: string[];
}

const EventCard = ({
  title,
  subtitle,
  description,
  venue,
  index,
  rules,
}: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <motion.div
        className="eminence-card-electric relative h-full overflow-hidden rounded-2xl p-6 md:p-8"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, hsl(195 100% 50% / 0.15) 0%, transparent 50%)",
          }}
        />

        {/* Round number indicator */}
        <div className="absolute -top-3 -right-3 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(195_100%_50%)] shadow-lg">
          <span className="eminence-font-display text-xl font-bold text-[hsl(220_30%_6%)]">
            R{index + 1}
          </span>
        </div>

        {/* Title */}
        <h3 className="eminence-font-display mb-2 text-2xl font-bold text-[hsl(40_20%_95%)] transition-colors group-hover:text-[hsl(195_100%_50%)] md:text-3xl">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="mb-4 font-medium text-[hsl(195_100%_50%/0.8)]">
          {subtitle}
        </p>

        {/* Description */}
        <p className="mb-6 leading-relaxed text-[hsl(40_20%_95%/0.7)]">
          {description}
        </p>

        {/* Rules */}
        <div className="mb-6">
          <h4 className="eminence-font-display mb-3 text-sm tracking-wider text-[hsl(195_100%_50%)] uppercase">
            Rules
          </h4>
          <ul className="space-y-2">
            {rules.map((rule, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-2 text-sm text-[hsl(40_20%_95%/0.6)]"
              >
                <span className="mt-1 text-[hsl(195_100%_50%)]">•</span>
                {rule}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Venue only */}
        <div className="mt-auto border-t border-[hsl(195_100%_50%/0.2)] pt-4">
          <div className="flex items-center gap-2 text-sm text-[hsl(40_20%_95%/0.7)]">
            <svg
              className="h-4 w-4 text-[hsl(195_100%_50%)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {venue}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventCard;
