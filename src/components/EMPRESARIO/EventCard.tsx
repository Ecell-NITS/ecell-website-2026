"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar, Users, Clock } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image: string;
  content: string;
  teamSize: string;
  registrationDeadline: string;
  index: number;
}

const EventCard = ({
  title,
  date,
  location,
  image,
  content,
  teamSize,
  registrationDeadline,
  index,
}: EventCardProps) => {
  const isOnline = location.toLowerCase().includes("online");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="empresario-card-hover group overflow-hidden rounded-2xl border border-[hsl(38_95%_55%/0.15)] bg-gradient-to-b from-[hsl(220_18%_12%)] to-[hsl(220_20%_6%)]"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_20%_6%)] via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isOnline
                ? "bg-[hsl(195_100%_50%/0.9)] text-[hsl(220_30%_6%)]"
                : "bg-[hsl(145_70%_45%/0.9)] text-[hsl(220_30%_6%)]"
            }`}
          >
            {isOnline ? "Online" : "On-site"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="empresario-font-display mb-3 text-2xl font-bold text-[hsl(38_95%_55%)]">
          {title}
        </h3>

        {/* Meta info */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 text-[hsl(210_20%_95%/0.7)]">
            <Calendar className="h-4 w-4 text-[hsl(38_95%_55%)]" />
            <span className="empresario-font-body text-sm">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-[hsl(210_20%_95%/0.7)]">
            <MapPin className="h-4 w-4 text-[hsl(38_95%_55%)]" />
            <span className="empresario-font-body text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-[hsl(210_20%_95%/0.7)]">
            <Users className="h-4 w-4 text-[hsl(38_95%_55%)]" />
            <span className="empresario-font-body text-sm">
              Team: {teamSize}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[hsl(40_20%_95%/0.7)]">
            <Clock className="h-4 w-4 text-[hsl(38_95%_55%)]" />
            <span className="empresario-font-body text-sm">
              Deadline: {registrationDeadline}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="empresario-font-body line-clamp-4 text-sm leading-relaxed text-[hsl(210_20%_95%/0.6)]">
          {content}
        </p>
      </div>
    </motion.div>
  );
};

export default EventCard;
