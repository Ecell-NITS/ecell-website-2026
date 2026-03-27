import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Navbar from "@/components/Landing/Navbar";
import AlumniProfile from "@/components/Alumni/AlumniProfile";
import { alumniData } from "@/data/alumni";

const Footer = dynamic(() => import("@/components/Landing/Footer"), {
  ssr: true,
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return alumniData
    .filter((m) => m.profileSlug)
    .map((m) => ({ slug: m.profileSlug! }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = alumniData.find((m) => m.profileSlug === slug);

  if (!member) {
    return { title: "Alumni Not Found | E-Cell NIT Silchar" };
  }

  const title = `${member.name} | Alumni | E-Cell NIT Silchar`;
  const description = `${member.name} — ${member.rank}. NIT Silchar alumnus and member of the E-Cell alumni network.`;
  const image = `/api/og?title=${title}&description=${description}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      images: [
        {
          url: image,
          width: 800,
          height: 800,
          alt: `${member.name} — E-Cell NIT Silchar Alumni`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function AlumniProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const member = alumniData.find((m) => m.profileSlug === slug);

  if (!member) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <Navbar />
      <AlumniProfile member={member} />
      <Footer />
    </main>
  );
}
