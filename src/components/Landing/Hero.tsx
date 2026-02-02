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
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden lg:pt-32 xl:pt-0">
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
        className="relative z-20 container mx-auto px-6 py-4 text-center lg:py-0"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass mt-[10vh] mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/20 px-4 py-2 text-[8px] font-bold tracking-[0.2em] text-blue-400 uppercase shadow-2xl shadow-blue-500/10 sm:text-[10px] sm:tracking-[0.3em] md:px-6 md:py-2.5 md:text-xs lg:mt-0"
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
            className="mb-2 text-[clamp(3rem,18vw,12rem)] leading-none font-black tracking-tighter text-white drop-shadow-[0_0_80px_rgba(37,99,235,0.2)] selection:bg-blue-500/30 sm:text-[clamp(5rem,20vw,14rem)] md:text-[clamp(6rem,21vw,16rem)]"
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
          className="mt-8 mb-8 text-sm font-light tracking-[0.3em] text-gray-400/80 uppercase sm:mt-12 sm:mb-12 sm:text-xl sm:tracking-[0.5em] md:mt-16 md:text-2xl lg:text-4xl"
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
          className="mx-auto min-h-[4rem] max-w-4xl px-4 text-base leading-relaxed font-light text-gray-300/60 sm:min-h-[5rem] sm:text-xl md:text-2xl"
        >
          <TypingAnimation />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <button className="group relative overflow-hidden rounded-2xl bg-blue-600 px-8 py-3 shadow-[0_25px_60px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95 sm:px-14 sm:py-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-2 text-sm font-black tracking-wide text-white sm:gap-3 sm:text-lg">
              Our Initiatives{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </span>
          </button>

          <button className="group glass rounded-2xl border border-white/10 px-8 py-3 text-sm font-bold text-white transition-all hover:scale-105 hover:border-white/20 hover:bg-white/5 active:scale-95 sm:px-14 sm:py-6 sm:text-lg">
            Join Us
          </button>
        </motion.div>
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
