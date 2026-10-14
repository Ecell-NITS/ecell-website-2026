"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "@/components/Blogs/BlogCard";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface ApiBlog {
  id: string;
  title: string;
  intro?: string;
  tag?: string;
  content?: string;
  writerName?: string;
  coverImage?: string;
  topicPic?: string;
  writerPic?: string;
  likes?: string[];
}

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response: unknown = await api.get("/api/blog/acceptedBlogs");

const blogsData: unknown =
  typeof response === "object" &&
  response !== null &&
  "data" in response
    ? response.data
    : response;

if (Array.isArray(blogsData)) {
  setBlogs(blogsData as ApiBlog[]);
} else if (
  typeof blogsData === "object" &&
  blogsData !== null &&
  "data" in blogsData &&
  Array.isArray(blogsData.data)
) {
  setBlogs(blogsData.data as ApiBlog[]);
} else {
  setBlogs([]);
}
      } catch (error) {
        console.error("Failed to fetch approved blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchBlogs();
  }, []);

  return (
    <section className="bg-[#020617] px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-400">
          E-Cell Blog
        </p>

        <h2 className="mb-3 text-3xl font-bold">The Startup Chronicles</h2>

        <p className="mb-8 text-gray-400">
          Stories of innovation, technology, and entrepreneurship.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="mb-2 text-sm text-blue-400">
              Technology · NIT Silchar
            </p>
            <h3 className="mb-3 text-xl font-bold">
              NIT Silchar’s Semiconductor Chip: Innovation from the Northeast
            </h3>
            <p className="mb-5 text-sm leading-6 text-gray-400">
              Discover how semiconductor innovation highlights the potential of
              technology and research in Northeast India.
            </p>
            <Link
              href="/blogs/semiconductor-chip"
              className="font-semibold text-blue-400 hover:text-white"
            >
              Read Article →
            </Link>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="mb-2 text-sm text-blue-400">
              Entrepreneurship · Northeast India
            </p>
            <h3 className="mb-3 text-xl font-bold">
              Entrepreneurship Beyond the Metro: Opportunities in the Northeast
            </h3>
            <p className="mb-5 text-sm leading-6 text-gray-400">
              Discover how students and founders can turn local challenges into
              meaningful business opportunities.
            </p>
            <Link
              href="/blogs/entrepreneurship-northeast"
              className="font-semibold text-blue-400 hover:text-white"
            >
              Read Article →
            </Link>
          </article>
        </div>

        {!loading && blogs.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                isLoggedIn={!!user}
                initialLiked={!!(user && blog.likes?.includes(String(user.id)))}
                blog={{
                  id: blog.id,
                  title: blog.title,
                  description: blog.intro ?? "",
                  fullContent: blog.content ?? blog.intro ?? "",
                  author: blog.writerName ?? "Anonymous",
                  role: "Contributor",
                  readTime: "5 min read",
                  likes: blog.likes?.length ?? 0,
                  tags: blog.tag
                    ? blog.tag.split(",").map((tag) => tag.trim())
                    : [],
                  image:
                    blog.topicPic ??
                    blog.coverImage ??
                    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&q=80&w=600",
                  avatar:
                    blog.writerPic ??
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      blog.writerName ?? "A",
                    )}&background=3b82f6&color=fff&size=80`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
