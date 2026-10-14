"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaCalendarAlt, FaEdit } from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { sanitizeBlogHtml } from "@/lib/sanitize-blog-html";

interface DraftBlog {
  id: string;
  title?: string;
  intro?: string;
  content?: string;
  tag?: string;
  writerName?: string;
  writerPic?: string;
  topicPic?: string;
  timeStamp?: string;
  createdAt?: string;
  subject?: string;
  text?: string;
  isAccepted?: boolean;
  authorId?: string;
  status?: string;
}

interface DraftBlogResponse {
  data?: DraftBlog;
}

function LoadingPreview() {
  return (
    <section
      aria-label="Loading draft preview"
      className="px-4 pt-8 pb-24 md:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl animate-pulse space-y-6">
        <div className="h-8 w-48 rounded-lg bg-white/10" />
        <div className="h-12 w-3/4 rounded-lg bg-white/10" />
        <div className="h-6 w-1/2 rounded-lg bg-white/10" />
        <div className="aspect-video w-full rounded-2xl bg-white/10" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-5/6 rounded bg-white/10" />
        </div>
      </div>
    </section>
  );
}

export default function DraftBlogClient({ blogId }: { blogId: string }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [blog, setBlog] = useState<DraftBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    let isActive = true;

    const fetchDraft = async () => {
      try {
        const { data } = await api.get<DraftBlog | DraftBlogResponse>(
          `/api/blog/draft/${blogId}`,
        );
        const blogData =
          "data" in data && data.data ? data.data : (data as DraftBlog);
        if (isActive) {
          setBlog(blogData);
        }
      } catch (error: unknown) {
        if (!isActive) {
          return;
        }
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          setForbidden(true);
        } else if (
          axios.isAxiosError(error) &&
          error.response?.status === 404
        ) {
          setErrorMessage("This blog could not be found.");
        } else {
          console.error("Failed to load draft blog preview:", error);
          setErrorMessage(
            "We couldn’t load this blog preview. Please try again.",
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    void fetchDraft();
    return () => {
      isActive = false;
    };
  }, [authLoading, blogId, router, user]);

  if (authLoading || loading) {
    return <LoadingPreview />;
  }

  if (!user) {
    return null;
  }

  if (forbidden) {
    return (
      <section className="px-4 pt-8 pb-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white">Access denied</h1>
          <p className="mb-8 text-gray-400">
            Only the blog’s author and E-Cell administrators can preview this
            unpublished blog.
          </p>
          <Link
            href="/dashboard"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Back to dashboard
          </Link>
        </div>
      </section>
    );
  }

  if (errorMessage || !blog) {
    return (
      <section className="px-4 pt-8 pb-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white">
            Preview unavailable
          </h1>
          <p className="mb-8 text-gray-400">
            {errorMessage ?? "This blog preview is not available."}
          </p>
          <Link
            href="/dashboard"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Back to dashboard
          </Link>
        </div>
      </section>
    );
  }

  const isOwner = String(blog.authorId) === String(user.id);
  const isPublished = blog.isAccepted === true;
  const rawDate = blog.timeStamp ?? blog.createdAt;
  const date = rawDate ? new Date(rawDate) : null;
  const formattedDate =
    date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Date not available";
  const content = blog.content ?? blog.text ?? "";
  const intro = blog.intro ?? blog.subject ?? "";
  const tags =
    blog.tag
      ?.split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter(Boolean) ?? [];
  const authorAvatar = blog.writerPic ?? "/profile_picture_holder.webp";
  const topicImage = blog.topicPic ?? "/landing1.jpg";
  const readTime = Math.max(
    1,
    Math.ceil(
      `${intro} ${content}`
        .replace(/<[^>]*>/g, " ")
        .split(/\s+/)
        .filter(Boolean).length / 200,
    ),
  );

  return (
    <>
      <section className="border-y border-yellow-500/20 bg-yellow-500/5 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${
                isPublished
                  ? "border-green-500/30 bg-green-500/10 text-green-400"
                  : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
              }`}
            >
              {isPublished ? "Published" : "Pending review"}
            </span>
            <p className="text-sm text-gray-400">
              Private preview — only you and E-Cell administrators can view
              unpublished blogs.
            </p>
          </div>
          {isOwner && !isPublished && (
            <Link
              href={`/dashboard/edit_blog/${blog.id}`}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <FaEdit aria-hidden="true" />
              Edit blog
            </Link>
          )}
        </div>
      </section>

      <article className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8 md:py-16 lg:px-12">
        {tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="mb-8 text-3xl leading-tight font-black tracking-tight text-white sm:text-4xl md:text-6xl">
          {blog.title ?? "Untitled blog"}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-white/10 py-5">
          <Image
            src={authorAvatar}
            alt={`${blog.writerName ?? "Author"} profile`}
            width={52}
            height={52}
            className="size-12 rounded-full border border-white/10 object-cover"
          />
          <div>
            <p className="font-semibold text-white">
              {blog.writerName ?? "E-Cell Community"}
            </p>
            <p className="text-xs text-slate-400">Contributor</p>
          </div>
          <p className="ml-auto flex items-center gap-2 text-sm text-slate-400">
            <FaCalendarAlt aria-hidden="true" />
            {formattedDate}
            <span aria-hidden="true">·</span>
            {readTime} min read
          </p>
        </div>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          <Image
            src={topicImage}
            alt={blog.title ?? "Blog featured image"}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
            className="object-cover"
          />
        </div>

        {intro && (
          <p className="mb-8 rounded-r-2xl border-l-4 border-blue-500 bg-white/5 p-5 text-lg text-slate-200 italic">
            {intro}
          </p>
        )}

        {content && (
          <div className="prose prose-invert max-w-none text-slate-300">
            {content.includes("<") ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeBlogHtml(content),
                }}
              />
            ) : (
              <p className="whitespace-pre-line">{content}</p>
            )}
          </div>
        )}
      </article>
    </>
  );
}
