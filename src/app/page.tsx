import Background from "../components/Background";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import About from "../components/About";
import Events from "../components/Events";
import Timeline from "../components/Timeline";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Speakers from "~/components/Speakers";
import DirectorsMessage from "~/components/DirectorsMessage";
import FaqSection from "~/components/FaqSection";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      <Background />
      <Navbar />
      <div className="relative z-10 flex flex-col pt-0 xl:pt-20">
        <Hero />
        <Partners />
        <About />
        <DirectorsMessage />
        <Speakers />
        <Events />
        <Timeline />
        <Testimonials />
        <FaqSection />
        <ContactForm />
        <Footer />
      </div>
    </main>
  );
}
