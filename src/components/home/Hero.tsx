"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Marquee from "~/components/ui/Marquee";
import LaserFlow from "~/components/ui/LaserFlow";
import Plasma from "~/components/ui/Plasma";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State to manage the animation sequence
  // phase 0: LaserFlow active, Content hidden
  // phase 1: Content fades in, LaserFlow fades out, Plasma fades in
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Start sequence
    // Phase 1: Reveal Hero Content after 2 seconds
    const timer1 = setTimeout(() => {
      setPhase(1);
    }, 2000);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#030014] "
    >
      {/* 
        LAYER 1: LaserFlow Animation (Intro)
        Fades out when Phase 1 starts.
      */}
      <motion.div 
        animate={{ opacity: phase === 0 ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
         <LaserFlow
            color="#977aff"
            wispDensity={1}
            flowSpeed={0.35}
            verticalSizing={2}
            horizontalSizing={0.5}
            fogIntensity={0.45}
            fogScale={0.3}
            wispSpeed={15}
            wispIntensity={5}
            flowStrength={0.25}
            decay={1.1}
            horizontalBeamOffset={0}
            verticalBeamOffset={-0.5}
            style={{ width: '100%', height: '100%' }} 
          />
      </motion.div>

      {/* 
        LAYER 2: Plasma Animation (Main Background)
        Fades in when Phase 1 starts.
        Covers the full screen (behind text).
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        <Plasma
          color="#312e81" // Indigo-900ish
          speed={0.8}
          direction="forward"
          scale={1.3}
          opacity={0.8}
          mouseInteractive={false}
          className="w-full h-full opacity-80"
        />
      </motion.div>

       {/* 
          Layer 1.5: Gradient Overlay
          Keeps text readable against the animations
        */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: phase >= 1 ? 0.3 : 0 }} 
           transition={{ duration: 2 }}
           className="absolute bottom-0 left-0 w-full h-[60vh] bg-gradient-to-t from-[#030014] via-indigo-950/20 to-transparent z-[1]" 
        />

      {/* Hero Content - Revealed in Phase 1 */}
      <AnimatePresence>
        {phase >= 1 && (
          <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center gap-8 mb-20 mt-10">
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-4xl pt-22 md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-5xl drop-shadow-2xl"
            >
              Fostering <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-indigo-300 animate-gradient-x bg-[length:200%_auto] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                Entrepreneurship
              </span>{" "}
              at NIT Silchar
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Transforming ideas into reality. Join a community of innovators, builders, and dreamers shaping the future.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-6"
            >
              <Link
                href="/join"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-purple-600 px-8 font-medium text-white transition-all duration-300 hover:bg-purple-700 hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] border border-purple-500"
              >
                 <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:animate-shimmer group-hover:duration-1000">
                  <div className="relative h-full w-8 bg-white/20"></div>
                </div>
                <span className="mr-2 relative z-10">Join Us</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 relative z-10" />
              </Link>
              
              <Link
                href="/events"
                className="group inline-flex h-12 items-center justify-center rounded-full bg-white/5 border border-white/10 px-8 font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 backdrop-blur-sm"
              >
                <Calendar className="mr-2 w-4 h-4 text-gray-300 group-hover:text-white" />
                <span>Upcoming Events</span>
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Marquee Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 40 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="w-full relative z-20 mt-auto mb-10"
      >
        {/* Removed the Glowing Line & Plasma from here */}

        {/* Glass Container for Marquee */}
        
      </motion.div>

    </section>
  );
};

export default Hero;
