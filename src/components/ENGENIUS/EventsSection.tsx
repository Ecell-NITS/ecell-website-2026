"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import EventCard from "./EventCard";

const events = [
  {
    title: "SHARK TANK NITS",
    image: "/ENGENIUS/shark-tank.png",
    date: "31 August 2025",
    time: "10:00 AM",
    venue: "Startup Centre, NIT Silchar",
    description:
      "Pitch your groundbreaking ideas to our panel of industry sharks. Convince them to invest in your vision and take your startup to the next level.",
    heads: [
      { name: "Piyush Agarwal", phone: "+91-6901618522" },
      { name: "Saurabh Khutela", phone: "+91-8854062478" },
    ],
  },
  {
    title: "WHAT IF",
    image: "/ENGENIUS/what-if.png",
    date: "31 August 2025",
    time: "12:00 AM (Deadline)",
    venue: "Online Submission",
    description:
      "Explore hypothetical business scenarios and showcase your strategic thinking. What if you could redesign a brand from scratch?",
    heads: [
      { name: "Naman Surana", phone: "+91-9435491500" },
      { name: "Akash Kaushik Goswami", phone: "+91-9707833001" },
    ],
  },
  {
    title: "CEO ROLEPLAY",
    image: "/ENGENIUS/ceo-roleplay.png",
    date: "31 August 2025",
    time: "4:00 PM",
    venue: "Startup Centre, NIT Silchar",
    description:
      "Step into the shoes of a CEO. Navigate corporate mysteries, make strategic decisions, and prove your leadership prowess.",
    heads: [
      { name: "Jahnabi Priyam", phone: "+91-9395515489" },
      { name: "Aalya Jain", phone: "+91-7061872239" },
    ],
  },
  {
    title: "PITCH BOXING",
    image: "/ENGENIUS/pitch-boxing.png",
    date: "30 August 2025",
    time: "5:00 PM",
    venue: "Startup Centre, NIT Silchar",
    description:
      "Enter the ring of entrepreneurship. Go head-to-head with fellow innovators in intense pitch battles under the spotlight.",
    heads: [
      { name: "Himanshu Rajput", phone: "+91-9289826040" },
      { name: "Dev Jaiswal", phone: "+91-6001443772" },
    ],
  },
  {
    title: "BECH KE DIKHAO",
    image: "/ENGENIUS/bech-ke-dikhao.png",
    date: "1 September 2025",
    time: "5:00 PM",
    venue: "New Gallery, NIT Silchar",
    description:
      "The ultimate sales challenge. Sell the unsellable, convince the unconvinced, and prove your marketing mastery.",
    heads: [
      { name: "Vishal Singh Patel", phone: "+91-8887667450" },
      { name: "Jassi Laskar", phone: "+91-6003382438" },
    ],
  },
];

const EventsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="events" ref={ref} className="relative overflow-hidden py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0_0%_4%)] via-[hsl(0_0%_7%)] to-[hsl(0_0%_4%)]" />
      <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2">
        <motion.div
          style={{ height: lineHeight }}
          className="w-full bg-gradient-to-b from-[hsl(0_72%_51%)] via-[hsl(0_72%_51%/0.5)] to-transparent"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="engenius-font-heading mb-4 text-sm tracking-[0.3em] text-[hsl(0_72%_51%)]"
          >
            UNMASK YOUR POTENTIAL
          </motion.p>
          <h2 className="engenius-font-display mb-6 text-5xl font-bold text-[hsl(40_20%_95%)] md:text-7xl">
            THE{" "}
            <span className="engenius-glow-red text-[hsl(0_72%_51%)]">
              EVENTS
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[hsl(40_20%_95%/0.6)]">
            Five unique challenges await. Each designed to test different facets
            of your entrepreneurial spirit.
          </p>
        </motion.div>

        {/* Events List */}
        <div className="space-y-32">
          {events.map((event, index) => (
            <EventCard key={event.title} {...event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
