"use client";

import { motion } from "framer-motion";
import EventCard from "./EventCard";

const events = [
  {
    id: 1,
    title: "BUSINESS HACKATHON",
    date: "January 17th, 2026",
    location: "Start UP Center",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1766421071/bussiness_gjaocu.png",
    content:
      "Enter the digital dimension where creativity is your code and strategy is your weapon. In this realm of visionaries, strategists, and innovators, ideas transcend boundaries and solutions reshape realities. Two rounds await: online submission and onsite hackathon.",
    teamSize: "3 to 5 members",
    registrationDeadline: "January 10th, 2026",
  },
  {
    id: 2,
    title: "TREASURE HUNT",
    date: "January 18th, 2026",
    location: "Campus Wide",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1766924809/hunt_h4yu67.jpg",
    content:
      "Get ready for the ultimate campus adventure! Navigate through clues and riddles in this high-stakes treasure hunt where every step tests your wit and every discovery brings you closer to victory. Three thrilling rounds await the brave.",
    teamSize: "3 to 5 members",
    registrationDeadline: "January 12th, 2026",
  },
  {
    id: 3,
    title: "BID-WISE",
    date: "January 17th, 2026",
    location: "New Gallery",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1767002111/bid_dqm9bf.jpg",
    content:
      "Welcome to The Silent Grid: a high-stakes auction where words fall silent and only your moves speak. Manage a 100-point purse and limited bidding tokens across 6 rounds of exploration, discussion, and secret bidding at 10 stalls. Use the Special Token wisely—some rounds may eliminate it. Top 10 teams advance.",
    teamSize: "3 to 5 members",
    registrationDeadline: "January 12th, 2026",
  },
  {
    id: 4,
    title: "ADOVATION",
    date: "January 18th, 2026",
    location: "Online Submission",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1766736053/Adovation_nxhzzv.png",
    content:
      "A Tecnoesis 'Empressario' Module Event by Ecell. Teams will create engaging promotional videos for assigned shops, showcasing their marketing creativity and video production skills.",
    teamSize: "3 to 6 members",
    registrationDeadline: "January 12th, 2026",
  },
  {
    id: 5,
    title: "STARTUP EXPO",
    date: "January 16th, 2026",
    location: "New Gallery",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1766788108/startupexpo_lx9i2k.png",
    content:
      "Transform your innovative ideas into reality at the ultimate startup showcase! Present your business concepts, connect with investors, and compete for funding opportunities. Two dynamic rounds: application submission and live exhibition.",
    teamSize: "Minimum 1 member",
    registrationDeadline: "January 5th, 2026",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_20%_6%)] via-[hsl(220_18%_5%)] to-[hsl(220_20%_6%)]" />

      {/* Decorative elements */}
      <div className="pointer-events-none absolute top-1/4 left-0 h-96 w-96 opacity-10">
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(38 95% 55%) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 opacity-10">
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(210 60% 50%) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="empresario-font-body mb-4 block text-sm tracking-[0.2em] text-[hsl(38_95%_55%)] uppercase"
          >
            Explore Our Competitions
          </motion.span>
          <h2 className="empresario-font-display text-4xl font-bold text-[hsl(210_20%_95%)] md:text-6xl">
            Empresario{" "}
            <span className="empresario-text-gradient-gold">Events</span>
          </h2>
          <p className="empresario-font-body mx-auto mt-4 max-w-2xl text-lg text-[hsl(210_20%_95%/0.6)]">
            Five unique challenges designed to test different facets of your
            entrepreneurial spirit.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              image={event.image}
              content={event.content}
              teamSize={event.teamSize}
              registrationDeadline={event.registrationDeadline}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
