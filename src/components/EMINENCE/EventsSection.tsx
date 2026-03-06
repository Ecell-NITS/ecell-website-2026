"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import EventCard from "./EventCard";

const eventsData = [
  {
    title: "E-Questa",
    subtitle: "The Ultimate Quiz Round",
    description:
      "The gateway to EMINENCE, this fast-paced challenge tested entrepreneurial aptitude and problem-solving skills. Only the sharpest, most analytical minds broke through.",
    venue: "New Gallery",
    rules: [
      "Only individual registrations were allowed",
      "No prerequisites were required for this challenge",
      "Those who didn't qualify found an unexpected way back through a wildcard twist",
    ],
  },
  {
    title: "E-Hack",
    subtitle: "The Business Hackathon",
    description:
      "A dynamic business hackathon awaited the qualifiers of E-Questa. In assigned teams, participants were given problem statements to brainstorm and craft innovative, scalable solutions.",
    venue: "Startup Center",
    rules: [
      "Selected candidates were assigned into groups with a second year mentor",
      "Teams built compelling business models and submitted 10-12 slides pitch decks",
      "Brownie points for workspace creativity with sticky notes and pastel sheets",
    ],
  },
  {
    title: "Founders × Funders",
    subtitle: "The Grand Finale",
    description:
      "The arena where top teams pitched, negotiated, and turned ideas into ventures. Startups impressed investors, who analyzed and bet on potential. Success hinged on both sharp pitches and strategic bets.",
    venue: "New Gallery",
    rules: [
      "7-minute startup pitch to impress the investors",
      "6-minute negotiation showdown for the best deals",
      "An advisory panel stepped in to refine final investments",
    ],
  },
];

const EventsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="events"
      className="relative bg-[hsl(220_30%_5%)] py-32"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="eminence-font-display mb-4 inline-block text-sm tracking-[0.3em] text-[hsl(195_100%_50%/0.7)] uppercase"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            What Happened
          </motion.span>
          <h2 className="eminence-font-display eminence-glow-subtle mb-4 text-4xl font-bold md:text-6xl">
            EVENTS
          </h2>
          <p className="mx-auto max-w-2xl text-[hsl(40_20%_95%/0.6)]">
            Four rounds of intense entrepreneurial challenges. One path to
            glory.
          </p>
        </motion.div>

        {/* Timeline connector */}
        <div className="absolute top-48 bottom-32 left-1/2 hidden w-px bg-gradient-to-b from-[hsl(195_100%_50%/0.5)] via-[hsl(195_100%_50%)] to-[hsl(195_100%_50%/0.5)] lg:block" />

        {/* Events grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {eventsData.map((event, index) => (
            <EventCard key={event.title} {...event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
