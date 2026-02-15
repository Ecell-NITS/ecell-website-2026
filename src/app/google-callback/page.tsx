"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function GoogleCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();

  // ✅ prevents double execution in React strict mode
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const code = params.get("code");

    console.log("Google code:", code);

    if (!code) {
      toast.error("Google login failed (no code)");
      router.replace("/login");
      return;
    }

    const sendCode = async () => {
      try {
        const res = await api.post("/auth/google", { code });

        const { accessToken, user, isNewUser } = res.data.data;

        // ✅ store auth
        login(user, accessToken);

        // ✅ smart UX message
        if (isNewUser) {
          toast.success("Account created with Google");
        } else {
          toast.success("Logged in! Welcome back");
        }

        // ✅ redirect
        router.replace("/dashboard");
      } catch (err: any) {
        console.error("Backend error:", err);

        toast.error(
          err?.response?.data?.message ||
            "Google authentication failed"
        );

        router.replace("/login");
      }
    };

    sendCode();
  }, [params, router, login]);

  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        <p className="text-sm text-gray-400">
          Signing you in with Google...
        </p>
      </div>
    </div>
  );
}
