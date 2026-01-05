// src/app/dashboard/page.tsx
"use client";
import type { url } from "inspector";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState , useEffect } from "react";
import { array } from "zod/v4";

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
  github:string;
  about: string;
  All_blogs: typeof array;
}
type Blog = {
  id: number;
  title: string;
  brief_intro: string;
  read_time: string;
  category: string;
  likes: number;
  comments: number;
  is_liked : boolean;
  cover_image: string;
  details : string;
  posted_on : string;
};


export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();
   
    useEffect(() => {
      fetch("/MOCK_DATA.json")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          setBlogs(data[0].All_blogs);
        });
    }, []);
  

  // Show the data
  return (
    <div className="selection:bg-primary flex h-screen overflow-hidden bg-black text-slate-900 selection:text-white dark:text-white">
      <aside className="flex hidden w-64 flex-shrink-0 flex-col border-r border-[#232f48] bg-[#111722] md:flex">
        <div className="flex items-center gap-3 p-6">
          <div className="bg-primary flex size-8 items-center justify-center rounded text-white">
            <span className="material-symbols-outlined">dashboard</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight">UserDash</h1>
        </div>
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-4">
          <a
            className="bg-primary/20 flex items-center gap-3 rounded-lg px-3 py-2.5 text-white transition-colors"
            href="#"
          >
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              person
            </span>
            <span className="text-sm font-medium">My Profile</span>
          </a>
          <a
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#92a4c9] transition-colors hover:bg-[#232f48] hover:text-white"
            href="#"
          >
            <span className="material-symbols-outlined text-[#92a4c9] group-hover:text-white">
              article
            </span>
            <span className="text-sm font-medium">My Blogs</span>
            <span className="ml-auto rounded-full bg-[#232f48] px-2 py-0.5 text-xs font-bold text-[#92a4c9]">
              {blogs.length}
            </span>
          </a>
          <a
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#92a4c9] transition-colors hover:bg-[#232f48] hover:text-white"
            href="#"
          >
            <span className="material-symbols-outlined text-[#92a4c9] group-hover:text-white">
              favorite
            </span>
            <span className="text-sm font-medium">Liked Blogs</span>
          </a>
          <a
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#92a4c9] transition-colors hover:bg-[#232f48] hover:text-white"
            href="#"
          >
            <span className="material-symbols-outlined text-[#92a4c9] group-hover:text-white">
              settings
            </span>
            <span className="text-sm font-medium">Settings</span>
          </a>
        </nav>
        <div className="mt-auto border-t border-[#232f48] p-4">
          <div className="flex items-center gap-3">
            <div
              className="size-10 rounded-full bg-cover bg-center"
              data-alt="Portrait of admin user"
              style={{
                backgroundImage: `url(${users?.[0]?.image || ""})`,
              }}
            ></div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-white">
                {users?.[0]?.first_name}
              </p>
              <p className="text-xs text-[#92a4c9]">{users?.[0]?.post}</p>
            </div>
            <button className="ml-auto text-[#92a4c9] hover:text-white">
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </aside>
      <main className="bg-background-light dark:bg-background-dark relative flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#232f48] bg-[#111722]/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex max-w-2xl flex-1 items-center gap-4">
            <button className="text-white md:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="hidden text-xl font-bold text-white md:block">
              User Profile
            </h2>
          </div>
          <div className="ml-4 flex items-center gap-4">
            <button 
            onClick={()=> router.push("/dashboard/add_blogs")}
            className="bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600">
              <span className="material-symbols-outlined text-lg">
                add_circle
              </span>
              Add Blog
            </button>
            <button className="relative text-[#92a4c9] hover:text-white">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 size-2 rounded-full border-2 border-[#111722] bg-red-500"></span>
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mx-auto flex h-full max-w-5xl flex-col gap-8">
            <div className="rounded-xl border border-[#334155]/30 bg-[#232f48] p-6 md:p-8">
              <div className="flex flex-col items-start gap-8 md:flex-row">
                <div className="mx-auto flex flex-shrink-0 flex-col items-center gap-4 md:mx-0">
                  <div
                    className="group relative flex size-32 items-center justify-center overflow-hidden rounded-full border-2 border-[#1c6bff] bg-[#111722] shadow-[0_0_20px_rgba(0,199,255,0.8)] md:size-40"
                    style={{
                      backgroundImage: `url(${users?.[0]?.image || ""})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="flex gap-3">
                         
                      <a
                        href={users[0]?.facebook_profile}
                        target="_blank"
                        className="flex size-8 items-center justify-center rounded-full bg-[#334155] text-white transition-colors hover:bg-[#2b6cee]"
                        title="Facebook"
                      >
                        <svg
                          className="h-4 w-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                    

                    <a
                      href={users[0]?.instagram_handle}
                      target="_blank"
                      className="flex size-8 items-center justify-center rounded-full bg-[#334155] text-white transition-colors hover:bg-[#E1306C]"
                      title="Instagram"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                      </svg>
                    </a>
                    <a
                      href={users[0]?.github}
                      target="_blank"
                      className="flex size-8 items-center justify-center rounded-full bg-[#334155] text-white transition-colors hover:bg-black"
                      title="GitHub"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                      </svg>
                    </a>
                    <a
                      href={users[0]?.linkedin_profile}
                      target="_blank"
                      className="flex size-8 items-center justify-center rounded-full bg-[#334155] text-white transition-colors hover:bg-[#0077b5]"
                      title="LinkedIn"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="w-full flex-1">
                  <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <h1 className="mb-1 text-3xl font-bold text-white">
                        {users[0]?.first_name}
                      </h1>
                      <p className="text-lg text-[#92a4c9]">{users[0]?.post}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link 
                      href="/dashboard/edit_profile"
                      className="rounded-lg border border-[#2b6cee] bg-transparent px-4 py-2 text-sm font-medium text-[#2b6cee] transition-colors hover:bg-[#2b6cee] hover:text-white">
                        Edit Profile
                      </Link>
                    </div>
                  </div>
                  <div className="rounded-lg border border-[#334155] bg-[#111722] p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-medium text-white">
                      <span className="material-symbols-outlined text-primary text-sm">
                        info
                      </span>
                      About
                    </h3>
                    <p className="text-sm leading-relaxed text-[#92a4c9]">
                      {users[0]?.about}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <nav className="flex items-center gap-6 border-b border-[#232f48]">
                <button 
                onClick={()=>router.push("/dashboard")}
                className="text-primary border-primary flex items-center gap-2  pb-3 text-sm font-medium">
                  Published Blogs
                  <span className="bg-primary rounded-full px-1.5 py-0.5 text-[10px] text-white">
                    {blogs.length}
                  </span>
                </button>
                <button className=" text-primary border-primary flex items-center gap-2 border-b-2 pb-3 text-sm font-medium">
                  All Blogs
                </button>
                <button 
                onClick={()=> router.push("/dashboard/liked_blogs")}
                className="border-b-2 border-transparent pb-3 text-sm font-medium text-[#92a4c9] transition-colors hover:border-[#334155] hover:text-white">
                  Liked Blogs
                </button>
              </nav>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                
                {blogs.map((blog)=>(
                  <a
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#334155]/30 bg-[#232f48] transition-all hover:border-[#2b6cee]/30 hover:shadow-xl hover:shadow-[#2b6cee]/10"
                  href="#"
                  key={blog.id}
                >
                  <div className="relative h-48 overflow-hidden bg-[#111722]">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#232f48] to-transparent"
                    ><img
                        alt="Profile"
                        className="h-full w-full object-cover"
                        src={blog.cover_image}
                      />
                      </div>
                    <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-[#334155] transition-transform duration-300 group-hover:scale-110">
                      code_blocks
                    </span>
                    <div className="absolute top-3 right-3 z-20">
                      <span className="rounded bg-[#111722]/80 px-2 py-1 text-xs font-medium text-white backdrop-blur shadow-[0_0_20px_rgba(0,199,255,0.8)]">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-2 text-xs text-[#92a4c9]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          calendar_today
                        </span>{" "}
                        {blog.posted_on}
                      </span>
                      <span>•</span>
                      <span>{blog.read_time}</span>
                    </div>
                    <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-lg font-bold text-white transition-colors ">
                      {blog.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 flex-1 text-sm text-[#92a4c9]">
                      {blog.brief_intro}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-[#334155] pt-4 text-sm">
                      <span className="text-primary font-medium hover:underline">
                        Read More
                      </span>
                      <div className="flex items-center gap-3 text-[#92a4c9]">
                        <span className="flex cursor-pointer items-center gap-1 transition-colors hover:text-red-400">
                          <span className="material-symbols-outlined text-[16px]">
                            favorite
                          </span>{" "}
                          {blog.likes}
                        </span>
                        <span className="flex cursor-pointer items-center gap-1 transition-colors hover:text-white">
                          <span className="material-symbols-outlined text-[16px]">
                            chat_bubble
                          </span>{" "}
                          {blog.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
