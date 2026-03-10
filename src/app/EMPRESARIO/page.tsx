import type { Metadata } from "next";
import "~/styles/empresario.css";
import Navbar from "~/components/EMPRESARIO/Navbar";
import HeroSection from "~/components/EMPRESARIO/HeroSection";
import AboutSection from "~/components/EMPRESARIO/AboutSection";
import EventsSection from "~/components/EMPRESARIO/EventsSection";
import GallerySection from "~/components/EMPRESARIO/GallerySection";
import ExperiencesSection from "~/components/EMPRESARIO/ExperiencesSection";
import SponsorsSection from "~/components/EMPRESARIO/SponsorsSection";
import ConclusionSection from "~/components/EMPRESARIO/ConclusionSection";
import Footer from "~/components/EMPRESARIO/Footer";

export const metadata: Metadata = {
  title: "Empresario — The Entrepreneurship Module",
  description:
    "Empresario by E-Cell NIT Silchar — a structured entrepreneurship module during Tecnoesis with hands-on exposure to business skills.",
  openGraph: {
    title: "Empresario | E-Cell NIT Silchar",
    description:
      "A structured entrepreneurship module featuring Business Hackathon, strategic thinking, and investor interaction.",
    type: "website",
    images: [
      {
        url: "/og/landing.png",
        width: 1200,
        height: 630,
        alt: "Empresario — E-Cell NIT Silchar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Empresario | E-Cell NIT Silchar",
    description: "The Entrepreneurship Module of Tecnoesis at NIT Silchar.",
    images: ["/og/landing.png"],
  },
};

export default function EMPRESARIOPage() {
  return (
    <main className="empresario-page empresario-noise-overlay relative min-h-screen overflow-x-hidden">
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
