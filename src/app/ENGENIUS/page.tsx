"use client";

import ParticleBackground from "~/components/ENGENIUS/ParticleBackground";
import Navbar from "~/components/ENGENIUS/Navbar";
import HeroSection from "~/components/ENGENIUS/HeroSection";
import EventsSection from "~/components/ENGENIUS/EventsSection";
import AboutSection from "~/components/ENGENIUS/AboutSection";
import GallerySection from "~/components/ENGENIUS/GallerySection";
import SponsorsSection from "~/components/ENGENIUS/SponsorsSection";
import ConclusionSection from "~/components/ENGENIUS/ConclusionSection";
import Footer from "~/components/ENGENIUS/Footer";

export default function ENGENIUSPage() {
  return (
    <main className="engenius-page engenius-noise-overlay relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      <SponsorsSection />
      <ConclusionSection />
      <Footer />
    </main>
  );
}
