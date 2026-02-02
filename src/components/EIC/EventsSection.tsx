"use client";

import { motion } from "framer-motion";
import EventCard from "./EventCard";

const events = [
  {
    id: 1,
    title: "Board of Directors",
    subtitle: "Strategy Simulation Challenge",
    mode: "Startup Centre / Offline",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770062256/bd_aulph0.png",
    description:
      "Step into the shoes of corporate leaders in this high-stakes strategy simulation. Navigate complex business scenarios, make critical decisions, and prove your leadership mettle. Compete against the brightest minds in a battle of wits and strategic thinking.",
  },
  {
    id: 2,
    title: "Ad-O-Venture",
    subtitle: "Creative Ad-Making Challenge",
    mode: "Online",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770062726/ad_red8c1.png",
    description:
      "Unleash your creativity in this advertising showdown! Create compelling ads that capture attention and drive engagement. From concept to execution, showcase your marketing genius and compete for glory in this creative battleground.",
  },
  {
    id: 3,
    title: "Business Beats",
    subtitle: "Pitch & Business Storytelling",
    mode: "Main Auditorium / Offline",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770062272/bb_cmtfrh.png",
    description:
      "Transform your business ideas into captivating stories. Master the art of pitching as you present your vision to judges and audience alike. Rhythm, flow, and substance—combine all three to create the perfect business beat.",
  },
  {
    id: 4,
    title: "Campus Rewired",
    subtitle: "Innovation Hunt & Problem Solving",
    mode: "Campus-Wide / Hybrid",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770062262/cr_pdxn35.png",
    description:
      "Explore, discover, and innovate! Navigate through campus challenges that test your problem-solving abilities and creative thinking. Decode clues, solve puzzles, and rewire your perspective on innovation.",
  },
  {
    id: 5,
    title: "The Entrepreneur's Escape",
    subtitle: "Startup Escape Challenge",
    mode: "E-Cell Hub / Offline",
    image:
      "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1770062250/ee_unkr0p.png",
    description:
      "Enter the ultimate startup escape room experience. Solve entrepreneurial puzzles, crack business codes, and navigate through challenges that test your startup instincts. Can you escape before time runs out?",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="relative py-20">
      {/* Background Accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsla(141, 76%, 48%, 0.05) 0%, transparent 50%)",
        }}
      />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Event <span className="eic-text-gradient">Playlist</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[hsl(0_0%_70%)]">
            Five unique challenges. One epic journey. Choose your track and make
            your mark.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              title={event.title}
              subtitle={event.subtitle}
              mode={event.mode}
              image={event.image}
              index={index}
              description={event.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
