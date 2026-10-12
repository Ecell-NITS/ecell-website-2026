"use client";

import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import LoginRequiredDialog from "./LoginRequiredDialog";

interface BlogEngagementProps {
  blogId: string;
  shareUrl: string;
  isLoggedIn?: boolean;
  initialLiked?: boolean;
  likesCount?: number;
  isMockBlog?: boolean;
  mockLiked?: boolean;
  mockLikesCount?: number;
  onMockLike?: () => void;
}

export default function BlogEngagement({
  blogId,
  shareUrl,
  isLoggedIn = false,
  initialLiked = false,
  likesCount: initialLikesCount = 0,
  isMockBlog = false,
  mockLiked = false,
  mockLikesCount = initialLikesCount,
  onMockLike,
}: BlogEngagementProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (!isMockBlog) {
      setLiked(initialLiked);
      setLikesCount(initialLikesCount);
    }
  }, [initialLiked, initialLikesCount, isMockBlog]);

  const handleLike = useCallback(async () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    if (isMockBlog) {
      onMockLike?.();
      return;
    }
    try {
      const { data } = await api.post<{ liked: boolean; likesCount: number }>(
        `/api/blog/toggleLike/${blogId}`,
      );
      setLiked(data.liked);
      setLikesCount(data.likesCount);
    } catch {
      toast.error("Failed to update like");
    }
  }, [blogId, isLoggedIn, isMockBlog, onMockLike]);

  const displayedLiked = isMockBlog ? mockLiked : liked;
  const displayedLikesCount = isMockBlog ? mockLikesCount : likesCount;

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: shareUrl,
        })
        .catch(() => {
          // User cancelled share
        });
    }
  }, [shareUrl]);

  return (
    <>
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 sm:gap-6 sm:pt-8 md:mt-12 md:flex-row md:items-center md:gap-8 md:pt-12">
        {/* Like & Share buttons */}
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-3 md:w-auto">
          <button
            onClick={handleLike}
            className={`glass flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold transition-all sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm md:rounded-2xl md:px-8 md:py-4 ${
              displayedLiked
                ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                : "text-rose-500 hover:bg-rose-500/10"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={displayedLiked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
            <span>
              {displayedLiked ? "Liked" : "Like"}{" "}
              {displayedLikesCount > 0 && `(${displayedLikesCount})`}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="glass flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-blue-500 transition-all hover:bg-blue-500/10 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm md:rounded-2xl md:px-8 md:py-4"
          >
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
      </div>
      <LoginRequiredDialog
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
        action="like"
      />
    </>
  );
}
