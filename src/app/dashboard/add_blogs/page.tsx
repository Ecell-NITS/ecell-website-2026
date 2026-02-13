"use client";

import { useState, Suspense } from "react";
import Navbar from "@/components/Landing/Navbar";
import dynamic from "next/dynamic";

// Lazy load TipTap editors to reduce initial bundle size
const TipTapEditors = dynamic(
  () =>
    import("@/components/Dashboard/TipTapEditor").then((mod) => ({
      default: ({
        onIntroChange,
        onContentChange,
      }: {
        onIntroChange: (html: string) => void;
        onContentChange: (html: string) => void;
      }) => (
        <>
          <div className="flex flex-col gap-3">
            <label className="text-xl font-semibold text-slate-200">
              Brief Introduction
              <span className="mt-1 block text-sm font-normal text-slate-500">
                A short summary (40-50 words) to hook your readers
              </span>
            </label>
            <mod.TipTapIntroEditor content="" onUpdate={onIntroChange} />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xl font-semibold text-slate-200">
              Main Content
            </label>
            <mod.TipTapContentEditor content="" onUpdate={onContentChange} />
          </div>
        </>
      ),
    })),
  {
    ssr: false,
    loading: () => (
      <>
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold text-slate-200">
            Brief Introduction
          </label>
          <div className="min-h-[160px] animate-pulse rounded-xl border border-white/10 bg-black/20"></div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold text-slate-200">
            Main Content
          </label>
          <div className="min-h-[340px] animate-pulse rounded-xl border border-white/10 bg-black/20"></div>
        </div>
      </>
    ),
  },
);

export default function AddBlogs() {
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const handlePublish = () => {
    // Log the values to satisfy linter that they are used
    console.log({ title, tags, intro, content });
  };

  return (
    <div className="min-h-screen bg-[#020617] font-sans text-white selection:bg-blue-500/30 selection:text-white">
      <Navbar />

      <main className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        {/* Background Decorative Elements */}
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full max-w-7xl -translate-x-1/2">
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>
          <div className="absolute right-[-10%] bottom-[-10%] h-[30%] w-[30%] rounded-full bg-purple-600/10 blur-[120px]"></div>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center md:text-left">
            <h1 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
              Create New Blog
            </h1>
            <p className="text-lg text-slate-400">
              Share your thoughts and insights with the community.
            </p>
          </div>

          <div className="animate-[fadeIn_0.5s_ease-out_forwards] rounded-3xl border border-white/10 bg-white/5 p-6 opacity-0 shadow-2xl backdrop-blur-md md:p-10">
            <div className="flex flex-col gap-8">
              {/* Title Section */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="blog-title"
                  className="text-xl font-semibold text-slate-200"
                >
                  Blog Title
                </label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-xl text-white transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  id="blog-title"
                  placeholder="Enter an engaging title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* TipTap Editors - Lazy loaded */}
              <Suspense
                fallback={
                  <>
                    <div className="flex flex-col gap-3">
                      <label className="text-xl font-semibold text-slate-200">
                        Brief Introduction
                      </label>
                      <div className="min-h-[160px] animate-pulse rounded-xl border border-white/10 bg-black/20"></div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-xl font-semibold text-slate-200">
                        Main Content
                      </label>
                      <div className="min-h-[340px] animate-pulse rounded-xl border border-white/10 bg-black/20"></div>
                    </div>
                  </>
                }
              >
                <TipTapEditors
                  onIntroChange={setIntro}
                  onContentChange={setContent}
                />
              </Suspense>

              {/* Tags Section */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="blog-tags"
                  className="text-xl font-semibold text-slate-200"
                >
                  Tags
                </label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  id="blog-tags"
                  placeholder="Technology, Innovation, Startup..."
                  type="text"
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              {/* Image Upload Section */}
              <div className="flex flex-col gap-3">
                <label className="text-xl font-semibold text-slate-200">
                  Topic Picture
                </label>
                <div className="mt-2 flex justify-center rounded-xl border border-dashed border-white/20 px-6 py-10 transition-all hover:border-blue-500/50 hover:bg-white/5">
                  <div className="text-center">
                    <span className="material-symbols-outlined mx-auto mb-4 text-5xl text-blue-500">
                      image
                    </span>
                    <div className="flex text-sm leading-6 text-slate-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:outline-none hover:text-blue-400"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      PNG, JPG, GIF up to 300KB
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <button
                  onClick={handlePublish}
                  className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:from-blue-500 hover:to-blue-400 active:scale-[0.98]"
                >
                  Publish Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
