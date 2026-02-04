"use client";

import { motion } from "framer-motion";
import Navbar from "~/components/EIC/Navbar";
import HeroSection from "~/components/EIC/HeroSection";
import EventsSection from "~/components/EIC/EventsSection";
import PosterMarquee from "~/components/EIC/PosterMarquee";
import SponsorsSection from "~/components/EIC/SponsorsSection";
import AboutSection from "~/components/EIC/AboutSection";
import CTASection from "~/components/EIC/CTASection";
import Footer from "~/components/EIC/Footer";
import SpotifyPlayer from "~/components/EIC/SpotifyPlayer";

export default function EICPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="eic-page min-h-screen overflow-x-hidden"
    >
      {/* Noise Overlay for texture */}
      <div className="eic-noise-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="pb-24">
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <PosterMarquee />
        <SponsorsSection />
        <CTASection />
      </main>

      <Footer />

      {/* Spotify Player Bar */}
      <SpotifyPlayer currentEvent="EIC 2025 - Innovate. Compete. Conquer." />
    </motion.div>
  );
}
