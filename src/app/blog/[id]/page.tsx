"use client";
import { useRouter } from "next/navigation";

import blogs from "../../data/blogs.json";
import { motion } from "framer-motion";
import { use } from "react";

export default function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const { id } = use(params);

  const blog = blogs.find((b) => b.id === Number(id));
  const formattedDate = new Date(blog.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (!blog) {
    return <div className="p-10 text-white">Blog not found</div>;
  }

  const readTime = Math.ceil(blog.description.split(" ").length / 200);

  return (
    <div className="flex min-h-screen flex-col gap-2 bg-[#020617] pt-30 pb-40 lg:flex-row">
      <motion.div
        className="mx-auto max-w-5xl bg-[#020617] px-4 py-30 md:px-8 lg:px-12"
        variants={{
          hidden: { opacity: 0, y: 30 },
          show: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <button
          onClick={() => router.push("/")}
          className="group mb-12 flex items-center gap-3 text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase transition-all hover:text-white"
          style={{ opacity: 1, transform: "none" }}
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
          Back to Insights
        </button>

        <div style={{ opacity: 1, transform: "none" }}>
          <div className="mb-12">
            {/* Tags */}
            <div className="mb-8 flex flex-wrap gap-3">
              {blog.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="glass rounded-full border border-blue-500/20 px-4 py-1.5 text-[9px] font-black tracking-widest text-blue-400 uppercase"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="mb-10 text-4xl leading-[1.1] font-black tracking-tighter text-white md:text-7xl">
              {blog.title}
            </h1>

            {/* Author */}
            <div className="flex flex-wrap items-center gap-8 border-y border-white/5 py-8">
              <div className="flex items-center gap-4">
                <img
                  className="h-14 w-14 rounded-full border border-white/10 object-cover p-1"
                  src={blog.author}
                  alt="author"
                />
                <div className="gap-6">
                  <p className="text-base font-bold text-white">
                    {blog.author}
                  </p>
                  <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                    {blog.role}
                  </p>
                </div>
                <div className="ml-auto flex gap-8 text-gray-500">
                  <div className="flex items-center gap-2">
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

                    <span className="text-xs font-bold tracking-widest uppercase">
                      {formattedDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
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

                    <span className="text-xs font-bold tracking-widest uppercase">
                      {readTime} min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="prose prose-invert max-w-none space-y-8 text-lg leading-relaxed font-light text-gray-400 md:text-xl">
              <div className="glass relative mb-12 aspect-video overflow-hidden rounded-[2.5rem] border border-white/10">
                <img
                  alt=""
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&q=80&w=800"
                />
              </div>

              <p className="mb-12 text-2xl leading-relaxed font-medium text-white italic">
                {blog.description}
              </p>

              <p>{blog.details}</p>

              <h2 className="pt-8 text-3xl font-black tracking-tight text-white uppercase">
                Key Takeaways
              </h2>

              <p>{blog.details2}</p>

              <div className="glass rounded-3xl border-l-4 border-blue-600 bg-white/5 p-10 text-xl text-white italic">
                &ldquo;{blog.highlight}&rdquo;
              </div>

              <p>{blog.details3}</p>
            </div>
            <div className="mt-24 flex flex-wrap items-center justify-between gap-8 border-t border-white/5 pt-12">
              {/* Like & Share buttons */}
              <div className="flex items-center gap-6">
                <button className="glass flex items-center gap-3 rounded-2xl border border-white/10 px-8 py-4 text-rose-500 transition-all hover:bg-rose-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-heart"
                  >
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                  </svg>
                  <span className="font-bold">0</span>
                </button>

                <button className="glass flex items-center gap-3 rounded-2xl border border-white/10 px-8 py-4 text-blue-500 transition-all hover:bg-blue-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-share-2"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  <span className="font-bold">Share</span>
                </button>
              </div>

              {/* Social buttons */}
              <div className="flex gap-4">
                <button className="glass flex h-14 w-14 items-center justify-center rounded-2xl text-gray-500 transition-all hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                    aria-hidden="true"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </button>
                <button className="glass flex h-14 w-14 items-center justify-center rounded-2xl text-gray-500 transition-all hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </button>
                <button className="glass flex h-14 w-14 items-center justify-center rounded-2xl text-gray-500 transition-all hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                    aria-hidden="true"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:w-1/3 lg:px-12">
        <div
          className="sticky top-32 space-y-12"
          style={{ opacity: 1, transform: "none" }}
        >
          {/* Author Card */}
          <div className="glass rounded-[3rem] border border-white/10 p-10">
            <h4 className="mb-8 text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase">
              Author Details
            </h4>

            <div className="mb-8 flex items-center gap-5">
              <img
                className="h-20 w-20 rounded-2xl object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&q=80&w=150"
                alt="author"
              />
              <div>
                <h5 className="text-xl font-bold text-white">{blog.author}</h5>
                <p className="text-[10px] font-black tracking-widest text-blue-400 uppercase">
                  {blog.role}
                </p>
              </div>
            </div>

            <div className="mb-10 space-y-4">
              {/* LinkedIn */}
              <a
                href="#"
                className="group flex items-center gap-4 text-gray-400 transition-colors hover:text-white"
              >
                <div className="glass flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 group-hover:border-blue-500/30">
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
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <span className="text-xs font-bold">/in/ananyasharma</span>
              </a>

              {/* Twitter */}
              <a
                href="#"
                className="group flex items-center gap-4 text-gray-400 transition-colors hover:text-white"
              >
                <div className="glass flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 group-hover:border-blue-500/30">
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
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </div>
                <span className="text-xs font-bold">@ananya</span>
              </a>

              {/* GitHub */}
              <a
                href="#"
                className="group flex items-center gap-4 text-gray-400 transition-colors hover:text-white"
              >
                <div className="glass flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 group-hover:border-blue-500/30">
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
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </div>
                <span className="text-xs font-bold">github.com/ananya</span>
              </a>
            </div>

            <button className="glass w-full rounded-2xl border border-blue-500/20 py-5 text-[10px] font-black tracking-widest text-blue-400 uppercase transition-all hover:bg-blue-600 hover:text-white">
              View Full Profile
            </button>
          </div>

          {/* Comments Section */}
          <div className="glass rounded-[3rem] border border-white/10 p-10">
            <div className="mb-8 flex items-center justify-between">
              <h4 className="flex items-center gap-3 text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase">
                Comments (2)
              </h4>
            </div>

            <form className="mb-10">
              <textarea
                placeholder="Write a comment..."
                className="min-h-[120px] w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white transition-all focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 text-[10px] font-black tracking-widest text-white uppercase transition-all hover:shadow-[0_10px_30px_rgba(37,99,235,0.3)]"
              >
                Post Comment
              </button>
            </form>

            {/* Comments list */}
            <div className="space-y-8">
              {[
                {
                  name: "Ishaan Gupta",
                  time: "2 hours ago",
                  text: "This breakdown of the seed round was incredibly helpful! Looking forward to more content on Series A.",
                  avatar: "https://i.pravatar.cc/150?u=ishaan",
                },
                {
                  name: "Sarah Jenkins",
                  time: "5 hours ago",
                  text: "The point about investor psychology is often overlooked. Great read!",
                  avatar: "https://i.pravatar.cc/150?u=sarah",
                },
              ].map((comment, idx) => (
                <div key={idx} className="group">
                  <div className="mb-3 flex gap-4">
                    <img
                      className="h-10 w-10 rounded-xl object-cover"
                      src={comment.avatar}
                      alt={comment.name}
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-white">
                          {comment.name}
                        </h5>
                        <span className="text-[10px] text-gray-600">
                          {comment.time}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">
                        {comment.text}
                      </p>
                    </div>
                  </div>

                  <div className="ml-14 flex items-center gap-4">
                    <button className="text-[9px] font-black tracking-widest text-gray-600 uppercase hover:text-blue-400">
                      Reply
                    </button>
                    <button className="text-[9px] font-black tracking-widest text-gray-600 uppercase hover:text-rose-400">
                      Like
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
