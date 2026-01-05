import Navbar from "~/components/layout/Navbar";
import Hero from "~/components/home/Hero";
import Marquee from "~/components/ui/Marquee";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#030014] text-white">
      <Navbar />
      <Hero />
      <div className="w-full bg-black/10 backdrop-blur-sm border-y border-white/5 py-8 relative overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">
           <Marquee />
        </div>      {/* Placeholder for future sections */}
      <section className="h-screen w-full relative z-10 flex items-center justify-center border-t border-white/5">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-700">More content coming soon...</h2>
        </div>
      </section>
    </main>
  );
}
