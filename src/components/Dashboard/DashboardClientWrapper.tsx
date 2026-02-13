/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-floating-promises, @typescript-eslint/no-unsafe-argument */
"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
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
  FaClock,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "@/lib/auth-context";
import api from "@/lib/api";

/* ---------- types ---------- */
interface ApiUser {
  id: string;
  name?: string;
  email: string;
  bio?: string;
  role?: string;
  picture?: string;
  userimg?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  facebook?: string;
  blogs?: ApiBlog[];
}

interface ApiBlog {
  id: string;
  title: string;
  intro?: string;
  tag?: string;
  content?: string;
  writerName?: string;
  coverImage?: string;
  topicPic?: string;
  createdAt?: string;
  likes?: number;
  _count?: { comments?: number };
}

/* ---------- component ---------- */
export function DashboardClientWrapper() {
  const { user: authUser, isLoading: authLoading, logout } = useAuth();
  const [profile, setProfile] = useState<ApiUser | null>(null);
  const [myBlogs, setMyBlogs] = useState<ApiBlog[]>([]);
  const [allBlogs, setAllBlogs] = useState<ApiBlog[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [dataLoading, setDataLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") ?? "published",
  );

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push("/login");
    }
  }, [authLoading, authUser, router]);

  // Fetch dashboard data
  useEffect(() => {
    if (!authUser) return;
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const [dashRes, myBlogsRes, allBlogsRes] = await Promise.all([
          api.get("/api/user/dashboard"),
          api
            .get(
              `/api/blog/myPublishedBlogs?writerEmail=${encodeURIComponent(authUser.email)}`,
            )
            .catch(() => ({ data: { data: [] } })),
          api
            .get("/api/blog/acceptedBlogs")
            .catch(() => ({ data: { data: [] } })),
        ]);

        setProfile(dashRes.data.data ?? dashRes.data);

        const myB = myBlogsRes.data.data ?? myBlogsRes.data ?? [];
        setMyBlogs(Array.isArray(myB) ? myB : []);

        const allB = allBlogsRes.data.data ?? allBlogsRes.data ?? [];
        setAllBlogs(Array.isArray(allB) ? allB : []);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        toast.error(
          error.response?.data?.message ?? "Failed to load dashboard data",
        );
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, [authUser]);

  const handleImageLoad = useCallback((imageUrl: string) => {
    setLoadedImages((prev) => new Set([...prev, imageUrl]));
  }, []);

  const isAdmin = profile?.role === "ADMIN" || profile?.role === "SUPERADMIN";

  const displayedBlogs = useMemo(() => {
    if (activeTab === "published") return myBlogs;
    if (activeTab === "all") return allBlogs;
    return [];
  }, [myBlogs, allBlogs, activeTab]);

  if (authLoading || dataLoading) {
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

  const displayName = profile?.name ?? authUser?.name ?? "User";
  const displayBio =
    profile?.bio ??
    "No information provided yet. Click 'Edit Profile' to share something about yourself.";
  const displayImage =
    profile?.userimg ??
    profile?.picture ??
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

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
                      src={displayImage}
                      alt="Profile"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={192}
                      height={192}
                      priority
                      placeholder="empty"
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
                      {displayName}
                    </h1>
                    <p className="text-xl font-medium text-blue-400">
                      {profile?.email ?? authUser?.email ?? ""}
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

                  {/* Social Icons */}
                  <div className="flex animate-[fadeIn_0.6s_ease-out_0.6s_forwards] flex-wrap items-center justify-center gap-4 pt-2 opacity-0 md:justify-start">
                    {(
                      [
                        {
                          icon: FaFacebook,
                          url: profile?.facebook,
                          color: "hover:text-blue-500",
                        },
                        {
                          icon: FaInstagram,
                          url: profile?.instagram,
                          color: "hover:text-pink-500",
                        },
                        {
                          icon: FaLinkedin,
                          url: profile?.linkedin,
                          color: "hover:text-blue-400",
                        },
                        {
                          icon: FaGithub,
                          url: profile?.github,
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
                    {displayBio}
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
              { id: "published", label: "My Blogs", count: myBlogs.length },
              { id: "all", label: "All Blogs", count: allBlogs.length },
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
                  blog.topicPic ??
                  blog.coverImage ??
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
                      {blog.tag && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
                            {blog.tag}
                          </span>
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-3 text-xs font-bold tracking-widest text-blue-400/80 uppercase">
                        {blog.createdAt && (
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt />{" "}
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        )}
                        {blog.writerName && (
                          <>
                            <span className="size-1 rounded-full bg-white/20" />
                            <span className="flex items-center gap-1">
                              <FaClock /> {blog.writerName}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="mb-3 line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                        {blog.title}
                      </h3>
                      <p className="mb-6 line-clamp-3 flex-1 text-sm text-gray-400">
                        {(blog.intro ?? "").replace(/<[^>]*>/g, "")}
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
                              {blog._count?.comments ?? 0}
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
