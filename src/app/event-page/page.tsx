"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { EventData } from "src/content/events";
import { events } from "src/content/events";

export default function EventPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="pointer-events-none absolute top-[10%] left-[-5%] h-[60vw] w-[60vw] rounded-full bg-blue-600/5 blur-[150px]" />
      <div className="pointer-events-none absolute right-[-5%] bottom-[10%] h-[60vw] w-[60vw] rounded-full bg-purple-600/5 blur-[150px]" />

      <section className="relative z-10 px-6 pt-32 pb-40">
        <div className="3xl:max-w-[2200px] mx-auto max-w-[1600px] 2xl:max-w-[1800px]">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-32 mb-40 pb-8 text-center"
          >
            <div className="mb-8 inline-block rounded-full border border-blue-500/20 bg-white/5 px-8 py-2 backdrop-blur">
              <span className="font-jakarta text-[10px] font-black tracking-[0.4em] text-blue-400 uppercase">
                Our Strategic Impact
              </span>
            </div>

            <h1 className="3xl:text-[11rem] 4xl:text-[13rem] font-jakarta mb-6 text-6xl leading-[1.1] font-black uppercase md:text-9xl">
              Our <span className="text-blue-500">Events</span>
            </h1>

            <p className="3xl:text-2xl font-poppins mx-auto max-w-2xl text-lg text-gray-500 md:text-xl">
              Empowering students to transform conceptual sparks into
              market-leading startups through structured mentorship and
              resources.
            </p>
          </motion.div>

          <div className="3xl:space-y-[28rem] 4xl:space-y-[32rem] space-y-32 md:space-y-64">
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
                        className="brightness-75 grayscale transition-transform duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0 pointer-coarse:group-focus-within:scale-105 pointer-coarse:group-focus-within:grayscale-0"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />

                      <div className="absolute bottom-10 left-10 translate-y-4 rounded-2xl bg-white/[0.06] px-6 py-3 opacity-0 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-[14px] backdrop-saturate-150 transition-all delay-100 duration-500 group-hover:translate-y-0 group-hover:opacity-100 pointer-coarse:group-focus-within:translate-y-0 pointer-coarse:group-focus-within:opacity-100">
                        <p className="font-jakarta text-[10px] font-black tracking-widest text-white/95 uppercase">
                          E-Cell NIT Silchar
                        </p>
                      </div>
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
                    <div className="mb-8 flex justify-start">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-blue-500/5 text-blue-500">
                        <Icon size={28} />
                      </div>
                    </div>

                    <h3 className="3xl:text-8xl 4xl:text-9xl font-jakarta mb-6 text-5xl leading-[1.1] font-black uppercase italic md:text-7xl">
                      {event.title}
                    </h3>

                    <p className="3xl:text-2xl font-poppins mb-10 text-lg leading-relaxed text-gray-400 md:text-xl">
                      {event.description}
                    </p>

                    <div className="flex justify-start">
                      <button className="group 3xl:px-14 3xl:py-6 relative cursor-pointer overflow-hidden rounded-full border border-blue-500/40 px-10 py-4">
                        <div className="absolute inset-0 origin-bottom scale-y-0 bg-blue-600 transition-transform duration-500 group-hover:scale-y-100 group-focus:scale-y-100" />
                        <span className="font-jakarta relative z-10 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
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
    </main>
  );
}
