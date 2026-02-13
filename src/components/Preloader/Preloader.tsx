"use client";

import { useState, useEffect, type SyntheticEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

interface PreloaderProps {
  onDone?: () => void;
}

export default function Preloader({ onDone }: PreloaderProps) {
  // ...
  // ...
  <div className="relative mb-8 h-16 w-auto sm:h-20">
    <Image
      src="/ecelllogo.png"
      alt="E-Cell Logo"
      width={100}
      height={80}
      className="h-full w-auto object-contain brightness-0 invert"
      priority
    />
  </div>;
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev: number) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate toward the end
        const increment = prev < 70 ? 3 : prev < 90 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        onDone?.();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, onDone]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617]"
        >
          {/* Subtle radial glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.06] blur-[120px]" />
          </div>

          {/* Logo + animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ecelllogo.png"
                alt="E-Cell Logo"
                className="h-16 w-auto brightness-0 invert sm:h-20"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </motion.div>

            {/* E-CELL text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-10 text-center"
            >
              <h1 className="text-3xl font-black tracking-tighter text-white sm:text-4xl">
                E-CELL
              </h1>
              <p className="mt-1 text-[10px] font-bold tracking-[0.4em] text-gray-600 uppercase">
                NIT Silchar
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 sm:w-56">
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-widest text-gray-600 uppercase">
                  Loading
                </span>
                <span className="text-[10px] font-bold text-gray-500 tabular-nums">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Animated dots */}
            <div className="mt-8 flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-blue-500"
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
