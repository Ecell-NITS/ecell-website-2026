"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Navbar from "@/components/Landing/Navbar";
import { useAuth } from "@/lib/auth-context";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { Eye, Edit3 } from "lucide-react";

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

export default function AddBlogsClient() {
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error("Please enter a blog title");
      return;
    }
    if (!intro.trim()) {
      toast.error("Please write a brief introduction");
      return;
    }
    if (!content.trim()) {
      toast.error("Please write the main content");
      return;
    }

    setIsPublishing(true);
    try {
      await api.post("/api/blog/createBlog", {
        title: title.trim(),
        intro: intro.trim(),
        content: content.trim(),
        tag: tag.trim() || undefined,
        writerName: user?.name ?? "Anonymous",
        writerEmail: user?.email,
      });
      toast.success("Blog created successfully! 🎉");
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message ?? "Failed to create blog");
    } finally {
      setIsPublishing(false);
    }
  };

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");
  const readTime = Math.max(
    1,
    Math.ceil(
      (stripHtml(intro) + " " + stripHtml(content)).split(/\s+/).length / 200,
    ),
  );

  return (
    <div className="min-h-screen bg-[#020617] font-sans text-white selection:bg-blue-500/30 selection:text-white">
      <Navbar />

      <main className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        {/* Background */}
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full max-w-7xl -translate-x-1/2">
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>
          <div className="absolute right-[-10%] bottom-[-10%] h-[30%] w-[30%] rounded-full bg-purple-600/10 blur-[120px]"></div>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Header + Toggle */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent sm:mb-4 md:text-5xl">
                Create New Blog
              </h1>
              <p className="text-base text-slate-400 sm:text-lg">
                Share your thoughts and insights with the community.
              </p>
            </div>

            {/* Write / Preview Toggle */}
            <div className="flex gap-2 self-center sm:self-auto">
              <button
                onClick={() => setShowPreview(false)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all sm:px-5 ${
                  !showPreview
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Edit3 size={16} /> Write
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all sm:px-5 ${
                  showPreview
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Eye size={16} /> Preview
              </button>
            </div>
          </div>

          {/* ===== WRITE MODE ===== */}
          {!showPreview && (
            <div className="animate-[fadeIn_0.5s_ease-out_forwards] rounded-3xl border border-white/10 bg-white/5 p-4 opacity-0 shadow-2xl backdrop-blur-md sm:p-6 md:p-10">
              <div className="flex flex-col gap-6 sm:gap-8">
                {/* Title */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="blog-title"
                    className="text-lg font-semibold text-slate-200 sm:text-xl"
                  >
                    Blog Title
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-lg text-white transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:px-5 sm:py-4 sm:text-xl"
                    id="blog-title"
                    placeholder="Enter an engaging title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* TipTap Editors */}
                <Suspense
                  fallback={
                    <>
                      <div className="flex flex-col gap-3">
                        <label className="text-lg font-semibold text-slate-200 sm:text-xl">
                          Brief Introduction
                        </label>
                        <div className="min-h-[160px] animate-pulse rounded-xl border border-white/10 bg-black/20"></div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="text-lg font-semibold text-slate-200 sm:text-xl">
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

                {/* Tags */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="blog-tags"
                    className="text-lg font-semibold text-slate-200 sm:text-xl"
                  >
                    Tags
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:px-5 sm:py-4"
                    id="blog-tags"
                    placeholder="Technology, Innovation, Startup..."
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-3">
                  <label className="text-lg font-semibold text-slate-200 sm:text-xl">
                    Topic Picture
                  </label>
                  <div className="mt-2 flex justify-center rounded-xl border border-dashed border-white/20 px-4 py-8 transition-all hover:border-blue-500/50 hover:bg-white/5 sm:px-6 sm:py-10">
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

                {/* Submit */}
                <div className="flex justify-end pt-4 sm:pt-6">
                  <button
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:from-blue-500 hover:to-blue-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
                  >
                    {isPublishing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Publishing...
                      </div>
                    ) : (
                      "Publish Blog"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== PREVIEW MODE ===== */}
          {showPreview && (
            <div className="animate-[fadeIn_0.3s_ease-out_forwards] opacity-0">
              {!title && !intro && !content ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md">
                  <Eye size={48} className="mx-auto mb-4 text-gray-600" />
                  <p className="text-lg text-gray-500">
                    Start writing to see a preview here
                  </p>
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md sm:p-8 md:p-12">
                  {/* Preview badge */}
                  <div className="mb-6 inline-flex items-center gap-2 rounded-lg bg-blue-500/10 px-4 py-2">
                    <Eye size={16} className="text-blue-400" />
                    <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                      Live Preview
                    </span>
                  </div>

                  {/* Tags */}
                  {tag && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {tag.split(",").map((t, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[10px] font-black tracking-widest text-blue-400 uppercase"
                        >
                          #{t.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="mb-6 text-2xl leading-tight font-black tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    {title || "Untitled Blog"}
                  </h1>

                  {/* Author & Meta */}
                  <div className="mb-8 flex flex-wrap items-center gap-3 border-y border-white/10 py-4 text-sm text-gray-500 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                        {(user?.name ?? "A").charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-white">
                        {user?.name ?? "Anonymous"}
                      </span>
                    </div>
                    <span>{readTime} min read</span>
                  </div>

                  {/* Intro */}
                  {intro && (
                    <div className="mb-8 border-l-4 border-blue-500 pl-4 sm:pl-6">
                      <div
                        className="max-w-none text-base font-medium text-white/90 italic sm:text-lg [&_a]:text-blue-400 [&_em]:text-white/80 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2 [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5"
                        dangerouslySetInnerHTML={{ __html: intro }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  {content && (
                    <div
                      className="max-w-none text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg [&_a]:text-blue-400 [&_a]:underline [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:bg-white/5 [&_blockquote]:py-2 [&_blockquote]:pl-4 [&_blockquote]:text-gray-400 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-blue-300 [&_em]:text-gray-200 [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-xl [&_li]:mb-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-black/40 [&_pre]:p-4 [&_strong]:text-white [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  )}

                  {/* Publish from Preview */}
                  <div className="mt-10 flex justify-end border-t border-white/10 pt-6">
                    <button
                      onClick={handlePublish}
                      disabled={isPublishing}
                      className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:from-blue-500 hover:to-blue-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
                    >
                      {isPublishing ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Publishing...
                        </div>
                      ) : (
                        "Publish Blog"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
