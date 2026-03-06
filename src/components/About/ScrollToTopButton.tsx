"use client";

import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="glass fixed right-8 bottom-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all hover:text-blue-500 hover:shadow-2xl hover:shadow-blue-500/20"
    >
      <ArrowUp size={20} />
    </button>
  );
}
