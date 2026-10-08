/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-nullish-coalescing */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles } from "lucide-react";
import api from "@/lib/api";
import { blogSlug } from "@/lib/utils";
import fallbackBlogs from "@/data/blogs.json";

interface BlogItem {
  id: string;
  title: string;
  intro?: string;
  description?: string;
  content?: string;
  writerName?: string;
  author?: string;
  role?: string;
  writerPic?: string;
  avatar?: string;
  topicPic?: string;
  image?: string;
  timeStamp?: string;
  createdAt?: string;
  date?: string;
  tag?: string;
  tags?: string[];
  isAccepted?: boolean;
  likes?: string[] | number;
}

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchApprovedBlogs = async () => {
      try {
        const { data } = await api.get("/api/blog/acceptedBlogs");
        const apiBlogs = data.data ?? data;

        if (Array.isArray(apiBlogs) && apiBlogs.length > 0) {
          if (isMounted) {
            setBlogs(apiBlogs);
          }
          return;
        }
      } catch {
        // Backend offline or endpoint unavailable: fallback gracefully
      }

      if (isMounted) {
        // Use verified fallback blogs with newest blogs at the top
        setBlogs(fallbackBlogs as unknown as BlogItem[]);
      }
    };

    void fetchApprovedBlogs().finally(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Show top 3 featured blogs on landing page
  const featuredBlogs = blogs.slice(0, 3);

  return (
    <section
      id="blogs"
      className="relative overflow-hidden bg-[#020617] py-16 md:py-24 lg:py-28"
    >
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 -bottom-40 -z-10 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-semibold tracking-wider text-blue-300 uppercase">
                The Startup Chronicles
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Latest from our{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Blogs
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base"
            >
              Deep dives into deep-tech, regional innovations, entrepreneurship,
              and policy from NIT Silchar and beyond.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]"
            >
              <span>View All Blogs</span>
              <ArrowRight className="h-4 w-4 text-blue-400 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-96 animate-pulse rounded-3xl border border-white/5 bg-white/5"
                />
              ))
            : featuredBlogs.map((blog, idx) => {
                const title = blog.title || "Untitled Blog";
                const excerpt =
                  blog.intro ||
                  blog.description ||
                  "Read more about this story...";
                const authorName =
                  blog.writerName || blog.author || "E-Cell NITS";
                const authorAvatar =
                  blog.writerPic || blog.avatar || "/ecelllogo.png";
                const role = blog.role || "Contributor";
                const coverImage =
                  blog.topicPic ||
                  blog.image ||
                  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&q=80&w=1200";

                const rawDate = blog.timeStamp || blog.createdAt || blog.date;
                const formattedDate = rawDate
                  ? new Date(rawDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Latest";

                const tagList = Array.isArray(blog.tags)
                  ? blog.tags
                  : typeof blog.tag === "string"
                    ? blog.tag.split(",").map((t) => t.trim())
                    : ["Innovation"];

                return (
                  <motion.div
                    key={blog.id || idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12, duration: 0.6 }}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)]"
                  >
                    {/* Cover Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-900">
                      <Image
                        src={coverImage}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />

                      {/* Top Tag Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {tagList.slice(0, 2).map((t, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="rounded-full border border-blue-400/30 bg-black/60 px-3 py-1 text-[10px] font-bold tracking-wider text-blue-300 uppercase backdrop-blur-md"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="flex flex-1 flex-col pt-5">
                      {/* Meta Info (Date & Read Time) */}
                      <div className="mb-3 flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-blue-400" />
                          {formattedDate}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-blue-400" />5 min
                          read
                        </span>
                      </div>

                      {/* Title */}
                      <Link href={blogSlug(title)}>
                        <h3 className="line-clamp-2 text-lg leading-snug font-bold text-white transition-colors duration-200 group-hover:text-blue-400 sm:text-xl">
                          {title}
                        </h3>
                      </Link>

                      {/* Intro Excerpt */}
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-400">
                        {excerpt}
                      </p>

                      {/* Footer / Author & CTA */}
                      <div className="mt-auto pt-6">
                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/20 bg-blue-500/10">
                              <Image
                                src={authorAvatar}
                                alt={authorName}
                                fill
                                sizes="32px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-white">
                                {authorName}
                              </span>
                              <span className="text-[10px] text-gray-500">
                                {role}
                              </span>
                            </div>
                          </div>

                          <Link
                            href={blogSlug(title)}
                            className="flex items-center gap-1 text-xs font-bold text-blue-400 transition-colors hover:text-blue-300"
                          >
                            <span>Read</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-blue-950/20 px-6 py-5 text-center sm:flex-row sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Have an entrepreneurial idea or article to share?
              </p>
              <p className="text-xs text-gray-400">
                Submit your story and get published on E-Cell NIT Silchar&apos;s
                official platform.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/add_blogs"
            className="shrink-0 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            Submit an Article
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
