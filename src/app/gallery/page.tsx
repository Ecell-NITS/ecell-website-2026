"use client";

import { useState, useCallback, useMemo } from "react";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import GalleryHero from "@/components/Gallery/GalleryHero";
import GalleryFilters from "@/components/Gallery/GalleryFilters";
import GalleryGrid from "@/components/Gallery/GalleryGrid";
import GalleryLightbox from "@/components/Gallery/GalleryLightbox";
import { galleryImages } from "@/data/gallery";

export default function GalleryPage() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filtered images
  const filteredImages = useMemo(() => {
    return galleryImages.filter((img) => {
      if (selectedYear && img.year !== selectedYear) return false;
      if (selectedEvent && img.event !== selectedEvent) return false;
      return true;
    });
  }, [selectedYear, selectedEvent]);

  // Lightbox handlers
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === 0 ? filteredImages.length - 1 : i - 1));
  }, [filteredImages.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === filteredImages.length - 1 ? 0 : i + 1));
  }, [filteredImages.length]);

  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <Navbar />

      <GalleryHero />

      <GalleryFilters
        selectedYear={selectedYear}
        selectedEvent={selectedEvent}
        onYearChange={setSelectedYear}
        onEventChange={setSelectedEvent}
      />

      <GalleryGrid images={filteredImages} onImageClick={openLightbox} />

      <GalleryLightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />

      <Footer />
    </main>
  );
}
