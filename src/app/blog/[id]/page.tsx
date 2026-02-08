"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { use } from "react";
import type { ReactElement } from "react";
import Navbar from "../../../components/Landing/Navbar";
import Footer from "../../../components/Landing/Footer";
import blogs from "../../../data/blogs.json";

interface Blog {
  id: number;
  title: string;
  author: string;
  role: string;
  date?: string;
  description: string;
  details?: string;
  details2?: string;
  details3?: string;
  highlight?: string;
  tags?: string[];
  image?: string;
  avatar?: string;
  [key: string]: unknown;
}

export default function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}): ReactElement {
  const router = useRouter();

  const { id } = use(params);

  const blog = blogs.find((b) => Number(b.id) === Number(id)) as
    | Blog
    | undefined;

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] p-10 text-white">
        Blog not found
      </div>
    );
  }

  const formattedDate = blog.date
    ? new Date(blog.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Date not available";

  const readTime = Math.ceil((blog.description?.split(" ").length ?? 0) / 200);

  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <Navbar />

      {/* Header Section */}
      <section className="relative border-b border-white/5 pt-24">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => router.push("/blogs")}
              className="group mb-8 flex items-center gap-3 text-xs font-black tracking-widest text-blue-500 uppercase transition-all hover:text-white sm:mb-12 sm:text-[10px]"
            >
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
                className="transition-transform group-hover:-translate-x-2"
                aria-hidden="true"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back to Blogs
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="space-y-6 sm:space-y-8">
              {/* Tags */}
              <div className="mb-6 flex flex-wrap gap-2 sm:mb-8 sm:gap-3">
                {blog.tags?.map((tag, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[8px] font-black tracking-widest text-blue-400 uppercase backdrop-blur-sm sm:px-4 sm:py-2 sm:text-[9px] md:text-[10px]"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl leading-tight font-black tracking-tight text-white sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
                  {blog.title}
                </h1>
              </div>

              {/* Author Meta */}
              <div className="flex flex-col items-start gap-4 border-y border-white/5 py-4 sm:gap-6 sm:py-6 md:flex-row md:items-center md:gap-8 md:py-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Image
                    className="h-10 w-10 rounded-full border border-white/10 object-cover sm:h-12 sm:w-12 md:h-14 md:w-14"
                    src={blog.avatar ?? ""}
                    alt="author"
                    width={56}
                    height={56}
                  />
                  <div>
                    <p className="text-xs font-bold text-white sm:text-sm md:text-base">
                      {blog.author}
                    </p>
                    <p className="text-[8px] font-black tracking-widest text-gray-500 uppercase sm:text-[9px] md:text-[10px]">
                      {blog.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 sm:gap-4 md:ml-auto md:flex-row md:items-center md:gap-6 lg:gap-8">
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
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                    <span className="text-[8px] font-bold tracking-widest uppercase sm:text-xs md:text-sm">
                      {formattedDate}
                    </span>
                  </div>

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
                    <span className="text-[8px] font-bold tracking-widest uppercase sm:text-xs md:text-sm">
                      {readTime} min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-8 md:py-16 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="prose prose-invert max-w-none space-y-4 text-sm leading-relaxed text-gray-400 sm:space-y-6 sm:text-base md:text-lg">
                {/* Featured Image */}
                <div className="glass relative aspect-video overflow-hidden rounded-xl border border-white/10 sm:rounded-2xl md:rounded-[2.5rem]">
                  <Image
                    alt="blog featured image"
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&q=80&w=900"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    priority
                  />
                </div>

                {/* Description */}
                <p className="text-base font-medium text-white italic sm:text-lg md:text-xl">
                  {blog.description}
                </p>

                {/* Main Content */}
                <div className="space-y-3 sm:space-y-4">
                  <p>{blog.details}</p>
                </div>

                {/* Key Takeaways */}
                <div>
                  <h2 className="mt-6 mb-3 text-lg font-black tracking-tight text-white uppercase sm:mt-8 sm:mb-4 md:text-2xl lg:text-3xl">
                    Key Takeaways
                  </h2>
                  <p>{blog.details2}</p>
                </div>

                {/* Highlight Quote */}
                {blog.highlight && (
                  <div className="glass my-6 rounded-lg border-l-4 border-blue-600 bg-white/5 p-4 text-base text-white italic sm:my-8 sm:rounded-2xl sm:p-6 md:rounded-3xl md:p-10 md:text-lg lg:text-xl">
                    &ldquo;{blog.highlight}&rdquo;
                  </div>
                )}

                {/* More Content */}
                <div className="space-y-3 sm:space-y-4">
                  <p>{blog.details3}</p>
                </div>

                {/* Engagement Section */}
                <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 sm:gap-6 sm:pt-8 md:mt-12 md:flex-row md:items-center md:gap-8 md:pt-12">
                  {/* Like & Share buttons */}
                  <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-3 md:w-auto">
                    <button className="glass flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-rose-500 transition-all hover:bg-rose-500/10 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm md:rounded-2xl md:px-8 md:py-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                      </svg>
                      <span>Like</span>
                    </button>

                    <button className="glass flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-blue-500 transition-all hover:bg-blue-500/10 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm md:rounded-2xl md:px-8 md:py-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                      <span>Share</span>
                    </button>
                  </div>

                  {/* Social buttons */}
                  <div className="flex gap-2 sm:gap-3">
                    <button className="glass flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 text-gray-500 transition-all hover:border-blue-500/20 hover:text-white sm:h-10 sm:w-10 sm:rounded-xl md:h-12 md:w-12 md:rounded-2xl">
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
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </button>
                    <button className="glass flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 text-gray-500 transition-all hover:border-blue-500/20 hover:text-white sm:h-10 sm:w-10 sm:rounded-xl md:h-12 md:w-12 md:rounded-2xl">
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
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </button>
                    <button className="glass flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 text-gray-500 transition-all hover:border-blue-500/20 hover:text-white sm:h-10 sm:w-10 sm:rounded-xl md:h-12 md:w-12 md:rounded-2xl">
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
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:sticky lg:top-32"
            >
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {/* Author Card */}
                <div className="glass rounded-lg border border-white/10 p-4 backdrop-blur-md sm:rounded-2xl sm:p-6 md:rounded-[2.5rem] md:p-10">
                  <h4 className="mb-3 text-[8px] font-black tracking-widest text-gray-500 uppercase sm:mb-4 sm:text-[9px] md:mb-8 md:text-[10px]">
                    ✨ About Author
                  </h4>

                  <div className="mb-4 flex items-center gap-3 sm:mb-6 md:mb-8">
                    <Image
                      className="h-12 w-12 rounded-lg object-cover sm:h-14 sm:w-14 sm:rounded-xl md:h-20 md:w-20 md:rounded-2xl"
                      src={blog.avatar ?? ""}
                      alt="author"
                      width={80}
                      height={80}
                    />
                    <div>
                      <h5 className="text-xs font-bold text-white sm:text-sm md:text-lg">
                        {blog.author}
                      </h5>
                      <p className="text-[7px] font-black tracking-widest text-blue-400 uppercase sm:text-[8px] md:text-[10px]">
                        {blog.role}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 space-y-2 sm:mb-6 md:mb-10 md:space-y-4">
                    {[
                      { text: "/in/ananyasharma" },
                      { text: "@ananya" },
                      { text: "github.com/ananya" },
                    ].map((link, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-white sm:gap-3 md:gap-4"
                      >
                        <div className="glass flex h-8 w-8 items-center justify-center rounded border border-white/10 group-hover:border-blue-500/30 sm:h-9 sm:w-9 sm:rounded-lg md:h-10 md:w-10 md:rounded-xl">
                          <span className="text-[7px] font-bold sm:text-[8px] md:text-[10px]">
                            {idx === 0 && "in"}
                            {idx === 1 && "@"}
                            {idx === 2 && "◉"}
                          </span>
                        </div>
                        <span className="text-[7px] font-bold sm:text-[8px] md:text-xs">
                          {link.text}
                        </span>
                      </a>
                    ))}
                  </div>

                  <button className="glass w-full rounded-lg border border-blue-500/20 py-2 text-[7px] font-black tracking-widest text-blue-400 uppercase transition-all hover:bg-blue-600 hover:text-white sm:rounded-xl sm:py-2.5 sm:text-[8px] md:rounded-2xl md:py-4 md:text-[10px]">
                    View Full Profile
                  </button>
                </div>

                {/* Comments Section */}
                <div className="glass rounded-lg border border-white/10 p-4 backdrop-blur-md sm:rounded-2xl sm:p-6 md:rounded-[2.5rem] md:p-10">
                  <div className="mb-3 flex items-center justify-between sm:mb-4 md:mb-8">
                    <h4 className="flex items-center gap-2 text-[8px] font-black tracking-widest text-gray-500 uppercase sm:gap-3 sm:text-[9px] md:gap-3 md:text-[10px]">
                      💬 Comments (2)
                    </h4>
                  </div>

                  <form className="mb-4 space-y-2 sm:mb-6 md:mb-10 md:space-y-4">
                    <textarea
                      placeholder="Write a comment..."
                      className="min-h-20 w-full resize-none rounded border border-white/10 bg-black/40 p-2 text-[12px] text-white transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none sm:min-h-24 sm:rounded-lg sm:p-3 sm:text-xs md:min-h-30 md:rounded-2xl md:p-4 md:text-sm"
                    />
                    <button
                      type="submit"
                      className="w-full rounded border bg-blue-600 py-2 text-[7px] font-black tracking-widest text-white uppercase transition-all hover:shadow-[0_10px_30px_rgba(37,99,235,0.3)] sm:rounded-lg sm:py-2 sm:text-[8px] md:rounded-2xl md:py-3 md:text-[10px]"
                    >
                      Post Comment
                    </button>
                  </form>

                  {/* Comments list */}
                  <div className="space-y-3 sm:space-y-4 md:space-y-8">
                    {[
                      {
                        name: "Ishaan Gupta",
                        time: "2 hours ago",
                        text: "This breakdown was incredibly helpful!",
                        avatar: "https://i.pravatar.cc/150?u=ishaan",
                      },
                      {
                        name: "Sarah Jenkins",
                        time: "5 hours ago",
                        text: "Great insights on investor psychology!",
                        avatar: "https://i.pravatar.cc/150?u=sarah",
                      },
                    ].map((comment, idx) => (
                      <div key={idx} className="group">
                        <div className="mb-2 flex gap-2 sm:gap-3 md:gap-4">
                          <Image
                            className="h-7 w-7 rounded object-cover sm:h-8 sm:w-8 sm:rounded-lg md:h-10 md:w-10 md:rounded-xl"
                            src={comment.avatar}
                            alt={comment.name}
                            width={40}
                            height={40}
                          />
                          <div className="grow">
                            <div className="flex items-center justify-between gap-1">
                              <h5 className="text-[7px] font-bold text-white sm:text-[8px] md:text-xs">
                                {comment.name}
                              </h5>
                              <span className="text-[6px] text-gray-600 sm:text-[7px] md:text-[10px]">
                                {comment.time}
                              </span>
                            </div>
                            <p className="mt-1 text-[6px] leading-relaxed text-gray-400 sm:text-[7px] md:text-sm">
                              {comment.text}
                            </p>
                          </div>
                        </div>

                        <div className="ml-8 flex items-center gap-2 sm:gap-3 md:gap-4">
                          <button className="text-[6px] font-black tracking-widest text-gray-600 uppercase hover:text-blue-400 sm:text-[7px] md:text-[9px]">
                            Reply
                          </button>
                          <button className="text-[6px] font-black tracking-widest text-gray-600 uppercase hover:text-rose-400 sm:text-[7px] md:text-[9px]">
                            Like
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
