import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the team behind E-Cell NIT Silchar — faculty advisors, core team members, and the developers building our platform.",
  openGraph: {
    title: "Our Team | E-Cell NIT Silchar",
    description: "Meet the people driving entrepreneurship at NIT Silchar.",
    type: "website",
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
