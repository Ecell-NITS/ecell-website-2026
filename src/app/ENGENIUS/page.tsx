import type { Metadata } from "next";
import "~/styles/engenius.css";
import ParticleBackground from "~/components/ENGENIUS/ParticleBackground";
import Navbar from "~/components/ENGENIUS/Navbar";
import HeroSection from "~/components/ENGENIUS/HeroSection";
import EventsSection from "~/components/ENGENIUS/EventsSection";
import AboutSection from "~/components/ENGENIUS/AboutSection";
import GallerySection from "~/components/ENGENIUS/GallerySection";
import ExperiencesSection from "~/components/ENGENIUS/ExperiencesSection";
import SponsorsSection from "~/components/ENGENIUS/SponsorsSection";
import ConclusionSection from "~/components/ENGENIUS/ConclusionSection";
import Footer from "~/components/ENGENIUS/Footer";

export const metadata: Metadata = {
  title: "EnGenius — The Official Orientation Program",
  description:
    "EnGenius by E-Cell NIT Silchar — the official orientation program introducing freshers to entrepreneurship, innovation, and leadership.",
  openGraph: {
    title: "EnGenius | E-Cell NIT Silchar",
    description:
      "The official orientation program introducing freshers to entrepreneurship, innovation, and leadership.",
    type: "website",
    images: [
      {
        url: "/og/landing2.png",
        width: 1200,
        height: 630,
        alt: "EnGenius — E-Cell NIT Silchar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EnGenius | E-Cell NIT Silchar",
    description: "E-Cell NIT Silchar's official orientation program.",
    images: ["/og/landing2.png"],
  },
};

export default function ENGENIUSPage() {
  return (
    <main className="engenius-page engenius-noise-overlay relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
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
