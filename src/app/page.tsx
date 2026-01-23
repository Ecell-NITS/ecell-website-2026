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

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      <Background />
      <Navbar />
      <div className="relative z-10 flex flex-col pt-0 xl:pt-20">
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
