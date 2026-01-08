"use client";

import { motion } from "framer-motion";

const SoundWave = () => {
  return (
    <div className="flex h-8 items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-[hsl(141_73%_42%)]"
          animate={{
            height: ["16px", "32px", "16px"],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default SoundWave;
