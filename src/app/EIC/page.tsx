import type { Metadata } from "next";
import "~/styles/eic.css";
import EICPageWrapper from "~/components/EIC/EICPageWrapper";
import Navbar from "~/components/EIC/Navbar";
import HeroSection from "~/components/EIC/HeroSection";
import EventsSection from "~/components/EIC/EventsSection";
import GallerySection from "~/components/EIC/GallerySection";
import ExperiencesSection from "~/components/EIC/ExperiencesSection";
import PosterMarquee from "~/components/EIC/PosterMarquee";
import SponsorsSection from "~/components/EIC/SponsorsSection";
import AboutSection from "~/components/EIC/AboutSection";
import CTASection from "~/components/EIC/CTASection";
import Footer from "~/components/EIC/Footer";
import SpotifyPlayer from "~/components/EIC/SpotifyPlayer";

export const metadata: Metadata = {
  title: "EIC — Entrepreneurship & Innovation Challenge",
  description:
    "The Entrepreneurship and Innovation Challenge (EIC) by E-Cell NIT Silchar — an inter-branch competition fostering collaboration, leadership, and innovation.",
  openGraph: {
    title: "EIC | E-Cell NIT Silchar",
    description:
      "An inter-branch competition bringing together students to showcase entrepreneurial thinking, creativity, and innovation.",
    type: "website",
    images: [
      {
        url: "/og/landing.png",
        width: 1200,
        height: 630,
        alt: "EIC — E-Cell NIT Silchar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EIC | E-Cell NIT Silchar",
    description: "Entrepreneurship & Innovation Challenge at NIT Silchar.",
    images: ["/og/landing.png"],
  },
};

export default function EICPage() {
  return (
    <EICPageWrapper>
      {/* Noise Overlay for texture */}
      <div className="eic-noise-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="pb-24">
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <GallerySection />
        <ExperiencesSection />
        <PosterMarquee />
        <SponsorsSection />
        <CTASection />
      </main>

      <Footer />
      <SpotifyPlayer />
    </EICPageWrapper>
  );
}
