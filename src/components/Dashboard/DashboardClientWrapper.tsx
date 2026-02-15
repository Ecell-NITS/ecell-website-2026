/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-floating-promises, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-type-assertion */
"use client";

import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import api from "@/lib/axios";

import { Skeleton } from "@/components/ui/skeleton";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEdit,
  FaPlusCircle,
  FaInfoCircle,
  FaHeart,
  FaComment,
  FaCalendarAlt,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

export interface DashboardUser {
  id: number;
  name: string;
  email: string;
  picture: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  github: string;
  bio: string;
  blogs: BackendBlog[];
}

// Backend (Prisma)
export type BackendBlog = {
  id: number;
  title: string;
  tag: string;
  intro: string;
  content: string;
  timeStamp: string;
  topicPic: string;
  isAccepted: boolean;
};

// UI
type UIBlog = {
  id: number;
  title: string;
  brief_intro: string;
  read_time: string;
  category: string;
  likes: number;
  comments: number;
  is_liked: boolean;
  cover_image: string;
  posted_on: string;
  uniqueKey: string;
};
const mapBlogToUI = (blog: BackendBlog, userId: number): UIBlog => ({
  id: blog.id,
  title: blog.title,
  brief_intro: blog.intro,
  read_time: blog.timeStamp,
  category: blog.tag,
  likes: 0,
  comments: 0,
  is_liked: false,
  cover_image: blog.topicPic || "/placeholder.jpg",
  posted_on: blog.timeStamp,
  uniqueKey: `user-${userId}-blog-${blog.id}`,
});

interface DashboardClientWrapperProps {
  initialUser?: DashboardUser | null;
  initialAllUsers: DashboardUser[];
}

export function DashboardClientWrapper({
  initialAllUsers,
}: DashboardClientWrapperProps) {
  const { user, loading, logout } = useAuth();
  const [_dashboardUser, setDashboardUser] = useState<DashboardUser | null>(
    null,
  );

  const [allUsers] = useState<DashboardUser[]>(initialAllUsers);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPERADMIN";

  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") ?? "published",
  );

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);
  useEffect(() => {
    const fetchDashboardUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setDashboardUser(res.data.data.user);
      } catch {
        toast.error("Failed to load profile");
      }
    };

    if (user) {
      fetchDashboardUser();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout(); // calls backend + clears user
      toast.success("Logged out successfully");
      router.push("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account? This cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      await api.delete("/auth/delete-account");

      toast.success("Account deleted successfully");

      await logout(); // clear auth context
      router.push("/"); // redirect to home
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(
        axiosErr?.response?.data?.message ?? "Failed to delete account",
      );
    }
  };

  const handleImageLoad = useCallback((imageUrl: string) => {
    setLoadedImages((prev) => new Set([...prev, imageUrl]));
  }, []);

  const displayedBlogs = useMemo(() => {
    if (!user) return [];
    if (activeTab === "published") {
      return (user.blogs ?? []).map((b) =>
        mapBlogToUI(b as BackendBlog, user.id),
      );
    }

    if (activeTab === "all") {
      return allUsers.flatMap((u) =>
        (u.blogs ?? []).map((b) => mapBlogToUI(b as BackendBlog, u.id)),
      );
    }
    if (activeTab === "liked") {
      // return allUsers.flatMap((u) =>
      //   u.blogs.filter((b) => b.is_liked).map((blog) => ({
      //     ...blog,
      //     uniqueKey: `user-${u.id}-blog-${blog.id}`,
      //   })),
      // );
      return [];
    }
    return [];
  }, [user, allUsers, activeTab]);

  if (loading) {
    return (
      <main className="relative flex min-h-screen flex-col">
        <section className="px-6 pt-32 pb-12 lg:px-8">
          <div className="mx-auto max-w-6xl animate-pulse space-y-6">
            <div className="h-48 rounded-3xl bg-white/10" />
            <div className="h-64 rounded-3xl bg-white/10" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col">
      {/* Profile Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-12 lg:px-8">
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full max-w-7xl -translate-x-1/2">
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>
          <div className="absolute right-[-10%] bottom-[-10%] h-[30%] w-[30%] rounded-full bg-purple-600/10 blur-[120px]"></div>
        </div>

        <div className="mx-auto max-w-6xl animate-[fadeIn_0.8s_ease-out_forwards] opacity-0">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md md:p-12">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              {/* Avatar & Info */}
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-start lg:col-span-12 xl:col-span-7">
                <div className="group relative shrink-0">
                  <div className="relative size-40 cursor-pointer overflow-hidden rounded-full border-4 border-blue-500 bg-[#111722] shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-transform hover:scale-105 md:size-48">
                    <Image
                      src={
                        user?.picture ??
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt="Profile"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={192}
                      height={192}
                      priority
                    />
                  </div>
                  <div
                    onClick={() => router.push("/dashboard/edit_profile")}
                    className="absolute right-2 bottom-2 flex size-10 cursor-pointer items-center justify-center rounded-full border-4 border-[#020617] bg-blue-600 text-white shadow-lg transition-transform hover:scale-110 active:scale-90"
                  >
                    <FaEdit className="text-lg" />
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="animate-[fadeIn_0.6s_ease-out_0.3s_forwards] opacity-0">
                    <h1 className="mb-1 text-4xl font-bold tracking-tight text-white md:text-5xl">
                      {user?.name ?? "User Name"}
                    </h1>
                    <p className="text-xl font-medium text-blue-400">
                      {user?.bio ?? "Role"}
                    </p>
                  </div>

                  <div className="flex animate-[fadeIn_0.6s_ease-out_0.5s_forwards] flex-wrap items-center justify-center gap-4 pt-2 opacity-0 md:justify-start">
                    <button
                      onClick={() => router.push("/dashboard/edit_profile")}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-6 py-2.5 font-semibold transition-all hover:bg-white/20"
                    >
                      <FaEdit /> Edit Profile
                    </button>
                    <button
                      onClick={() => router.push("/dashboard/add_blogs")}
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700"
                    >
                      <FaPlusCircle /> New Blog
                    </button>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:bg-purple-700"
                      >
                        <FaUserShield /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-2.5 font-semibold text-red-400 transition-all hover:bg-red-500/20"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                  <div className="mt-3 text-center md:text-left">
                    <Link
                      href="/change-password"
                      className="text-sm font-medium text-blue-400 transition hover:text-blue-300 hover:underline"
                    >
                      Change Password
                    </Link>
                  </div>

                  {/* Social Icons */}
                  <div className="flex animate-[fadeIn_0.6s_ease-out_0.6s_forwards] flex-wrap items-center justify-center gap-4 pt-2 opacity-0 md:justify-start">
                    {(
                      [
                        {
                          icon: FaFacebook,
                          url: user?.facebook,
                          color: "hover:text-blue-500",
                        },
                        {
                          icon: FaInstagram,
                          url: user?.instagram,
                          color: "hover:text-pink-500",
                        },
                        {
                          icon: FaLinkedin,
                          url: user?.linkedin,
                          color: "hover:text-blue-400",
                        },
                        {
                          icon: FaGithub,
                          url: user?.github,
                          color: "hover:text-white",
                        },
                      ] as const
                    ).map((social, idx) => (
                      <a
                        key={idx}
                        href={social.url ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all hover:-translate-y-1 hover:scale-110 hover:border-blue-500/50 hover:bg-blue-500/10 ${social.color}`}
                      >
                        <social.icon className="size-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="h-full lg:col-span-12 xl:col-span-5">
                <div className="flex h-full animate-[fadeIn_0.6s_ease-out_0.4s_forwards] flex-col rounded-2xl border border-white/10 bg-white/5 p-6 opacity-0 md:p-8">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                    <FaInfoCircle className="text-blue-400" />
                    About
                  </h3>
                  <p className="custom-scrollbar max-h-[150px] overflow-y-auto pr-4 leading-relaxed text-gray-400">
                    {user?.bio ??
                      "No information provided yet. Click 'Edit Profile' to share something about yourself."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="mb-12 flex items-center gap-8 border-b border-white/10">
            {[
              {
                id: "published",
                label: "My Blogs",
                count: user?.blogs?.length,
              },
              {
                id: "all",
                label: "All Blogs",
                count: allUsers.flatMap((u) => u.blogs).length,
              },
              // {
              //   id: "liked",
              //   label: "Liked Blogs",
              //   count: allUsers
              //   .flatMap((u) => u.blogs ?? [])
              //   .filter((b) => b && b.is_liked === true).length,

              // },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-4 text-sm font-bold tracking-wider transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-60">({tab.count})</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedBlogs.length > 0 ? (
              displayedBlogs.map((blog, index) => {
                const coverImg =
                  blog.cover_image ||
                  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&q=80&w=600";
                return (
                  <div
                    key={blog.id}
                    className="group relative flex animate-[fadeIn_0.5s_ease-out_forwards] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 opacity-0 transition-all hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="relative block aspect-video overflow-hidden bg-white/5"
                    >
                      {!loadedImages.has(coverImg) && (
                        <Skeleton className="absolute inset-0" />
                      )}
                      <Image
                        src={coverImg}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={400}
                        height={225}
                        onLoad={() => handleImageLoad(coverImg)}
                        loading="lazy"
                        placeholder="empty"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                      {blog.category && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
                            {blog.category}
                          </span>
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-3 text-xs font-bold tracking-widest text-blue-400/80 uppercase">
                        {blog.posted_on && (
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt /> {blog.posted_on}
                          </span>
                        )}
                      </div>
                      <h3 className="mb-3 line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                        {blog.title}
                      </h3>
                      <p className="mb-6 line-clamp-3 flex-1 text-sm text-gray-400">
                        {(blog.brief_intro ?? "").replace(/<[^>]*>/g, "")}
                      </p>

                      <div className="flex items-center justify-between border-t border-white/5 pt-6">
                        <span className="cursor-pointer text-sm font-bold text-blue-500 group-hover:underline">
                          Read More
                        </span>
                        <div className="flex items-center gap-4 text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <FaHeart />
                            <span className="text-xs">{blog.likes ?? 0}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FaComment />
                            <span className="text-xs">
                              {blog.comments ?? 0}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-lg text-gray-500">
                  No blogs found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Account Actions */}
        <div className="mb-6 flex justify-center gap-4">
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Log out
          </button>

          {/* Delete Account */}
          <button
            onClick={() => {
              toast.custom(
                (t) => (
                  <div className="w-[350px] rounded-xl border border-red-500/20 bg-[#0f172a] p-5 shadow-2xl">
                    <h3 className="mb-2 text-lg font-bold text-white">
                      Delete Account?
                    </h3>
                    <p className="mb-4 text-sm text-gray-400">
                      This action is permanent and cannot be undone.
                    </p>

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300 hover:bg-white/10"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={async () => {
                          toast.dismiss(t.id);
                          await handleDeleteAccount();
                        }}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-500"
                      >
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                ),
                { duration: Infinity },
              );
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            Delete Account
          </button>
        </div>
      </section>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
          transition: all 0.3s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.8);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.5) rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </main>
  );
}
