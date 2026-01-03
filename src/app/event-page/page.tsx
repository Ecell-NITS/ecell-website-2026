"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { events } from "~/content/events";

export default function EventsPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#000002]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute hidden lg:block [@media(min-width:2500px)]:hidden"
          style={{
            width: "1425px",
            height: "935px",
            left: "-30%",
            top: "-1%",
            transform: "rotate(-50deg)",
            background:
              "linear-gradient(178.24deg, rgba(143, 0, 255, 0.19) 5.59%, rgba(0, 0, 2, 0) 98.51%)",
            filter: "blur(113.3px)",
            borderRadius: "100%",
          }}
        />

        <div
          className="absolute hidden lg:block [@media(min-width:2500px)]:hidden"
          style={{
            width: "1540px",
            height: "1061px",
            right: "-40%",
            top: "40%",
            transform: "rotate(-40deg)",
            background:
              "linear-gradient(178.24deg, rgba(0, 0, 255, 0.19) 5.59%, rgba(0, 0, 2, 0) 98.51%)",
            filter: "blur(113.3px)",
            borderRadius: "100%",
          }}
        />

        <div
          className="absolute hidden lg:block [@media(min-width:2500px)]:hidden"
          style={{
            width: "2520px",
            height: "1590px",
            left: "-55%",
            bottom: "-40%",
            transform: "rotate(30deg)",
            background:
              "linear-gradient(178.24deg, rgba(0, 221, 115, 0.19) 5.59%, rgba(0, 0, 2, 0) 98.51%)",
            filter: "blur(113.3px)",
            borderRadius: "100%",
          }}
        />
      </div>
      <main className="relative z-10 pt-32 pb-20 text-white lg:pt-32">
        <div className="mx-auto w-full px-6 lg:px-[80px]">
          <h1 className="font-poppins mb-16 text-center text-4xl font-normal uppercase sm:text-5xl md:text-6xl lg:mb-24 lg:text-7xl xl:text-[80px]">
            Our Initiatives
          </h1>

          <section className="flex flex-col gap-12 lg:gap-20">
            {events.map((event, index) => (
              <article key={index} className="relative">
                <div
                  className={`flex flex-col ${
                    event.imagePosition === "right"
                      ? "lg:flex-row-reverse"
                      : "lg:flex-row"
                  } items-stretch gap-8 lg:gap-12`}
                >
                  <div className="relative mx-auto min-h-[468px] w-full max-w-[320px] flex-shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] sm:max-w-[400px] lg:mx-0 lg:w-[344px] xl:w-[400px]">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 400px, 344px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-center pt-2 lg:p-[30px] lg:pt-4">
                    <h2 className="font-poppins mb-8 text-3xl leading-tight font-semibold uppercase sm:text-4xl lg:text-5xl xl:text-6xl">
                      {event.title}
                    </h2>

                    <p className="font-poppins mb-10 text-sm leading-relaxed font-medium text-white/80 sm:text-base lg:text-lg xl:text-xl">
                      {event.description}
                    </p>

                    <div className="mt-auto flex">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex cursor-pointer overflow-hidden rounded-full p-[2px]"
                      >
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            WebkitMask:
                              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "destination-out",
                            maskComposite: "exclude",
                            padding: "4px",
                          }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 90, 180, 270, 360] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                              times: [0, 0.25, 0.5, 0.75, 1],
                            }}
                            style={{
                              background:
                                "conic-gradient(from 90deg at 50% 50%, #3b82f6 0%, transparent 15%, transparent 100%)",
                            }}
                            className="absolute inset-[-1000%]"
                          />
                        </div>

                        <button className="font-jakarta relative flex cursor-pointer items-center justify-center rounded-full bg-transparent px-6 py-3 text-sm font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-white/5 group-active:bg-white/5 sm:px-8 sm:py-3.5 sm:text-base lg:px-10 lg:py-4 lg:text-lg">
                          View Details
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
