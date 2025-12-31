"use client";

import React, { useState, use, useCallback, useEffect } from "react";
import { eventModules } from "../../../content/modules";
import Image from "next/image";

type PageProps = { params: Promise<{ slug: string }> };

export default function ModulePage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug.replace(/-/g, "").toLowerCase();
  const eventModule = eventModules[slug];

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const isEmpresario = slug === "empresario";
  const images = eventModule?.galleryImages ?? [];

  const openModal = (idx: number) => setSelectedIdx(idx % images.length);
  const closeModal = useCallback(() => setSelectedIdx(null), []);

  const showNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedIdx((prev) =>
        prev !== null ? (prev + 1) % images.length : null,
      );
    },
    [images.length],
  );

  const showPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedIdx((prev) =>
        prev !== null ? (prev - 1 + images.length) % images.length : null,
      );
    },
    [images.length],
  );
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, showNext, showPrev, closeModal]);

  if (!eventModule) return null;

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main className="selection:bg-brand-blue relative min-h-screen overflow-x-hidden bg-[#000002] text-white">
      {/* Ellipses */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Blue Ellipse */}
        <div
          className="absolute hidden lg:block [@media(min-width:2500px)]:hidden"
          style={{
            width: "1540px",
            height: "1061px",
            left: "402px",
            top: "915px",
            transform: "rotate(120.86deg)",
            background:
              "linear-gradient(178.24deg, rgba(0, 0, 255, 0.19) 5.59%, rgba(0, 0, 2, 0.19) 98.51%)",
            filter: "blur(113.3px)",
            borderRadius: "100%",
          }}
        />

        {/* Green Ellipse */}
        <div
          className="absolute hidden lg:block [@media(min-width:2500px)]:hidden"
          style={{
            width: "2540px",
            height: "1500px",
            left: "-900px",
            top: "3650px",
            transform: "rotate(30.23deg)",
            background:
              "linear-gradient(178.24deg, rgba(0, 221, 115, 0.09) 5.59%, rgba(0, 0, 2, 0.09) 98.51%)",
            filter: "blur(113.3px)",
            borderRadius: "100%",
          }}
        />
      </div>
      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 text-center">
          <div className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-center gap-6 opacity-30 blur-[1px]">
            {eventModule.heroRows?.map((rowImages, rowIndex) => (
              <div
                key={rowIndex}
                className="relative flex w-[200%] overflow-hidden"
              >
                <div
                  className={`flex gap-6 whitespace-nowrap ${
                    rowIndex === 1
                      ? "animate-scroll-right"
                      : "animate-scroll-left"
                  }`}
                >
                  {[...rowImages, ...rowImages, ...rowImages, ...rowImages].map(
                    (img, i) => (
                      <div
                        key={i}
                        className="relative h-44 w-72 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:h-56 sm:w-96"
                      >
                        <Image
                          src={img}
                          alt={`Hero Row ${rowIndex}`}
                          fill
                          className="object-cover"
                          priority={rowIndex === 0}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 w-full">
            <h1 className="font-poppins text-4xl font-bold tracking-tighter uppercase sm:text-6xl md:text-7xl lg:text-8xl">
              {eventModule.title}
            </h1>

            {isEmpresario && (
              <div className="mt-4 mb-8 px-4">
                <p className="font-poppins text-lg tracking-wide opacity-80 sm:text-xl md:text-3xl lg:text-4xl">
                  The Entrepreneurship Module of
                </p>
                <h3 className="font-jakarta mt-2 text-3xl font-bold text-[var(--blue-accent)] uppercase sm:text-5xl md:text-6xl lg:text-7xl">
                  Tecnoesis 2026
                </h3>
              </div>
            )}

            <div className="mt-10 flex flex-row flex-wrap justify-center gap-6">
              {/* About Button */}
              <div className="group relative inline-flex cursor-pointer overflow-hidden rounded-full p-[4px] transition-all hover:scale-105 active:scale-95">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[image:var(--grad-blue-conic)]" />
                <a
                  href="#about"
                  onClick={(e) => handleScroll(e, "about")}
                  className="font-jakarta relative flex items-center justify-center rounded-full bg-[#000002] px-10 py-5 text-lg font-bold tracking-wider uppercase"
                >
                  About {eventModule.btntitle}
                </a>
              </div>

              {/* Explore Button */}
              <div className="group relative inline-flex cursor-pointer overflow-hidden rounded-full p-[4px] transition-all hover:scale-105 active:scale-95">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[image:var(--grad-blue-conic)]" />
                <a
                  href="#explore"
                  onClick={(e) => handleScroll(e, "explore")}
                  className="font-jakarta relative flex items-center justify-center rounded-full bg-[#000002] px-10 py-5 text-lg font-bold tracking-wider uppercase"
                >
                  Explore Events
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <div id="about" className="relative mx-4 mt-20 sm:mx-10 lg:mx-20">
          <div
            className="group relative overflow-hidden rounded-[40px] p-[10px]"
            style={{
              boxShadow:
                "0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 20px -5px rgba(255, 255, 255, 0.05)",
            }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[image:var(--grad-about-conic)]" />

            <div className="relative z-10 rounded-[30px] bg-[#000002] px-8 py-16">
              <h2 className="font-poppins text-3xl font-normal text-white uppercase md:text-4xl">
                About{" "}
                <span className="font-bold text-[var(--blue-accent)]">
                  {eventModule.title}
                </span>
              </h2>

              <div className="my-4 h-[5px] w-1/2 rounded-full bg-gradient-to-r from-white via-white/70 to-transparent" />

              <div className="flex flex-col gap-6">
                {eventModule.description.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-poppins m-2 text-lg leading-relaxed text-white/80 md:text-xl"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* EXPLORE EVENTS SECTION */}
        <section
          id="explore"
          className="mx-auto mt-24 max-w-[1400px] px-4 pb-20"
        >
          <h2 className="font-poppins mb-12 text-center text-3xl font-normal tracking-widest uppercase md:text-4xl">
            Explore{" "}
            <span className="font-bold text-[var(--blue-accent)]">Events</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {eventModule.bottomCards.map((card, idx) => (
              <div
                key={idx}
                className="group relative flex w-full flex-col overflow-hidden rounded-[40px] border-2 border-[var(--blue-accent)]/30 transition-all duration-500 hover:scale-[1.03] md:w-[calc(50%-24px)] lg:w-[calc(33.333%-24px)] lg:border-white/10"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[image:var(--grad-card-conic)]" />
                </div>

                <div className="relative z-10 m-[10px] flex flex-1 flex-col overflow-hidden rounded-[30px] bg-[#000002] p-4">
                  <div
                    className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black, transparent 4%, transparent 96%, black), linear-gradient(to right, black, transparent 4%, transparent 96%, black)",
                      WebkitMaskComposite: "source-over",
                      maskImage:
                        "linear-gradient(to bottom, black, transparent 4%, transparent 96%, black), linear-gradient(to right, black, transparent 4%, transparent 96%, black)",
                      maskComposite: "add",
                    }}
                  >
                    <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[image:var(--grad-card-conic)] opacity-30 blur-[4px]" />
                  </div>

                  <div className="relative z-10 flex flex-1 flex-col p-4">
                    <div className="relative h-[100vw] w-full overflow-hidden rounded-xl md:h-[50vw] lg:h-[35vw]">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 35vw"
                      />
                    </div>

                    <div className="flex flex-1 flex-col pt-5 text-left">
                      <h3 className="font-poppins text-2xl font-bold uppercase">
                        {card.text}
                      </h3>
                      {card.date && (
                        <p className="font-jakarta mt-1 text-lg font-bold text-[var(--blue-accent)]/90 uppercase">
                          {card.date}
                        </p>
                      )}

                      {card.location && (
                        <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 p-2.5">
                          <span className="text-sm">📍</span>

                          <p className="font-jakarta text-[12px] font-bold text-white/70 uppercase">
                            Venue: {card.location}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex flex-row gap-2">
                        {card.mode &&
                          (card.mode.toLowerCase() === "online" ? (
                            <span className="font-jakarta rounded-full border border-cyan-500/30 bg-cyan-500/30 px-3 py-1 text-[10px] font-bold tracking-wider text-cyan-400 uppercase">
                              Online
                            </span>
                          ) : (
                            <span className="font-jakarta rounded-full border border-lime-500/30 bg-lime-500/30 px-3 py-1 text-[10px] font-bold tracking-wider text-lime-400 uppercase">
                              On-site
                            </span>
                          ))}

                        {card.teamSize && (
                          <span className="font-jakarta border-white-500/30 bg-white-500/30 rounded-full border px-3 py-1 text-[10px] font-bold text-white/80 uppercase">
                            Team: {card.teamSize}
                          </span>
                        )}
                      </div>

                      {card.deadline && (
                        <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-2.5">
                          <span className="text-sm">📅</span>

                          <p className="font-jakarta text-[12px] font-bold text-red-400 uppercase">
                            Registration Deadline: {card.deadline}
                          </p>
                        </div>
                      )}

                      <p className="font-poppins mt-5 text-sm leading-relaxed text-white/60">
                        {card.description}
                      </p>

                      <div className="mt-auto pt-6">
                        <div className="group/btn relative inline-flex w-full cursor-pointer overflow-hidden rounded-2xl p-[2px] transition-transform active:scale-95">
                          <span
                            className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"
                            style={{
                              background:
                                "conic-gradient(from 0deg at 50% 50%, #3b82f6 0%, transparent 10%, transparent 40%, #3b82f6 50%, transparent 60%, transparent 100%)",
                            }}
                          />

                          <button
                            className={
                              "font-jakarta relative m-[5px] flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#000002] py-6 text-lg font-bold text-white transition-all active:bg-[var(--blue-accent)]"
                            }
                          >
                            <div className="absolute inset-0 z-0 hidden h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-blue-700/40 to-transparent transition-transform duration-600 ease-in-out lg:block lg:group-hover/btn:translate-x-full" />
                            <span className="relative z-10 flex items-center gap-2">
                              View Details
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PREVIOUS EVENTS GALLERY */}
        <div className="mt-28 w-full overflow-hidden pb-40">
          <h2 className="font-poppins mb-12 text-center text-3xl font-normal tracking-widest uppercase md:text-4xl">
            Previous{" "}
            <span className="font-bold text-[var(--blue-accent)]">
              Events Gallery
            </span>
          </h2>
          <div className="relative w-full">
            <div className="pointer-events-none absolute top-0 left-0 z-30 hidden h-full w-24 bg-gradient-to-r from-[#000002] via-[#000002]/80 to-transparent lg:block lg:w-40" />

            <div className="pointer-events-none absolute top-0 right-0 z-30 hidden h-full w-24 bg-gradient-to-l from-[#000002] via-[#000002]/80 to-transparent lg:block lg:w-40" />

            <div className="gallery-container relative flex w-full overflow-hidden">
              <div className="animate-gallery flex gap-6 py-10">
                {[...images, ...images].map((imgSrc, idx) => (
                  <div
                    key={idx}
                    onClick={() => openModal(idx)}
                    className="relative z-10 h-48 w-72 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 transition-all hover:z-20 hover:scale-110"
                  >
                    {imgSrc && (
                      <Image
                        src={imgSrc}
                        alt="Gallery"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PICTURE BOX */}
      {selectedIdx !== null && images.length > 0 && images[selectedIdx] && (
        <div className="onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} fixed inset-0 z-[100] flex flex-col items-center justify-center p-4">
          <div
            className="absolute inset-0 cursor-default bg-[#000002]/90"
            onClick={closeModal}
          />

          <button
            className="absolute top-8 right-8 z-[130] cursor-pointer text-4xl text-white/40 transition-colors hover:text-white"
            onClick={closeModal}
          >
            &times;
          </button>

          <button
            className="absolute top-1/2 left-4 z-[130] flex h-20 -translate-y-1/2 cursor-pointer items-center justify-center p-4 text-5xl text-white/20 transition-all hover:text-white active:scale-90 md:left-10"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            &#10094;
          </button>

          <button
            className="absolute top-1/2 right-4 z-[130] flex h-20 -translate-y-1/2 cursor-pointer items-center justify-center p-4 text-5xl text-white/20 transition-all hover:text-white active:scale-90 md:right-10"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            &#10095;
          </button>

          <div
            className="relative z-110 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[75vh] w-[90vw] md:w-[80vw]">
              <Image
                src={images[selectedIdx]}
                alt="Enlarged"
                fill
                className="pointer-events-none object-contain"
                priority
              />
            </div>

            <div className="pointer-events-none mt-10">
              <p className="font-jakarta text-2xl font-bold tracking-[0.2em] text-white">
                {selectedIdx + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
