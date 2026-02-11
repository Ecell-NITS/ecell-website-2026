"use client";

import { Poppins } from "next/font/google";
import Navbar from "../../components/Landing/Navbar";
import Footer from "../../components/Landing/Footer";
import Background from "../../components/Landing/Background";
import Achievements from "../../components/Landing/Achievements";
import History from "../../components/Landing/History";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const mottoData = [
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

const pillarsData = [
  {
    name: "Prof. Rahul Dev Misra",
    role: "IIC President, NIT Silchar",
    desc: "Professor in the mechanical engineering department and the president of IIC, NIT Silchar. He is the backbone of the innovation ecosystem.",
    img: "https://res.cloudinary.com/ecell/image/upload/v1756627441/IMG_174134284467cac87c778b1_kzqtmj.jpg",
  },
  {
    name: "Dr. Wasim Arif",
    role: "Convener IIC, NIT Silchar",
    desc: "Associate professor in the department of ECE and faculty advisor at E-Cell. A guiding support and visionary for the organization.",
    img: "https://res.cloudinary.com/dw3n9vflw/image/upload/v1767025863/WasimArifSir-d33400e4_qmpii4.jpg",
  },
  {
    name: "Dr. A.B. Deoghare",
    role: "Asso Prof, Mechanical Engg",
    desc: "Associate professor in the department of mechanical engineering and supports E-Cell organization as a primary faculty advisor.",
    img: "https://res.cloudinary.com/dfriijrmr/image/upload/v1677474386/GalleryPage/Orientation%202022-2023/IMG_1558_vjql6g.jpg",
  },
];

export default function AboutPage() {
  const [activeMotto, setActiveMotto] = useState(0);
  const [activePillar, setActivePillar] = useState(0);
  const mottoRef = useRef<HTMLDivElement>(null);
  const pillarRef = useRef<HTMLDivElement>(null);

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    setIndex: (i: number) => void,
    itemCount: number,
  ) => {
    if (ref.current) {
      const scrollLeft = ref.current.scrollLeft;
      const scrollWidth = ref.current.scrollWidth;
      // Subtract buffer or handle padding if necessary
      const itemWidth = scrollWidth / itemCount;
      const index = Math.round(scrollLeft / itemWidth);
      setIndex(Math.min(Math.max(index, 0), itemCount - 1));
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      <Background />
      <Navbar />

      <div
        className={`relative z-10 flex flex-col pt-20 xl:pt-32 ${poppins.className}`}
      >
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full py-10 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-center text-4xl font-black opacity-100 sm:text-5xl md:text-6xl lg:text-7xl">
              WHO ARE <span className="text-blue-500"> WE?</span>
            </h2>
          </div>
          <br />
          <h3 className="mx-auto max-w-5xl px-6 text-center text-base leading-relaxed text-gray-400 sm:text-lg md:text-xl lg:text-2xl">
            Entrepreneurship Cell, NIT Silchar is a non-profit organization that
            aims to foster the spirit of entrepreneurship among the student
            community. We provide a platform for budding entrepreneurs to hone
            their skills, network with like-minded individuals, and gain
            exposure to the startup world. Our mission is to create a culture of
            innovation and problem-solving, and to empower the visionaries of
            tomorrow, today. Through our various initiatives, events, and
            workshops, we strive to build a solid entrepreneurial ecosystem on
            campus and beyond.
          </h3>
        </motion.header>

        {/* Motto Section (RESPONSIVE FIXED) */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden py-12 md:py-16 lg:py-20"
        >
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
                The five core values that drive our mission to cultivate the
                next wave of disruptive entrepreneurs.
              </p>
            </div>

            {/* Motto Cards */}
            <div
              ref={mottoRef}
              onScroll={() =>
                handleScroll(mottoRef, setActiveMotto, mottoData.length)
              }
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

                    <div className="relative z-10 mb-8 flex justify-center">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={96}
                        height={96}
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
        </motion.section>

        {/* Pillars Section (UNCHANGED) */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gray-950/20 py-12 md:py-16 lg:py-20"
        >
          {/* Background text */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10 select-none">
            <span className="absolute -top-10 -left-20 text-[20rem] font-black text-white/5">
              GUIDANCE
            </span>
            <span className="absolute -right-20 -bottom-20 rotate-12 text-[20rem] font-black text-white/5">
              VISION
            </span>
          </div>

          <div className="relative z-10 container mx-auto px-6">
            {/* Heading */}
            <div className="mb-16 flex flex-col items-center text-center md:mb-20 lg:mb-24">
              <h2 className="mb-6 text-4xl font-black tracking-tighter text-white uppercase italic sm:text-5xl md:text-6xl lg:text-7xl">
                The <span className="text-blue-500">Pillars</span>
              </h2>
              <div className="mx-auto mb-8 h-1.5 w-24 rounded-full bg-blue-600" />
              <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-gray-500">
                Meet the visionaries and faculty mentors who provide the
                strategic backbone and unwavering support for E-Cell&apos;s
                exponential growth.
              </p>
            </div>

            {/* Pillars Cards */}
            <div
              ref={pillarRef}
              onScroll={() =>
                handleScroll(pillarRef, setActivePillar, pillarsData.length)
              }
              className="scrollbar-hide flex snap-x snap-mandatory gap-10 overflow-x-auto pb-6 md:grid md:grid-cols-3 md:pb-0 lg:gap-16"
            >
              {pillarsData.map((person, i) => (
                <div
                  key={person.name}
                  className="group relative w-full min-w-[85vw] snap-center md:min-w-0"
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="flex h-full flex-col items-center rounded-[3rem] border border-white/10 p-8 text-center transition-all duration-500 group-hover:bg-white/[0.04] hover:border-blue-500/30 md:p-12"
                  >
                    {/* Image */}
                    <div
                      className="relative mb-10 h-44 w-44"
                      style={{ transform: "translateZ(50px)" }}
                    >
                      <div className="absolute inset-0 scale-110 rounded-full border-2 border-blue-500/20 transition-transform duration-700 group-hover:scale-125" />
                      <div className="absolute inset-0 scale-125 rounded-full border border-blue-500/10 opacity-50 transition-transform duration-1000 group-hover:scale-150" />

                      <div className="relative z-10 h-full w-full overflow-hidden rounded-full border-4 border-white/5 shadow-2xl">
                        <Image
                          src={person.img}
                          alt={person.name}
                          width={176}
                          height={176}
                          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div style={{ transform: "translateZ(30px)" }}>
                      <h3 className="mb-2 text-2xl font-black tracking-tight text-white transition-colors group-hover:text-blue-400">
                        {person.name}
                      </h3>

                      <p className="mb-6 inline-block rounded-full bg-blue-500/5 px-4 py-1 text-xs font-black tracking-[0.2em] text-blue-500 uppercase">
                        {person.role}
                      </p>

                      <p className="px-4 text-sm leading-relaxed font-light text-gray-400 italic">
                        &quot;{person.desc}&quot;
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Pillars Indicators (Mobile) */}
            <div className="mt-4 flex justify-center gap-2 md:hidden">
              {pillarsData.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activePillar
                      ? "w-8 bg-blue-500"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        <Achievements />
        <History />

        <Footer />
      </div>
    </main>
  );
}
