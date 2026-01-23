// @ts-nocheck
"use client";

import { useState } from "react";

export default function BlogCard({ blog }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes);

  const words = blog.description.split(" ").length;
  const readTime = Math.ceil(words / 200);

  function toggleLike() {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  }

  return (
    <div className="group w-full max-w-xl overflow-hidden rounded-3xl bg-black ring-1 ring-white/10 hover:scale-[1.02]">
      {/* Image */}
      <div className="relative h-56 group-hover:scale-100">
        <img
          src={blog.image}
          alt="blog"
          className="h-full w-full object-cover"
        />

        <div className="absolute top-4 left-4 flex gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/50 px-3 py-1 text-xs text-sky-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Author */}
        <div className="mb-4 flex items-center gap-3">
          <img
            src={blog.avatar}
            alt="author"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-white">{blog.author}</p>
            <p className="text-xs tracking-wide text-gray-500 uppercase">
              {blog.role}
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-2xl leading-tight font-bold text-white group-hover:text-blue-400">
          {blog.title}
        </h2>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-sky-200/60">
          {blog.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-sky-300">
          <div className="flex items-center gap-4 opacity-80">
            {/* Like */}
            <button
              onClick={toggleLike}
              className="flex cursor-pointer items-center gap-1"
            >
              <span className={liked ? "text-red-400" : "text-sky-200/60"}>
                {liked ? "♥" : "♡"}
              </span>
              <span>{likesCount}</span>
            </button>

            {/* Read time */}
            <span>⏱ {readTime} min read</span>
          </div>

          <button className="text-xs tracking-widest text-blue-400 uppercase hover:text-white">
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
}
