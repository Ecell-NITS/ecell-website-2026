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
