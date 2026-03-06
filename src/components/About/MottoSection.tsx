"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface MottoItem {
  title: string;
  text: string;
  img: string;
  gradient: string;
}

const mottoData: MottoItem[] = [
  {
    title: "Inspire",
    text: "Inspiring Ideas, Igniting Innovation. We encourage students to brainstorm innovative ideas and nurture their creativity.",
    img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1680524127/Ecell%20website/moto/moto-1_uoycz4.webp",
    gradient: "from-blue-500/20",
  },
  {
    title: "Guide",
    text: "Guiding You Towards Success. We provide guidance in form of mentorship programs, workshops, and networking events.",
    img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1680524127/Ecell%20website/moto/moto-2_hvs2rq.webp",
    gradient: "from-purple-500/20",
  },
  {
    title: "Transform",
    text: "Transforming Ideas into Reality. We provide incubation facilities and funding support to promising startups.",
    img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1680524128/Ecell%20website/moto/moto-3_thwnrc.webp",
    gradient: "from-emerald-500/20",
  },
  {
    title: "Connect",
    text: "Connecting Ideas, Building Networks. We organize events to showcase ideas and connect with investors.",
    img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1680524127/Ecell%20website/moto/moto-4_krbq3h.webp",
    gradient: "from-amber-500/20",
  },
  {
    title: "Community",
    text: "Creating a Community of Entrepreneurs. We aim to celebrate success stories and inspire students.",
    img: "https://res.cloudinary.com/dp92qug2f/image/upload/v1680524130/Ecell%20website/moto/moto-5_jzewcc.webp",
    gradient: "from-rose-500/20",
  },
];

export default function MottoSection() {
  const [activeMotto, setActiveMotto] = useState(0);
  const mottoRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (mottoRef.current) {
      const scrollLeft = mottoRef.current.scrollLeft;
      const scrollWidth = mottoRef.current.scrollWidth;
      const itemWidth = scrollWidth / mottoData.length;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveMotto(Math.min(Math.max(index, 0), mottoData.length - 1));
    }
  }, []);

  return (
    <section className="relative overflow-hidden py-12 md:py-16 lg:py-20">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="absolute right-1/4 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Heading */}
        <div className="mb-16 text-center md:mb-20 lg:mb-24">
          <div className="inline-block">
            <h2 className="mb-3 text-4xl font-black tracking-tighter text-white uppercase italic sm:text-5xl md:text-6xl">
              Our <span className="text-blue-500">Motto</span>
            </h2>
            <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-blue-600 to-transparent" />
          </div>
          <p className="mx-auto mt-8 max-w-xl text-lg font-light text-gray-500">
            The five core values that drive our mission to cultivate the next
            wave of disruptive entrepreneurs.
          </p>
        </div>

        {/* Motto Cards */}
        <div
          ref={mottoRef}
          onScroll={handleScroll}
          className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 sm:grid sm:grid-cols-2 sm:pb-0 lg:grid-cols-3 xl:grid-cols-5"
        >
          {mottoData.map((item) => (
            <div
              key={item.title}
              className="group relative h-[420px] w-full min-w-[85vw] snap-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center transition-transform duration-500 sm:min-w-0"
              style={{ perspective: "1000px" }}
            >
              <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative z-10 mx-auto mb-8 flex aspect-square w-24 items-center justify-center">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={96}
                    height={96}
                    sizes="96px"
                    className="h-24 w-auto object-contain transition-transform duration-700 ease-in-out group-hover:-translate-y-3 group-hover:animate-[float_3s_ease-in-out_infinite]"
                  />
                </div>

                <h3 className="relative z-10 mb-5 text-3xl font-black text-white transition-colors duration-300 group-hover:text-blue-400">
                  {item.title}
                </h3>

                <p className="relative z-10 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Motto Indicators (Mobile) */}
        <div className="mt-4 flex justify-center gap-2 sm:hidden">
          {mottoData.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeMotto
                  ? "w-8 bg-blue-500"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
