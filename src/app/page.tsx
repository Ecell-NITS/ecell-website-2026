"use client";

import blogs from "./data/blogs.json";
import BlogCard from "./components/BlogCard";
import SortDropdown from "./components/SortDropdown";
import { motion } from "framer-motion";

import { useState, useMemo } from "react";

export default function Page() {
  const [sortBy, setSortBy] = useState("Latest");
  const sortedBlogs = useMemo(() => {
    const copy = [...blogs];

    if (sortBy === "Latest") copy.sort((a, b) => a.id - b.id);

    if (sortBy === "Past") copy.sort((a, b) => a.id - b.id);

    if (sortBy === "Most Popular") {
      copy.sort((a, b) => b.likes - a.likes);
    }

    return copy;
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-[#020617] py-40">
      {/* PAGE WRAPPER (THIS IS KEY) */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
        {/* INSIGHT + TITLE (exact design) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-16 max-w-4xl">
            {/* Insight pill */}
            <div className="glass mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase">
              <span className="material-icons animate-pulse text-sm">
                auto_awesome
              </span>
              <span>Insights from the ecosystem</span>
            </div>

            {/* Title */}
            <h2 className="mb-6 text-5xl leading-[0.9] font-black tracking-tighter text-white uppercase md:text-8xl">
              The Startup <br />
              <span className="text-blue-500 italic">Chronicles</span>
            </h2>
          </div>
        </motion.div>

        {/* SEARCH + SORT (exact design) */}
        <div className="mb-20 flex flex-col items-center gap-6 lg:flex-row">
          {/* Search box */}
          <div className="group relative w-full flex-grow">
            {/* Search icon */}
            <div className="absolute top-1/2 left-6 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-400">
              <span className="material-icons text-[22px]">search</span>
            </div>

            <input
              type="text"
              placeholder="Search by keywords, tags, or authors..."
              className="glass w-full rounded-2xl border border-white/10 py-6 pr-8 pl-16 text-lg text-white backdrop-blur-xl transition-all placeholder:text-gray-600 focus:border-blue-500/50 focus:bg-white/[0.04] focus:outline-none"
            />
          </div>

          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        {/* BLOG LIST (mobile first) */}
        <motion.div
          className="mt-10 grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </motion.div>

        <div className="mt-40 text-center">
          <button className="group glass relative overflow-hidden rounded-2xl border border-white/10 px-20 py-8 font-black tracking-[0.4em] text-white uppercase transition-all duration-500 hover:border-blue-600 hover:bg-blue-600 active:border-blue-600 active:bg-blue-600">
            <span className="relative z-10">View All</span>

            {/* Glow layer */}
            <div className="pointer-events-none absolute inset-0 bg-blue-500/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
