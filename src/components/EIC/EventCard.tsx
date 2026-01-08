"use client";

import { motion } from "framer-motion";
import { Play, MapPin } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/EIC/ui/dialog";
import Image from "next/image";

interface EventCardProps {
  title: string;
  subtitle: string;
  mode: string;
  image: string;
  index: number;
  description: string;
}

const EventCard = ({
  title,
  subtitle,
  mode,
  image,
  index,
  description,
}: EventCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          whileHover={{ scale: 1.03, rotateY: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="eic-album-card h-full cursor-pointer p-4"
          style={{
            perspective: "1000px",
          }}
          onClick={() => setIsOpen(true)}
        >
          {/* Glow Effect */}
          <div
            className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(135deg, hsla(141, 76%, 48%, 0.2) 0%, transparent 50%)",
              boxShadow: "0 0 30px hsla(141, 76%, 48%, 0.3)",
            }}
          />

          {/* Album Cover */}
          <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_7%/0.8)] via-transparent to-transparent" />

            {/* Play Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
              className="absolute right-3 bottom-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(141_73%_42%)] shadow-lg transition-transform hover:scale-110">
                <Play className="ml-1 h-5 w-5 text-black" fill="currentColor" />
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="mb-1 line-clamp-1 text-lg font-bold text-white">
              {title}
            </h3>
            <p className="mb-3 line-clamp-1 text-sm text-[hsl(0_0%_70%)]">
              {subtitle}
            </p>

            <div className="flex items-center gap-2 text-xs text-[hsl(0_0%_70%)]">
              <MapPin className="h-3.5 w-3.5 text-[hsl(141_73%_42%)]" />
              <span>{mode}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="eic-glass-panel max-w-lg border-[hsl(0_0%_20%/0.5)]">
          <DialogHeader>
            <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
            <DialogTitle className="text-2xl text-white">{title}</DialogTitle>
            <p className="font-medium text-[hsl(141_73%_42%)]">{subtitle}</p>
          </DialogHeader>
          <div className="space-y-4">
            <p className="leading-relaxed text-[hsl(0_0%_70%)]">
              {description}
            </p>
            <div className="flex items-center gap-2 text-sm text-[hsl(0_0%_70%)]">
              <MapPin className="h-4 w-4 text-[hsl(141_73%_42%)]" />
              <span>{mode}</span>
            </div>
            <div className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[hsl(0_0%_20%/0.5)] bg-[hsl(0_0%_15%/0.5)] px-4 py-3">
              <div className="h-2 w-2 rounded-full bg-[hsl(0_0%_70%)]" />
              <span className="text-sm font-medium text-[hsl(0_0%_70%)]">
                Event Completed
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventCard;
