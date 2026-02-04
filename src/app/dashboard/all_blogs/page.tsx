// src/app/dashboard/all_blogs/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AllBlogs() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard?tab=all");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617]">
      <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
