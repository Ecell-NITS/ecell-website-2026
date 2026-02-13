"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, ChevronDown } from "lucide-react";
import BlogCard from "./BlogCard";

interface Blog {
  id: number;
  title: string;
  description: string;
  author: string;
  role: string;
  readTime: string;
  likes: number;
  tags: string[];
  image: string;
  avatar: string;
  date?: string;
  details?: string;
  details2?: string;
  details3?: string;
  highlight?: string;
}

interface BlogsClientProps {
  blogs: Blog[];
}

export default function BlogsClient({ blogs }: BlogsClientProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.tags?.some((tag) => tag.toLowerCase().includes(query)),
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
              THE STARTUP
            </h1>
            <h2 className="text-4xl font-black text-blue-500 italic md:text-6xl lg:text-8xl">
              CHRONICLES
            </h2>
          </div>

          {/* SEARCH + SORT */}
          <div className="flex animate-[fadeIn_0.8s_ease-out_0.2s_forwards] flex-col gap-4 opacity-0 lg:flex-row lg:gap-6">
            {/* Search */}
            <div className="relative max-w-xl flex-1">
              <Search className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-blue-400/50" />
              <input
                type="text"
                placeholder="Search by keywords, tags..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="h-14 w-full rounded-xl border border-white/10 bg-white/5 pr-5 pl-14 text-sm text-white transition-all duration-300 outline-none placeholder:text-white/40 focus:border-blue-500/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Sort */}
            <div className="relative w-full lg:w-48">
              <button
                onClick={handleToggleSort}
                className="group flex h-14 w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium tracking-wider text-white transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10 focus:ring-2 focus:ring-blue-500/20"
              >
                <span className="text-sm">Sort: {sortBy}</span>
                <ChevronDown
                  className={`z-10 h-4 w-4 transition-transform duration-300 ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {sortOpen && (
                <div className="relative z-50 mt-2 w-full animate-[fadeIn_0.15s_ease-out_forwards] overflow-hidden rounded-xl border border-white/10 bg-white/10 opacity-0 shadow-xl ring-1 ring-white/5 backdrop-blur-md lg:absolute lg:top-full">
                  {["Latest", "Past", "Most Popular"].map((option, idx) => (
                    <button
                      key={option}
                      onClick={() => handleSortSelect(option)}
                      className={`w-full px-5 py-3 text-left text-sm text-white transition-colors duration-200 ${
                        idx !== 0 ? "border-t border-white/5" : ""
                      } hover:bg-blue-500/20`}
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

      {/* BLOG LIST SECTION */}
      <section className="relative py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
          {/* Results count */}
          <p className="mb-10 animate-[fadeIn_0.6s_ease-out_forwards] text-sm font-medium tracking-wide text-white/60 opacity-0">
            Showing {filteredBlogs.length} article
            {filteredBlogs.length !== 1 ? "s" : ""}
          </p>

          {/* BLOG GRID */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className="translate-y-8 animate-[fadeIn_0.5s_ease-out_forwards] opacity-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex animate-[fadeIn_0.6s_ease-out_forwards] flex-col items-center justify-center py-20 opacity-0">
              <p className="mb-2 text-lg text-white/60">No articles found</p>
              <p className="text-sm text-white/40">
                Try adjusting your search terms
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
