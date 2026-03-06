import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Initiatives",
  description:
    "Discover E-Cell NIT Silchar's flagship initiatives — Empresario, Startup Expo, Bidwise, Adovation, and more.",
  openGraph: {
    title: "Initiatives | E-Cell NIT Silchar",
    description: "Flagship initiatives and programs by E-Cell NIT Silchar.",
    type: "website",
  },
};

export default function InitiativesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
