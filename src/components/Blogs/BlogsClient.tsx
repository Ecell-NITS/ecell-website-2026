/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-floating-promises, @typescript-eslint/prefer-nullish-coalescing */
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import BlogCard from "./BlogCard";
import api from "@/lib/api";

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
  createdAt?: string;
  likes?: number;
  _count?: { comments?: number };
}

export default function BlogsClient() {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get("/api/blog/acceptedBlogs");
        const blogsData = data.data ?? data ?? [];
        setBlogs(Array.isArray(blogsData) ? blogsData : []);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        toast.error(error.response?.data?.message ?? "Failed to load blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.intro?.toLowerCase().includes(query) ||
        blog.tag?.toLowerCase().includes(query),
    );
  }, [blogs, searchQuery]);

  const handleSortSelect = useCallback((option: string) => {
    setSortBy(option);
    setSortOpen(false);
  }, []);

  const handleToggleSort = useCallback(() => {
    setSortOpen((prev) => !prev);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [],
  );

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-white/5 pt-32 pb-16 md:py-40">
        {/* Background gradient */}
        <div className="absolute z-10 h-screen">
          <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
          {/* Insight pill */}
          <div className="mb-8 inline-flex animate-[fadeIn_0.6s_ease-out_forwards] rounded-full bg-blue-500/5 px-4 py-2 opacity-0 ring-1 ring-blue-500/30 backdrop-blur-sm">
            <span className="text-[10px] font-semibold tracking-widest text-blue-400 uppercase">
              ✨ INSIGHTS FROM THE ECOSYSTEM
            </span>
          </div>

          {/* TITLE SECTION */}
          <div className="mb-12 translate-y-8 animate-[fadeIn_0.8s_ease-out_0.1s_forwards] opacity-0">
            <h1 className="mb-2 text-4xl font-black tracking-tight text-white md:text-6xl lg:text-8xl">
              The Startup
              <br />
              Chronicles
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
              Stories, insights, and learnings from the entrepreneurial journey.
              Dive into our curated collection of thought leadership and
              real-world experiences.
            </p>
          </div>

          {/* SEARCH & FILTER */}
          <div className="flex translate-y-8 animate-[fadeIn_0.8s_ease-out_0.2s_forwards] flex-col gap-4 opacity-0 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="group relative w-full sm:w-96">
              <Search
                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pr-4 pl-12 text-sm text-white placeholder-gray-500 transition-all outline-none focus:border-blue-500/40 focus:bg-blue-500/5"
              />
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={handleToggleSort}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-blue-500/40 hover:bg-blue-500/5"
              >
                Sort: {sortBy}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
                />
              </button>
              {sortOpen && (
                <div className="absolute top-14 right-0 z-50 w-40 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1e] shadow-2xl">
                  {["Latest", "Most Liked", "Trending"].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSortSelect(option)}
                      className="block w-full px-6 py-3 text-left text-sm font-medium text-gray-300 transition-colors hover:bg-blue-500/10 hover:text-blue-400"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BLOGS GRID */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-96 animate-pulse rounded-3xl bg-white/5"
                />
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog, index) => (
                <BlogCard
                  key={blog.id}
                  blog={{
                    id: Number(blog.id) || 0,
                    title: blog.title,
                    description: blog.intro ?? "",
                    author: blog.writerName ?? "Anonymous",
                    role: "Contributor",
                    readTime: "5 min read",
                    likes: blog.likes ?? 0,
                    tags: blog.tag ? [blog.tag] : [],
                    image:
                      blog.topicPic ??
                      blog.coverImage ??
                      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&q=80&w=600",
                    avatar:
                      blog.writerPic ??
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.writerName ?? "A")}&background=3b82f6&color=fff&size=80`,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-500">
                {searchQuery
                  ? "No blogs match your search."
                  : "No blogs available yet."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
