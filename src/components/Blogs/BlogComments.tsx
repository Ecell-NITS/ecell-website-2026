"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface Comment {
  name: string;
  time: string;
  text: string;
  avatar: string;
}

const initialComments: Comment[] = [
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
];

export default function BlogComments() {
  const [comment, setComment] = useState("");
  const [comments] = useState<Comment[]>(initialComments);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!comment.trim()) return;
      // Handle comment submission logic here
      setComment("");
    },
    [comment],
  );

  return (
    <div className="glass rounded-lg border border-white/10 p-4 backdrop-blur-md sm:rounded-2xl sm:p-6 md:rounded-[2.5rem] md:p-10">
      <div className="mb-3 flex items-center justify-between sm:mb-4 md:mb-8">
        <h4 className="flex items-center gap-2 text-[8px] font-black tracking-widest text-gray-500 uppercase sm:gap-3 sm:text-[9px] md:gap-3 md:text-[10px]">
          💬 Comments ({comments.length})
        </h4>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-4 space-y-2 sm:mb-6 md:mb-10 md:space-y-4"
      >
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
        {comments.map((commentItem, idx) => (
          <div key={idx} className="group">
            <div className="mb-2 flex gap-2 sm:gap-3 md:gap-4">
              <Image
                className="h-7 w-7 rounded object-cover sm:h-8 sm:w-8 sm:rounded-lg md:h-10 md:w-10 md:rounded-xl"
                src={commentItem.avatar}
                alt={commentItem.name}
                width={40}
                height={40}
                loading="lazy"
              />
              <div className="grow">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="text-[7px] font-bold text-white sm:text-[8px] md:text-xs">
                    {commentItem.name}
                  </h5>
                  <span className="text-[6px] text-gray-600 sm:text-[7px] md:text-[10px]">
                    {commentItem.time}
                  </span>
                </div>
                <p className="mt-1 text-[6px] leading-relaxed text-gray-400 sm:text-[7px] md:text-sm">
                  {commentItem.text}
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
  );
}
