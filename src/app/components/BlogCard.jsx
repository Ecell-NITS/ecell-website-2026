// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogCard({ blog }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes ?? 0);

  const words = blog.description.split(" ").length;
  const readTime = Math.ceil(words / 200);
  function handleLike() {
    if (!liked) {
      setLikesCount((c) => c + 1);
    } else {
      setLikesCount((c) => c - 1);
    }
    setLiked(!liked);
  }

  return (
    <motion.div
      className="group relative"
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="absolute inset-0 rounded-[2rem] bg-blue-400/20 bg-blue-500/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>

      <div className="glass flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/5 transition-all duration-500 hover:border-blue-500/20">
        {/* IMAGE */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="h-full w-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
          />

          <div className="absolute top-4 left-4 flex gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-black tracking-widest text-blue-400 uppercase backdrop-blur-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-grow flex-col p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 p-0.5">
              <img
                src={blog.avatar}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{blog.author}</p>
              <p className="text-[10px] tracking-wider text-gray-500 uppercase">
                {blog.role}
              </p>
            </div>
          </div>

          <h3 className="mb-4 text-2xl leading-tight font-black text-white transition-colors group-hover:text-blue-400">
            {blog.title}
          </h3>

          <p className="mb-8 flex-grow text-sm leading-relaxed text-gray-400">
            {blog.description}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Like button */}
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 transition-all ${
                    liked ? "text-rose-500" : "text-gray-500"
                  } hover:text-rose-500`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={liked ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${liked ? "scale-110" : "scale-100"}`}
                  >
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                  </svg>

                  <span className="text-xs font-bold">{likesCount}</span>
                </button>

                {/* Read time */}
                <div className="flex items-center gap-2 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 6v6l4 2" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span className="text-xs font-bold">{readTime} min read</span>
                </div>
              </div>
            </div>

            <Link
              href={`/blog/${blog.id}`}
              className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-blue-500 uppercase transition-colors group-hover:text-white"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
