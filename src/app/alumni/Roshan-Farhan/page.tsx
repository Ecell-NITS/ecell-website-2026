import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Landing/Navbar";
import RoshanFarhanProfile from "@/components/Alumni/RoshanFarhanProfile";

const Footer = dynamic(() => import("@/components/Landing/Footer"), {
  ssr: true,
});

export const metadata: Metadata = {
  title: "Roshan Farhan | Alumni | E-Cell NIT Silchar",
  description:
    "Roshan Farhan — YC Founder, 2x Founder/CEO of MyriadAI & Gobillion (YC S21), Angel Investor, Startup Advisor, World Economic Forum Global Shaper, and NIT Silchar alumnus.",
  openGraph: {
    title: "Roshan Farhan | Alumni | E-Cell NIT Silchar",
    description:
      "Roshan Farhan — YC Founder, 2x Founder/CEO of MyriadAI & Gobillion (YC S21), Angel Investor, Startup Advisor, World Economic Forum Global Shaper, and NIT Silchar alumnus.",
    type: "profile",
    images: [
      {
        url: "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676307970/E-Cell%20Alumni/Modal%20Cards/RoshanFarhanSir_qhsqzk.jpg",
        width: 800,
        height: 800,
        alt: "Roshan Farhan — E-Cell NIT Silchar Alumni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roshan Farhan | Alumni | E-Cell NIT Silchar",
    description:
      "YC Founder, 2x Founder/CEO of MyriadAI & Gobillion (YC S21). NIT Silchar & IIM Shillong alumnus.",
    images: [
      "https://res.cloudinary.com/dnvhl9pru/image/upload/v1676307970/E-Cell%20Alumni/Modal%20Cards/RoshanFarhanSir_qhsqzk.jpg",
    ],
  },
};

export default function RoshanFarhanPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <Navbar />
      <RoshanFarhanProfile />
      <Footer />
    </main>
  );
}
