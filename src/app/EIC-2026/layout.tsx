import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EIC 2026 — Entrepreneurship & Innovation Challenge",
  description:
    "The Entrepreneurship and Innovation Challenge (EIC) 2026 by E-Cell NIT Silchar — The Ultimate Business Simulation inspired by Monopoly.",
  openGraph: {
    title: "EIC 2026 | E-Cell NIT Silchar",
    description:
      "Innovate. Compete. Conquer. Step onto the high-stakes board of global business and build your empire.",
    type: "website",
    images: [
      {
        url: "/og/landing2.png",
        width: 1200,
        height: 630,
        alt: "EIC 2026 — E-Cell NIT Silchar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EIC 2026 | E-Cell NIT Silchar",
    description: "Entrepreneurship & Innovation Challenge 2026 at NIT Silchar.",
    images: ["/og/landing2.png"],
  },
};

export default function EIC2026Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Material Symbols font for Monopoly-themed icons */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      {/* Playfair Display — Classic serif matching the EIC poster */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <div className="eic2026-page dark">{children}</div>
    </>
  );
}
