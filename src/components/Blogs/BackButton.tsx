"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function BackButton() {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.push("/blogs");
  }, [router]);

  return (
    <button
      onClick={handleBack}
      className="group mb-8 flex cursor-pointer items-center gap-3 text-xs font-black tracking-widest text-blue-500 uppercase transition-all hover:text-white sm:mb-12 sm:text-[10px]"
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
  );
}
