"use client";

import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import Alumni from "@/components/Teampage/Alumni/Alumni";

export default function AlumniPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <Navbar />
      <div className="pt-20">
        <Alumni />
      </div>
      <Footer />
    </main>
  );
}
