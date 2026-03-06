"use client";

import React from "react";
import { motion } from "framer-motion";

// ── StarField: twinkling white motes ────────────────────────
const StarField: React.FC<{
  count: number;
  size: number;
  opacity: number;
  blur?: number;
}> = ({ count, size, opacity, blur = 0 }) => {
  const stars = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        top: `${(i * 17) % 100}%`,
        left: `${(i * 23) % 100}%`,
        delay: i * 0.5,
        duration: 3 + (i % 4),
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, opacity, 0] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: size + "px",
            height: size + "px",
            backgroundColor: "white",
            borderRadius: "50%",
            filter: blur ? `blur(${blur}px)` : "none",
            boxShadow: `0 0 ${size * 2}px white`,
          }}
        />
      ))}
    </div>
  );
};

// ── StardustField: floating blue particles ──────────────────
const StardustField: React.FC<{ count: number }> = ({ count }) => {
  const particles = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 13) % 100}%`,
        top: `${(i * 29) % 100}%`,
        size: (i % 2) + 1,
        duration: 15 + (i % 25),
        delay: -i,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            y: ["-20%", "120%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size + "px",
            height: p.size + "px",
            backgroundColor: "#60a5fa",
            borderRadius: "50%",
            boxShadow: `0 0 12px #3b82f6`,
          }}
        />
      ))}
    </div>
  );
};

// ── AuthBackground ──────────────────────────────────────────
export default function AuthBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020617]">
      {/* Aurora glow: blue */}
      <div
        className="animate-aurora-1 absolute top-[-50%] left-[-50%] h-[200%] w-[200%] opacity-50"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.15), transparent 60%)",
          filter: "blur(80px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Aurora glow: purple */}
      <div
        className="animate-aurora-2 absolute top-[-50%] right-[-50%] h-[200%] w-[200%] opacity-40"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168,85,247,0.15), transparent 50%)",
          filter: "blur(100px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Aurora glow: cyan */}
      <div
        className="animate-aurora-3 absolute bottom-[-50%] left-0 h-[150%] w-[150%] opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, rgba(6,182,212,0.15), transparent 50%)",
          filter: "blur(90px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Dot grid */}
      <div
        style={{
          backgroundImage: `radial-gradient(circle, #3b82f6 0.5px, transparent 0.5px)`,
          backgroundSize: "60px 60px",
        }}
        className="absolute inset-0 opacity-[0.12]"
      />

      {/* Stardust: floating blue particles */}
      <div className="absolute inset-[-5%]">
        <StardustField count={18} />
      </div>

      {/* StarField: twinkling white motes */}
      <div className="absolute inset-[-15%]">
        <StarField count={12} size={2.5} opacity={0.5} blur={1} />
      </div>

      <style jsx>{`
        @keyframes aurora-1 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(10%, 10%) scale(1.1);
          }
          66% {
            transform: translate(-5%, 5%) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes aurora-2 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-10%, -5%) scale(1.1);
          }
          66% {
            transform: translate(5%, -10%) scale(0.95);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes aurora-3 {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(5%, -5%) rotate(5deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }
        .animate-aurora-1 {
          animation: aurora-1 20s infinite ease-in-out;
        }
        .animate-aurora-2 {
          animation: aurora-2 25s infinite ease-in-out reverse;
        }
        .animate-aurora-3 {
          animation: aurora-3 30s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
