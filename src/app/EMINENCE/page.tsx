import type { Metadata } from "next";
import "~/styles/eminence.css";
import Navbar from "~/components/EMINENCE/Navbar";
import HeroSection from "~/components/EMINENCE/HeroSection";
import AboutSection from "~/components/EMINENCE/AboutSection";
import EventsSection from "~/components/EMINENCE/EventsSection";
import GallerySection from "~/components/EMINENCE/GallerySection";
import ExperiencesSection from "~/components/EMINENCE/ExperiencesSection";
import SponsorsSection from "~/components/EMINENCE/SponsorsSection";
import ConclusionSection from "~/components/EMINENCE/ConclusionSection";
import Footer from "~/components/EMINENCE/Footer";

export const metadata: Metadata = {
  title: "Eminence — The Bermuda Triangle of Entrepreneurship",
  description:
    "Eminence by E-Cell NIT Silchar — the most intellectually challenging entrepreneurship event pushing participants beyond conventional thinking.",
  openGraph: {
    title: "Eminence | E-Cell NIT Silchar",
    description:
      "The Bermuda Triangle of Entrepreneurship — immersive case studies, brainstorming, and unconventional business challenges.",
    type: "website",
    images: [
      {
        url: "/og/landing.png",
        width: 1200,
        height: 630,
        alt: "Eminence — E-Cell NIT Silchar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eminence | E-Cell NIT Silchar",
    description: "The Bermuda Triangle of Entrepreneurship at NIT Silchar.",
    images: ["/og/landing.png"],
  },
};

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
