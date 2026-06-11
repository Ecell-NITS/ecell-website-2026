/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */
"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Suspense } from "react";

function GoogleCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const token = searchParams.get("token");
    const userStr = searchParams.get("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        login(user, token);
        toast.success("Signed in with Google!");

        // Redirect back to the page user was on before login
        const redirectTo =
          typeof window !== "undefined"
            ? (sessionStorage.getItem("postLoginRedirect") ?? "/dashboard")
            : "/dashboard";
        sessionStorage.removeItem("postLoginRedirect");
        router.replace(redirectTo);
      } catch {
        toast.error("Failed to process Google login");
        router.replace("/login");
      }
    } else {
      toast.error("Login failed. Please try again.");
      router.replace("/login");
    }
  }, [searchParams, login, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617]">
      <div className="text-center">
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-500" />
        <p className="text-lg font-semibold text-white">
          Signing you in with Google...
        </p>
        <p className="mt-2 text-sm text-gray-500">Please wait</p>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#020617]">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-500" />
        </div>
      }
    >
      <GoogleCallbackInner />
    </Suspense>
  );
}
