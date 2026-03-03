import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "../../components/Landing/Navbar";
import BlogsClient from "../../components/Blogs/BlogsClient";

const Footer = dynamic(() => import("../../components/Landing/Footer"), {
  loading: () => (
    <footer className="h-[400px] border-t border-white/5 bg-black" />
  ),
});

export const metadata: Metadata = {
  title: "Blogs — E-Cell NIT Silchar",
  description:
    "Read insights, stories, and guides from the entrepreneurial ecosystem at NIT Silchar. The Startup Chronicles by E-Cell.",
  openGraph: {
    title: "Blogs — E-Cell NIT Silchar",
    description:
      "Read insights, stories, and guides from the entrepreneurial ecosystem at NIT Silchar.",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <Navbar />
      <BlogsClient />
      <Footer />
    </main>
  );
}
