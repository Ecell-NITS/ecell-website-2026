"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { type GalleryImage } from "@/data/gallery";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

// Span classes for grid layout
const SPAN_CLASSES = {
  normal: "",
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  featured: "sm:col-span-2 sm:row-span-2",
} as const;

// ── Single image card (memoized for performance) ────────────
const GalleryCard = memo(function GalleryCard({
  image,
  onClick,
  shouldLoad,
}: {
  image: GalleryImage;
  onClick: () => void;
  shouldLoad: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);

  // Once shouldLoad becomes true, keep it true (don't unload)
  useEffect(() => {
    if (shouldLoad && !hasStartedLoading) {
      setHasStartedLoading(true);
    }
  }, [shouldLoad, hasStartedLoading]);

  return (
    <div
      className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/6 bg-white/2"
      onClick={onClick}
    >
      {/* Skeleton - show until image is loaded */}
      {!loaded && (
        <div className="absolute inset-0 z-10 animate-pulse rounded-2xl bg-gradient-to-br from-white/5 via-white/10 to-white/5" />
      )}

      {/* Image - only set src once shouldLoad is true, then keep it */}
      {hasStartedLoading && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-500 ${
            loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          } group-hover:scale-105`}
        />
      )}

      {/* Hover overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Hover info */}
      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
        <span className="mb-1 block text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase">
          {image.year}
        </span>
        <span className="block text-sm font-bold tracking-wide text-white uppercase">
          {image.event}
        </span>
      </div>

      {/* Subtle border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-blue-500/0 transition-all duration-300 group-hover:border-blue-500/30" />
    </div>
  );
});

// ── Main grid ───────────────────────────────────────────────
export default function GalleryGrid({
  images,
  onImageClick,
}: GalleryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Responsive grid: 1 col mobile → 2 cols sm → 3 cols md → 4 cols lg → 5 cols 3xl → 6 cols 4k
  const gridClass =
    images.length <= 4
      ? "grid-cols-1 sm:grid-cols-2"
      : images.length <= 8
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 4k:grid-cols-6";

  // Reassign sizes intelligently when filter changes
  const adaptedImages = useAdaptiveLayout(images);

  // Immediately load first 16 images (above the fold) when images change
  useEffect(() => {
    const initialIds = new Set(adaptedImages.slice(0, 16).map((img) => img.id));
    setVisibleIds(initialIds);
  }, [adaptedImages]);

  // IntersectionObserver for lazy loading remaining images
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((prev) => {
          const newVisible = new Set(prev);
          let changed = false;
          entries.forEach((entry) => {
            const id = Number(entry.target.getAttribute("data-id"));
            if (entry.isIntersecting && !newVisible.has(id)) {
              newVisible.add(id);
              changed = true;
            }
          });
          return changed ? newVisible : prev;
        });
      },
      {
        root: null,
        rootMargin: "500px",
        threshold: 0,
      },
    );

    observerRef.current = observer;

    // Observe all image containers
    const cards = grid.querySelectorAll("[data-id]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [adaptedImages]);

  return (
    <div
      id="gallery-grid"
      className="3xl:px-24 4k:px-32 px-4 pb-20 sm:px-8 lg:px-16"
    >
      {adaptedImages.length > 0 ? (
        <div
          ref={gridRef}
          className={`grid ${gridClass} 3xl:auto-rows-[280px] 4k:auto-rows-[320px] auto-rows-[260px] gap-3 sm:auto-rows-[240px] sm:gap-4 md:auto-rows-[220px]`}
          style={{ gridAutoFlow: "dense" }}
        >
          {adaptedImages.map((img) => (
            <div
              key={img.id}
              data-id={img.id}
              className={SPAN_CLASSES[img.size]}
            >
              <GalleryCard
                image={img}
                shouldLoad={visibleIds.has(img.id)}
                onClick={() =>
                  onImageClick(images.findIndex((x) => x.id === img.id))
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="mb-4 text-6xl opacity-20">📷</div>
          <p className="text-lg font-semibold text-gray-500">
            No images found for this filter
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Try a different year or event
          </p>
        </div>
      )}
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
