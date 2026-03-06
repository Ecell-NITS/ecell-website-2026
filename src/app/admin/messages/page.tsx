"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { Trash2, X, Reply, Clock, Eye, Loader2, RefreshCw } from "lucide-react";

import AdminNavigation from "../AdminNavigation";
import api from "~/lib/api";

/* ================= TYPES ================= */

interface Query {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

/* ================= HELPERS ================= */

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

/* ================= PAGE ================= */

export default function AdminMessagesPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMessage, setActiveMessage] = useState<Query | null>(null);
  const [compose, setCompose] = useState({
    open: false,
    to: "",
    subject: "",
    body: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    queryId: string | null;
  }>({
    open: false,
    queryId: null,
  });
  const [deleting, setDeleting] = useState(false);

  const fetchQueries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<Query[]>("/api/query");
      setQueries(res.data);
    } catch {
      setError("Failed to fetch messages. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchQueries();
  }, [fetchQueries]);

  const unread = queries.filter((q) => !q.read);
  const read = queries.filter((q) => q.read);

  const handleMarkRead = async (id: string) => {
    try {
      await api.patch(`/api/query/${id}/read`);
      setQueries((prev) =>
        prev.map((q) => (q.id === id ? { ...q, read: true } : q)),
      );
      if (activeMessage?.id === id) {
        setActiveMessage((prev) => (prev ? { ...prev, read: true } : null));
      }
    } catch {
      console.error("Failed to mark as read");
    }
  };

  const handleMarkUnread = async (id: string) => {
    try {
      await api.patch(`/api/query/${id}/unread`);
      setQueries((prev) =>
        prev.map((q) => (q.id === id ? { ...q, read: false } : q)),
      );
      if (activeMessage?.id === id) {
        setActiveMessage((prev) => (prev ? { ...prev, read: false } : null));
      }
    } catch {
      console.error("Failed to mark as unread");
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await api.delete(`/api/query/${id}`);
      setQueries((prev) => prev.filter((q) => q.id !== id));
      if (activeMessage?.id === id) setActiveMessage(null);
    } catch {
      console.error("Failed to delete query");
    } finally {
      setDeleting(false);
      setDeleteConfirm({ open: false, queryId: null });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0b1220] to-[#060b16] text-white">
      <AdminNavigation active="messages" mobileMenu={false} />

      <main className="4xl:ml-80 flex-1 p-4 pt-20 sm:p-6 sm:pt-24 lg:ml-64 lg:p-8 2xl:ml-72">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <h1 className="text-xl font-semibold sm:text-2xl lg:text-3xl">
            Messages
          </h1>
          <button
            onClick={() => void fetchQueries()}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:border-white/30 hover:text-white disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Loading State */}
        {loading && queries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-white/50">
            <Loader2 size={32} className="mb-3 animate-spin" />
            <p className="text-sm">Loading messages...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
            {error}
            <button
              onClick={() => void fetchQueries()}
              className="ml-2 underline hover:text-red-300"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && queries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-white/40">
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">
              Queries from the contact form will appear here.
            </p>
          </div>
        )}

        {/* Content Grid */}
        {!loading && queries.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            <Section title="Unread Messages" badge={`${unread.length} New`}>
              {unread.length > 0 ? (
                unread.map((q) => (
                  <MessageCard
                    key={q.id}
                    query={q}
                    onOpen={() => setActiveMessage(q)}
                    onReply={() =>
                      setCompose({
                        open: true,
                        to: q.email,
                        subject: `Re: Query from ${q.name}`,
                        body: "",
                      })
                    }
                    onMark={() => void handleMarkRead(q.id)}
                    onDelete={() =>
                      setDeleteConfirm({ open: true, queryId: q.id })
                    }
                  />
                ))
              ) : (
                <p className="text-sm text-white/50">No unread messages</p>
              )}
            </Section>

            <Section title="Read Messages">
              {read.length > 0 ? (
                read.map((q) => (
                  <MessageCard
                    key={q.id}
                    query={q}
                    onOpen={() => setActiveMessage(q)}
                    onReply={() =>
                      setCompose({
                        open: true,
                        to: q.email,
                        subject: `Re: Query from ${q.name}`,
                        body: "",
                      })
                    }
                    onMark={() => void handleMarkUnread(q.id)}
                    onDelete={() =>
                      setDeleteConfirm({ open: true, queryId: q.id })
                    }
                  />
                ))
              ) : (
                <p className="text-sm text-white/50">No read messages</p>
              )}
            </Section>
          </div>
        )}
      </main>

      {/* ================= DELETE CONFIRM DIALOG ================= */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#121a2f] p-6 text-center shadow-xl">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                <Trash2 size={22} />
              </div>
            </div>

            <h3 className="mb-2 text-lg font-semibold">Delete Message?</h3>
            <p className="mb-6 text-sm text-white/60">
              This message will be permanently removed. This action cannot be
              undone.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteConfirm({ open: false, queryId: null })}
                disabled={deleting}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/30 hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (deleteConfirm.queryId) {
                    void handleDelete(deleteConfirm.queryId);
                  }
                }}
                disabled={deleting}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold transition hover:bg-red-500 disabled:opacity-50"
              >
                {deleting && <Loader2 size={14} className="animate-spin" />}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= READ MORE POPUP ================= */}
      {activeMessage && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-xl border border-white/10 bg-[#121a2f] shadow-xl">
            <button
              onClick={() => setActiveMessage(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 border-b border-white/10 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/30 text-sm font-semibold">
                {activeMessage.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold">{activeMessage.name}</p>
                <p className="text-xs text-white/50">
                  {activeMessage.email} • {timeAgo(activeMessage.createdAt)}
                </p>
              </div>
            </div>

            <div className="p-5 text-sm leading-relaxed text-white/80">
              {activeMessage.message}
            </div>

            <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 p-5 sm:flex-row sm:items-center">
              <button
                onClick={() =>
                  setCompose({
                    open: true,
                    to: activeMessage.email,
                    subject: `Re: Query from ${activeMessage.name}`,
                    body: "",
                  })
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500 sm:w-auto"
              >
                <Reply size={16} /> Reply
              </button>

              <button
                onClick={() => {
                  if (activeMessage.read) {
                    void handleMarkUnread(activeMessage.id);
                  } else {
                    void handleMarkRead(activeMessage.id);
                  }
                }}
                className="text-sm text-white/70 hover:text-white"
              >
                {activeMessage.read ? "Mark as Unread" : "Mark as Read"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EMAIL POPUP ================= */}
      {compose.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-xl border border-white/10 bg-[#121a2f] p-6">
            <div className="mb-4 flex justify-between">
              <h3 className="font-semibold">Reply Email</h3>
              <X
                className="cursor-pointer"
                size={20}
                onClick={() => setCompose({ ...compose, open: false })}
              />
            </div>

            <input
              className="mb-3 w-full rounded border border-white/20 bg-transparent p-3 text-sm"
              value={compose.to}
              readOnly
            />
            <input
              className="mb-3 w-full rounded border border-white/20 bg-transparent p-3 text-sm"
              placeholder="Subject"
              value={compose.subject}
              onChange={(e) =>
                setCompose({ ...compose, subject: e.target.value })
              }
            />
            <textarea
              className="mb-4 h-32 w-full rounded border border-white/20 bg-transparent p-3 text-sm"
              placeholder="Type your reply..."
              value={compose.body}
              onChange={(e) => setCompose({ ...compose, body: e.target.value })}
            />

            <button
              className="w-full rounded bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500 sm:w-auto"
              onClick={() => {
                const subject = encodeURIComponent(compose.subject);
                const body = encodeURIComponent(compose.body);
                window.location.href = `mailto:${compose.to}?subject=${subject}&body=${body}`;
                setCompose({ ...compose, open: false });
              }}
            >
              Send Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

interface SectionProps {
  title: string;
  badge?: string;
  children: ReactNode;
}

interface MessageCardProps {
  query: Query;
  onOpen: () => void;
  onReply: () => void;
  onMark: () => void;
  onDelete: () => void;
}

function Section({ title, badge, children }: SectionProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-base font-semibold sm:text-lg">{title}</h2>
        {badge && (
          <span className="rounded-full bg-blue-600/20 px-2 py-1 text-xs text-blue-400">
            {badge}
          </span>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function MessageCard({
  query,
  onOpen,
  onReply,
  onMark,
  onDelete,
}: MessageCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#121a2f] p-3 shadow-sm transition hover:border-blue-500/40 hover:shadow-md sm:p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-2 sm:gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/30 text-xs font-semibold sm:h-9 sm:w-9 sm:text-sm">
            {query.name[0]}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold sm:text-sm">
              {query.name}
            </p>
            <p className="truncate text-xs text-white/50">{query.email}</p>
          </div>
        </div>
      </div>

      <p className="mb-3 line-clamp-2 text-xs text-white/60">{query.message}</p>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3 text-xs text-white/50">
        <button
          onClick={onOpen}
          className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
        >
          <Eye size={14} /> Read
        </button>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {timeAgo(query.createdAt)}
          </span>
          <button onClick={onReply} title="Reply">
            <Reply size={14} className="cursor-pointer hover:text-blue-400" />
          </button>
          <button onClick={onMark} className="text-xs hover:text-white">
            {query.read ? "Mark Unread" : "Mark Read"}
          </button>
          <button onClick={onDelete} title="Delete">
            <Trash2 size={14} className="cursor-pointer hover:text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
