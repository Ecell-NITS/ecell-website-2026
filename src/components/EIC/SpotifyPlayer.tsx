"use client";

import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Volume2,
} from "lucide-react";
import { useState, useEffect } from "react";

interface SpotifyPlayerProps {
  currentEvent?: string;
  isPlaying?: boolean;
}

const SpotifyPlayer = ({
  currentEvent = "EIC 2025",
  isPlaying: initialPlaying = true,
}: SpotifyPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(initialPlaying);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-[hsl(0_0%_20%)] bg-[hsl(0_0%_11%/0.95)] px-4 py-3 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Now Playing */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-[hsl(0_0%_15%)]">
            <motion.div
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[hsl(141_73%_42%/0.2)] to-[hsl(141_73%_42%/0.05)]"
              animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xl font-bold text-[hsl(141_73%_42%)]">
                E
              </span>
            </motion.div>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {currentEvent}
            </p>
            <p className="truncate text-xs text-[hsl(0_0%_70%)]">
              E-Cell NIT Silchar
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setLiked(!liked)}
            className="ml-2"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${liked ? "fill-[hsl(141_73%_42%)] text-[hsl(141_73%_42%)]" : "text-[hsl(0_0%_70%)]"}`}
            />
          </motion.button>
        </div>

        {/* Controls */}
        <div className="flex max-w-xl flex-1 flex-col items-center gap-1">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="text-[hsl(0_0%_70%)] transition-colors hover:text-white"
            >
              <Shuffle className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="text-[hsl(0_0%_70%)] transition-colors hover:text-white"
            >
              <SkipBack className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="eic-play-button flex h-10 w-10 items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="ml-0.5 h-5 w-5" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="text-[hsl(0_0%_70%)] transition-colors hover:text-white"
            >
              <SkipForward className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="text-[hsl(0_0%_70%)] transition-colors hover:text-white"
            >
              <Repeat className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="flex w-full items-center gap-2">
            <span className="w-10 text-right text-xs text-[hsl(0_0%_70%)]">
              0:00
            </span>
            <div className="eic-progress-bar flex-1">
              <motion.div
                className="eic-progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="w-10 text-xs text-[hsl(0_0%_70%)]">4:00</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Volume2 className="h-4 w-4 text-[hsl(0_0%_70%)]" />
          <div className="eic-progress-bar w-24">
            <div className="eic-progress-bar-fill" style={{ width: "70%" }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpotifyPlayer;
