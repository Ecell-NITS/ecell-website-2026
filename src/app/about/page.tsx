import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "../../components/Landing/Navbar";
import Background from "../../components/Landing/Background";
import MottoSection from "../../components/About/MottoSection";
import PillarsSection from "../../components/About/PillarsSection";

const Achievements = dynamic(
  () => import("../../components/Landing/Achievements"),
);
const History = dynamic(() => import("../../components/Landing/History"));
const Footer = dynamic(() => import("../../components/Landing/Footer"));

export const metadata: Metadata = {
  title: "About Us | E-Cell NIT Silchar",
  description:
    "Learn about Entrepreneurship Cell, NIT Silchar — our mission to foster innovation, our motto, faculty pillars, achievements, and our journey since 2012.",
  openGraph: {
    title: "About Us | E-Cell NIT Silchar",
    description:
      "Entrepreneurship Cell, NIT Silchar — Fostering Innovation, Building Entrepreneurs.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] font-sans text-white selection:bg-blue-500/30">
      <Background />
      <Navbar />

      <div className="relative z-10 flex flex-col pt-20 xl:pt-32">
        {/* Header Section — Server-rendered for fast LCP */}
        <header className="w-full py-10 lg:py-32">
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
        </header>

        {/* Interactive sections — Client Components */}
        <MottoSection />
        <PillarsSection />

        {/* Below-fold sections — Dynamically imported */}
        <Achievements />
        <History />

        <Footer />
      </div>
    </main>
  );
}
