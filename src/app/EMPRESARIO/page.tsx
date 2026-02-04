"use client";

import Navbar from "~/components/EMPRESARIO/Navbar";
import HeroSection from "~/components/EMPRESARIO/HeroSection";
import AboutSection from "~/components/EMPRESARIO/AboutSection";
import EventsSection from "~/components/EMPRESARIO/EventsSection";
import GallerySection from "~/components/EMPRESARIO/GallerySection";
import ExperiencesSection from "~/components/EMPRESARIO/ExperiencesSection";
import ConclusionSection from "~/components/EMPRESARIO/ConclusionSection";
import Footer from "~/components/EMPRESARIO/Footer";

export default function EMPRESARIOPage() {
  return (
    <main className="empresario-page empresario-noise-overlay relative min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      <ExperiencesSection />
      <ConclusionSection />
      <Footer />
    </main>
  );
}
