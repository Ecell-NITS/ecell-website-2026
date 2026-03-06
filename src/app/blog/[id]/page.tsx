import type { Metadata } from "next";
import Navbar from "../../../components/Landing/Navbar";
import Footer from "../../../components/Landing/Footer";
import BackButton from "../../../components/Blogs/BackButton";
import BlogDetailClient from "./BlogDetailClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

interface BlogData {
  id: string;
  title: string;
  intro?: string;
  content?: string;
  tag?: string;
  writerName?: string;
  writerPic?: string;
  topicPic?: string;
  timeStamp?: string;
  text?: string;
  subject?: string;
}

async function fetchBlog(slug: string): Promise<BlogData | null> {
  try {
    const res = await fetch(`${API_URL}/api/blog/getBySlug/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: BlogData };
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    return { title: "Blog | E-Cell NIT Silchar" };
  }

  const description =
    (blog.intro ?? blog.subject ?? blog.text ?? "").slice(0, 160) ||
    `Read "${blog.title}" on E-Cell NIT Silchar blog.`;

  const ogImage = blog.topicPic ?? "https://ecellnits.org/ecelllogo.png";

  return {
    title: blog.title,
    description,
    authors: blog.writerName ? [{ name: blog.writerName }] : undefined,
    openGraph: {
      title: `${blog.title} | E-Cell NIT Silchar`,
      description,
      type: "article",
      publishedTime: blog.timeStamp ?? undefined,
      authors: blog.writerName ? [blog.writerName] : undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;

  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <Navbar />
      <section className="pt-24">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <div className="animate-[fadeIn_0.6s_ease-out_forwards] opacity-0">
            <BackButton />
          </div>
        </div>
      </section>
      <BlogDetailClient slug={slug} />
      <Footer />
    </main>
  );
}
