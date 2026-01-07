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

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      <Background />
      <Navbar />
      <div className="relative z-10 flex flex-col xl:pt-20">
        <Hero />
        <Partners />
        <About />
        <Events />
        <Timeline />
        <Testimonials />
        <ContactForm />
        <Footer />
      </div>
    </main>
  );
}
