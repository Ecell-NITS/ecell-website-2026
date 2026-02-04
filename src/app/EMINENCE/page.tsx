"use client";

import Navbar from "~/components/EMINENCE/Navbar";
import HeroSection from "~/components/EMINENCE/HeroSection";
import AboutSection from "~/components/EMINENCE/AboutSection";
import EventsSection from "~/components/EMINENCE/EventsSection";
import GallerySection from "~/components/EMINENCE/GallerySection";
import ExperiencesSection from "~/components/EMINENCE/ExperiencesSection";
import SponsorsSection from "~/components/EMINENCE/SponsorsSection";
import ConclusionSection from "~/components/EMINENCE/ConclusionSection";
import Footer from "~/components/EMINENCE/Footer";

export default function EMINENCEPage() {
  return (
    <main className="eminence-page eminence-noise-overlay relative min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      <ExperiencesSection />
      <SponsorsSection />
      <ConclusionSection />
      <Footer />
    </main>
  );
}
