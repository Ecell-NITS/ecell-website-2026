"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Router, { useRouter } from "next/router";
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
} from "react-icons/fa";

interface User {
  id: number;
  first_name: string;
  email: string;
  image: string;
  gender: string;
  post: string;
  age: number;
  country: string;
  facebook_profile: string;
  twitter_handle: string;
  instagram_handle: string;
  linkedin_profile: string;
  github: string;
  about: string;
  All_blogs: Blog[];
}

type Blog = {
  id: number;
  title: string;
  brief_intro: string;
  read_time: string;
  category: string;
  likes: number;
  comments: number;
  is_liked: boolean;
  cover_image: string;
  details: string;
  posted_on: string;
};



export function DashboardContent() {

const router=useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") ?? "published",
  );

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  useEffect(() => {
    void fetch("/MOCK_DATA.json")
      .then((res) => res.json())
      .then((data: User[]) => {
        setAllUsers(data);
        setUser(data[0] ?? null);
      });
  }, []);
  

  const handleImageLoad = useCallback((imageUrl: string) => {
    setLoadedImages((prev) => new Set([...prev, imageUrl]));
  }, []);

  const displayedBlogs = useMemo(() => {
    if (!user) return [];
    if (activeTab === "published") {
      return user.All_blogs.map((blog) => ({
        ...blog,
        uniqueKey: `user-${user.id}-blog-${blog.id}`,
      }));
    }
    if (activeTab === "all") {
      // Aggregate all blogs from all users with unique keys
      return allUsers.flatMap((u) =>
        u.All_blogs.map((blog) => ({
          ...blog,
          uniqueKey: `user-${u.id}-blog-${blog.id}`,
        })),
      );
    }
    if (activeTab === "liked") {
      // Filter blogs where is_liked is true across all users with unique keys
      return allUsers.flatMap((u) =>
        u.All_blogs.filter((b) => b.is_liked).map((blog) => ({
          ...blog,
          uniqueKey: `user-${u.id}-blog-${blog.id}`,
        })),
      );
    }
    return [];
  }, [user, allUsers, activeTab]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 0, opacity: 1 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <main className="relative flex min-h-screen flex-col">
      {/* Profile Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-12 lg:px-8">
        {/* Background Decorative Elements */}
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full max-w-7xl -translate-x-1/2">
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>
          <div className="absolute right-[-10%] bottom-[-10%] h-[30%] w-[30%] rounded-full bg-purple-600/10 blur-[120px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-6xl"
        >
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md md:p-12">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              {/* Avatar & Info Section */}
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-start lg:col-span-12 xl:col-span-7">
                
                <div className="group relative shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative size-40 cursor-pointer overflow-hidden rounded-full border-4 border-blue-500 bg-[#111722] shadow-[0_0_30px_rgba(59,130,246,0.5)] md:size-48"
                  >
                    <Image
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt="Profile"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={192}
                      height={192}
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => router.push("/dashboard/edit_profile")}
                    className="absolute right-2 bottom-2 flex size-10 cursor-pointer items-center justify-center rounded-full border-4 border-[#020617] bg-blue-600 text-white shadow-lg"
                  >
                    <FaEdit className="text-lg" />
                  </motion.div>
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h1 className="mb-1 text-4xl font-bold tracking-tight text-white md:text-5xl">
                      {user?.first_name ?? "User Name"}
                    </h1>
                    <p className="text-xl font-medium text-blue-400">
                      {user?.post ?? "Role / Position"}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-4 pt-2 md:justify-start"
                  >
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
                    
                    
                  </motion.div>

                  {/* Social Icons within Info Section */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-4 pt-2 md:justify-start"
                  >
                    {(
                      [
                        {
                          icon: FaFacebook,
                          url: user?.facebook_profile,
                          color: "hover:text-blue-500",
                        },
                        {
                          icon: FaInstagram,
                          url: user?.instagram_handle,
                          color: "hover:text-pink-500",
                        },
                        {
                          icon: FaLinkedin,
                          url: user?.linkedin_profile,
                          color: "hover:text-blue-400",
                        },
                        {
                          icon: FaGithub,
                          url: user?.github,
                          color: "hover:text-white",
                        },
                      ] as const
                    ).map((social, idx) => (
                      <motion.a
                        key={idx}
                        whileHover={{ y: -3, scale: 1.1 }}
                        href={social.url ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-blue-500/50 hover:bg-blue-500/10 ${social.color}`}
                      >
                        <social.icon className="size-5" />
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Relocated About Section */}
              <div className="h-full lg:col-span-12 xl:col-span-5">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
                >
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                    <FaInfoCircle className="text-blue-400" />
                    About
                  </h3>
                  <p className="custom-scrollbar max-h-[150px] overflow-y-auto pr-4 leading-relaxed text-gray-400">
                    {user?.about ??
                      "No information provided yet. Click 'Edit Profile' to share something about yourself."}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Unified Tabs */}
          <div className="mb-12 flex items-center gap-8 border-b border-white/10">
            {[
              {
                id: "published",
                label: "My Blogs",
                count: user?.All_blogs?.length,
              },
              {
                id: "all",
                label: "All Blogs",
                count: allUsers.flatMap((u) => u.All_blogs).length,
              },
              {
                id: "liked",
                label: "Liked Blogs",
                count: allUsers
                  .flatMap((u) => u.All_blogs)
                  .filter((b) => b.is_liked).length,
              },
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
                {tab.count !== undefined && (
                  <span className="ml-2 text-xs opacity-60">({tab.count})</span>
                )}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-blue-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Blogs Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {displayedBlogs.length > 0 ? (
                displayedBlogs.map((blog) => (
                  <motion.div
                    key={blog.uniqueKey}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
                  >
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="relative block aspect-video overflow-hidden bg-white/5"
                    >
                      {!loadedImages.has(blog.cover_image) && (
                        <Skeleton className="absolute inset-0" />
                      )}
                      <Image
                        src={blog.cover_image}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={400}
                        height={225}
                        onLoad={() => handleImageLoad(blog.cover_image)}
                        priority={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                      <div className="absolute top-4 right-4 z-20">
                        <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
                          {blog.category}
                        </span>
                      </div>
                    </Link>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-3 text-xs font-bold tracking-widest text-blue-400/80 uppercase">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt /> {blog.posted_on}
                        </span>
                        <span className="size-1 rounded-full bg-white/20"></span>
                        <span className="flex items-center gap-1">
                          <FaClock /> {blog.read_time}
                        </span>
                      </div>
                      <h3 className="mb-3 line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                        {blog.title}
                      </h3>
                      <p className="mb-6 line-clamp-3 flex-1 text-sm text-gray-400">
                        {blog.brief_intro}
                      </p>

                      <div className="flex items-center justify-between border-t border-white/5 pt-6">
                        <span className="cursor-pointer text-sm font-bold text-blue-500 group-hover:underline">
                          Read More
                        </span>
                        <div className="flex items-center gap-4 text-gray-400">
                          <button
                            className={`flex items-center gap-1.5 transition-colors ${blog.is_liked ? "text-red-400" : "hover:text-red-400"}`}
                          >
                            <FaHeart
                              className={blog.is_liked ? "fill-current" : ""}
                            />
                            <span className="text-xs">{blog.likes}</span>
                          </button>
                          <button className="flex items-center gap-1.5 transition-colors hover:text-white">
                            <FaComment />
                            <span className="text-xs">{blog.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-lg text-gray-500">
                    No blogs found in this category.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
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
        /* Fallback for other browsers */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.5) rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </main>
  );
}
