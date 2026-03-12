// ====================================================================
// EIC 2025 PAGE — COMMENTED OUT (Preserved for reference)
// The active EIC page is now at /EIC-2026
// ====================================================================

/*
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
  title: "EIC 2025 — Entrepreneurship & Innovation Challenge",
  description:
    "The Entrepreneurship and Innovation Challenge (EIC) by E-Cell NIT Silchar — an inter-branch competition fostering collaboration, leadership, and innovation.",
  openGraph: {
    title: "EIC 2025 | E-Cell NIT Silchar",
    description:
      "An inter-branch competition bringing together students to showcase entrepreneurial thinking, creativity, and innovation.",
    type: "website",
    images: [
      {
        url: "/og/landing2.png",
        width: 1200,
        height: 630,
        alt: "EIC — E-Cell NIT Silchar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EIC 2025 | E-Cell NIT Silchar",
    description: "Entrepreneurship & Innovation Challenge at NIT Silchar.",
    images: ["/og/landing2.png"],
  },
};

export default function EICPage() {
  return (
    <EICPageWrapper>
      <div className="eic-noise-overlay" />
      <Navbar />
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
*/

// Redirect or placeholder for the old EIC route
export default function EIC2025Page() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>EIC 2025</h1>
        <p style={{ color: "#888" }}>
          This event has concluded. Check out{" "}
          <a
            href="/EIC-2026"
            style={{ color: "#c2940a", textDecoration: "underline" }}
          >
            EIC 2026
          </a>
          !
        </p>
      </div>
    </div>
  );
}
