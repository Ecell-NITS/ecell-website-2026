"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type GalleryImage } from "@/data/gallery";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

// ── Skeleton shimmer component ──────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] bg-[length:400%_100%] ${className ?? ""}`}
      style={{
        animation: "shimmer 1.8s ease-in-out infinite",
      }}
    />
  );
}

// ── Single image card ───────────────────────────────────────
function GalleryCard({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for staggered lazy reveal
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // On mobile (1-col), all images are normal. On ≥sm, use CSS classes.
  // We use responsive classes so col-span/row-span only apply at sm+
  const spanClasses = {
    normal: "",
    tall: "sm:row-span-2",
    wide: "sm:col-span-2",
    featured: "sm:col-span-2 sm:row-span-2",
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
      }
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.06, ease: "easeOut" }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] ${spanClasses[image.size]}`}
      onClick={onClick}
    >
      {/* Skeleton */}
      {!loaded && <Skeleton className="absolute inset-0 z-10 rounded-2xl" />}

      {/* Image */}
      {isVisible && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${
            loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          } group-hover:scale-105`}
        />
      )}

      {/* Hover overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Hover info */}
      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
        <span className="mb-1 block text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase">
          {image.year}
        </span>
        <span className="block text-sm font-bold tracking-wide text-white uppercase">
          {image.event}
        </span>
      </div>

      {/* Subtle border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-blue-500/0 transition-all duration-500 group-hover:border-blue-500/30 group-hover:shadow-[inset_0_0_30px_rgba(59,130,246,0.06)]" />
    </motion.div>
  );
}

// ── Main grid ───────────────────────────────────────────────
export default function GalleryGrid({
  images,
  onImageClick,
}: GalleryGridProps) {
  // Responsive grid: 1 col mobile → 2 cols sm → 3 cols md → 4 cols lg → 5 cols 3xl → 6 cols 4k
  const gridClass =
    images.length <= 4
      ? "grid-cols-1 sm:grid-cols-2"
      : images.length <= 8
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 4k:grid-cols-6";

  // Reassign sizes intelligently when filter changes
  const adaptedImages = useAdaptiveLayout(images);

  return (
    <div
      id="gallery-grid"
      className="3xl:px-24 4k:px-32 px-4 pb-20 sm:px-8 lg:px-16"
    >
      <AnimatePresence mode="popLayout">
        {adaptedImages.length > 0 ? (
          <motion.div
            layout
            className={`grid ${gridClass} 3xl:auto-rows-[280px] 4k:auto-rows-[320px] auto-rows-[260px] gap-3 sm:auto-rows-[240px] sm:gap-4 md:auto-rows-[220px]`}
          >
            {adaptedImages.map((img, i) => (
              <GalleryCard
                key={img.id}
                image={img}
                index={i}
                onClick={() =>
                  onImageClick(images.findIndex((x) => x.id === img.id))
                }
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="mb-4 text-6xl opacity-20">📷</div>
            <p className="text-lg font-semibold text-gray-500">
              No images found for this filter
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Try a different year or event
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Hook: auto-adapt image sizes to keep balanced layout ────
function useAdaptiveLayout(images: GalleryImage[]): GalleryImage[] {
  const adapt = useCallback((imgs: GalleryImage[]) => {
    const count = imgs.length;
    if (count <= 2) {
      return imgs.map((img) => ({ ...img, size: "normal" as const }));
    }
    if (count <= 4) {
      // No featured for small sets
      return imgs.map((img) => ({
        ...img,
        size: img.size === "featured" ? ("normal" as const) : img.size,
      }));
    }
    // For larger sets, balance the layout:
    let specialCount = 0;
    const maxSpecial = Math.max(2, Math.floor(count * 0.3));
    return imgs.map((img) => {
      if (img.size !== "normal" && specialCount < maxSpecial) {
        specialCount++;
        return img;
      }
      if (img.size !== "normal" && specialCount >= maxSpecial) {
        return { ...img, size: "normal" as const };
      }
      return img;
    });
  }, []);

  const [adapted, setAdapted] = useState(() => adapt(images));

  useEffect(() => {
    setAdapted(adapt(images));
  }, [images, adapt]);

  return adapted;
}
