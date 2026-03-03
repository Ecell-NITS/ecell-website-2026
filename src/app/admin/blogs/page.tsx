/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-floating-promises */
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  FileText,
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  Clock,
  User,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import api from "@/lib/api";
import AdminNavigation from "../AdminNavigation";

interface ApiBlog {
  id: string;
  title: string;
  intro?: string;
  content?: string;
  tag?: string;
  writerName?: string;
  writerEmail?: string;
  subject?: string;
  text?: string;
  isAccepted?: boolean;
  timeStamp?: string;
  createdAt?: string;
}

type FilterType = "all" | "pending" | "accepted";

export default function AdminBlogsPage() {
  const { user: authUser, isLoading } = useAuth();
  const router = useRouter();
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Redirect if not admin/superadmin
  useEffect(() => {
    if (
      !isLoading &&
      (!authUser ||
        (authUser.role !== "ADMIN" && authUser.role !== "SUPERADMIN"))
    ) {
      toast.error("Access denied. Admin privileges required.");
      router.push("/dashboard");
    }
  }, [isLoading, authUser, router]);

  // Fetch all blogs
  useEffect(() => {
    if (!authUser) return;
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get("/api/blog/getblogs");
        const blogsData = data.data ?? data ?? [];
        setBlogs(Array.isArray(blogsData) ? blogsData : []);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        toast.error(error.response?.data?.message ?? "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [authUser]);

  const handleApprove = async (blog: ApiBlog) => {
    setUpdatingId(blog.id);
    try {
      await api.post(`/api/blog/publishBlog/${blog.id}`, {
        email: blog.writerEmail,
        writerName: blog.writerName ?? "Anonymous",
        subject: blog.subject ?? blog.intro ?? "",
        text: blog.text ?? blog.content ?? "",
      });
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, isAccepted: true } : b)),
      );
      toast.success("Blog approved! ✅");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message ?? "Failed to approve blog");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleReject = async (blog: ApiBlog) => {
    setUpdatingId(blog.id);
    try {
      await api.delete(`/api/blog/deleteBlog/${blog.id}`, {
        data: {
          email: blog.writerEmail,
          writerName: blog.writerName ?? "",
        },
      });
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
      toast.success("Blog rejected and deleted");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message ?? "Failed to delete blog");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (blog: ApiBlog) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    setUpdatingId(blog.id);
    try {
      await api.delete(`/api/blog/deleteBlog/${blog.id}`, {
        data: {
          email: blog.writerEmail,
          writerName: blog.writerName ?? "",
        },
      });
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
      toast.success("Blog deleted 🗑️");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message ?? "Failed to delete blog");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBlogs = useMemo(() => {
    let result = blogs;

    // Apply status filter
    if (filter === "pending") {
      result = result.filter((b) => !b.isAccepted);
    } else if (filter === "accepted") {
      result = result.filter((b) => b.isAccepted);
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title?.toLowerCase().includes(query) ??
          b.writerName?.toLowerCase().includes(query) ??
          b.writerEmail?.toLowerCase().includes(query) ??
          b.tag?.toLowerCase().includes(query),
      );
    }

    return result;
  }, [blogs, filter, searchQuery]);

  const pendingCount = blogs.filter((b) => !b.isAccepted).length;
  const acceptedCount = blogs.filter((b) => b.isAccepted).length;

  const getPreview = (blog: ApiBlog) => {
    const text = blog.intro ?? blog.subject ?? blog.content ?? blog.text ?? "";
    // Strip HTML tags for preview
    const clean = text.replace(/<[^>]*>/g, "");
    return clean.length > 200 ? clean.substring(0, 200) + "..." : clean;
  };

  return (
    <div className="flex min-h-screen bg-linear-to-br from-[#0b1220] to-[#060b16] text-white">
      <AdminNavigation active="blogs" mobileMenu={false} />

      <main className="flex w-full flex-col px-4 pt-20 pb-8 sm:px-6 lg:ml-64 lg:pt-8 xl:px-8 2xl:ml-72 2xl:px-10 2xl:pt-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
                <FileText className="text-blue-400" />
                Blog Management
              </h1>
              <p className="mt-1 text-white/60">
                {blogs.length} total · {pendingCount} pending · {acceptedCount}{" "}
                accepted
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pr-4 pl-10 text-sm text-white placeholder-gray-500 transition-all outline-none focus:border-blue-500/40"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mt-4 flex gap-2">
            {(["all", "pending", "accepted"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-4 py-2 text-xs font-bold tracking-wide uppercase transition-all ${
                  filter === f
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {f}
                {f === "pending" && pendingCount > 0 && (
                  <span className="ml-1.5 rounded-full bg-yellow-500/20 px-1.5 py-0.5 text-[10px] text-yellow-400">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Blog List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl bg-white/5"
              />
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-16 text-center">
            <FileText size={48} className="mx-auto mb-4 text-gray-600" />
            <p className="text-gray-500">No blogs found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-white/20"
              >
                {/* Blog Row */}
                <div className="flex flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:gap-4">
                  {/* Status Badge */}
                  <div className="flex-shrink-0">
                    {blog.isAccepted ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/20 px-2.5 py-1 text-[10px] font-bold text-green-400 uppercase">
                        <CheckCircle size={12} />
                        Accepted
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full border border-yellow-500/30 bg-yellow-500/20 px-2.5 py-1 text-[10px] font-bold text-yellow-400 uppercase">
                        <Clock size={12} />
                        Pending
                      </span>
                    )}
                  </div>

                  {/* Title & Meta */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-white sm:text-base">
                      {blog.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {blog.writerName ?? blog.writerEmail ?? "Anonymous"}
                      </span>
                      {blog.tag && (
                        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px]">
                          {blog.tag}
                        </span>
                      )}
                      {(blog.timeStamp ?? blog.createdAt) && (
                        <span>
                          {new Date(
                            (blog.timeStamp ?? blog.createdAt)!,
                          ).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Expand/Preview */}
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === blog.id ? null : blog.id)
                      }
                      className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/70 transition-all hover:bg-white/20 hover:text-white"
                    >
                      <Eye size={14} />
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${expandedId === blog.id ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Approve (only for pending) */}
                    {!blog.isAccepted && (
                      <button
                        onClick={() => handleApprove(blog)}
                        disabled={updatingId === blog.id}
                        className="flex items-center gap-1.5 rounded-lg bg-green-600/20 px-3 py-1.5 text-xs font-semibold text-green-400 transition-all hover:bg-green-600/30 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {updatingId === blog.id ? (
                          <div className="h-3 w-3 animate-spin rounded-full border border-green-400/30 border-t-green-400" />
                        ) : (
                          <CheckCircle size={14} />
                        )}
                        Approve
                      </button>
                    )}

                    {/* Reject (only for pending) */}
                    {!blog.isAccepted && (
                      <button
                        onClick={() => handleReject(blog)}
                        disabled={updatingId === blog.id}
                        className="flex items-center gap-1.5 rounded-lg bg-red-600/20 px-3 py-1.5 text-xs font-semibold text-red-400 transition-all hover:bg-red-600/30 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {updatingId === blog.id ? (
                          <div className="h-3 w-3 animate-spin rounded-full border border-red-400/30 border-t-red-400" />
                        ) : (
                          <XCircle size={14} />
                        )}
                        Reject
                      </button>
                    )}

                    {/* Delete (for accepted) */}
                    {blog.isAccepted && (
                      <button
                        onClick={() => handleDelete(blog)}
                        disabled={updatingId === blog.id}
                        className="flex items-center gap-1.5 rounded-lg bg-red-600/20 px-3 py-1.5 text-xs font-semibold text-red-400 transition-all hover:bg-red-600/30 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {updatingId === blog.id ? (
                          <div className="h-3 w-3 animate-spin rounded-full border border-red-400/30 border-t-red-400" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Preview */}
                {expandedId === blog.id && (
                  <div className="border-t border-white/10 bg-white/[0.02] px-4 py-4 sm:px-6">
                    <p className="mb-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                      Preview
                    </p>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {getPreview(blog) || "No content available"}
                    </p>
                    {blog.writerEmail && (
                      <p className="mt-3 text-xs text-gray-600">
                        Author email: {blog.writerEmail}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
