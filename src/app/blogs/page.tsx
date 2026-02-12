"use client";

import blogs from "../../data/blogs.json";
import BlogCard from "../../components/Blogs/BlogCard";
import Navbar from "../../components/Landing/Navbar";
import Footer from "../../components/Landing/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";

export default function Page() {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-white/5 pt-32 pb-16 md:py-40">
        {/* Background gradient */}
        <div className="absolute z-10 h-screen">
          <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
          {/* Insight pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex rounded-full bg-blue-500/5 px-4 py-2 ring-1 ring-blue-500/30 backdrop-blur-sm"
          >
            <span className="text-[10px] font-semibold tracking-widest text-blue-400 uppercase">
              ✨ INSIGHTS FROM THE ECOSYSTEM
            </span>
          </motion.div>

          {/* TITLE SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-12"
          >
            <h1 className="mb-2 text-4xl font-black tracking-tight text-white md:text-6xl lg:text-8xl">
              THE STARTUP
            </h1>
            <h2 className="text-4xl font-black text-blue-500 italic md:text-6xl lg:text-8xl">
              CHRONICLES
            </h2>
          </motion.div>

          {/* SEARCH + SORT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4 lg:flex-row lg:gap-6"
          >
            {/* Search */}
            <div className="relative max-w-xl flex-1">
              <Search className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-blue-400/50" />
              <input
                type="text"
                placeholder="Search by keywords, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 w-full rounded-xl border border-white/10 bg-white/5 pr-5 pl-14 text-sm text-white transition-all duration-300 outline-none placeholder:text-white/40 focus:border-blue-500/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Sort */}
            <div className="relative w-full lg:w-48">
              <button
                onClick={() => setSortOpen(!sortOpen)}
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
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-white/10 shadow-xl ring-1 ring-white/5 backdrop-blur-md lg:absolute lg:top-full"
                >
                  {["Latest", "Past", "Most Popular"].map((option, idx) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setSortOpen(false);
                      }}
                      className={`w-full px-5 py-3 text-left text-sm text-white transition-colors duration-200 ${
                        idx !== 0 ? "border-t border-white/5" : ""
                      } hover:bg-blue-500/20`}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOG LIST SECTION */}
      <section className="relative py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-sm font-medium tracking-wide text-white/60"
          >
            Showing {filteredBlogs.length} article
            {filteredBlogs.length !== 1 ? "s" : ""}
          </motion.p>

          {/* BLOG GRID */}
          {filteredBlogs.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <p className="mb-2 text-lg text-white/60">No articles found</p>
              <p className="text-sm text-white/40">
                Try adjusting your search terms
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
