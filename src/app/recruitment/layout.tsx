import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruitment | E-Cell NIT Silchar",
  description:
    "Apply to join the E-Cell NIT Silchar team. Tech and non-tech positions available for 2026.",
};

import Navbar from "@/components/Landing/Navbar";

export default function RecruitmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <Navbar />
      {children}
    </main>
  );
}
