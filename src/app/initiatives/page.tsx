"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { EventData } from "src/content/events";
import { events } from "src/content/events";
import Navbar from "src/components/Landing/Navbar";
import Footer from "src/components/Landing/Footer";

export default function EventPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="pointer-events-none absolute top-[10%] left-[-5%] h-[60vw] w-[60vw] rounded-full bg-blue-600/5 blur-[150px]" />
      <div className="pointer-events-none absolute right-[-5%] bottom-[10%] h-[60vw] w-[60vw] rounded-full bg-purple-600/5 blur-[150px]" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-6 md:px-10">
        <div className="4k:max-w-[2600px] mx-auto max-w-[1600px] text-center 2xl:max-w-[1800px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex min-h-screen flex-col justify-center"
          >
            <div className="mb-8">
              <div className="inline-block rounded-full border border-blue-500/20 bg-white/5 px-8 py-2 backdrop-blur">
                <span className="font-jakarta text-[2.5vw] font-black tracking-[0.4em] text-blue-400 uppercase md:text-[1vw]">
                  Our Strategic Impact
                </span>
              </div>
            </div>

            <h1 className="font-jakarta 3xl:text-[6.5vw] 4k:text-[6vw] text-[8vw] leading-[1.05] font-black whitespace-nowrap uppercase sm:text-[8vw] md:text-[8vw]">
              Our <span className="text-blue-500">Initiatives</span>
            </h1>

            <p className="font-poppins 4k:text-[1.1vw] mt-6 text-[3.8vw] text-gray-500 md:text-[1.5vw] lg:text-[1.3vw]">
              Empowering students to transform conceptual sparks into
              market-leading startups through structured mentorship and
              resources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="relative z-10 mb-20">
        <div className="3xl:px-24 4k:px-40 w-full px-6 md:px-10 2xl:px-10">
          <div className="3xl:space-y-[10vw] 4k:space-y-[6vw] flex flex-col space-y-[16vw] md:space-y-[12vw]">
            {events.map((event: EventData, idx: number) => (
              <div
                key={idx}
                className="3xl:gap-48 4k:gap-56 grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2 lg:gap-32"
              >
                {/* Image */}
                <motion.div
                  tabIndex={0}
                  className={`group 3xl:min-h-[700px] 4k:h-[920px] relative min-h-[350px] rounded-[2.5rem] md:min-h-[500px] lg:min-h-[540px] xl:min-h-[580px] ${event.reverse ? "lg:order-2" : "lg:order-1"} `}
                >
                  <div className="pointer-events-none absolute inset-0 z-0 rounded-[2.5rem] opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-coarse:group-focus-within:opacity-100">
                    <div className="absolute inset-[-6px] rounded-[2.5rem] bg-gradient-to-br from-blue-500/20 to-transparent blur-3xl" />
                  </div>

                  <div className="relative z-10 h-full w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl transition-colors duration-500 group-hover:border-blue-500/30 pointer-coarse:group-focus-within:border-blue-500/30">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="brightness-75 transition-transform duration-[1200ms] ease-out group-hover:scale-105 pointer-coarse:group-focus-within:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                  className={`${event.reverse ? "lg:order-1" : "lg:order-2"} flex flex-col justify-center`}
                >
                  <h3 className="font-jakarta mb-6 text-[8vw] font-black uppercase italic md:text-[5vw]">
                    {event.title}
                  </h3>

                  <p className="font-poppins mb-10 text-[3.5vw] text-gray-400 md:text-[1.5vw] lg:text-[1.3vw]">
                    {event.description}
                  </p>

                  <button className="group 3xl:px-14 3xl:py-6 relative w-fit overflow-hidden rounded-full border border-blue-500/40 px-6 py-3 sm:px-10 sm:py-4">
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-blue-600 transition-transform duration-500 group-hover:scale-y-100 pointer-coarse:group-focus:scale-y-100" />
                    <span className="font-jakarta relative z-10 flex items-center gap-2 font-bold tracking-widest uppercase">
                      Explore Modules
                      <span className="transition-transform duration-300 group-hover:translate-x-1 pointer-coarse:group-focus:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
