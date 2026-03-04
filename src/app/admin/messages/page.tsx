"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, X, Reply, Clock, Eye, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";

import AdminNavigation from "../AdminNavigation";

/* ================= TYPES ================= */

type MessageStatus = "read" | "unread";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface DisplayMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  time: string;
  status: MessageStatus;
}

/* ================= HELPERS ================= */

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString();
}

function toDisplayMessage(m: Message): DisplayMessage {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    subject: m.message.length > 60 ? m.message.slice(0, 60) + "…" : m.message,
    body: m.message,
    time: formatRelativeTime(m.createdAt),
    status: m.read ? "read" : "unread",
  };
}

/* ================= PAGE ================= */

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMessage, setActiveMessage] = useState<DisplayMessage | null>(
    null,
  );
  const [compose, setCompose] = useState({
    open: false,
    to: "",
    subject: "",
    body: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    messageId: string | null;
  }>({
    open: false,
    messageId: null,
  });

  const fetchMessages = useCallback(async () => {
    try {
      const { data } = await api.get<Message[]>("/api/query");
      setMessages(data.map(toDisplayMessage));
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string } };
      };
      toast.error(error.response?.data?.error ?? "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMessages();
  }, [fetchMessages]);

  const unread = messages.filter((m) => m.status === "unread");
  const read = messages.filter((m) => m.status === "read");

  const markStatus = async (id: string, status: MessageStatus) => {
    try {
      const endpoint =
        status === "read" ? `/api/query/${id}/read` : `/api/query/${id}/unread`;
      await api.patch(endpoint);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m)),
      );
      if (activeMessage?.id === id) {
        setActiveMessage((prev) => (prev ? { ...prev, status } : null));
      }
      toast.success(`Marked as ${status}`);
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string } };
      };
      toast.error(
        error.response?.data?.error ?? "Failed to update message status",
      );
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await api.delete(`/api/query/${id}`);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setActiveMessage(null);
      toast.success("Message deleted");
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string } };
      };
      toast.error(error.response?.data?.error ?? "Failed to delete message");
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
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          /* Content Grid */
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            <Section title="Unread Messages" badge={`${unread.length} New`}>
              {unread.length > 0 ? (
                unread.map((m) => (
                  <MessageCard
                    key={m.id}
                    message={m}
                    onOpen={() => setActiveMessage(m)}
                    onReply={() =>
                      setCompose({
                        open: true,
                        to: m.email,
                        subject: `Re: ${m.subject}`,
                        body: "",
                      })
                    }
                    onMark={() => void markStatus(m.id, "read")}
                    onDelete={() =>
                      setDeleteConfirm({
                        open: true,
                        messageId: m.id,
                      })
                    }
                  />
                ))
              ) : (
                <p className="text-sm text-white/50">No unread messages</p>
              )}
            </Section>

            <Section title="Read Messages">
              {read.length > 0 ? (
                read.map((m) => (
                  <MessageCard
                    key={m.id}
                    message={m}
                    isRead
                    onOpen={() => setActiveMessage(m)}
                    onReply={() =>
                      setCompose({
                        open: true,
                        to: m.email,
                        subject: `Re: ${m.subject}`,
                        body: "",
                      })
                    }
                    onMark={() => void markStatus(m.id, "unread")}
                    onDelete={() =>
                      setDeleteConfirm({
                        open: true,
                        messageId: m.id,
                      })
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

      {/* ================= DELETE CONFIRM POPUP ================= */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#121a2f] p-6 text-center shadow-xl">
            {/* Warning Icon */}
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400">
                ⚠️
              </div>
            </div>

            <h3 className="mb-2 text-lg font-semibold">Are you sure?</h3>
            <p className="mb-6 text-sm text-white/60">
              This message will be permanently removed.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() =>
                  setDeleteConfirm({ open: false, messageId: null })
                }
                className="rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (deleteConfirm.messageId !== null) {
                    void deleteMessage(deleteConfirm.messageId);
                  }
                  setDeleteConfirm({ open: false, messageId: null });
                }}
                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold hover:bg-red-500"
              >
                Confirm
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
                  {activeMessage.email} • {activeMessage.time}
                </p>
              </div>
            </div>

            <div className="p-5 text-sm leading-relaxed text-white/80">
              {activeMessage.body}
            </div>

            <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 p-5 sm:flex-row sm:items-center">
              <button
                onClick={() =>
                  setCompose({
                    open: true,
                    to: activeMessage.email,
                    subject: `Re: Message from ${activeMessage.name}`,
                    body: "",
                  })
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500 sm:w-auto"
              >
                <Reply size={16} /> Reply
              </button>

              <button
                onClick={() =>
                  void markStatus(
                    activeMessage.id,
                    activeMessage.status === "unread" ? "read" : "unread",
                  )
                }
                className="text-sm text-white/70 hover:text-white"
              >
                {activeMessage.status === "unread"
                  ? "Mark as Read"
                  : "Mark as Unread"}
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
import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  badge?: string;
  children: ReactNode;
}

interface MessageCardProps {
  message: DisplayMessage;
  isRead?: boolean;
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
  message,
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
            {message.name[0]}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold sm:text-sm">
              {message.name}
            </p>
            <p className="truncate text-xs text-white/50">{message.email}</p>
          </div>
        </div>
      </div>

      <p className="mb-1 line-clamp-1 text-xs font-semibold sm:text-sm">
        {message.subject}
      </p>
      <p className="mb-3 line-clamp-2 text-xs text-white/60">{message.body}</p>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3 text-xs text-white/50">
        <button
          onClick={onOpen}
          className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
        >
          <Eye size={14} /> Read
        </button>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {message.time}
          </span>
          <button onClick={onReply} title="Reply">
            <Reply size={14} className="cursor-pointer hover:text-blue-400" />
          </button>
          <button onClick={onMark} className="text-xs hover:text-white">
            {message.status === "unread" ? "Mark Read" : "Mark Unread"}
          </button>
          <button onClick={onDelete} title="Delete">
            <Trash2 size={14} className="cursor-pointer hover:text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
