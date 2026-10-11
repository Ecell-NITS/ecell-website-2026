import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "../../../components/Landing/Navbar";
import Footer from "../../../components/Landing/Footer";
import Background from "../../../components/Landing/Background";
import BackButton from "../../../components/Blogs/BackButton";
import BlogDetailClient from "@/components/Blogs/BlogDetailClient";

import blogsData from "@/data/blogs2.json";
import { extractApiBlogs, normalizeApiBlog, type Blog } from "@/lib/blogs";
import { blogSlug } from "@/lib/utils";

const blogs = blogsData as Blog[];

async function findBlogBySlug(slug: string): Promise<Blog | undefined> {
  const staticBlog = blogs.find(
    (blog) => blog.id === slug || blogSlug(blog.title) === slug,
  );
  if (staticBlog) {
    return staticBlog;
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    const response = await fetch(`${apiUrl}/api/blog/acceptedBlogs`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      throw new Error(`Failed to load blogs: ${response.status}`);
    }

    const apiBlogs = extractApiBlogs(await response.json()).map(
      normalizeApiBlog,
    );
    return apiBlogs.find(
      (blog) => blog.id === slug || blogSlug(blog.title) === slug,
    );
  } catch (error) {
    console.error("Failed to find published blog:", error);
    return undefined;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: slug } = await params;
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, "");

  const blog = await findBlogBySlug(normalizedSlug);

  if (!blog) {
    return {
      title: "Blog | E-Cell NIT Silchar",
    };
  }

  const description =
    blog.description.slice(0, 160) ||
    `Read "${blog.title}" on E-Cell NIT Silchar blog.`;

  return {
    title: blog.title,
    description,
    authors: [{ name: blog.author }],
    openGraph: {
      title: `${blog.title} | E-Cell NIT Silchar`,
      description,
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author],
      images: [
        {
          url: blog.image,
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
      images: [blog.image],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, "");
  const blog = await findBlogBySlug(normalizedSlug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#020617] font-sans text-white selection:bg-blue-500/30">
      <Background />
      <Navbar />

      <section className="pt-24">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <div className="animate-[fadeIn_0.6s_ease-out_forwards] opacity-0">
            <BackButton />
          </div>
        </div>
      </section>

      <BlogDetailClient blog={blog} />

      <Footer />
    </main>
  );
}
