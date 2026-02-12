import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Landing/Navbar";
import Alumni from "@/components/Teampage/Alumni/Alumni";

const Footer = dynamic(() => import("@/components/Landing/Footer"), {
  ssr: true,
});

export const metadata: Metadata = {
  title: "Alumni | E-Cell NIT Silchar",
  description:
    "Meet the distinguished alumni of E-Cell NIT Silchar who have gone on to lead and build successful ventures across the globe.",
  openGraph: {
    title: "Alumni | E-Cell NIT Silchar",
    description:
      "Meet the distinguished alumni of E-Cell NIT Silchar who have gone on to lead and build successful ventures across the globe.",
  },
};

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
