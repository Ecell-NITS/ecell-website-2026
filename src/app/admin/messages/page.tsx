"use client";

import { useState } from "react";
import { Trash2, X, Reply, Clock, Eye } from "lucide-react";

import AdminNavigation from "../AdminNavigation";

/* ================= TYPES ================= */

type MessageStatus = "read" | "unread";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  body: string;
  time: string;
  status: MessageStatus;
  urgent?: boolean;
}

/* ================= MOCK DATA ================= */

const initialMessages: Message[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.j@example.com",
    subject: "Issue with my recent order #12345",
    body: "I received my package today but unfortunately one of the items was damaged during shipping. I've attached photos.",
    time: "2h ago",
    status: "unread",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@techcorp.io",
    subject: "Enterprise Plan Inquiry",
    body: "We are looking to upgrade our current subscription to Enterprise for 50+ seats.",
    time: "4h ago",
    status: "unread",
  },
  {
    id: 3,
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    subject: "Login Failure - Critical",
    body: "I cannot access my account. Error code 503 constantly. Please help.",
    time: "5h ago",
    status: "unread",
    urgent: true,
  },
  {
    id: 4,
    name: "David Kim",
    email: "d.kim88@gmail.com",
    subject: "Re: Support Ticket #9921",
    body: "Thanks for the quick resolution. Everything works now.",
    time: "Yesterday",
    status: "read",
  },
];

/* ================= PAGE ================= */

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [activeMessage, setActiveMessage] = useState<Message | null>(null);
  const [compose, setCompose] = useState({
    open: false,
    to: "",
    subject: "",
    body: "",
  });

  const unread = messages.filter((m) => m.status === "unread");
  const read = messages.filter((m) => m.status === "read");

  const markStatus = (id: number, status: MessageStatus) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m)),
    );
  };

  const deleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setActiveMessage(null);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0b1220] to-[#060b16] text-white">
      <AdminNavigation active="messages" mobileMenu={false} />

      <main className="4xl:ml-80 flex-1 p-4 sm:p-6 lg:ml-64 lg:p-8 2xl:ml-72">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <h1 className="text-xl font-semibold sm:text-2xl lg:text-3xl">
            Messages
          </h1>
        </div>

        {/* Content Grid */}
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
                  onMark={() => markStatus(m.id, "read")}
                  onDelete={() => deleteMessage(m.id)}
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
                  onMark={() => markStatus(m.id, "unread")}
                  onDelete={() => deleteMessage(m.id)}
                />
              ))
            ) : (
              <p className="text-sm text-white/50">No read messages</p>
            )}
          </Section>
        </div>
      </main>

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
                <p className="text-sm font-semibold">{activeMessage.subject}</p>
                <p className="text-xs text-white/50">
                  {activeMessage.name} • {activeMessage.email}
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
                    subject: `Re: ${activeMessage.subject}`,
                    body: "",
                  })
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500 sm:w-auto"
              >
                <Reply size={16} /> Reply
              </button>

              <button
                onClick={() =>
                  markStatus(
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
  message: Message;
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

        {message.urgent && (
          <span className="flex-shrink-0 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] text-red-400">
            URGENT
          </span>
        )}
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
