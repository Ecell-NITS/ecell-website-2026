"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import LoginRequiredDialog from "./LoginRequiredDialog";

interface ApiComment {
  id: string;
  text: string;
  commentAuthor?: string | null;
  commentPic?: string | null;
  userId?: string;
  createdAt?: string;
}

interface BlogCommentsProps {
  blogId: string;
}

function getCommentPicture(picture?: string): string {
  try {
    const url = new URL(picture ?? "");
    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.toString();
    }
  } catch {
    // Invalid or relative profile pictures use the absolute site fallback below.
  }

  return new URL(
    "/profile_picture_holder.webp",
    window.location.origin,
  ).toString();
}

function isApiComment(value: unknown): value is ApiComment {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const comment = value as Record<string, unknown>;
  return typeof comment.id === "string" && typeof comment.text === "string";
}

function extractComments(payload: unknown): ApiComment[] {
  if (Array.isArray(payload)) {
    return payload.filter(isApiComment);
  }
  if (typeof payload === "object" && payload !== null && "data" in payload) {
    const data = (payload as { data?: unknown }).data;
    return Array.isArray(data) ? data.filter(isApiComment) : [];
  }
  return [];
}

function extractComment(payload: unknown): ApiComment | undefined {
  if (isApiComment(payload)) {
    return payload;
  }
  if (typeof payload === "object" && payload !== null && "data" in payload) {
    const data = (payload as { data?: unknown }).data;
    return isApiComment(data) ? data : undefined;
  }
  return undefined;
}

export default function BlogComments({ blogId }: BlogCommentsProps) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<ApiComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { user } = useAuth();
  const isAuthenticated = !!user;

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await api.get<unknown>(
          `/api/comment/apiComment/${blogId}`,
        );
        setComments(extractComments(data));
      } catch (error: unknown) {
        console.error("Failed to load blog comments:", error);
        setComments([]);
        toast.error("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };
    void fetchComments();
  }, [blogId]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isAuthenticated) {
        setShowLoginPrompt(true);
        return;
      }

      if (!comment.trim()) return;

      setSubmitting(true);
      try {
        const { data } = await api.post<unknown>(
          `/api/comment/apicomment/${blogId}`,
          {
            text: comment.trim(),
            commentAuthor: user.name.trim() || user.email,
            commentPic: getCommentPicture(user.picture),
            userId: String(user.id),
          },
        );
        const newComment = extractComment(data);
        if (!newComment) {
          throw new Error("The server returned no comment");
        }
        setComments((prev) => [newComment, ...prev]);
        setComment("");
        toast.success("Comment posted");
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        toast.error(error.response?.data?.message ?? "Failed to post comment");
      } finally {
        setSubmitting(false);
      }
    },
    [
      comment,
      isAuthenticated,
      blogId,
      user?.id,
      user?.name,
      user?.email,
      user?.picture,
    ],
  );

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 60)
        return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
      if (diffHours < 24)
        return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
      if (diffDays < 7)
        return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
      return date.toLocaleDateString();
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="glass rounded-lg border border-white/10 p-4 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-700 ease-out hover:-translate-y-0.5 hover:border-blue-400/20 hover:shadow-[0_16px_48px_-32px_rgba(37,99,235,0.35)] motion-reduce:transition-none sm:rounded-2xl sm:p-6 md:rounded-[2.5rem] md:p-10 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
      <div className="mb-3 flex items-center justify-between sm:mb-4 md:mb-8">
        <h4 className="flex items-center gap-2 text-[8px] font-black tracking-widest text-gray-500 uppercase sm:gap-3 sm:text-[9px] md:gap-3 md:text-[10px]">
          Comments ({comments.length})
        </h4>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-4 space-y-2 sm:mb-6 md:mb-10 md:space-y-4"
      >
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onClick={() => {
            if (!isAuthenticated) setShowLoginPrompt(true);
          }}
          placeholder={
            isAuthenticated
              ? "Write a comment..."
              : "Sign in to write a comment..."
          }
          readOnly={!isAuthenticated}
          className="min-h-20 w-full resize-none rounded border border-white/10 bg-black/40 p-2 text-[12px] text-white transition-all read-only:cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none sm:min-h-24 sm:rounded-lg sm:p-3 sm:text-xs md:min-h-30 md:rounded-2xl md:p-4 md:text-sm"
        />
        <button
          type="submit"
          disabled={submitting || (isAuthenticated && !comment.trim())}
          className="flex w-full items-center justify-center gap-2 rounded border border-white/10 bg-blue-600 px-3 py-1.5 text-[12px] font-bold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-lg sm:px-4 sm:py-2 sm:text-xs md:rounded-2xl md:px-6 md:py-3 md:text-sm"
        >
          {submitting ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : isAuthenticated ? (
            "Post Comment"
          ) : (
            "Sign in to comment"
          )}
        </button>
      </form>

      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {loading ? (
          [0, 1].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-lg bg-white/5 sm:h-24 md:h-28"
            />
          ))
        ) : comments.length > 0 ? (
          comments.map((c) => {
            const userName = c.commentAuthor ?? "Anonymous";
            const userAvatar = c.commentPic ?? "/profile_picture_holder.webp";

            return (
              <div
                key={c.id}
                className="flex gap-2 rounded border border-white/5 bg-black/20 p-2 transition-[border-color,background-color] duration-700 ease-out hover:border-blue-400/15 hover:bg-white/4 sm:gap-3 sm:rounded-lg sm:p-3 md:gap-4 md:rounded-2xl md:p-5"
              >
                <div className="relative size-6 shrink-0 overflow-hidden rounded-full sm:size-8 md:size-10">
                  <Image
                    src={userAvatar}
                    alt={userName}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-0.5 flex items-center gap-1 sm:mb-1 md:mb-2">
                    <span className="text-[11px] font-bold text-white sm:text-xs md:text-sm">
                      {userName}
                    </span>
                    <span className="text-[9px] text-gray-500 sm:text-[10px] md:text-xs">
                      • {formatTime(c.createdAt ?? "")}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-400 sm:text-xs md:text-sm">
                    {c.text}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center">
            <p className="text-xs text-gray-500 sm:text-sm">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>

      <LoginRequiredDialog
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
        action="comment"
      />
    </div>
  );
}
