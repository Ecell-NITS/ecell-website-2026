"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import Image from "next/image";

interface EventCardProps {
  title: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  heads: { name: string; phone: string }[];
  description: string;
  index: number;
}

const EventCard = ({
  title,
  image,
  date,
  time,
  venue,
  heads,
  description,
  index,
}: EventCardProps) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-12`}
    >
      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="group relative w-full lg:w-1/2"
      >
        <div className="absolute inset-0 rounded-lg bg-[hsl(0_72%_51%/0.2)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative overflow-hidden rounded-lg border border-[hsl(0_72%_51%/0.3)] transition-colors group-hover:border-[hsl(0_72%_51%/0.6)]">
          <div className="relative aspect-square w-full">
            <Image
              src={image}
              alt={title}
              fill
              className="transform object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_4%)] via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="w-full space-y-6 lg:w-1/2">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="engenius-font-heading text-4xl font-bold tracking-wide text-[hsl(40_20%_95%)] md:text-5xl lg:text-6xl"
        >
          {title.split(" ").map((word, i) => (
            <span
              key={i}
              className={
                i === 0 ? "engenius-glow-red-subtle text-[hsl(0_72%_51%)]" : ""
              }
            >
              {word}{" "}
            </span>
          ))}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-lg leading-relaxed text-[hsl(40_20%_95%/0.7)]"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="flex items-center gap-3 text-[hsl(40_20%_95%/0.8)]">
            <Calendar className="h-5 w-5 text-[hsl(0_72%_51%)]" />
            <span className="engenius-font-heading tracking-wide">{date}</span>
          </div>
          <div className="flex items-center gap-3 text-[hsl(40_20%_95%/0.8)]">
            <Clock className="h-5 w-5 text-[hsl(0_72%_51%)]" />
            <span className="engenius-font-heading tracking-wide">{time}</span>
          </div>
          <div className="flex items-center gap-3 text-[hsl(40_20%_95%/0.8)] sm:col-span-2">
            <MapPin className="h-5 w-5 text-[hsl(0_72%_51%)]" />
            <span className="engenius-font-heading tracking-wide">{venue}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-[hsl(0_72%_51%/0.2)] pt-4"
        >
          <p className="engenius-font-heading mb-3 text-sm tracking-wider text-[hsl(0_72%_51%)]">
            EVENT HEADS
          </p>
          <div className="space-y-2">
            {heads.map((head, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-[hsl(40_20%_95%/0.7)]"
              >
                <User className="h-4 w-4 text-[hsl(0_72%_51%/0.6)]" />
                <span>{head.name}</span>
                <span className="text-[hsl(0_72%_51%/0.6)]">•</span>
                <span className="text-sm">{head.phone}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventCard;
