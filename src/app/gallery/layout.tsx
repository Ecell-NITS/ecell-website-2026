import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos and memories from E-Cell NIT Silchar events, hackathons, workshops, and community gatherings.",
  openGraph: {
    title: "Gallery | E-Cell NIT Silchar",
    description:
      "Photos and memories from E-Cell NIT Silchar events and gatherings.",
    type: "website",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
