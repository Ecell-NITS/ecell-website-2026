"use client";

// import type React from "react"

import { useMemo, useState } from "react";
import AdminNavigation from "../AdminNavigation";
import {
  Rocket,
  Award,
  Lightbulb,
  Search,
  Mail,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  X,
  AlertCircle,
  Trophy,
  Users,
  Briefcase,
  Calendar,
  Clock,
  Plus,
  ArrowRight,
} from "lucide-react";
import * as XLSX from "xlsx";

/* ================= TYPES ================= */
type View = "EVENTS" | "MODULES" | "RESPONSES";
type Status = "REVIEWED" | "PENDING";
type EventStatus = "Live" | "Upcoming" | "Draft" | "Finished";
type FilterStatus = "All" | "Active" | "Past";

interface Member {
  name: string;
  role: string;
  id: string;
}

interface Response {
  id: number;
  teamName: string;
  leader: string;
  phone: string;
  email: string;
  description: string;
  college: string;
  drive?: string;
  status: Status;
  members: Member[];
}

interface Event {
  id: string;
  name: string;
  desc: string;
  date: string;
  modules: number;
  participants: string;
  status: EventStatus;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
}

interface Module {
  id: string;
  name: string;
  desc: string;
  count: string;
  speakers?: number;
  lastUpdated: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
}

/* ================= MOCK DATA ================= */
const EVENTS: Event[] = [
  {
    id: "empresario",
    name: "Empresario 2024",
    desc: "Annual flagship entrepreneurship summit featuring global speakers and startup expo.",
    date: "Nov 10 - Nov 12, 2024",
    modules: 12,
    participants: "3,200",
    status: "Live",
    icon: Rocket,
    iconColor: "bg-blue-500/20 text-blue-400",
  },
  {
    id: "eminence",
    name: "Eminence Awards",
    desc: "Prestigious awards ceremony honoring outstanding achievements in business and innovation.",
    date: "Dec 05, 2024",
    modules: 4,
    participants: "Registration Open",
    status: "Upcoming",
    icon: Award,
    iconColor: "bg-amber-500/20 text-amber-400",
  },
  {
    id: "eic",
    name: "EIC (Innovation Challenge)",
    desc: "National level competition for early-stage startups to pitch ideas and win funding.",
    date: "Jan 2025 (Tentative)",
    modules: 8,
    participants: "TBA",
    status: "Draft",
    icon: Lightbulb,
    iconColor: "bg-green-500/20 text-green-400",
  },
  {
    id: "ext",
    name: "EXT (Entrepreneur Expo)",
    desc: "International entrepreneurship expo connecting startups with investors and mentors.",
    date: "Feb 2025",
    modules: 6,
    participants: "1,500+",
    status: "Finished",
    icon: Trophy,
    iconColor: "bg-purple-500/20 text-purple-400",
  },
];

const MODULES: Module[] = [
  {
    id: "startup",
    name: "Startup Pitch Deck",
    desc: "Collect startup ideas and pitch decks from participants",
    count: "142 Responses",
    speakers: 0,
    lastUpdated: "2h ago",
    icon: Trophy,
    iconColor: "bg-purple-500/20 text-purple-400",
  },
  {
    id: "speakers",
    name: "Speaker Sessions",
    desc: "Guest speakers and keynotes from industry leaders",
    count: "8 Speakers",
    speakers: 8,
    lastUpdated: "1d ago",
    icon: Users,
    iconColor: "bg-pink-500/20 text-pink-400",
  },
  {
    id: "workshops",
    name: "Workshops",
    desc: "Hands-on training sessions and tutorials",
    count: "5 Workshops",
    speakers: 12,
    lastUpdated: "5h ago",
    icon: Briefcase,
    iconColor: "bg-cyan-500/20 text-cyan-400",
  },
  {
    id: "internship",
    name: "Internship Fair",
    desc: "Student–company networking and opportunities",
    count: "32 Companies",
    speakers: 0,
    lastUpdated: "4d ago",
    icon: Trophy,
    iconColor: "bg-orange-500/20 text-orange-400",
  },
  {
    id: "sponsors",
    name: "Sponsors",
    desc: "Handle sponsor profiles, logos, and tiers",
    count: "15 Sponsors",
    speakers: 0,
    lastUpdated: "3d ago",
    icon: Award,
    iconColor: "bg-green-500/20 text-green-400",
  },
  {
    id: "registrations",
    name: "Registrations",
    desc: "Manage registrations and attendee lists",
    count: "3.2k Users",
    speakers: 0,
    lastUpdated: "5m ago",
    icon: Users,
    iconColor: "bg-indigo-500/20 text-indigo-400",
  },
];

const RESPONSES: Response[] = [
  {
    id: 1,
    teamName: "Zener",
    leader: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    description:
      "Our startup Zener aims to revolutionize the way students collaborate on projects with real-time tools.",
    college: "NIT Silchar",
    status: "REVIEWED",
    members: [
      { name: "John Doe", role: "Leader", id: "25CE10079" },
      { name: "Jane Smith", role: "Developer", id: "25CE10082" },
      { name: "Robert Brown", role: "Designer", id: "25CE10095" },
    ],
  },
  {
    id: 2,
    teamName: "Tech Pioneers",
    leader: "Alice Smith",
    phone: "+1 (555) 987-6543",
    email: "alice.smith@tech.co",
    description:
      "AI-driven personalized learning platform adapting to individual students.",
    college: "Stanford University",
    drive: "https://drive.google.com/file/d/xyz",
    status: "PENDING",
    members: [
      { name: "Alice Smith", role: "Leader", id: "ST1021" },
      { name: "Bob Lee", role: "Engineer", id: "ST1022" },
    ],
  },
];

/* ================= PAGE ================= */
export default function AdminModulesPage() {
  const [view, setView] = useState<View>("EVENTS");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("All");
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });
  const [emailModal, setEmailModal] = useState<{
    open: boolean;
    type: "one" | "selected" | "all";
    // targetId?: number
  }>({ open: false, type: "all" });
  const [addModuleModal, setAddModuleModal] = useState(false);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [modulesSearch, setModulesSearch] = useState("");
  const [modules, setModules] = useState<Module[]>(MODULES);

  const PAGE_SIZE = 5;

  const filtered = useMemo(() => {
    return RESPONSES.filter(
      (r) =>
        !deletedIds.includes(r.id) &&
        `${r.teamName} ${r.leader} ${r.email} ${r.status}`
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
  }, [search, deletedIds]);

  const totalApplicants = filtered.length;
  const pendingCount = filtered.filter((r) => r.status === "PENDING").length;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const filteredEvents = useMemo(() => {
    let events = EVENTS;

    // Filter by status
    if (filterStatus === "All") {
      events = EVENTS;
    } else if (filterStatus === "Active") {
      events = EVENTS.filter(
        (e) => e.status === "Live" || e.status === "Upcoming",
      );
    } else {
      events = EVENTS.filter(
        (e) => e.status === "Finished" || e.status === "Draft",
      );
    }

    // Filter by search text
    return events.filter((e) =>
      `${e.name} ${e.desc}`.toLowerCase().includes(search.toLowerCase()),
    );
  }, [filterStatus, search]);

  const filteredModules = useMemo(() => {
    return modules.filter((m) =>
      `${m.name} ${m.desc}`.toLowerCase().includes(modulesSearch.toLowerCase()),
    );
  }, [modulesSearch, modules]);

  const toggleSelect = (id: number) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const toggleSelectAll = () => {
    if (selected.length === paginated.length) {
      setSelected([]);
    } else {
      setSelected(paginated.map((r) => r.id));
    }
  };

  const handleDelete = (id: number) => {
    setDeleteModal({ open: true, id });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      setDeletedIds((prev) => [...prev, deleteModal.id!]);
      setDeleteModal({ open: false, id: null });
      setSelected((prev) => prev.filter((id) => id !== deleteModal.id));
    }
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Responses");
    XLSX.writeFile(wb, "responses.xlsx");
  };

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case "Live":
        return "bg-green-500/20 text-green-400";
      case "Upcoming":
        return "bg-blue-500/20 text-blue-400";
      case "Finished":
        return "bg-gray-500/20 text-gray-400";
      case "Draft":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-white/10 text-white";
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0b1220] to-[#060b16] text-white">
      <AdminNavigation active="modules" mobileMenu={false} />

      <main className="w-full flex-1 space-y-3 overflow-x-hidden px-3 py-3 pt-20 sm:space-y-4 sm:px-4 sm:py-4 sm:pt-24 md:space-y-6 md:px-6 md:py-6 lg:ml-64 lg:px-8 lg:pt-0">
        {/* ================= EVENTS ================= */}
        {view === "EVENTS" && (
          <>
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
                Major Events
              </h1>
              <p className="text-xs text-white/60 sm:text-sm">
                Manage flagship events, competitions, and summits
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="relative w-full">
                <Search
                  className="absolute top-2.5 left-3 text-white/40"
                  size={16}
                />
                <input
                  placeholder="Search events..."
                  className="w-full rounded-lg border border-white/20 bg-[#0f172a] py-2 pr-3 pl-9 text-xs transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search events by name or description"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {(["All", "Active", "Past"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none sm:px-3 ${
                      filterStatus === status
                        ? "bg-blue-600 text-white"
                        : "border border-white/10 bg-[#1a2238] text-white/60 hover:text-white"
                    }`}
                    aria-pressed={filterStatus === status}
                    aria-label={`Filter events to ${status}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((e) => {
                  const Icon = e.icon;
                  return (
                    <div
                      key={e.id}
                      className="group flex w-full cursor-pointer flex-col justify-between gap-3 rounded-lg border border-white/10 bg-[#1a2238] p-3 transition-colors focus-within:ring-2 focus-within:ring-blue-500 hover:border-white/20 sm:flex-row sm:items-center sm:gap-4 sm:rounded-xl sm:p-4 md:p-5"
                      onClick={() => {
                        setSelectedEvent(e);
                        setView("MODULES");
                        setModulesSearch("");
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter" || ev.key === " ") {
                          ev.preventDefault();
                          setSelectedEvent(e);
                          setView("MODULES");
                          setModulesSearch("");
                        }
                      }}
                      aria-label={`Open ${e.name} modules`}
                    >
                      <div className="flex min-w-0 flex-1 gap-2 sm:gap-3">
                        <div
                          className={`${e.iconColor} flex-shrink-0 rounded-lg p-2 sm:p-3`}
                        >
                          <Icon size={20} className="sm:h-6 sm:w-6" />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="truncate text-sm font-semibold sm:text-base md:text-lg">
                              {e.name}
                            </h2>
                            <span
                              className={`flex-shrink-0 rounded-md px-2 py-0.5 text-xs ${getStatusColor(e.status)}`}
                            >
                              {e.status}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-1 text-xs text-white/60 sm:line-clamp-2">
                            {e.desc}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/50 sm:gap-3">
                            <div className="flex min-w-max items-center gap-1">
                              <Calendar size={12} />
                              <span className="line-clamp-1 text-xs">
                                {e.date}
                              </span>
                            </div>
                            <div className="flex min-w-max items-center gap-1">
                              <Trophy size={12} />
                              <span className="text-xs">
                                {e.modules} Modules
                              </span>
                            </div>
                            <div className="flex min-w-max items-center gap-1">
                              <Users size={12} />
                              <span className="line-clamp-1 text-xs">
                                {e.participants}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hidden items-center self-stretch sm:flex">
                        <div className="mx-4 h-12 w-px bg-white/10 md:mx-6" />
                        <div className="flex items-center gap-2 pr-2 font-medium whitespace-nowrap text-blue-400 transition-colors group-hover:text-blue-300">
                          <span>
                            {e.status === "Draft"
                              ? "Setup Event"
                              : "Manage Modules"}
                          </span>
                          <ArrowRight size={18} />
                        </div>
                      </div>

                      {/* Mobile version of the link */}
                      <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-3 sm:hidden">
                        <span className="text-xs text-white/50">
                          View details
                        </span>
                        <div className="flex items-center gap-1 text-xs font-medium text-blue-400">
                          <span>
                            {e.status === "Draft" ? "Setup Event" : "Manage"}
                          </span>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-6 text-center text-white/60 sm:py-8">
                  <p className="text-xs sm:text-sm">
                    No events found matching your search.
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ================= MODULES ================= */}
        {view === "MODULES" && selectedEvent && (
          <>
            <div className="mb-4 flex flex-col justify-between gap-3 sm:mb-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setView("EVENTS");
                    setSearch("");
                    setSelectedEvent(null);
                  }}
                  className="rounded-lg border border-white/10 bg-[#1a2238] p-2 text-white/60 transition-colors hover:border-white/20 hover:text-white lg:hidden"
                  aria-label="Go back to events"
                >
                  <ChevronLeft size={20} />
                </button>
                <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
                  {selectedEvent.name}
                </h1>
              </div>

              <button
                onClick={() => {
                  setView("EVENTS");
                  setSearch("");
                  setSelectedEvent(null);
                }}
                className="hidden flex-shrink-0 items-center gap-1 rounded border border-white/10 bg-[#1a2238] px-3 py-2 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none lg:flex"
                aria-label="Go back to events"
              >
                <ChevronLeft size={18} />
                <span>Back to Events</span>
              </button>
            </div>

            <p className="mb-3 text-xs text-white/60 sm:mb-4 sm:text-sm">
              Select a module to manage content and participants
            </p>

            <div className="relative mb-3 w-full sm:mb-4">
              <Search
                className="absolute top-2.5 left-3 text-white/40"
                size={16}
              />
              <input
                placeholder="Search modules..."
                className="w-full rounded-lg border border-white/20 bg-[#0f172a] py-2 pr-3 pl-9 text-xs transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
                value={modulesSearch}
                onChange={(e) => setModulesSearch(e.target.value)}
                aria-label="Search modules by name or description"
              />
            </div>

            <div className="mb-3 flex justify-end sm:mb-4">
              <button
                onClick={() => setAddModuleModal(true)}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
                aria-label="Add new module"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Add Module</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {filteredModules.length > 0 ? (
                filteredModules.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedModule(m);
                        setView("RESPONSES");
                        setSearch("");
                      }}
                      className="flex h-full min-h-[260px] flex-col rounded-lg border border-white/10 bg-[#1a2238] p-6 text-left shadow-lg shadow-black/20 transition-colors hover:border-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:rounded-xl sm:p-8"
                      aria-label={`Manage ${m.name} module`}
                    >
                      <div
                        className={`${m.iconColor} mb-4 w-fit rounded-lg p-2.5`}
                      >
                        <Icon size={24} />
                      </div>

                      <h3 className="text-base font-semibold sm:text-lg">
                        {m.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs text-white/60 sm:text-sm">
                        {m.desc}
                      </p>

                      <div className="mt-6 flex-1 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-white/50">
                          <Trophy size={12} />
                          <span>{m.count}</span>
                        </div>
                        {m.speakers !== undefined && m.speakers > 0 && (
                          <div className="flex items-center gap-2 text-xs text-white/50">
                            <Users size={12} />
                            <span>{m.speakers} Speakers</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-xs text-white/50">
                          <Clock size={12} />
                          <span>Updated {m.lastUpdated}</span>
                        </div>
                      </div>

                      <div className="mt-3 border-t border-white/10 pt-3">
                        <span className="text-xs font-medium text-blue-400">
                          Manage →
                        </span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="col-span-full py-6 text-center text-white/60 sm:py-8">
                  <p className="text-xs sm:text-sm">
                    No modules found matching your search.
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ================= RESPONSES ================= */}
        {view === "RESPONSES" && selectedModule && (
          <>
            <div className="mb-4 flex flex-col justify-between gap-3 sm:mb-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setView("MODULES");
                    setSearch("");
                    setSelectedModule(null);
                  }}
                  className="rounded-lg border border-white/10 bg-[#1a2238] p-2 text-white/60 transition-colors hover:border-white/20 hover:text-white lg:hidden"
                  aria-label="Go back to modules"
                >
                  <ChevronLeft size={20} />
                </button>
                <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
                  {selectedModule.name}
                </h1>
              </div>

              <button
                onClick={() => {
                  setView("MODULES");
                  setSearch("");
                  setSelectedModule(null);
                }}
                className="hidden flex-shrink-0 items-center gap-1 rounded border border-white/10 bg-[#1a2238] px-3 py-2 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none lg:flex"
                aria-label="Go back to modules"
              >
                <ChevronLeft size={18} />
                <span>Back to Modules</span>
              </button>
            </div>

            <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:gap-3">
              <div className="text-xs text-white/60 sm:text-sm">
                Total Applicants: <b>{totalApplicants}</b> • Pending Review:{" "}
                <b>{pendingCount}</b>
              </div>
            </div>

            <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:gap-3">
              <div className="relative w-full">
                <Search
                  className="absolute top-2.5 left-3 text-white/40"
                  size={16}
                />
                <input
                  placeholder="Search by name, team, or status..."
                  className="w-full rounded-lg border border-white/20 bg-[#0f172a] py-2 pr-3 pl-9 text-xs transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search responses by name, team, or status"
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <button
                  onClick={() => setEmailModal({ open: true, type: "one" })}
                  disabled={selected.length === 0}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-700 disabled:text-gray-400 sm:flex-auto sm:px-4 sm:text-sm"
                  aria-label={`Send email to ${selected.length} selected responses`}
                >
                  <Mail size={14} className="sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Email</span>
                  <span className="text-xs sm:hidden">({selected.length})</span>
                </button>

                <button
                  onClick={() => setEmailModal({ open: true, type: "one" })}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:flex-auto sm:px-4 sm:text-sm"
                  aria-label={`Send email to all ${totalApplicants} responses`}
                >
                  <Mail size={14} className="sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Email All</span>
                  <span className="text-xs sm:hidden">All</span>
                </button>

                <button
                  onClick={exportExcel}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none sm:flex-auto sm:px-4 sm:text-sm"
                  aria-label="Export responses to Excel"
                >
                  <Download size={14} className="sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Export</span>
                  <span className="text-xs sm:hidden">Download</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#1a2238] p-2 sm:p-3">
                <button
                  onClick={toggleSelectAll}
                  className="flex-shrink-0 rounded p-1 hover:bg-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  aria-label={
                    selected.length === paginated.length
                      ? "Deselect all responses"
                      : "Select all on this page"
                  }
                >
                  {selected.length === paginated.length ? (
                    <CheckSquare size={16} className="text-blue-400" />
                  ) : (
                    <Square size={16} className="text-white/40" />
                  )}
                </button>
                <span className="flex-1 text-xs text-white/60 sm:text-sm">
                  {selected.length > 0
                    ? `${selected.length} selected`
                    : "Select all on this page"}
                </span>
              </div>

              {paginated.length > 0 ? (
                paginated.map((response) => (
                  <div
                    key={response.id}
                    className="space-y-4 rounded-lg border border-white/10 bg-[#1a2238] p-4 shadow-lg shadow-black/10 transition-colors hover:border-white/20 sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleSelect(response.id)}
                        className="mt-0.5 flex-shrink-0 rounded p-1.5 hover:bg-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        aria-label={`${selected.includes(response.id) ? "Deselect" : "Select"} ${response.teamName}`}
                      >
                        {selected.includes(response.id) ? (
                          <CheckSquare size={18} className="text-blue-400" />
                        ) : (
                          <Square size={18} className="text-white/40" />
                        )}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-base font-bold text-white sm:text-lg">
                            {response.teamName}
                          </h3>
                          <span
                            className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
                              response.status === "REVIEWED"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {response.status}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="w-16 text-white/40">
                                Leader:
                              </span>
                              <span className="font-medium text-white/90">
                                {response.leader}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="w-16 text-white/40">Phone:</span>
                              <span className="text-white/90">
                                {response.phone}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="w-16 text-white/40">Email:</span>
                              <a
                                href={`mailto:${response.email}`}
                                className="truncate text-blue-400 hover:underline"
                              >
                                {response.email}
                              </a>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="w-16 text-white/40">
                                College:
                              </span>
                              <span className="text-white/90">
                                {response.college}
                              </span>
                            </div>
                            {response.drive && (
                              <div className="flex items-center gap-2 text-sm">
                                <span className="w-16 text-white/40">
                                  Drive:
                                </span>
                                <a
                                  href={response.drive}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-blue-400 hover:underline"
                                >
                                  View Materials <ArrowRight size={12} />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>

                        {response.description && (
                          <div className="mt-4 border-t border-white/5 pt-4">
                            <h4 className="mb-2 text-xs font-semibold tracking-tight text-white/40 uppercase">
                              Description
                            </h4>
                            <p className="text-sm leading-relaxed text-white/70">
                              {response.description}
                            </p>
                          </div>
                        )}

                        {response.members && response.members.length > 0 && (
                          <div className="mt-4 border-t border-white/5 pt-4">
                            <h4 className="mb-2 text-xs font-semibold tracking-tight text-white/40 uppercase">
                              Team Members ({response.members.length})
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {response.members.map((m) => (
                                <div
                                  key={m.id}
                                  className="rounded-md border border-white/5 bg-white/5 px-3 py-1.5 text-xs"
                                >
                                  <span className="font-medium text-white">
                                    {m.name}
                                  </span>
                                  <span className="mx-2 text-white/40">•</span>
                                  <span className="text-white/60">
                                    {m.role}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-shrink-0 flex-col gap-2">
                        <button
                          onClick={() =>
                            setEmailModal({ open: true, type: "one" })
                          }
                          className="flex items-center justify-center rounded-lg bg-blue-600 p-2 text-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          aria-label={`Send email to ${response.teamName}`}
                        >
                          <Mail size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(response.id)}
                          className="flex items-center justify-center rounded-lg bg-red-600 p-2 text-sm transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
                          aria-label={`Delete response from ${response.teamName}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-white/60 sm:py-8">
                  <p className="text-xs sm:text-sm">No responses found.</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="rounded border border-white/10 bg-[#1a2238] p-2 transition-colors hover:border-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        className={`h-8 w-8 rounded text-xs font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                          page === i + 1
                            ? "bg-blue-600 text-white"
                            : "border border-white/10 bg-[#1a2238] text-white/60 hover:border-white/20"
                        }`}
                        aria-current={page === i + 1 ? "page" : undefined}
                        aria-label={`Go to page ${i + 1}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="rounded border border-white/10 bg-[#1a2238] p-2 transition-colors hover:border-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* ================= MODALS ================= */}
        {deleteModal.open && (
          <DeleteConfirmationModal
            // isOpen={deleteModal.open}
            teamName={
              filtered.find((r) => r.id === deleteModal.id)?.teamName ?? ""
            }
            onConfirm={confirmDelete}
            onCancel={() => setDeleteModal({ open: false, id: null })}
          />
        )}

        {emailModal.open && (
          <EmailModal
            // isOpen={emailModal.open}
            type={emailModal.type}
            count={
              emailModal.type === "one"
                ? 1
                : emailModal.type === "selected"
                  ? selected.length
                  : totalApplicants
            }
            onClose={() => setEmailModal({ open: false, type: "one" })}
          />
        )}

        {addModuleModal && (
          <AddModuleModal
            // isOpen={addModuleModal}
            onClose={() => setAddModuleModal(false)}
            onAddModule={(newModule) => {
              setModules((prev) => [...prev, newModule]);
              setAddModuleModal(false);
            }}
          />
        )}
      </main>
    </div>
  );
}

/* ================= DETAIL ================= */
// function _Detail({
//   label,
//   value,
//   link,
// }: {
//   label: string
//   value: string
//   link?: boolean
// }) {
//   return (
//     <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
//       <span className="text-white/60 font-medium min-w-fit text-xs sm:text-sm">{label}:</span>
//       {link ? (
//         <a
//           href={value}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-400 hover:text-blue-300 break-all focus:outline-none focus:underline text-xs sm:text-sm"
//         >
//           {value}
//         </a>
//       ) : (
//         <span className="text-white/80 text-xs sm:text-sm break-words">{value}</span>
//       )}
//     </div>
//   )
// }

/* ================= DELETE CONFIRMATION MODAL ================= */
interface DeleteConfirmationModalProps {
  // isOpen: boolean
  onConfirm: () => void;
  onCancel: () => void;
  teamName: string;
}

function DeleteConfirmationModal({
  onConfirm,
  onCancel,
  teamName,
}: DeleteConfirmationModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className="w-full max-w-md space-y-4 rounded-xl border border-white/10 bg-[#1a2238] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-1 flex-shrink-0 text-red-400" size={24} />
          <div>
            <h2
              id="delete-modal-title"
              className="text-base font-semibold sm:text-lg"
            >
              Delete Response
            </h2>
            <p className="mt-1 text-xs text-white/60 sm:text-sm">
              Are you sure you want to delete the response from{" "}
              <b>{teamName}</b>? This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-4 sm:flex-row">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-white/20 bg-[#0f172a] px-4 py-2.5 text-xs font-medium transition-colors hover:bg-white/5 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-xs font-medium transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none active:scale-95 sm:text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= EMAIL MODAL ================= */
interface EmailModalProps {
  // isOpen: boolean
  type: "one" | "selected" | "all";
  count: number;
  onClose: () => void;
}

function EmailModal({ type, count, onClose }: EmailModalProps) {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const getTitle = () => {
    if (type === "one") return "Send Email";
    if (type === "selected") return `Send Email to ${count} Selected`;
    return `Send Email to All ${count} Responses`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-title"
    >
      <div className="my-auto w-full max-w-md space-y-4 rounded-xl border border-white/10 bg-[#1a2238] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <h2
            id="email-modal-title"
            className="text-base font-semibold sm:text-lg"
          >
            {getTitle()}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded p-1 hover:bg-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label="Close email modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label
              htmlFor="email-subject"
              className="mb-2 block text-xs font-medium text-white/80 sm:text-sm"
            >
              Subject
            </label>
            <input
              id="email-subject"
              type="text"
              placeholder="Email subject"
              className="w-full rounded-lg border border-white/20 bg-[#0f172a] px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="email-message"
              className="mb-2 block text-xs font-medium text-white/80 sm:text-sm"
            >
              Message
            </label>
            <textarea
              id="email-message"
              placeholder="Write your message here..."
              rows={4}
              className="w-full resize-none rounded-lg border border-white/20 bg-[#0f172a] px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-4 sm:flex-row">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-white/20 bg-[#0f172a] px-4 py-2.5 text-xs font-medium transition-colors hover:bg-white/5 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Email sent:", { type, count, subject, message });
              onClose();
              setMessage("");
              setSubject("");
            }}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-medium transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            disabled={message.trim() === "" || subject.trim() === ""}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= ADD MODULE MODAL ================= */
interface AddModuleModalProps {
  // isOpen: boolean
  onClose: () => void;
  onAddModule: (module: Module) => void;
}

function AddModuleModal({ onClose, onAddModule }: AddModuleModalProps) {
  const [moduleName, setModuleName] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");

  const colorOptions = [
    { color: "bg-purple-500/20 text-purple-400" },
    { color: "bg-pink-500/20 text-pink-400" },
    { color: "bg-cyan-500/20 text-cyan-400" },
    { color: "bg-orange-500/20 text-orange-400" },
    { color: "bg-green-500/20 text-green-400" },
    { color: "bg-indigo-500/20 text-indigo-400" },
    { color: "bg-blue-500/20 text-blue-400" },
    { color: "bg-amber-500/20 text-amber-400" },
  ];

  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-module-title"
    >
      <div className="my-auto w-full max-w-md space-y-4 rounded-xl border border-white/10 bg-[#1a2238] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <h2
            id="add-module-title"
            className="text-base font-semibold sm:text-lg"
          >
            Add New Module
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded p-1 hover:bg-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label="Close add module modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label
              htmlFor="module-name"
              className="mb-2 block text-xs font-medium text-white/80 sm:text-sm"
            >
              Module Name
            </label>
            <input
              id="module-name"
              type="text"
              placeholder="Enter module name"
              className="w-full rounded-lg border border-white/20 bg-[#0f172a] px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="module-desc"
              className="mb-2 block text-xs font-medium text-white/80 sm:text-sm"
            >
              Description
            </label>
            <textarea
              id="module-desc"
              placeholder="Enter module description"
              rows={4}
              className="w-full resize-none rounded-lg border border-white/20 bg-[#0f172a] px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
              value={moduleDesc}
              onChange={(e) => setModuleDesc(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-white/80 sm:text-sm">
              Icon Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`rounded-lg p-3 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${option.color} ${
                    selectedColor === index ? "ring-2 ring-blue-400" : ""
                  }`}
                  aria-label={`Select color option ${index + 1}`}
                  aria-pressed={selectedColor === index}
                >
                  <Trophy size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-4 sm:flex-row">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-white/20 bg-[#0f172a] px-4 py-2.5 text-xs font-medium transition-colors hover:bg-white/5 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const newModule: Module = {
                id: `module-${Date.now()}`,
                name: moduleName,
                desc: moduleDesc,
                count: "0 Responses",
                speakers: 0,
                lastUpdated: "Just now",
                icon: Trophy,
                iconColor:
                  colorOptions[selectedColor]?.color ??
                  "bg-blue-500/20 text-blue-400",
              };

              onAddModule(newModule);
              setModuleName("");
              setModuleDesc("");
              setSelectedColor(0);
            }}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-medium transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            disabled={moduleName.trim() === "" || moduleDesc.trim() === ""}
          >
            Create Module
          </button>
        </div>
      </div>
    </div>
  );
}
