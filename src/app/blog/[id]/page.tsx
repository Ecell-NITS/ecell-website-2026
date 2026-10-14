import type { Metadata } from "next";
import Navbar from "../../../components/Landing/Navbar";
import Footer from "../../../components/Landing/Footer";
import BackButton from "../../../components/Blogs/BackButton";
import BlogDetailClient from "./BlogDetailClient";
import { featuredBlogs } from "@/data/featuredBlogs";
import { blogSlug } from "@/lib/utils";

const SITE_URL = "https://ecellnits.org";
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
  createdAt?: string;
  text?: string;
  subject?: string;
}

const absoluteUrl = (url: string) =>
  url.startsWith("http") ? url : `${SITE_URL}${url}`;

// Featured blogs live in the frontend, so the API would return 404 for them.
function findFeatured(slug: string) {
  return featuredBlogs.find(
    (b) => b.id === slug || blogSlug(b.title) === `/blog/${slug}`,
  );
}

async function fetchBlog(slug: string): Promise<BlogData | null> {
  const featured = findFeatured(slug);
  if (featured) return featured;
  try {
    const res = await fetch(`${API_URL}/api/blog/getBySlug/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error("fetchBlog failed:", res.url, res.status);
      return null;
    }
    const json = (await res.json()) as { data?: BlogData };
    return json.data ?? null;
  } catch (e) {
    console.error("fetchBlog error:", e);
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

  const ogImage = absoluteUrl(blog.topicPic ?? "/ecelllogo.png");
  const published = blog.timeStamp ?? blog.createdAt;

  return {
    title: blog.title,
    description,
    authors: blog.writerName ? [{ name: blog.writerName }] : undefined,
    openGraph: {
      title: `${blog.title} | E-Cell NIT Silchar`,
      description,
      type: "article",
      publishedTime: published ?? undefined,
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
  const featured = findFeatured(slug);

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
      <BlogDetailClient slug={slug} initialBlog={featured ?? null} />
      <Footer />
    </main>
  );
}
