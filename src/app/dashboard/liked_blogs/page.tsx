// src/app/dashboard/liked_blogs/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LikedBlogs() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard?tab=liked");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617]">
      <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
