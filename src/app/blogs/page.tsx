"use client";

import Link from "next/link";
import blogs from "../../data/blogs.json";
import BlogCard from "../../components/Blogs/BlogCard";
import { useState } from "react";

export default function Page() {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");

  return (
    <main className="min-h-screen bg-black py-40">
      {/* PAGE WRAPPER (THIS IS KEY) */}
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
        {/* Insight pill */}
        <div className="mb-8 inline-flex rounded-full px-4 py-2 ring-2 ring-white/10">
          <h1 className="text-[10px] tracking-widest text-sky-400 uppercase">
            INSIGHTS FROM THE ECOSYSTEM
          </h1>
        </div>

        {/* TITLE SECTION */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-8xl">
            THE STARTUP
          </h1>
          <h1 className="text-3xl leading-tight font-bold text-sky-500 italic md:text-4xl lg:text-8xl">
            CHRONICLES
          </h1>
        </div>

        {/* SEARCH + SORT */}
        <div className="mb-16 flex w-full max-w-xl flex-col gap-4 lg:max-w-7xl lg:flex-row">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by keywords, tags, or"
            className="h-16 w-full rounded-2xl bg-black px-5 py-3 text-sm text-white ring-1 ring-white/20 outline-none placeholder:text-sky-300/50"
          />

          {/* Sort */}
          <div className="relative w-full max-w-xl">
            {/* Sort button */}
            <div
              onClick={() => setSortOpen(!sortOpen)}
              className="group flex cursor-pointer items-center justify-between rounded-2xl bg-black px-5 py-4 ring-1 ring-white/20"
            >
              <span className="text-xs tracking-widest text-sky-300/50 uppercase group-hover:text-white">
                Sort: {sortBy}
              </span>
              <span className="material-icons text-sm text-sky-300/50">
                expand_more
              </span>
            </div>

            {/* Dropdown */}
            {sortOpen && (
              <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl bg-blue-950 ring-1 ring-white/10">
                {["Latest", "Past", "Most Popular"].map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setSortOpen(false);
                    }}
                    className="cursor-pointer px-5 py-3 text-sm text-sky-200 hover:bg-blue-900"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BLOG LIST (mobile first) */}
        <div className="mt-10 grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </main>
  );
}
