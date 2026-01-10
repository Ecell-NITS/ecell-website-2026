"use client";

import { useState } from "react";
import {
  Plus,
  Calendar,
  MapPin,
  Users,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Upload,
} from "lucide-react";
import AdminNavigation from "../AdminNavigation";

/* ================= TYPES ================= */
type WebinarStatus = "open" | "closed" | "draft";

interface Webinar {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  tags: string[];
  description: string;
  registered: number;
  status: WebinarStatus;
  poster?: string;
}
const CLOUDINARY_CLOUD_NAME = "dysisk9kx";
const CLOUDINARY_UPLOAD_PRESET = "webinarupload";

/* ================= MOCK DATA ================= */
const initialWebinars: Webinar[] = [
  {
    id: 1,
    title: "Future of AI in Enterprise Tech",
    date: "2023-10-24",
    time: "10:00 AM – 11:30 AM EST",
    venue: "Online - Zoom Webinar",
    tags: ["ai", "enterprise"],
    description: "Deep dive into enterprise AI adoption.",
    registered: 245,
    status: "open",
  },
  {
    id: 2,
    title: "Mastering Design Systems",
    date: "2023-11-02",
    time: "2:00 PM – 4:00 PM EST",
    venue: "Online - Google Meet",
    tags: ["design", "ui"],
    description: "Building scalable design systems.",
    registered: 112,
    status: "open",
  },
];

/* ================= PAGE ================= */
export default function AdminWebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>(initialWebinars);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Webinar | null>(null);
  const [confirm, setConfirm] = useState<{
    id: number;
    type: "close" | "delete";
  } | null>(null);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (webinar: Webinar) => {
    setEditing(webinar);
    setModalOpen(true);
  };

  const saveWebinar = (data: Webinar) => {
    if (editing) {
      setWebinars((prev) =>
        prev.map((w) => (w.id === editing.id ? { ...data, id: w.id } : w)),
      );
    } else {
      setWebinars((prev) => [
        ...prev,
        { ...data, id: Date.now(), registered: 0, status: "open" },
      ]);
    }
    setModalOpen(false);
  };

  const closeRegistration = (id: number) => {
    setWebinars((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: "closed" } : w)),
    );
    setConfirm(null);
  };

  const deleteWebinar = (id: number) => {
    setWebinars((prev) => prev.filter((w) => w.id !== id));
    setConfirm(null);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0b1220] to-[#060b16] text-white">
      <AdminNavigation active="webinars" mobileMenu={false} />

      <main className="4xl:p-16 4xl:ml-80 flex-1 p-3 pt-20 sm:p-4 sm:pt-24 md:p-6 lg:ml-64 lg:p-8 lg:pt-0 2xl:ml-72 2xl:p-12">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 2xl:mb-12">
          <div>
            <h1 className="4xl:text-5xl text-xl font-semibold sm:text-2xl lg:text-3xl 2xl:text-4xl">
              Webinars
            </h1>
            <p className="4xl:text-lg mt-1 text-xs text-white/50 sm:text-sm 2xl:text-base">
              Manage your upcoming and past webinar sessions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openAdd}
              className="4xl:px-8 4xl:py-4 4xl:text-lg flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs whitespace-nowrap hover:bg-blue-500 sm:px-4 sm:text-sm 2xl:px-6 2xl:py-3 2xl:text-base"
            >
              <Plus size={16} className="2xl:h-5 2xl:w-5" /> Add Webinar
            </button>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 md:space-y-5 2xl:space-y-6">
          {webinars.map((w) => (
            <div
              key={w.id}
              className="4xl:p-6 flex flex-col gap-2 rounded-lg border border-white/10 bg-[#121a2f] p-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:rounded-xl sm:p-3 md:gap-4 md:p-4 2xl:rounded-2xl 2xl:p-5"
            >
              <div className="flex min-w-0 flex-1 items-start gap-2 sm:items-center sm:gap-3">
                <div className="4xl:w-20 4xl:h-20 4xl:gap-1 flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg border border-white/10 bg-[#0f172a] sm:h-14 sm:w-14 sm:rounded-xl 2xl:h-16 2xl:w-16 2xl:gap-0.5 2xl:rounded-2xl">
                  <span className="4xl:text-base text-[9px] text-blue-400 uppercase sm:text-xs 2xl:text-sm">
                    {new Date(w.date).toLocaleString("en-US", {
                      month: "short",
                    })}
                  </span>
                  <span className="4xl:text-2xl text-sm font-semibold sm:text-base 2xl:text-xl">
                    {new Date(w.date).getDate()}
                  </span>
                  <span className="4xl:text-sm text-[8px] text-white/50 sm:text-[9px] 2xl:text-xs">
                    {new Date(w.date).getFullYear()}
                  </span>
                </div>

                <div className="min-w-0 flex-1 space-y-1 sm:space-y-0.5 md:space-y-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <h2 className="4xl:text-xl line-clamp-1 text-xs font-semibold sm:line-clamp-1 sm:text-sm md:text-base 2xl:text-lg">
                      {w.title}
                    </h2>
                    <span
                      className={`4xl:px-4 4xl:py-1.5 4xl:text-base flex-shrink-0 rounded-full px-2 py-0.5 text-[8px] whitespace-nowrap sm:text-xs 2xl:px-3 2xl:py-1 2xl:text-sm ${
                        w.status === "open"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {w.status === "open"
                        ? "Registration Open"
                        : "Registration Closed"}
                    </span>
                  </div>

                  <div className="4xl:text-base flex flex-col gap-1 text-[8px] text-white/60 sm:flex-row sm:flex-wrap sm:gap-2 sm:text-xs md:gap-3 2xl:text-sm">
                    <span className="flex items-center gap-0.5">
                      <Calendar
                        size={10}
                        className="4xl:w-4 4xl:h-4 2xl:h-3 2xl:w-3"
                      />{" "}
                      {w.time}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <MapPin
                        size={10}
                        className="4xl:w-4 4xl:h-4 2xl:h-3 2xl:w-3"
                      />{" "}
                      {w.venue}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Users
                        size={10}
                        className="4xl:w-4 4xl:h-4 2xl:h-3 2xl:w-3"
                      />{" "}
                      {w.registered} Registered
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 self-end sm:flex-shrink-0 sm:gap-2.5 sm:self-center md:gap-3 2xl:gap-4">
                <button
                  onClick={() => openEdit(w)}
                  className="4xl:text-lg flex items-center gap-1 text-[10px] whitespace-nowrap text-white/70 hover:text-white sm:text-xs md:text-sm 2xl:text-base"
                >
                  <Pencil
                    size={12}
                    className="4xl:w-5 4xl:h-5 2xl:h-4 2xl:w-4"
                  />
                  <span className="hidden md:inline">Edit Details</span>
                  <span className="md:hidden">Edit</span>
                </button>

                {w.status === "open" && (
                  <button
                    onClick={() => setConfirm({ id: w.id, type: "close" })}
                    className="4xl:text-lg text-[10px] whitespace-nowrap text-yellow-400 hover:text-yellow-300 sm:text-xs md:text-sm 2xl:text-base"
                  >
                    <span className="hidden sm:inline">Close Reg</span>
                    <span className="sm:hidden">Close</span>
                  </button>
                )}

                <Trash2
                  size={14}
                  onClick={() => setConfirm({ id: w.id, type: "delete" })}
                  className="4xl:w-6 4xl:h-6 flex-shrink-0 cursor-pointer hover:text-red-400 2xl:h-5 2xl:w-5"
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= ADD / EDIT MODAL ================= */}
      {modalOpen && (
        <WebinarModal
          initial={editing}
          onClose={() => setModalOpen(false)}
          onSave={saveWebinar}
        />
      )}

      {/* ================= CONFIRM MODAL ================= */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-md sm:p-4">
          <div className="w-full max-w-sm rounded-lg border border-white/10 bg-[#1a2238] p-4 text-center sm:max-w-md sm:rounded-xl sm:p-6 2xl:rounded-2xl 2xl:p-8">
            <AlertTriangle className="4xl:w-10 4xl:h-10 mx-auto mb-3 text-yellow-400 sm:mb-4 2xl:h-8 2xl:w-8" />
            <h3 className="4xl:text-xl mb-2 text-sm font-semibold sm:text-base 2xl:text-lg">
              Are you sure?
            </h3>
            <p className="4xl:text-lg mb-6 text-xs text-white/60 sm:text-sm 2xl:text-base">
              {confirm.type === "close"
                ? "This will close registration for this webinar."
                : "This webinar will be permanently removed."}
            </p>

            <div className="flex justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setConfirm(null)}
                className="4xl:px-8 4xl:py-4 4xl:text-lg rounded-lg px-3 py-2 text-xs text-white/70 hover:text-white sm:px-4 sm:text-sm 2xl:px-6 2xl:py-3 2xl:text-base"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  confirm.type === "close"
                    ? closeRegistration(confirm.id)
                    : deleteWebinar(confirm.id)
                }
                className={`4xl:px-8 4xl:py-4 4xl:text-lg rounded-lg px-3 py-2 text-xs sm:px-4 sm:text-sm 2xl:px-6 2xl:py-3 2xl:text-base ${
                  confirm.type === "close"
                    ? "bg-yellow-500 hover:bg-yellow-400"
                    : "bg-red-600 hover:bg-red-500"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= MODAL COMPONENT ================= */
function WebinarModal({
  initial,
  onClose,
  onSave,
}: {
  initial: Webinar | null;
  onClose: () => void;
  onSave: (w: Webinar) => void;
}) {
  const [form, setForm] = useState<Webinar>({
    id: initial?.id ?? 0,
    title: initial?.title ?? "",
    date: initial?.date ?? "",
    time: initial?.time ?? "",
    venue: initial?.venue ?? "",
    tags: initial?.tags ?? [],
    description: initial?.description ?? "",
    registered: initial?.registered ?? 0,
    status: initial?.status ?? "open",
    poster: initial?.poster ?? "",
  });

  const [uploading, setUploading] = useState(false);

  /* ---------- CLOUDINARY UPLOAD ---------- */
  const uploadPoster = async (file: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    type CloudinaryResponse = {
      secure_url: string;
    };

    const data = (await res.json()) as CloudinaryResponse;
    setForm((prev) => ({ ...prev, poster: data.secure_url }));

    setUploading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-md sm:p-4">
      <div className="flex max-h-[90vh] w-full max-w-sm flex-col overflow-hidden rounded-lg border border-white/10 bg-[#1a2238] sm:max-w-lg sm:rounded-2xl 2xl:max-w-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6 2xl:px-8">
          <h3 className="4xl:text-xl text-sm font-semibold sm:text-base 2xl:text-lg">
            {initial ? "Edit Webinar" : "Add New Webinar"}
          </h3>
          <X
            onClick={onClose}
            className="4xl:w-6 4xl:h-6 flex-shrink-0 cursor-pointer text-white/60 hover:text-white 2xl:h-5 2xl:w-5"
          />
        </div>

        <div className="space-y-4 overflow-y-auto p-4 sm:p-6 2xl:p-8">
          {/* Poster */}
          <label className="4xl:text-lg text-xs text-white/60 sm:text-sm 2xl:text-base">
            Webinar Poster
          </label>

          <label
            htmlFor="poster"
            className="4xl:h-64 flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/30 text-white/50 hover:border-blue-500 sm:h-36 2xl:h-48 2xl:rounded-xl"
          >
            {uploading ? (
              <span className="4xl:text-lg text-xs sm:text-sm 2xl:text-base">
                Uploading...
              </span>
            ) : form.poster ? (
              <img
                src={form.poster || "/placeholder.svg"}
                alt="Poster"
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <>
                <Upload size={20} className="4xl:w-8 4xl:h-8 2xl:h-6 2xl:w-6" />
                <span className="4xl:text-lg text-xs sm:text-sm 2xl:text-base">
                  Click to upload or drag and drop
                </span>
                <span className="4xl:text-base text-[10px] sm:text-xs 2xl:text-sm">
                  JPG, PNG • Recommended 800×400
                </span>
              </>
            )}

            <input
              id="poster"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  void uploadPoster(e.target.files[0]);
                }
              }}
            />
          </label>

          {/* Title */}
          <label className="4xl:text-lg text-xs text-white/60 sm:text-sm 2xl:text-base">
            Title
          </label>
          <input
            className="4xl:px-5 4xl:py-4 4xl:text-lg w-full rounded-lg border border-white/30 bg-[#0f172a] px-3 py-2 text-xs sm:text-sm 2xl:px-4 2xl:py-3 2xl:text-base"
            placeholder="e.g. Masterclass: Advanced UI Design"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          {/* Date & Time */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:gap-4">
            <div>
              <label className="4xl:text-lg text-xs text-white/60 sm:text-sm 2xl:text-base">
                Date
              </label>
              <input
                type="date"
                className="4xl:px-5 4xl:py-4 4xl:text-lg w-full rounded-lg border border-white/30 bg-[#0f172a] px-3 py-2 text-xs sm:text-sm 2xl:px-4 2xl:py-3 2xl:text-base"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div>
              <label className="4xl:text-lg text-xs text-white/60 sm:text-sm 2xl:text-base">
                Time
              </label>
              <input
                className="4xl:px-5 4xl:py-4 w-full resize-none rounded-lg border border-white/30 bg-[#0f172a] px-3 py-2 text-xs sm:text-sm 2xl:px-4 2xl:py-3 2xl:text-base"
                placeholder="10:00 AM – 11:30 AM IST"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </div>
          </div>

          {/* Venue */}
          <label className="4xl:text-lg text-xs text-white/60 sm:text-sm 2xl:text-base">
            Venue
          </label>
          <input
            className="4xl:px-5 4xl:py-4 4xl:text-lg w-full rounded-lg border border-white/30 bg-[#0f172a] px-3 py-2 text-xs sm:text-sm 2xl:px-4 2xl:py-3 2xl:text-base"
            placeholder="Zoom / Google Meet / Auditorium"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
          />

          {/* Tags */}
          <label className="4xl:text-lg text-xs text-white/60 sm:text-sm 2xl:text-base">
            Tags (comma separated)
          </label>
          <input
            className="4xl:px-5 4xl:py-4 4xl:text-lg w-full rounded-lg border border-white/30 bg-[#0f172a] px-3 py-2 text-xs sm:text-sm 2xl:px-4 2xl:py-3 2xl:text-base"
            placeholder="ai, design, frontend"
            value={form.tags.join(", ")}
            onChange={(e) =>
              setForm({
                ...form,
                tags: e.target.value.split(",").map((t) => t.trim()),
              })
            }
          />

          {/* Description */}
          <label className="4xl:text-lg text-xs text-white/60 sm:text-sm 2xl:text-base">
            Description
          </label>
          <textarea
            className="w-full resize-none rounded-lg border border-white/30 bg-[#0f172a] px-3 py-2 text-xs sm:text-sm 2xl:px-4 2xl:py-3"
            placeholder="Write detailed webinar description here..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="flex flex-col-reverse justify-end gap-3 border-t border-white/10 px-4 py-4 sm:flex-row sm:gap-4 sm:px-6 2xl:px-8">
          <button
            onClick={onClose}
            className="4xl:px-5 4xl:py-3 4xl:text-lg px-3 py-2 text-xs text-white/60 hover:text-white sm:text-sm 2xl:px-4 2xl:py-2.5 2xl:text-base"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="4xl:px-8 4xl:py-3 4xl:text-lg rounded-lg bg-blue-600 px-3 py-2 text-xs hover:bg-blue-500 sm:px-4 sm:text-sm 2xl:px-6 2xl:py-2.5 2xl:text-base"
          >
            Save Webinar
          </button>
        </div>
      </div>
    </div>
  );
}
