"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  BarChart3,
  MessageSquare,
  Calendar,
  Settings,
  Home,
  FileText,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import AdminNavigation from "./AdminNavigation";

/* ================= PAGE ================= */
export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (
      !isLoading &&
      (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN"))
    ) {
      toast.error("Access denied. Admin privileges required.");
      router.push("/dashboard");
    }
  }, [isLoading, user, router]);

  return (
    <div className="flex min-h-screen bg-linear-to-br from-[#0b1220] to-[#060b16] text-white">
      <AdminNavigation active="dashboard" mobileMenu={false} />

      {/* Main Content */}
      <main className="flex w-full flex-col items-center justify-center px-4 pt-20 pb-8 sm:px-6 lg:ml-64 lg:pt-8 xl:px-8 2xl:ml-72 2xl:px-10 2xl:pt-10">
        {/* Welcome Message */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl 2xl:text-5xl">
            Welcome to Admin Panel
          </h1>
          <p className="text-lg text-white/60">
            Manage your platform from here
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-10 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-5">
          <button
            onClick={() => router.push("/admin/blogs")}
            className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-cyan-500/50 hover:bg-cyan-500/10"
          >
            <FileText size={28} className="text-cyan-400" />
            <span className="font-medium">Blogs</span>
          </button>
          <button
            onClick={() => router.push("/admin/webinars")}
            className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-blue-500/50 hover:bg-blue-500/10"
          >
            <Calendar size={28} className="text-blue-400" />
            <span className="font-medium">Webinars</span>
          </button>
          <button
            onClick={() => router.push("/admin/messages")}
            className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-green-500/50 hover:bg-green-500/10"
          >
            <MessageSquare size={28} className="text-green-400" />
            <span className="font-medium">Messages</span>
          </button>
          <button
            onClick={() => router.push("/admin/modules")}
            className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-orange-500/50 hover:bg-orange-500/10"
          >
            <BarChart3 size={28} className="text-orange-400" />
            <span className="font-medium">Modules</span>
          </button>
          <button
            onClick={() => router.push("/admin/settings")}
            className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-purple-500/50 hover:bg-purple-500/10"
          >
            <Settings size={28} className="text-purple-400" />
            <span className="font-medium">Settings</span>
          </button>
        </div>

        {/* Back to Dashboard Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 font-medium transition-all hover:bg-white/20"
        >
          <Home size={18} />
          Back to Dashboard
        </button>
      </main>
    </div>
  );
}
