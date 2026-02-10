"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera } from "lucide-react";

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

// ── GalleryHero ─────────────────────────────────────────────
export default function GalleryHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse tracking for dot grid parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.05,
        y: (e.clientY - window.innerHeight / 2) * 0.05,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Decorative tilted background thumbnails
  const thumbnails = [
    { x: "-78%", y: "-10%", rotate: -18, delay: 0.2 },
    { x: "-55%", y: "15%", rotate: -12, delay: 0.3 },
    { x: "55%", y: "-15%", rotate: 12, delay: 0.25 },
    { x: "78%", y: "10%", rotate: 18, delay: 0.35 },
    { x: "-40%", y: "-35%", rotate: -8, delay: 0.4 },
    { x: "40%", y: "35%", rotate: 8, delay: 0.45 },
  ];

  const scrollToGallery = () => {
    const el = document.getElementById("gallery-grid");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* ─── BG Layer 1: Dot grid with mouse parallax ─── */}
      <div
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          backgroundImage: `radial-gradient(circle, #3b82f6 0.5px, transparent 0.5px)`,
          backgroundSize: "60px 60px",
          transition: "transform 0.1s ease-out",
        }}
        className="pointer-events-none absolute inset-0 z-0 opacity-20 will-change-transform"
      />

      {/* ─── BG Layer 2: Stardust (blue floating particles) ─── */}
      <div className="pointer-events-none absolute inset-[-5%] z-0">
        <StardustField count={20} />
      </div>

      {/* ─── BG Layer 3: Twinkling star motes ─── */}
      <div className="pointer-events-none absolute inset-[-15%] z-[1]">
        <StarField count={15} size={3} opacity={0.6} blur={1} />
      </div>

      {/* ─── Radial glow ─── */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.04] blur-[120px]" />
      </div>

      {/* ─── Decorative tilted photos behind the title ─── */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-[2]">
        {thumbnails.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1, delay: t.delay, ease: "easeOut" }}
            className="3xl:h-[300px] 3xl:w-[220px] 4k:h-[360px] 4k:w-[260px] absolute top-1/2 left-1/2 h-[180px] w-[140px] overflow-hidden rounded-xl border border-white/5 bg-white/5 md:h-[240px] md:w-[180px]"
            style={{
              x: t.x,
              y: t.y,
              rotate: t.rotate,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/hero${i}/300/400`}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ─── Content ─── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 flex flex-col items-center px-4 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2"
        >
          <Camera size={14} className="text-blue-400" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-blue-400 uppercase">
            The Digital Chronicles
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="3xl:text-[14rem] 4k:text-[18rem] text-[4rem] leading-[0.9] font-black tracking-tighter text-white uppercase italic drop-shadow-[0_0_80px_rgba(37,99,235,0.2)] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem]"
        >
          GALLERY
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="3xl:max-w-2xl 3xl:text-xl 4k:max-w-3xl 4k:text-2xl mt-8 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg"
        >
          A cinematic journey through a decade of{" "}
          <em className="font-semibold text-white not-italic">innovation</em>,{" "}
          <em className="font-semibold text-blue-400 not-italic">leadership</em>
          , and entrepreneurial{" "}
          <em className="font-semibold text-white not-italic">excellence</em>.
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={scrollToGallery}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 flex flex-col items-center gap-3 text-gray-500 transition-colors hover:text-blue-400"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
            Explore Gallery
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-8 w-5 items-start justify-center rounded-full border border-current pt-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  );
}
