"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, Quote, Image as ImageIcon } from "lucide-react";
import AnimatedBackground from "~/components/animated-background";
import Navbar from "~/components/navbar";

// --- Data ---
const testimonials = [
  {
    id: 1,
    text: "E-Cell NITS provided me with the mentorship and network I needed to take my startup from an idea to a funded reality.",
    name: "Rohan Das",
    role: "Founder, TechSolutions",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    text: "The events and workshops are top-notch. It's the best place to learn about entrepreneurship in the region.",
    name: "Priya Sharma",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    text: "Being part of this community changed my perspective on problem-solving. Highly recommended for every student.",
    name: "Vikram Singh",
    role: "Alumni, NIT Silchar",
    image: "",
  },
];

// Updated Marquee Data with Logo Images
const marquee = [
  {
    id: 1,
    name: "TechNova",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "InnoSphere",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "FluxSystems",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "CoreDynamics",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "NexGen",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 1,
    name: "TechNova",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "InnoSphere",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "FluxSystems",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "CoreDynamics",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "NexGen",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop",
  },
];

const events = [
  {
    id: 1,
    category: "Annual Flagship",
    title: "Startup Summit",
    date: "Aug 24-26, 2026",
    desc: "Igniting the spark of innovation in young minds through world class mentorship.",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Workshop",
    title: "Idea Gen",
    date: "Sep 10, 2026",
    desc: "Brainstorming session to find the next unicorn idea.",
    image: "",
  },
  {
    id: 3,
    category: "Competition",
    title: "Hult Prize",
    date: "Oct 12, 2026",
    desc: "Solving the world's biggest challenges through social entrepreneurship.",
    image: "",
  },
  {
    id: 4,
    category: "Speaker Session",
    title: "Talks",
    date: "Nov 05, 2026",
    desc: "Hear from industry leaders about their journey.",
    image: "",
  },
  {
    id: 5,
    category: "Networking",
    title: "E-Coffee",
    date: "Dec 01, 2026",
    desc: "Casual networking session with alumni and founders.",
    image: "",
  },
];

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden font-sans text-white selection:bg-cyan-500/30">
      <AnimatedBackground />
      <Navbar />

      <style jsx global>{`
        @keyframes rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .glow-card {
          position: relative;
          z-index: 0;
          overflow: hidden;
          border-radius: 1rem;
          background-color: rgba(255, 255, 255, 0.05);
        }

        .glow-card::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200%;
          height: 200%;
          z-index: -2;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 100deg,
            #06b6d4 140deg,
            #22d3ee 180deg,
            transparent 180.5deg,

            transparent 280deg,
            #3b82f6 320deg,
            #60a5fa 360deg
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          animation: rotate 4s linear infinite;
        }

        .glow-card:hover::before {
          opacity: 1;
        }

        .inner-card {
          position: relative;
          z-index: 1;
          height: 100%;
          width: 100%;
          border-radius: calc(1rem - 1.5px);
          background-color: #020617;
          box-shadow: inset 0 0 20px rgba(6, 182, 212, 0.05);
          background-image:
            radial-gradient(
              circle at 0% 0%,
              rgba(34, 211, 238, 0.15) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 100% 100%,
              rgba(59, 130, 246, 0.15) 0%,
              transparent 50%
            );
        }

        .glow-card:hover {
          box-shadow: 0 0 40px -10px rgba(6, 182, 212, 0.15);
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden px-4 pt-24 pb-12">
        <div className="container grid max-w-7xl grid-cols-1 items-center gap-8 md:gap-12 xl:grid-cols-2 2xl:max-w-[1600px] 2xl:gap-24">
          <div className="group relative order-1 flex justify-center xl:order-1 xl:justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="animate-float relative h-60 w-60 sm:h-72 sm:w-72 md:h-[400px] md:w-[500px] xl:h-[450px] xl:w-[550px] 2xl:h-[650px] 2xl:w-[750px]"
            >
              <Image
                src="/logo.png"
                alt="E-Cell Logo"
                fill
                className="object-contain drop-shadow-[0_0_50px_rgba(37,99,235,0.5)]"
              />
            </motion.div>
          </div>

          <div className="order-2 text-center xl:order-2 xl:text-left">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl md:text-7xl xl:text-7xl 2xl:text-7xl">
                Entrepreneurship Cell <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  NIT Silchar
                </span>
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed font-light text-blue-100/70 sm:text-xl md:text-2xl xl:mx-0 xl:max-w-xl 2xl:max-w-4xl 2xl:text-4xl">
                Where ideas turn into impact. We foster the spirit of
                entrepreneurship in Northeast India.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row xl:justify-start">
                <Link
                  href="#events"
                  className="group relative rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] 2xl:px-16 2xl:py-8"
                >
                  <span className="flex items-center justify-center gap-2 2xl:text-2xl">
                    Explore Events{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 2xl:h-8 2xl:w-8" />
                  </span>
                </Link>
                <Link
                  href="/join"
                  className="rounded-full border border-blue-400 bg-cyan-400/5 px-8 py-4 text-center font-bold backdrop-blur-sm transition-colors hover:bg-cyan-500/10 2xl:px-16 2xl:py-8 2xl:text-2xl"
                >
                  Join Community
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- COLLABORATIONS --- */}
      <section className="relative z-10 w-full overflow-hidden border-t border-cyan-900/20 py-20 md:py-24 2xl:py-32">
        <div className="mb-12 text-center 2xl:mb-20">
          <h2 className="text-2xl font-bold tracking-[0.2em] text-white uppercase sm:text-3xl 2xl:text-5xl">
            Collaborations
          </h2>
        </div>
        <div className="relative flex w-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black via-black/80 to-transparent md:w-32"></div>
          <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black via-black/80 to-transparent md:w-32"></div>
          <motion.div
            className="flex min-w-full shrink-0 gap-16 px-10 md:gap-32 2xl:gap-48"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 90 }}
          >
            {[...marquee, ...marquee, ...marquee].map((item, i) => (
              <div
                key={i}
                className="group flex cursor-pointer items-center gap-4 opacity-70 transition-all duration-300 hover:opacity-100"
              >
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 transition-colors group-hover:border-cyan-400/50 md:h-16 md:w-16 2xl:h-20 2xl:w-20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="hidden text-xl font-bold text-white sm:block md:text-2xl 2xl:text-4xl">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- WHAT WE DO --- */}
      <section className="relative z-10 w-full py-20 md:py-32 2xl:py-48">
        <div className="container mx-auto max-w-7xl px-4 text-center 2xl:max-w-screen-2xl">
          <h2 className="mb-8 text-4xl font-bold tracking-tight md:mb-10 md:text-5xl 2xl:text-7xl">
            What we do
          </h2>
          <p className="mx-auto max-w-4xl text-justify text-base leading-relaxed font-light text-blue-100/70 sm:text-center sm:text-lg md:text-2xl 2xl:max-w-6xl 2xl:text-4xl">
            Lorem ipsum dolor sit amet consectetur. Eu maecenas proin ultrices
            ut nisi. Dui amet tincidunt vulputate laoreet sed praesent pharetra.
            Nulla amet nulla sit commodo risus. Ut dictum mattis sodales
            suspendisse. Commodo fames sit tellus ut nunc pellentesque at
            mauris. Augue sed tincidunt tortor mattis netus urna. Sit massa
            nulla turpis augue nisi non urna at massa. Ultricies nullam aliquam
            vel lorem ac risus a cras porta. Massa viverra a cursus odio. Velit
            sit sed mi fusce etiam pulvinar quis sit risus.
          </p>
        </div>
      </section>

      {/* --- EVENTS SECTION --- */}
      <section
        id="events"
        className="relative z-10 w-full overflow-hidden py-20 md:py-24 2xl:py-36"
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-0 2xl:max-w-screen-2xl">
          <h2 className="mb-10 text-center text-4xl font-bold tracking-tight md:mb-20 md:text-5xl 2xl:text-7xl">
            Events
          </h2>

          <div className="no-scrollbar flex snap-x snap-mandatory flex-nowrap gap-5 overflow-x-auto px-4 pb-8 md:gap-8 xl:flex-wrap xl:justify-center xl:overflow-visible 2xl:gap-16">
            {events.map((item) => (
              <div
                key={item.id}
                className="glow-card h-[420px] w-[85vw] flex-shrink-0 snap-center p-[3px] sm:h-[500px] sm:w-[400px] xl:w-[380px] 2xl:h-[700px] 2xl:w-[550px]"
              >
                <div className="inner-card group overflow-hidden">
                  <div className="absolute inset-0 h-full w-full">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                        <ImageIcon className="h-20 w-20 text-gray-800 opacity-20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95"></div>
                    <div className="absolute inset-0 bg-blue-900/20 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"></div>
                  </div>

                  <div className="relative z-20 flex h-full flex-col justify-end p-6 md:p-10 2xl:p-16">
                    <div className="mb-auto flex translate-y-0 items-center gap-3 self-start rounded-xl border border-white/10 bg-black/40 p-3 opacity-100 backdrop-blur-md xl:-translate-y-4 xl:opacity-0 xl:transition-all xl:duration-500 xl:group-hover:translate-y-0 xl:group-hover:opacity-100 2xl:p-5">
                      <Calendar className="h-5 w-5 text-cyan-400 2xl:h-8 2xl:w-8" />
                      <span className="text-sm font-bold tracking-wide text-white 2xl:text-xl">
                        {item.date}
                      </span>
                    </div>

                    <div className="xl:translate-y-4 xl:transition-transform xl:duration-500 xl:group-hover:translate-y-0">
                      <h3 className="mb-2 text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase 2xl:text-lg">
                        {item.category}
                      </h3>
                      <h4 className="mb-4 text-3xl font-bold text-white md:text-4xl 2xl:text-6xl">
                        {item.title}
                      </h4>
                      <p className="line-clamp-3 text-sm leading-relaxed text-gray-300 opacity-100 md:text-lg xl:line-clamp-none xl:opacity-0 xl:transition-opacity xl:duration-500 xl:group-hover:opacity-100 2xl:text-2xl">
                        {item.desc}
                      </p>

                      <div className="mt-6 flex cursor-pointer items-center gap-2 text-sm font-bold text-cyan-300 opacity-100 xl:opacity-0 xl:transition-all xl:delay-100 xl:duration-500 xl:group-hover:opacity-100 2xl:text-2xl">
                        Register Now{" "}
                        <ArrowRight className="h-4 w-4 2xl:h-8 2xl:w-8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="relative z-10 w-full py-20 md:py-32 2xl:py-48">
        <div className="container mx-auto max-w-7xl px-4 text-center 2xl:max-w-screen-2xl">
          <h2 className="mb-12 text-4xl font-bold tracking-tight md:mb-16 md:text-5xl 2xl:text-7xl">
            Testimonials
          </h2>

          <div className="relative mx-auto h-[450px] w-full max-w-5xl md:h-[450px] 2xl:h-[700px] 2xl:max-w-[90%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="glaze-border testimonial-card absolute inset-0 rounded-[2rem]"
              >
                <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-[#0a0a0a] shadow-2xl shadow-cyan-900/10 md:flex-row">
                  {/* Image Part - Added ?. check here */}
                  <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-40 md:h-full md:w-1/3">
                    <div
                      className={`relative h-full w-full bg-gray-900 ${!testimonials[currentTestimonial]?.image ? "flex items-center justify-center" : ""}`}
                    >
                      {testimonials[currentTestimonial]?.image ? (
                        <Image
                          src={testimonials[currentTestimonial]?.image || ""}
                          alt={
                            testimonials[currentTestimonial]?.name ||
                            "Testimonial"
                          }
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Quote className="h-20 w-20 text-gray-800" />
                      )}
                      <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
                    </div>
                  </div>

                  {/* Content Part - Added ?. checks here */}
                  <div className="flex h-full w-full flex-col bg-gradient-to-br from-[#0a0a0a] to-[#0f172a] p-6 md:w-2/3 md:p-12 2xl:p-24">
                    <div className="flex h-full flex-col gap-4 md:justify-between md:gap-6">
                      <div className="no-scrollbar relative overflow-y-auto pr-2">
                        <Quote className="mb-2 h-6 w-6 text-cyan-500/30 md:mb-4 md:h-10 md:w-10 2xl:h-20 2xl:w-20" />
                        <p className="text-sm leading-relaxed font-light text-blue-100/90 italic sm:text-base md:text-2xl 2xl:text-5xl">
                          &quot;{testimonials[currentTestimonial]?.text}&quot;
                        </p>
                      </div>

                      {/* Name/Role */}
                      <div className="flex shrink-0 justify-end">
                        <div className="text-right">
                          <h4 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent md:text-3xl 2xl:text-6xl">
                            {testimonials[currentTestimonial]?.name}
                          </h4>
                          <p className="mt-1 text-xs font-bold tracking-widest text-gray-500 uppercase md:text-sm 2xl:text-2xl">
                            {testimonials[currentTestimonial]?.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 gap-3 md:-bottom-16">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-700 ease-out ${
                    i === currentTestimonial
                      ? "w-12 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                      : "w-2 bg-gray-700 hover:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section className="relative z-10 w-full overflow-hidden py-20 md:py-32 2xl:py-48">
        <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[80px] md:h-[600px] md:w-[600px] md:blur-[120px] 2xl:h-[1200px] 2xl:w-[1200px]"></div>

        <div className="container mx-auto max-w-4xl px-4 2xl:max-w-7xl">
          <div className="mb-12 text-center 2xl:mb-24">
            <div className="mb-4 inline-block rounded-full border border-cyan-500/30 bg-cyan-900/20 px-4 py-1 text-xs tracking-widest text-cyan-300 uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)] backdrop-blur-md 2xl:px-8 2xl:py-3 2xl:text-xl">
              Contact Us
            </div>
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl 2xl:text-8xl">
              Chat with the team
            </h2>
            <p className="text-lg text-blue-200/70 2xl:text-3xl">
              Reach out to collaborate with the E-Cell team.
            </p>
          </div>

          <form className="rounded-[2rem] border border-cyan-500/20 bg-[#020617]/80 p-6 shadow-[0_0_60px_rgba(6,182,212,0.05)] backdrop-blur-2xl md:rounded-[3rem] md:p-14 2xl:p-24">
            <div className="mb-6 grid gap-6 md:grid-cols-2 2xl:mb-12 2xl:gap-12">
              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-cyan-200/80 2xl:text-2xl">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full rounded-2xl border border-cyan-500/20 bg-white/5 px-5 py-4 text-white placeholder-gray-500 shadow-inner transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none 2xl:px-10 2xl:py-8 2xl:text-2xl"
                />
              </div>
              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-cyan-200/80 2xl:text-2xl">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full rounded-2xl border border-cyan-500/20 bg-white/5 px-5 py-4 text-white placeholder-gray-500 shadow-inner transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none 2xl:px-10 2xl:py-8 2xl:text-2xl"
                />
              </div>
            </div>

            <div className="mb-6 grid gap-6 md:grid-cols-2 2xl:mb-12 2xl:gap-12">
              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-cyan-200/80 2xl:text-2xl">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-2xl border border-cyan-500/20 bg-white/5 px-5 py-4 text-white placeholder-gray-500 shadow-inner transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none 2xl:px-10 2xl:py-8 2xl:text-2xl"
                />
              </div>
              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-cyan-200/80 2xl:text-2xl">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Your phone"
                  className="w-full rounded-2xl border border-cyan-500/20 bg-white/5 px-5 py-4 text-white placeholder-gray-500 shadow-inner transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none 2xl:px-10 2xl:py-8 2xl:text-2xl"
                />
              </div>
            </div>

            <div className="mb-10 space-y-2 2xl:mb-20">
              <label className="ml-1 text-sm font-bold text-cyan-200/80 2xl:text-2xl">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Write your message"
                className="w-full resize-none rounded-2xl border border-cyan-500/20 bg-white/5 px-5 py-4 text-white placeholder-gray-500 shadow-inner transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none 2xl:px-10 2xl:py-8 2xl:text-2xl"
              ></textarea>
            </div>

            <button className="glow-button-permanent flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 py-4 text-lg font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:from-blue-500 hover:to-cyan-500 md:py-5 2xl:py-10 2xl:text-3xl">
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
