"use client";

import { useMemo, useState } from "react";
import AdminNavigation from "../AdminNavigation";
import {
  Rocket,
  Search,
  Download,
  ChevronLeft,
  ArrowRight,
  Database,
  Building2,
  BrainCircuit,
  Megaphone,
  Gamepad2,
  Gavel,
  Loader2,
} from "lucide-react";
import * as XLSX from "xlsx";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_EIC_API_URL ?? "http://localhost:4000";

/* ================= TYPES ================= */
type View = "EVENTS" | "MODULES" | "RESPONSES";

interface Member {
  name: string;
  role?: string;
  year?: number;
  phone?: string;
  id?: string;
}

interface RegistrationRecord {
  id: string;
  branch: string;
  contactEmail: string;
  members?: Member[];
  [key: string]: unknown; // Allow other dynamic fields
}

interface EventModule {
  id: string;
  name: string;
  desc: string;
  apiPath: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
}

interface MainEvent {
  id: string;
  name: string;
  desc: string;
  status: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
}

/* ================= HARDCODED DATA ================= */
const EIC_EVENT: MainEvent = {
  id: "eic2026",
  name: "EIC 2026",
  desc: "The flagship Entrepreneurship & Innovation Challenge 2026.",
  status: "Live",
  icon: Rocket,
  iconColor: "bg-blue-500/20 text-blue-400",
};

const MODULES: EventModule[] = [
  {
    id: "chairmans-conclave",
    name: "Chairman's Conclave",
    desc: "Boardroom Property Event",
    apiPath: "/api/chairmans-conclave",
    icon: Gavel,
    iconColor: "bg-amber-500/20 text-amber-400",
  },
  {
    id: "boardroom-trivia",
    name: "Boardroom Trivia (Stakes & Biz)",
    desc: "Utility Property Quiz Event",
    apiPath: "/api/stakes-business",
    icon: BrainCircuit,
    iconColor: "bg-blue-500/20 text-blue-400",
  },
  {
    id: "campus-capitalist",
    name: "Campus Capitalist",
    desc: "Premium Property Pitch Event",
    apiPath: "/api/campus-capitalist",
    icon: Building2,
    iconColor: "bg-red-500/20 text-red-400",
  },
  {
    id: "ado-shuffle",
    name: "AdoShuffle",
    desc: "Media Property Marketing Event",
    apiPath: "/api/ado-shuffle",
    icon: Megaphone,
    iconColor: "bg-green-500/20 text-green-400",
  },
  {
    id: "dealroom-escape",
    name: "The Deal Room",
    desc: "Luxury Property Escape Room Event",
    apiPath: "/api/dealroom-escape",
    icon: Gamepad2,
    iconColor: "bg-purple-500/20 text-purple-400",
  },
];

/* ================= PAGE ================= */
export default function AdminModulesPage() {
  const [view, setView] = useState<View>("EVENTS");
  const [selectedEvent, setSelectedEvent] = useState<MainEvent | null>(null);
  const [selectedModule, setSelectedModule] = useState<EventModule | null>(
    null,
  );

  const [search, setSearch] = useState("");
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRegistrations = async (module: EventModule) => {
    setLoading(true);
    setError("");
    setRegistrations([]);
    try {
      const res = await axios.get(`${API_BASE}${module.apiPath}/all`);
      // Adapt based on backend response structure
      const responseBody = res.data as { data?: unknown[] } | unknown[];
      const data =
        "data" in responseBody && responseBody.data
          ? responseBody.data
          : responseBody;

      if (Array.isArray(data)) {
        setRegistrations(data as RegistrationRecord[]);
      } else {
        setRegistrations([]);
        console.error("Unknown response format:", res.data);
      }
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to fetch registrations from the backend.");
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = useMemo(() => {
    if (!search.trim()) return registrations;
    const lowerSearch = search.toLowerCase();
    return registrations.filter((r) => {
      const recordString = JSON.stringify(r).toLowerCase();
      return recordString.includes(lowerSearch);
    });
  }, [search, registrations]);

  const exportExcel = () => {
    if (filteredRegistrations.length === 0) return;

    // Determine the max number of members across all registrations
    const maxMembers = Math.max(
      ...filteredRegistrations.map((r) => (r.members ? r.members.length : 0)),
      0,
    );

    // Define the exact column header order
    const header: string[] = ["ID", "Branch", "Contact Email"];

    // Collect all unique "other" keys dynamically (like createdAt, etc.)
    const otherKeys = new Set<string>();
    filteredRegistrations.forEach((r) => {
      Object.keys(r).forEach((k) => {
        if (
          !["id", "branch", "contactEmail", "members"].includes(k) &&
          typeof r[k] !== "object"
        ) {
          otherKeys.add(k);
        }
      });
    });

    const otherKeysArray = Array.from(otherKeys);
    header.push(...otherKeysArray);

    // Add member columns to header in a rigid order
    for (let i = 1; i <= maxMembers; i++) {
      header.push(`Member ${i} Name`);
      header.push(`Member ${i} Role`);
      header.push(`Member ${i} Year`);
      header.push(`Member ${i} Phone`);
    }

    // Flatten data for Excel strictly according to header
    const flattened = filteredRegistrations.map((r) => {
      const flat: Record<string, unknown> = {
        ID: r.id ?? "",
        Branch: r.branch ?? "",
        "Contact Email": r.contactEmail ?? "",
      };

      // Add "other" fields (ensuring dates format properly)
      otherKeysArray.forEach((k) => {
        let val = r[k] ?? "";
        if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}T/.test(val)) {
          const date = new Date(val);
          if (!isNaN(date.getTime())) {
            val = new Intl.DateTimeFormat("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(date);
          }
        }
        flat[k] = val;
      });

      // Initialize and populate all member columns
      for (let i = 1; i <= maxMembers; i++) {
        flat[`Member ${i} Name`] = "";
        flat[`Member ${i} Role`] = "";
        flat[`Member ${i} Year`] = "";
        flat[`Member ${i} Phone`] = "";

        if (r.members?.[i - 1]) {
          const m = r.members[i - 1];
          flat[`Member ${i} Name`] = m?.name ?? "";
          flat[`Member ${i} Role`] = m?.role ?? "";
          flat[`Member ${i} Year`] = m?.year ?? "";
          flat[`Member ${i} Phone`] = m?.phone ?? "";
        }
      }

      return flat;
    });

    const ws = XLSX.utils.json_to_sheet(flattened, { header });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");
    XLSX.writeFile(wb, `${selectedModule?.name ?? "Event"}_Registrations.xlsx`);
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
                Active Events
              </h1>
              <p className="text-xs text-white/60 sm:text-sm">
                Manage modules inside the active EIC event
              </p>
            </div>

            <div className="mt-6 space-y-2 sm:space-y-3">
              <div
                className="group flex w-full cursor-pointer flex-col justify-between gap-3 rounded-lg border border-white/10 bg-[#1a2238] p-3 transition-colors focus-within:ring-2 focus-within:ring-blue-500 hover:border-white/20 sm:flex-row sm:items-center sm:gap-4 sm:rounded-xl sm:p-4 md:p-5"
                onClick={() => {
                  setSelectedEvent(EIC_EVENT);
                  setView("MODULES");
                }}
              >
                <div className="flex min-w-0 flex-1 gap-2 sm:gap-3">
                  <div
                    className={`${EIC_EVENT.iconColor} flex-shrink-0 rounded-lg p-2 sm:p-3`}
                  >
                    <EIC_EVENT.icon size={20} className="sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-sm font-semibold sm:text-base md:text-lg">
                        {EIC_EVENT.name}
                      </h2>
                      <span className="flex-shrink-0 rounded-md bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
                        {EIC_EVENT.status}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-xs text-white/60 sm:line-clamp-2">
                      {EIC_EVENT.desc}
                    </p>
                  </div>
                </div>

                <div className="hidden items-center self-stretch sm:flex">
                  <div className="mx-4 h-12 w-px bg-white/10 md:mx-6" />
                  <div className="flex items-center gap-2 pr-2 font-medium whitespace-nowrap text-blue-400 transition-colors group-hover:text-blue-300">
                    <span>Manage Modules</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
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
                    setSelectedEvent(null);
                  }}
                  className="rounded-lg border border-white/10 bg-[#1a2238] p-2 text-white/60 transition-colors hover:border-white/20 hover:text-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
                  {selectedEvent.name} Modules
                </h1>
              </div>
            </div>

            <p className="mb-4 text-xs text-white/60 sm:text-sm">
              Select an event module to view all the registrations
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {MODULES.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedModule(m);
                      setView("RESPONSES");
                      setSearch("");
                      void fetchRegistrations(m);
                    }}
                    className="flex h-full min-h-[180px] flex-col rounded-lg border border-white/10 bg-[#1a2238] p-5 text-left shadow-lg transition-colors hover:border-white/20 focus:ring-2 focus:ring-blue-500"
                  >
                    <div
                      className={`${m.iconColor} mb-4 w-fit rounded-lg p-2.5`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="text-base font-semibold sm:text-lg">
                      {m.name}
                    </h3>
                    <p className="mt-2 flex-1 text-xs text-white/60 sm:text-sm">
                      {m.desc}
                    </p>

                    <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3">
                      <span className="text-xs font-medium text-blue-400">
                        View Registrations
                      </span>
                      <ArrowRight size={12} className="text-blue-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* ================= RESPONSES (Registrations) ================= */}
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
                >
                  <ChevronLeft size={20} />
                </button>
                <h1 className="flex items-center gap-3 text-xl font-semibold sm:text-2xl md:text-3xl">
                  <Database size={24} className="text-blue-400" />
                  {selectedModule.name}
                </h1>
              </div>

              <button
                onClick={() => {
                  setView("MODULES");
                  setSearch("");
                  setSelectedModule(null);
                }}
                className="hidden flex-shrink-0 items-center gap-1 rounded border border-white/10 bg-[#1a2238] px-3 py-2 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white lg:flex"
              >
                <ChevronLeft size={18} />
                <span>Back to Modules</span>
              </button>
            </div>

            <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:gap-3">
              <div className="relative w-full">
                <Search
                  className="absolute top-2.5 left-3 text-white/40"
                  size={16}
                />
                <input
                  placeholder="Filter registrations (Global JSON text search)..."
                  className="w-full rounded-lg border border-white/20 bg-[#0f172a] py-2 pr-3 pl-9 text-xs focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button
                onClick={exportExcel}
                disabled={filteredRegistrations.length === 0}
                className="flex flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-xs font-medium transition-colors hover:bg-green-700 disabled:bg-gray-700 sm:text-sm"
              >
                <Download size={16} />
                <span>Export to CSV</span>
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-blue-500" size={40} />
              </div>
            ) : error ? (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 py-10 text-center text-red-500">
                <p>{error}</p>
                <button
                  onClick={() => fetchRegistrations(selectedModule)}
                  className="mt-4 rounded bg-red-500/20 px-4 py-2 text-sm text-red-300 hover:bg-red-500/30"
                >
                  Retry Connection
                </button>
              </div>
            ) : filteredRegistrations.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="col-span-full mb-2 border-b border-white/10 pb-2">
                  <p className="text-sm font-semibold text-white/70">
                    Total Registrations: {filteredRegistrations.length}
                  </p>
                </div>
                {/* Structured Cards */}
                {filteredRegistrations.map((doc, idx) => {
                  const { id, branch, contactEmail, members, ...otherFields } =
                    doc;

                  // Filter out unwanted internal fields like createdAt or updatedAt if desired, but here we just render them
                  // if they exist
                  return (
                    <div
                      key={id || idx}
                      className="relative flex flex-col gap-4 overflow-hidden rounded-lg border border-white/10 bg-[#1a2238] p-5 shadow-lg"
                    >
                      <div className="absolute top-0 left-0 h-full w-1 rounded-l-lg bg-blue-500" />

                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/5 pb-3">
                        <div>
                          <p className="mb-1 text-[10px] tracking-widest text-white/40 uppercase">
                            Registration #{idx + 1}
                          </p>
                          <h3 className="text-lg font-bold text-white">
                            <span className="text-blue-400">{branch}</span>
                          </h3>
                        </div>
                        {id && (
                          <span className="max-w-[150px] truncate rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] break-all text-white/50 sm:max-w-none">
                            {id}
                          </span>
                        )}
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <p className="mb-1 text-[10px] font-semibold text-white/40 uppercase">
                            Contact Email
                          </p>
                          <a
                            href={`mailto:${contactEmail}`}
                            className="text-sm text-blue-400 hover:underline"
                          >
                            {contactEmail}
                          </a>
                        </div>

                        {Object.keys(otherFields).length > 0 && (
                          <div className="col-span-full mt-2">
                            <p className="mb-2 text-[10px] font-semibold text-white/40 uppercase">
                              Other Details
                            </p>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                              {Object.entries(otherFields).map(([key, val]) => {
                                // Ignore objects or arrays for simple rendering
                                if (val !== null && typeof val === "object")
                                  return null;

                                let displayValue = String(val);
                                // Format dates nicely if they are valid ISO date strings
                                if (
                                  typeof val === "string" &&
                                  /^\d{4}-\d{2}-\d{2}T/.test(val)
                                ) {
                                  const date = new Date(val);
                                  if (!isNaN(date.getTime())) {
                                    displayValue = new Intl.DateTimeFormat(
                                      "en-IN",
                                      {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                      },
                                    ).format(date);
                                  }
                                }

                                return (
                                  <div
                                    key={key}
                                    className="flex flex-col justify-center rounded bg-black/20 p-2.5"
                                  >
                                    <p className="mb-0.5 truncate text-[10px] font-semibold text-white/40 uppercase">
                                      {key}
                                    </p>
                                    <p className="text-sm font-medium break-words text-white/90">
                                      {displayValue}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Members */}
                      {members &&
                        Array.isArray(members) &&
                        members.length > 0 && (
                          <div className="mt-2">
                            <p className="mb-2 text-[10px] font-semibold text-white/40 uppercase">
                              Team Members ({members.length})
                            </p>
                            <div className="flex flex-col gap-2">
                              {members.map((m, mIdx) => (
                                <div
                                  key={mIdx}
                                  className="flex flex-wrap items-center justify-between gap-3 rounded border border-white/10 bg-white/5 p-3"
                                >
                                  <div className="min-w-[120px]">
                                    <p className="text-sm font-semibold text-white/90">
                                      {m.name}
                                    </p>
                                    {m.role && (
                                      <p className="mt-0.5 text-[10px] tracking-wide text-blue-400 uppercase">
                                        {m.role}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap gap-4 text-xs">
                                    {m.year !== undefined && (
                                      <div>
                                        <span className="text-white/40">
                                          Year:
                                        </span>{" "}
                                        <span className="text-white/80">
                                          {m.year}
                                        </span>
                                      </div>
                                    )}
                                    {m.phone && (
                                      <div>
                                        <span className="text-white/40">
                                          Phone:
                                        </span>{" "}
                                        <span className="text-white/80">
                                          {m.phone}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-lg border border-white/10 bg-[#1a2238]/50 py-12 text-center">
                <Database size={40} className="mx-auto mb-3 text-white/20" />
                <p className="text-sm text-white/60">
                  No registration records found for this module.
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
