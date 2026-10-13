
"use client";
import { localBlogs } from "@/data/localBlogs";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import BlogCard from "./BlogCard";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface ApiBlog {
  id: string;
  title: string;
  intro?: string;
  tag?: string;
  content?: string;
  writerName?: string;
  coverImage?: string;
  topicPic?: string;
  writerPic?: string;
  createdAt?: string;
  timeStamp?: string;
  likes?: string[];
  authorId?: string;
  status?: string;
  _count?: {
    comments?: number;
  };
}

const getBlogTime = (date?: string): number => {
  if (!date) return 0;

  const timestamp = Date.parse(date);
  return Number.isFinite(timestamp) ? timestamp : 0;
};

export default function BlogsClient() {
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const fetchBlogs = useCallback(async () => {
  try {
    const { data } = await api.get("/api/blog/acceptedBlogs");
    const blogsData = data.data ?? data ?? [];

    if (Array.isArray(blogsData) && blogsData.length > 0) {
      setBlogs(blogsData);
    } else {
      setBlogs(localBlogs);
    }
  } catch (error) {
    console.error("Failed to fetch API blogs; using local blogs:", error);
    setBlogs(localBlogs);
  } finally {
    setLoading(false);
  }
}, []);
  useEffect(() => {
    void fetchBlogs();
  }, [fetchBlogs]);

  const filteredBlogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = blogs.filter((blog) => {
      const title = blog.title ?? "";
      const intro = blog.intro ?? "";
      const tags = blog.tag ?? "";

      return (
        title.toLowerCase().includes(query) ||
        intro.toLowerCase().includes(query) ||
        tags.toLowerCase().includes(query)
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "Latest") {
        const dateA = getBlogTime(a.createdAt ?? a.timeStamp);
        const dateB = getBlogTime(b.createdAt ?? b.timeStamp);
        return dateB - dateA;
      }

      if (sortBy === "Trending") {
        const dateA = getBlogTime(a.createdAt ?? a.timeStamp);
        const dateB = getBlogTime(b.createdAt ?? b.timeStamp);
        return dateB - dateA;
      }

      if (sortBy === "Most Liked") {
        return (b.likes?.length ?? 0) - (a.likes?.length ?? 0);
      }

      return 0;
    });
  }, [blogs, searchQuery, sortBy]);

  return (
    <section className="min-h-screen bg-[#080808] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            E-Cell NIT Silchar
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Blogs
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            Ideas, insights, and stories on entrepreneurship, technology, and
            innovation.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search blogs..."
              aria-label="Search blogs"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500"
            />
          </div>

          <div className="relative sm:w-48">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort blogs"
              className="w-full appearance-none rounded-xl border border-white/10 bg-[#151515] px-4 py-3 pr-10 text-sm text-white outline-none focus:border-purple-500"
            >
              <option value="Latest">Latest</option>
              <option value="Trending">Trending</option>
              <option value="Most Liked">Most Liked</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl border border-white/10 bg-white/5"
              />
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={{
                  id: blog.id,
                  title: blog.title,
                  description: blog.intro ?? "",
                  fullContent: blog.content ?? blog.intro ?? "",
                  author: blog.writerName ?? "Anonymous",
                  role: "Contributor",
                  readTime: "5 min read",
                  likes: blog.likes?.length ?? 0,
                  tags: blog.tag
                    ? blog.tag.split(",").map((tag) => tag.trim())
                    : [],
                  image:
                    blog.topicPic ??
                    blog.coverImage ??
                    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&q=80&w=600",
                  avatar:
                    blog.writerPic ??
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      blog.writerName ?? "A",
                    )}&background=3b82f6&color=fff&size=80`,
                }}
                isLoggedIn={Boolean(user)}
                initialLiked={Boolean(
                  user &&
                    blog.likes?.some((like) => like === user.id),
                )}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <h2 className="text-xl font-semibold">
              {searchQuery.trim() ? "No matching blogs found" : "No blogs yet"}
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              {searchQuery.trim()
                ? "Try a different search term."
                : "Check back soon for new articles."}
            </p>

            {searchQuery.trim() && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-5 rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium transition hover:bg-purple-500"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
