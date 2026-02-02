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

      <section className="relative z-10 mb-20 px-6 py-6 md:px-10">
        <div className="3xl:max-w-[2200px] mx-auto max-w-[1600px] 2xl:max-w-[1800px]">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="align-center mx-2 flex min-h-screen flex-col justify-center text-center"
          >
            <div>
              <div className="mb-8 inline-block rounded-full border border-blue-500/20 bg-white/5 px-8 py-2 backdrop-blur">
                <span className="font-jakarta text-[2.5vw] font-black tracking-[0.4em] text-blue-400 uppercase md:text-[1vw]">
                  Our Strategic Impact
                </span>
              </div>
            </div>

            <h1 className="font-jakarta mb-6 text-[11vw] leading-[1.1] font-black uppercase sm:text-[10vw] md:text-[8vw]">
              Our <span className="text-blue-500">Initiatives</span>
            </h1>

            <p className="font-poppins mx-auto max-w-2xl text-[3.8vw] text-gray-500 md:text-[1.5vw] lg:text-[1.3vw]">
              Empowering students to transform conceptual sparks into
              market-leading startups through structured mentorship and
              resources.
            </p>
          </motion.div>

          <div className="space-y-[30vw] md:space-y-[20vw]">
            {events.map((event: EventData, idx: number) => {
              const Icon = event.icon;

              return (
                <div
                  key={idx}
                  className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2 lg:gap-32"
                >
                  <motion.div
                    tabIndex={0}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className={`group 3xl:min-h-[650px] 4xl:min-h-[750px] relative min-h-[350px] w-full md:min-h-[500px] ${
                      event.reverse ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100 pointer-coarse:group-focus-within:opacity-100" />

                    <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl group-hover:border-blue-500/30 md:rounded-[3rem] pointer-coarse:group-focus-within:border-blue-500/30">
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
                    initial={{
                      opacity: 0,
                      x: idx % 2 === 0 ? 40 : -40,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className={`flex flex-col justify-center py-4 text-left ${
                      event.reverse ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <h3 className="font-jakarta mb-6 text-[8.5vw] leading-[1.1] font-black uppercase italic md:text-[5vw]">
                      {event.title}
                    </h3>

                    <p className="font-poppins mb-10 text-[3.5vw] leading-relaxed text-gray-400 md:text-[1.5vw] lg:text-[1.3vw]">
                      {event.description}
                    </p>

                    <div className="flex justify-start">
                      <button className="group 3xl:px-14 3xl:py-6 relative cursor-pointer overflow-hidden rounded-full border border-blue-500/40 px-10 py-4">
                        <div className="absolute inset-0 origin-bottom scale-y-0 bg-blue-600 transition-transform duration-500 group-hover:scale-y-100 group-focus:scale-y-100" />
                        <span className="font-jakarta relative z-10 inline-flex items-center gap-2 text-[2.5vw] font-bold tracking-widest uppercase md:text-[1vw] lg:text-[0.8vw]">
                          Explore Modules
                          <span className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1">
                            →
                          </span>
                        </span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
