import Background from "../components/Landing/Background";
import Navbar from "../components/Landing/Navbar";
import Hero from "../components/Landing/Hero";
import Partners from "../components/Landing/Partners";
import About from "../components/Landing/About";
import Events from "../components/Landing/Events";
import Timeline from "../components/Landing/Timeline";
import Testimonials from "../components/Landing/Testimonials";
import ContactForm from "../components/Landing/ContactForm";
import Footer from "../components/Landing/Footer";
import Speakers from "~/components/Speakers";
import DirectorsMessage from "~/components/DirectorsMessage";
import FaqSection from "~/components/FaqSection";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      <Background />
      <Navbar />
      <div className="relative z-10 flex flex-col pt-0 lg:pt-20">
        <Hero />
        <Partners />
        <About />
        <Events />
        <Speakers />
        <DirectorsMessage />
        <Timeline />
        <Testimonials />
        <FaqSection />
        <ContactForm />
        <Footer />
      </div>
    </main>
  );
}
