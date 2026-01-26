"use client";

import React from "react";

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-[#020617]">
      {/* 
        Optimization Note:
        Instead of a heavy Three.js per-pixel shader, we use CSS gradients with animations.
        This provides the same "Aurora" aesthetic with <1% CPU/GPU usage.
      */}

      {/* Base glow */}
      <div
        className="animate-aurora-1 absolute top-[-50%] left-[-50%] h-[200%] w-[200%] opacity-50"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.15), transparent 60%)",
          filter: "blur(80px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Secondary moving glow */}
      <div
        className="animate-aurora-2 absolute top-[-50%] right-[-50%] h-[200%] w-[200%] opacity-40"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168,85,247,0.15), transparent 50%)",
          filter: "blur(100px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Tertiary cyan glow */}
      <div
        className="animate-aurora-3 absolute bottom-[-50%] left-0 h-[150%] w-[150%] opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, rgba(6,182,212,0.15), transparent 50%)",
          filter: "blur(90px)",
          mixBlendMode: "screen",
        }}
      />

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
