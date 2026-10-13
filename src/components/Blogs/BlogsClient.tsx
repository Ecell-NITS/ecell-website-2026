/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-floating-promises, @typescript-eslint/prefer-nullish-coalescing */
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import BlogCard from "./BlogCard";
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
  createdAt?: string;
  likes?: string[];
  authorId?: string;
  status?: string;
  _count?: { comments?: number };
}

const FALLBACK_BLOGS: ApiBlog[] = [
  {
    id: "nit-silchar-semiconductor-chip",
    title: "NIT Silchar's Semiconductor Chip: Innovation from the Northeast",
    intro: "Semiconductors are at the heart of almost every modern technology. NIT Silchar has contributed through indigenous chip design and semiconductor research.",
    content: "When we think about semiconductors, we often think about massive manufacturing facilities. But innovation begins in college labs. At NIT Silchar, research has moved into actual chip development, including an indigenously designed bio-sensor chip showcased at SEMICON India 2025.",
    writerName: "E-Cell Team",
    tag: "Semiconductors, Innovation, NIT Silchar, Technology",
    createdAt: new Date().toISOString(),
  },
  {
    id: "entrepreneurship-ecosystem-nits",
    title: "Building a Startup Culture in NIT Silchar",
    intro: "Exploring the growth of student startups, incubation support, and entrepreneurial initiatives fostered by E-Cell NITS.",
    content: "Entrepreneurship at NIT Silchar is thriving. With dedicated mentorship, hackathons, and funding support, students are converting innovative engineering projects into scalable market solutions.",
    writerName: "E-Cell Editorial",
    tag: "Startups, E-Cell, Entrepreneurship, Mentorship",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

export default function BlogsClient() {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response: any = await api.get("/api/blog/acceptedBlogs");
        const apiData = response?.data?.data ?? response?.data ?? [];
        
        const combined = Array.isArray(apiData) && apiData.length > 0
          ? [...apiData, ...FALLBACK_BLOGS]
          : FALLBACK_BLOGS;
          
        setBlogs(combined);
      } catch {
        setBlogs(FALLBACK_BLOGS);
      } finally {
        setLoading(false);
      }
    };
    void fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        (blog.intro?.toLowerCase().includes(query) ?? false) ||
        (blog.tag?.toLowerCase().includes(query) ?? false),
    );
    const sorted = [...filtered];
    switch (sortBy) {
      case "Most Liked":
        sorted.sort((a, b) => (b.likes?.length ?? 0) - (a.likes?.length ?? 0));
        break;
      case "Trending":
      case "Latest":
      default:
        sorted.sort((a, b) => {
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bTime - aTime;
        });
        break;
    }
    return sorted;
  }, [blogs, searchQuery, sortBy]);

  const handleSortSelect = useCallback((option: string) => {
    setSortBy(option);
    setSortOpen(false);
  }, []);

  const handleToggleSort = useCallback(() => {
    setSortOpen((prev) => !prev);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <>
      <section className="relative z-20 border-b border-white/5 pt-32 pb-16 md:py-40">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
          <div className="mb-8 inline-flex rounded-full bg-blue-500/5 px-4 py-2 ring-1 ring-blue-500/30">
            <span className="text-[10px] font-semibold tracking-widest text-blue-400 uppercase">INSIGHTS FROM THE ECOSYSTEM</span>
          </div>
          <div className="mb-12">
            <h1 className="mb-2 text-4xl font-black tracking-tight text-white md:text-6xl lg:text-8xl">The Startup<br />Chronicles</h1>
            <p className="max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">Stories, insights, and learnings from the entrepreneurial journey.</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="group relative w-full sm:w-96">
              <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" size={18} />
              <input type="text" placeholder="Search blogs..." value={searchQuery} onChange={handleSearchChange} className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pr-4 pl-12 text-sm text-white placeholder-gray-500 outline-none" />
            </div>
            <div className="relative">
              <button onClick={handleToggleSort} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white">
                Sort: {sortBy} <ChevronDown size={16} className={sortOpen ? "rotate-180" : ""} />
              </button>
              {sortOpen && (
                <div className="absolute top-14 right-0 z-50 w-40 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1e]">
                  {["Latest", "Most Liked", "Trending"].map((option) => (
                    <button key={option} onClick={() => handleSortSelect(option)} className="block w-full px-6 py-3 text-left text-sm font-medium text-gray-300 hover:bg-blue-500/10 hover:text-blue-400">{option}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (<div key={i} className="h-96 animate-pulse rounded-3xl bg-white/5" />))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} isLoggedIn={!!user} initialLiked={!!(user && blog.likes?.includes(String(user.id)))} blog={{
                  id: blog.id, title: blog.title, description: blog.intro ?? "", fullContent: blog.content ?? blog.intro ?? "", author: blog.writerName ?? "Anonymous", role: "Contributor", readTime: "5 min read", likes: blog.likes?.length ?? 0, tags: blog.tag ? blog.tag.split(",").map((t) => t.trim()) : [], image: blog.topicPic ?? blog.coverImage ?? "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&q=80&w=600", avatar: blog.writerPic ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.writerName ?? "A")}&background=3b82f6&color=fff&size=80`
                }} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-gray-400">No blogs found.</div>
          )}
        </div>
      </section>
    </>
  );
}