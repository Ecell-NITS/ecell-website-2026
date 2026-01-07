/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.9]);

  // Mouse tracking for subtle parallax
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

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 4. GRID LAYER: Structural Grid */}
      <div
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          backgroundImage: `radial-gradient(circle, #3b82f6 0.5px, transparent 0.5px)`,
          backgroundSize: "60px 60px",
          transition: "transform 0.1s ease-out",
        }}
        className="pointer-events-none absolute inset-0 z-0 opacity-20 will-change-transform"
      />

      {/* 5. MID LAYER: Interactive Stardust (CSS implementation) */}
      <div className="pointer-events-none absolute inset-[-5%] z-0">
        <StardustField count={20} />
      </div>

      {/* 6. FRONT LAYER: Floating Motes (CSS implementation) */}
      <div className="pointer-events-none absolute inset-[-15%] z-10">
        <StarField count={15} size={3} opacity={0.6} blur={1} />
      </div>

      {/* FOREGROUND CONTENT */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-20 container mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/20 px-6 py-2.5 text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase shadow-2xl shadow-blue-500/10 md:text-xs"
        >
          <Sparkles size={14} className="animate-pulse text-blue-300" />
          The Future of Innovation Starts Here
        </motion.div>

        <motion.div
          style={{
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          }}
          className="perspective-2000 relative transition-transform duration-100 ease-out will-change-transform"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-2 text-[clamp(5rem,22vw,16rem)] leading-none font-black tracking-tighter text-white drop-shadow-[0_0_80px_rgba(37,99,235,0.2)] selection:bg-blue-500/30"
          >
            E-CELL
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.5, delay: 0.5, ease: "circOut" }}
            className="absolute -bottom-6 left-1/2 mx-auto h-[2px] w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 mb-12 text-lg font-light tracking-[0.5em] text-gray-400/80 uppercase md:text-4xl"
        >
          Entrepreneurship Cell{" "}
          <span className="font-extrabold tracking-tight text-blue-500">
            NIT SILCHAR
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mx-auto min-h-[5rem] max-w-4xl px-4 text-xl leading-relaxed font-light text-gray-300/60 md:text-2xl"
        >
          <TypingAnimation />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <button className="group relative overflow-hidden rounded-2xl bg-blue-600 px-14 py-6 shadow-[0_25px_60px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-3 text-lg font-black tracking-wide text-white">
              Explore Our Vision{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </span>
          </button>

          <button className="group glass rounded-2xl border border-white/10 px-14 py-6 font-bold text-white transition-all hover:scale-105 hover:border-white/20 hover:bg-white/5 active:scale-95">
            Join the Community
          </button>
        </motion.div>
      </motion.div>

      {/* BOTTOM SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="group absolute bottom-12 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-4"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <span className="text-[9px] font-semibold tracking-[0.6em] text-gray-500 uppercase transition-colors group-hover:text-blue-400">
          Discover
        </span>
        <div className="relative h-11 w-7 rounded-full border-2 border-white/10 p-1.5 transition-colors group-hover:border-blue-500/30">
          <motion.div
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-2.5 w-full rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          />
        </div>
      </motion.div>
    </section>
  );
};

interface StarFieldProps {
  count: number;
  size: number;
  opacity: number;
  blur?: number;
}

const StarField: React.FC<StarFieldProps> = ({
  count,
  size,
  opacity,
  blur = 0,
}) => {
  // Static stars to avoid hydration mismatch
  const stars = React.useMemo(
    () =>
      [...Array(count)].map((_, i) => ({
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

const StardustField: React.FC<{ count: number }> = ({ count }) => {
  const particles = React.useMemo(
    () =>
      [...Array(count)].map((_, i) => ({
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

const TypingAnimation: React.FC = () => {
  const [text, setText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const sentences = [
      "The path to a successful business career is now easier and less messy.",
      "Cultivating a culture of innovation and problem-solving.",
      "Empowering the visionaries of tomorrow, today.",
      "NIT Silchar's premier entrepreneurship hub.",
    ];

    const currentSentence = sentences[sentenceIndex];
    if (!currentSentence) return;

    const typingSpeed = isDeleting ? 25 : 55;
    const pauseDuration = isDeleting ? 100 : 3500;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentSentence.length) {
        setText(currentSentence.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setText(currentSentence.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentSentence.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else {
        setIsDeleting(false);
        setSentenceIndex((sentenceIndex + 1) % sentences.length);
        setCharIndex(0);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, sentenceIndex]);

  return (
    <span className="font-medium tracking-wide text-gray-400/80 italic">
      {text}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.9 }}
        className="ml-1 inline-block h-[1.1em] w-[3px] bg-blue-500 align-middle"
      />
    </span>
  );
};

export default Hero;
