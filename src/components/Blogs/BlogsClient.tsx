/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-nullish-coalescing */
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  Sparkles,
  ArrowRight,
  BookOpen,
  Clock,
  Calendar,
} from "lucide-react";
import BlogCard from "./BlogCard";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { blogSlug } from "@/lib/utils";
import fallbackBlogs from "@/data/blogs.json";

interface ApiBlog {
  id: string;
  title: string;
  intro?: string;
  tag?: string;
  tags?: string[];
  content?: string;
  writerName?: string;
  author?: string;
  role?: string;
  coverImage?: string;
  topicPic?: string;
  image?: string;
  writerPic?: string;
  avatar?: string;
  createdAt?: string;
  timeStamp?: string;
  date?: string;
  likes?: string[] | number;
  authorId?: string;
  status?: string;
  _count?: { comments?: number };
}

const CATEGORIES = [
  "All",
  "Semiconductor",
  "Investment",
  "Startups",
  "Innovation",
  "Technology",
];

export default function BlogsClient() {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get("/api/blog/acceptedBlogs");
        const blogsData = data.data ?? data ?? [];
        if (Array.isArray(blogsData) && blogsData.length > 0) {
          // Merge API blogs with fallback blogs, avoiding duplicates by title
          const existingTitles = new Set(
            blogsData.map((b: ApiBlog) => b.title?.toLowerCase().trim()),
          );
          const extraFallback = (fallbackBlogs as unknown as ApiBlog[]).filter(
            (b) => !existingTitles.has(b.title?.toLowerCase().trim()),
          );
          setBlogs([...blogsData, ...extraFallback]);
          return;
        }
      } catch {
        // Backend offline or error: fall back to local blogs
      }

      setBlogs(fallbackBlogs as unknown as ApiBlog[]);
    };

    void fetchBlogs().finally(() => {
      setLoading(false);
    });
  }, []);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const filtered = blogs.filter((blog) => {
      const title = blog.title?.toLowerCase() ?? "";
      const intro = (blog.intro ?? "").toLowerCase();
      const tagsString = (
        Array.isArray(blog.tags) ? blog.tags.join(" ") : (blog.tag ?? "")
      ).toLowerCase();

      // Search match
      const matchesSearch =
        !query ||
        title.includes(query) ||
        intro.includes(query) ||
        tagsString.includes(query);

      // Category match
      const matchesCategory =
        selectedCategory === "All" ||
        tagsString.includes(selectedCategory.toLowerCase()) ||
        title.includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });

    const sorted = [...filtered];
    switch (sortBy) {
      case "Most Liked":
        sorted.sort((a, b) => {
          const aCount = Array.isArray(a.likes)
            ? a.likes.length
            : typeof a.likes === "number"
              ? a.likes
              : 0;
          const bCount = Array.isArray(b.likes)
            ? b.likes.length
            : typeof b.likes === "number"
              ? b.likes
              : 0;
          return bCount - aCount;
        });
        break;
      case "Trending":
        sorted.sort((a, b) => {
          const aTime = a.timeStamp ?? a.createdAt;
          const bTime = b.timeStamp ?? b.createdAt;
          const aT = aTime ? new Date(aTime).getTime() : 0;
          const bT = bTime ? new Date(bTime).getTime() : 0;
          const aCount = Array.isArray(a.likes)
            ? a.likes.length
            : typeof a.likes === "number"
              ? a.likes
              : 0;
          const bCount = Array.isArray(b.likes)
            ? b.likes.length
            : typeof b.likes === "number"
              ? b.likes
              : 0;
          return bCount * 2 + bT / 1e12 - (aCount * 2 + aT / 1e12);
        });
        break;
      case "Latest":
      default:
        sorted.sort((a, b) => {
          const aTime = a.timeStamp ?? a.createdAt ?? a.date;
          const bTime = b.timeStamp ?? b.createdAt ?? b.date;
          const aT = aTime ? new Date(aTime).getTime() : 0;
          const bT = bTime ? new Date(bTime).getTime() : 0;
          return bT - aT;
        });
        break;
    }

    return sorted;
  }, [blogs, searchQuery, selectedCategory, sortBy]);

  // Featured Blogs: top approved blogs from our curated list
  const featuredBlogs = useMemo(() => {
    return blogs.slice(0, 3);
  }, [blogs]);

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
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden border-b border-white/5 pt-32 pb-16 md:pt-40 md:pb-20">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
          <div className="absolute top-1/3 right-10 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              INSIGHTS FROM THE ECOSYSTEM
            </span>
          </div>

          {/* Heading */}
          <div className="max-w-4xl">
            <h1 className="text-4xl font-black tracking-tight text-white uppercase italic sm:text-5xl md:text-6xl lg:text-7xl">
              The Startup <span className="text-blue-500">Chronicles</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
              Deep dives into deep-tech, Northeast innovation, semiconductor
              research, and venture ecosystems written by founders, students,
              and leaders.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURED BLOGS SECTION ── */}
      {featuredBlogs.length > 0 &&
        !searchQuery &&
        selectedCategory === "All" && (
          <section className="relative border-b border-white/5 bg-[#020617]/50 py-16">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold tracking-widest text-blue-400 uppercase">
                    Top Stories
                  </span>
                  <h2 className="text-2xl font-black text-white uppercase sm:text-3xl">
                    Featured <span className="text-blue-500">Articles</span>
                  </h2>
                </div>
              </div>

              {/* Featured Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredBlogs.map((blog, idx) => {
                  const title = blog.title || "Untitled Blog";
                  const excerpt = blog.intro || blog.content || "";
                  const coverImage =
                    blog.topicPic ??
                    blog.coverImage ??
                    blog.image ??
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&q=80&w=1200";
                  const authorName =
                    blog.writerName ?? blog.author ?? "E-Cell NITS";
                  const authorAvatar =
                    blog.writerPic ?? blog.avatar ?? "/ecelllogo.png";
                  const rawDate = blog.timeStamp ?? blog.createdAt ?? blog.date;
                  const formattedDate = rawDate
                    ? new Date(rawDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Latest";

                  return (
                    <motion.div
                      key={blog.id || idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="group relative flex flex-col overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-950/20 to-slate-950/60 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-500/50 hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)]"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-900">
                        <Image
                          src={coverImage}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="rounded-full border border-blue-400/40 bg-blue-600/60 px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase backdrop-blur-md">
                            FEATURED
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col pt-5">
                        <div className="mb-2 flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-blue-400" />
                            {formattedDate}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-blue-400" />5 min
                            read
                          </span>
                        </div>

                        <Link href={blogSlug(title)}>
                          <h3 className="line-clamp-2 text-lg leading-snug font-bold text-white transition-colors group-hover:text-blue-400">
                            {title}
                          </h3>
                        </Link>

                        <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-gray-400 sm:text-sm">
                          {excerpt}
                        </p>

                        <div className="mt-auto border-t border-white/10 pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="relative h-7 w-7 overflow-hidden rounded-full border border-white/20">
                                <Image
                                  src={authorAvatar}
                                  alt={authorName}
                                  fill
                                  sizes="28px"
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-xs font-semibold text-gray-300">
                                {authorName}
                              </span>
                            </div>

                            <Link
                              href={blogSlug(title)}
                              className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 transition-colors group-hover:text-blue-300"
                            >
                              <span>Read Article</span>
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

      {/* ── ALL BLOGS SECTION ── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Section Subheading & Controls */}
          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-blue-400 uppercase">
                Browse Repository
              </span>
              <h2 className="text-2xl font-black text-white uppercase sm:text-3xl">
                All <span className="text-blue-500">Blogs & Insights</span>
              </h2>
            </div>

            {/* Search and Sort controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search input */}
              <div className="group relative w-full sm:w-80">
                <Search
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search articles, tags, authors..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pr-4 pl-11 text-xs text-white placeholder-gray-500 transition-all outline-none focus:border-blue-500/40 focus:bg-blue-500/5 sm:text-sm"
                />
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={handleToggleSort}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-semibold text-white transition-all hover:border-blue-500/40 hover:bg-blue-500/5 sm:text-sm"
                >
                  Sort: {sortBy}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      sortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute top-14 right-0 z-50 w-44 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1e] shadow-2xl backdrop-blur-xl"
                    >
                      {["Latest", "Most Liked", "Trending"].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSortSelect(option)}
                          className={`block w-full px-5 py-3 text-left text-xs font-semibold transition-colors sm:text-sm ${
                            sortBy === option
                              ? "bg-blue-600/20 text-blue-400"
                              : "text-gray-300 hover:bg-blue-500/10 hover:text-white"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Category Tabs — matching Team page activeTabPill pattern */}
          <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all sm:px-5 sm:text-sm ${
                  selectedCategory === cat
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeBlogTabPill"
                    className="absolute inset-0 rounded-full border border-blue-500/50 bg-blue-600/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Blog Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-96 animate-pulse rounded-3xl border border-white/5 bg-white/5"
                />
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => {
                const userLikeId = String(user?.id ?? "");
                const isLiked = !!(
                  user &&
                  Array.isArray(blog.likes) &&
                  blog.likes.includes(userLikeId)
                );
                const likesCount = Array.isArray(blog.likes)
                  ? blog.likes.length
                  : typeof blog.likes === "number"
                    ? blog.likes
                    : 0;

                const tagList = Array.isArray(blog.tags)
                  ? blog.tags
                  : typeof blog.tag === "string"
                    ? blog.tag.split(",").map((t) => t.trim())
                    : ["Innovation"];

                return (
                  <BlogCard
                    key={blog.id}
                    isLoggedIn={!!user}
                    initialLiked={isLiked}
                    blog={{
                      id: blog.id,
                      title: blog.title,
                      description: blog.intro ?? "",
                      fullContent: blog.content ?? blog.intro ?? "",
                      author: blog.writerName ?? blog.author ?? "Anonymous",
                      role: blog.role ?? "Contributor",
                      readTime: "5 min read",
                      likes: likesCount,
                      tags: tagList,
                      image:
                        blog.topicPic ??
                        blog.coverImage ??
                        blog.image ??
                        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&q=80&w=600",
                      avatar:
                        blog.writerPic ??
                        blog.avatar ??
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          blog.writerName ?? "A",
                        )}&background=3b82f6&color=fff&size=80`,
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/5 bg-white/[0.02] py-20 text-center">
              <p className="text-base text-gray-400">
                {searchQuery || selectedCategory !== "All"
                  ? "No blogs match your filter criteria."
                  : "No blogs available yet."}
              </p>
              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 text-xs font-bold text-blue-400 hover:text-blue-300"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Bottom Write for Us Callout */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950/30 via-slate-900/40 to-indigo-950/30 p-6 sm:flex-row sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white sm:text-lg">
                  Have an article or startup story to share?
                </h4>
                <p className="text-xs text-gray-400 sm:text-sm">
                  Write for E-Cell NIT Silchar&apos;s Startup Chronicles and
                  inspire thousands of students.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/add_blogs"
              className="shrink-0 rounded-2xl bg-blue-600 px-6 py-3.5 text-xs font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
            >
              Submit an Article
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
