import { alumniData } from "@/data/alumni";
import AlumniGrid from "./AlumniGrid";

export default function Alumni() {
  return (
    <section className="relative py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col items-center sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
          <h2 className="3xl:text-8xl 4k:text-9xl text-center text-3xl leading-none font-black tracking-tighter text-white uppercase italic sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Our Alumni
          </h2>
          <div className="mt-6 h-1 w-24 rounded-full bg-blue-600 opacity-50 shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
        </div>

        <AlumniGrid alumni={alumniData} />
      </div>
    </section>
  );
}
